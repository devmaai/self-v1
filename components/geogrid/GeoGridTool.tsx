"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Script from "next/script";
import { describeOffset, rankBand, type GridStats, type ScoredPoint } from "@/lib/geoGrid";

const GeoGridMap = dynamic(() => import("./GeoGridMap"), {
  ssr: false,
  loading: () => <div className="gg-map gg-map-loading">Loading map…</div>,
});

declare global {
  interface Window {
    turnstile?: { reset: (el?: string | HTMLElement) => void };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const KEYWORD_IDEAS = ["self storage", "storage units near me", "climate controlled storage", "RV storage"];
const RADIUS_MILES = 5; // fixed for the MVP
const LOADING_STEPS = [
  "Finding your address",
  "Building the 5 × 5 grid",
  "Checking Google Maps at 25 points",
  "Calculating your coverage",
];

type FieldErrors = Partial<Record<"business" | "address" | "keyword", string>>;

type Result = {
  center: { lat: number; lng: number };
  points: ScoredPoint[];
  stats: GridStats;
  failedPoints: number;
  demo?: boolean;
  business: string;
  keyword: string;
  address: string;
  radius: number;
  scannedAt: string;
};

const ERROR_MESSAGES: Record<string, string> = {
  captcha: "Captcha check failed. Please try the verification again.",
  rate_limited: "You've run several scans recently. Please try again in about an hour.",
  address_not_found: "We couldn't find that address. Try adding the city and state.",
  geocode_failed: "The address lookup service is busy. Please try again in a moment.",
  ranking_failed: "We couldn't retrieve Google Maps rankings right now. Please try again in a moment.",
  service_auth: "The ranking service rejected our credentials. The site owner needs to check the DataForSEO login and API password.",
  service_funds: "The ranking service is out of credit. The site owner needs to top up the DataForSEO balance.",
  not_configured: "This tool isn't available yet. Please check back soon.",
};

function verdictFor(stats: GridStats): { tone: "good" | "ok" | "weak" | "none"; title: string; text: string } {
  const missing = stats.totalPoints - stats.foundPoints;
  if (stats.foundPoints === 0) {
    return {
      tone: "none",
      title: "Not visible on Google Maps",
      text: "Your business didn't show up in the top 20 at any of the 25 points. Renters searching this keyword near you aren't finding you.",
    };
  }
  if (stats.top3Pct >= 60) {
    return {
      tone: "good",
      title: "Strong map visibility",
      text: `You're in the top 3 at ${stats.top3Pct}% of points. Protect this lead and look at the ${missing} point${missing === 1 ? "" : "s"} where you don't appear.`,
    };
  }
  if (stats.top3Pct >= 30 || stats.top10Pct >= 60) {
    return {
      tone: "ok",
      title: "Moderate map visibility",
      text: `You're strong near your facility but fade as renters search from farther away. You're missing from ${missing} of 25 points.`,
    };
  }
  return {
    tone: "weak",
    title: "Weak map visibility",
    text: `You're in the top 3 at only ${stats.top3Pct}% of points. Competitors are capturing most of the move-ins searched from your trade area.`,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function GeoGridTool() {
  const [keyword, setKeyword] = useState("");
  const [busy, setBusy] = useState(false);
  const [step, setStep] = useState(0);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [view, setView] = useState<"map" | "grid">("map");
  const panelRef = useRef<HTMLDivElement>(null);

  // Advance the loading steps while a scan runs (visual feedback only).
  useEffect(() => {
    if (!busy) return;
    setStep(0);
    const id = setInterval(() => setStep((s) => Math.min(s + 1, LOADING_STEPS.length - 1)), 6000);
    return () => clearInterval(id);
  }, [busy]);

  const scrollToPanel = () => {
    if (window.matchMedia("(max-width: 960px)").matches) {
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return;
    const data = new FormData(e.currentTarget);
    const business = String(data.get("business") || "").trim();
    const address = String(data.get("address") || "").trim();
    const kw = keyword.trim();

    setBusy(true);
    setFieldErrors({});
    setFormError(null);
    setResult(null);
    scrollToPanel();

    try {
      const res = await fetch("/api/geo-grid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business,
          address,
          keyword: kw,
          radius: RADIUS_MILES,
          company: String(data.get("company") || ""),
          captchaToken: String(data.get("cf-turnstile-response") || ""),
        }),
      });
      const json = await res.json();

      if (res.ok && json.ok) {
        setResult({ ...json, business, keyword: kw, address, radius: RADIUS_MILES, scannedAt: new Date().toISOString() });
        setView("map");
      } else if (json.error === "validation" && json.fields) {
        setFieldErrors(json.fields as FieldErrors);
        setFormError("Please fix the highlighted fields and try again.");
      } else {
        setFormError(ERROR_MESSAGES[json.error] ?? "Something went wrong. Please try again in a moment.");
      }
    } catch {
      setFormError("Couldn't reach the server. Please check your connection and try again.");
    } finally {
      setBusy(false);
      if (SITE_KEY) window.turnstile?.reset();
    }
  };

  const verdict = result ? verdictFor(result.stats) : null;
  const missing = result ? result.stats.totalPoints - result.stats.foundPoints : 0;

  return (
    <div className="gg-layout">
      {SITE_KEY && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />}

      {/* ── Form ───────────────────────────────────────────── */}
      <aside className="gg-form-card">
        <h2 className="gg-form-title">Run a free scan</h2>
        <p className="gg-form-sub">Takes about 30 seconds. No signup needed.</p>

        <form className="gg-form" onSubmit={handleSubmit} noValidate>
          <div className="gg-field">
            <label htmlFor="gg-business">Business / brand name</label>
            <input id="gg-business" name="business" type="text" placeholder="e.g. Acme Self Storage" autoComplete="organization" required />
            {fieldErrors.business && <span className="gg-error">{fieldErrors.business}</span>}
          </div>

          <div className="gg-field">
            <label htmlFor="gg-address">Business location / address</label>
            <input id="gg-address" name="address" type="text" placeholder="123 Main St, Austin, TX 78701" autoComplete="street-address" required />
            {fieldErrors.address && <span className="gg-error">{fieldErrors.address}</span>}
          </div>

          <div className="gg-field">
            <label htmlFor="gg-keyword">Search keyword</label>
            <input
              id="gg-keyword"
              name="keyword"
              type="text"
              placeholder="What would a renter search?"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              required
            />
            <div className="gg-chips" aria-label="Keyword ideas">
              {KEYWORD_IDEAS.map((k) => (
                <button type="button" key={k} className={`gg-chip${keyword === k ? " is-on" : ""}`} onClick={() => setKeyword(k)}>
                  {k}
                </button>
              ))}
            </div>
            {fieldErrors.keyword && <span className="gg-error">{fieldErrors.keyword}</span>}
          </div>

          <div className="gg-honeypot" aria-hidden="true">
            <label htmlFor="gg-company">Company</label>
            <input id="gg-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          {SITE_KEY && <div className="cf-turnstile gg-turnstile" data-sitekey={SITE_KEY} />}

          {formError && <p className="gg-form-error" role="alert">{formError}</p>}

          <button type="submit" className="gg-submit" disabled={busy}>
            {busy ? "Scanning…" : "Generate Geo-Grid"}
          </button>
          <p className="gg-fine">5 × 5 grid · 5 mile radius · 25 Google Maps checks</p>
        </form>
      </aside>

      {/* ── Results panel ──────────────────────────────────── */}
      <section className="gg-panel" ref={panelRef} aria-live="polite" aria-busy={busy}>
        {busy && (
          <div className="gg-state gg-loading">
            <div className="gg-scan-grid" aria-hidden="true">
              {Array.from({ length: 25 }).map((_, i) => (
                <span key={i} style={{ animationDelay: `${(i % 5) * 0.12 + Math.floor(i / 5) * 0.12}s` }} />
              ))}
            </div>
            <h3>Scanning Google Maps</h3>
            <ol className="gg-steps">
              {LOADING_STEPS.map((s, i) => (
                <li key={s} className={i < step ? "is-done" : i === step ? "is-now" : ""}>{s}</li>
              ))}
            </ol>
            <p className="gg-fine">This usually takes 20 to 40 seconds. Please keep this tab open.</p>
          </div>
        )}

        {!busy && !result && (
          <div className="gg-state gg-empty">
            <div className="gg-sample" aria-hidden="true">
              {[
                [14, 9, 6, 8, 13], [11, 5, 3, 4, 9], [7, 2, 1, 3, 6], [12, 6, 4, 5, 10], [null, 12, 8, 11, null],
              ].flat().map((r, i) => (
                <span key={i} className={`gg-cell gg-cell-${rankBand(r as number | null)}`}>{r ?? "–"}</span>
              ))}
            </div>
            <span className="gg-sample-tag">Sample result</span>
            <h3>See where renters can and can&apos;t find you</h3>
            <p>
              Enter your facility details to scan 25 points around your location. Each point shows your Google Maps
              position for that search, so you can see exactly where you win move-ins and where competitors do.
            </p>
          </div>
        )}

        {!busy && result && verdict && (
          <div className="gg-results">
            {result.demo && (
              <p className="gg-demo" role="status">Demo data: these rankings are simulated and are not real Google results.</p>
            )}

            <header className="gg-result-head">
              <div>
                <h3>{result.business}</h3>
                <p>
                  “{result.keyword}” · {result.radius} mi radius · {formatDate(result.scannedAt)}
                </p>
                <p className="gg-result-addr">{result.address}</p>
              </div>
              <span className={`gg-verdict gg-verdict-${verdict.tone}`}>{verdict.title}</span>
            </header>

            <p className="gg-verdict-text">{verdict.text}</p>

            <div className="gg-stats">
              <div className="gg-stat"><span>Points scanned</span><b>{result.stats.totalPoints}</b></div>
              <div className="gg-stat gg-stat-green"><span>Top 3 coverage</span><b>{result.stats.top3Pct}%</b></div>
              <div className="gg-stat gg-stat-amber"><span>Top 10 coverage</span><b>{result.stats.top10Pct}%</b></div>
              <div className="gg-stat">
                <span>Average rank</span>
                <b>{result.stats.avgRank ?? "–"}</b>
                <small>{result.stats.foundPoints === 0 ? "Not found" : `Across ${result.stats.foundPoints} points where found`}</small>
              </div>
            </div>

            {result.failedPoints > 0 && (
              <p className="gg-form-error">
                {result.failedPoints} of 25 points couldn&apos;t be checked and are shown as not found.
              </p>
            )}

            <div className="gg-tabs" role="tablist" aria-label="Result view">
              <button role="tab" aria-selected={view === "map"} className={view === "map" ? "is-on" : ""} onClick={() => setView("map")}>Map</button>
              <button role="tab" aria-selected={view === "grid"} className={view === "grid" ? "is-on" : ""} onClick={() => setView("grid")}>Grid</button>
            </div>

            {view === "map" ? (
              <GeoGridMap center={result.center} radius={result.radius} points={result.points} business={result.business} />
            ) : (
              <div className="gg-gridview">
                <span className="gg-compass">North ↑</span>
                <div className="gg-cells" role="table" aria-label="Ranking at each grid point">
                  {result.points.map((p) => (
                    <span
                      key={`${p.row}-${p.col}`}
                      role="cell"
                      className={`gg-cell gg-cell-${rankBand(p.rank)}`}
                      title={describeOffset(p.row, p.col, result.radius)}
                      aria-label={`Row ${p.row + 1}, column ${p.col + 1}: ${p.rank ? `rank ${p.rank}` : "not found"}`}
                    >
                      {p.rank ?? "–"}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <ul className="gg-legend">
              <li><i className="gg-dot gg-dot-green" /><b>1–3</b><span>Map pack, where most renters click</span></li>
              <li><i className="gg-dot gg-dot-yellow" /><b>4–10</b><span>Visible, behind competitors</span></li>
              <li><i className="gg-dot gg-dot-red" /><b>11+</b><span>Buried, rarely seen</span></li>
              <li><i className="gg-dot gg-dot-grey" /><b>Not found</b><span>Not in the top 20</span></li>
            </ul>
            <p className="gg-fine">
              {view === "map" ? "Click a point to see your ranking and who ranks at the top there." : "Hover a cell to see where it is."}
              {missing > 0 ? ` You didn't appear at ${missing} point${missing === 1 ? "" : "s"}.` : ""}
            </p>

            <div className="gg-next">
              <div>
                <h4>Want to rank in the top 3 across the whole map?</h4>
                <p>Our free audit shows why competitors outrank you in the grey and red areas, and what to fix first.</p>
              </div>
              <Link href="/audit" className="gg-next-btn">Get my free audit</Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
