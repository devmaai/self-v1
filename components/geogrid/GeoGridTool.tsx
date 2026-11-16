"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Script from "next/script";
import type { GridStats, ScoredPoint } from "@/lib/geoGrid";

const GeoGridMap = dynamic(() => import("./GeoGridMap"), {
  ssr: false,
  loading: () => <div className="geogrid-map geogrid-map-loading">Loading map…</div>,
});

declare global {
  interface Window {
    turnstile?: { reset: (el?: string | HTMLElement) => void };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type FieldErrors = Partial<Record<"business" | "address" | "keyword" | "radius", string>>;

type Result = {
  center: { lat: number; lng: number };
  points: ScoredPoint[];
  stats: GridStats;
  failedPoints: number;
  business: string;
};

const ERROR_MESSAGES: Record<string, string> = {
  captcha: "Captcha check failed. Please try the verification again.",
  rate_limited: "You've run several scans recently. Please try again in about an hour.",
  address_not_found: "We couldn't find that address. Try adding the city and state.",
  geocode_failed: "The address lookup service is busy. Please try again in a moment.",
  ranking_failed: "We couldn't retrieve Google Maps rankings right now. Please try again in a moment.",
  not_configured: "This tool isn't available yet. Please check back soon.",
};

export default function GeoGridTool() {
  const [busy, setBusy] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return;
    const data = new FormData(e.currentTarget);
    const business = String(data.get("business") || "").trim();

    setBusy(true);
    setFieldErrors({});
    setFormError(null);
    setResult(null);

    try {
      const res = await fetch("/api/geo-grid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business,
          address: String(data.get("address") || ""),
          keyword: String(data.get("keyword") || ""),
          radius: Number(data.get("radius") || 5),
          company: String(data.get("company") || ""),
          captchaToken: String(data.get("cf-turnstile-response") || ""),
        }),
      });
      const json = await res.json();

      if (res.ok && json.ok) {
        setResult({ ...json, business });
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

  return (
    <div className="geogrid">
      {SITE_KEY && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />}

      <div className="af-card">
        <form className="af-form" onSubmit={handleSubmit} noValidate>
          <div className="af-row">
            <div className="af-field">
              <label htmlFor="gg-business">Business / brand name</label>
              <input id="gg-business" name="business" type="text" placeholder="Acme Self Storage" required />
              {fieldErrors.business && <span className="af-error">{fieldErrors.business}</span>}
            </div>
            <div className="af-field">
              <label htmlFor="gg-keyword">Search keyword</label>
              <input id="gg-keyword" name="keyword" type="text" placeholder="self storage near me" required />
              {fieldErrors.keyword && <span className="af-error">{fieldErrors.keyword}</span>}
            </div>
          </div>

          <div className="af-row">
            <div className="af-field">
              <label htmlFor="gg-address">Business location / address</label>
              <input id="gg-address" name="address" type="text" placeholder="123 Main St, Austin, TX" required />
              {fieldErrors.address && <span className="af-error">{fieldErrors.address}</span>}
            </div>
            <div className="af-field">
              <label htmlFor="gg-radius">Search radius (miles)</label>
              <input id="gg-radius" name="radius" type="number" min={1} max={25} step={0.5} defaultValue={5} required />
              {fieldErrors.radius && <span className="af-error">{fieldErrors.radius}</span>}
            </div>
          </div>

          <div className="af-honeypot" aria-hidden="true">
            <label htmlFor="gg-company">Company</label>
            <input id="gg-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          {SITE_KEY && <div className="cf-turnstile af-turnstile" data-sitekey={SITE_KEY} data-theme="dark" />}

          {formError && <p className="af-form-error" role="alert">{formError}</p>}

          <button type="submit" className="af-submit" disabled={busy}>
            {busy ? "Scanning 25 points… this takes up to 30 seconds" : "Generate Geo-Grid →"}
          </button>
          <p className="af-note">Free. Scans a fixed 5 × 5 grid (25 points) on Google Maps.</p>
        </form>
      </div>

      {result && (
        <div className="geogrid-results" aria-live="polite">
          <div className="geogrid-stats">
            <div className="geogrid-stat"><b>{result.stats.totalPoints}</b><span>Points scanned</span></div>
            <div className="geogrid-stat"><b>{result.stats.top3Pct}%</b><span>Top 3 coverage</span></div>
            <div className="geogrid-stat"><b>{result.stats.top10Pct}%</b><span>Top 10 coverage</span></div>
            <div className="geogrid-stat">
              <b>{result.stats.avgRank ?? "–"}</b>
              <span>Average rank{result.stats.avgRank === null ? "" : ` (${result.stats.foundPoints} found)`}</span>
            </div>
          </div>

          {result.failedPoints > 0 && (
            <p className="af-form-error">
              {result.failedPoints} of 25 points could not be checked and are shown as not found.
            </p>
          )}

          <GeoGridMap center={result.center} points={result.points} business={result.business} />

          <ul className="geogrid-legend">
            <li><i className="geogrid-pin geogrid-pin-green" />Rank 1–3</li>
            <li><i className="geogrid-pin geogrid-pin-yellow" />Rank 4–10</li>
            <li><i className="geogrid-pin geogrid-pin-red" />Rank 11+</li>
            <li><i className="geogrid-pin geogrid-pin-grey" />Not found</li>
          </ul>
          <p className="af-note">Click a point to see its ranking and coordinates.</p>
        </div>
      )}
    </div>
  );
}
