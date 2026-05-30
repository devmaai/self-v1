import { Metadata } from "next";
import React from "react";
import V2Interactions from "@/components/v2/V2Interactions";
import V2Nav from "@/components/v2/V2Nav";
import V2Footer from "@/components/v2/V2Footer";

export const metadata: Metadata = {
  title: "Local SEO & Google Business Profile Optimization | SelfStorage.help",
  description:
    "Our Local SEO and Google Maps program puts your facility in front of renters the moment they search for storage in your area.",
};

const problems = [
  {
    num: "Problem 01",
    title: "Location drift on Google Maps",
    desc: "Your pin shows several miles from where the facility actually sits, so renters call the operator closest to where they searched.",
    tag: "GBP · Map pin · Service area",
  },
  {
    num: "Problem 02",
    title: "Review gap against the facility next door",
    desc: "Competitors show 4.8 stars and 200+ recent reviews while you sit on a handful from years ago. Renters pick them before they ever click your listing.",
    tag: "Reviews · Velocity · Response rate",
  },
  {
    num: "Problem 03",
    title: "Wrong hours, missing categories, stale photos",
    desc: "Renters see incorrect office hours or gate access times and assume you are closed. Missing service categories give Google no reason to surface you.",
    tag: "Categories · Hours · Photos",
  },
];

const steps = [
  {
    phase: "Step 01",
    title: "Google Business Profile mastery",
    desc: "Weekly profile management. Correct primary category, properly configured attributes, fresh photos of every unit type, posts and offers kept current, and the structured signals that tell Google your facility is the most relevant result in its radius.",
    tags: ["GBP", "Categories", "Photos", "Posts"],
  },
  {
    phase: "Step 02",
    title: "Near-me keyword optimisation",
    desc: 'Local landing pages built for the phrases renters actually use — "climate-controlled storage in {City}", "vehicle and RV storage near {Neighborhood}", "cheapest 10x10 units near me", "drive-up storage units in {ZIP}".',
    tags: ["Location pages", "Unit-size pages", "ZIP targeting"],
  },
  {
    phase: "Step 03",
    title: "Hyper-local citation building",
    desc: "Your facility added to 50+ local directories and self-storage-specific databases with consistent NAP data. This is the topical authority that lifts map rankings above generic competitors.",
    tags: ["NAP", "Citations", "Directories"],
  },
  {
    phase: "Step 04",
    title: "Review velocity and response",
    desc: "An automated review request flow tied to your booking software, plus templated or fully managed responses. Steady review volume and a high response rate are direct map pack ranking signals.",
    tags: ["Review automation", "Response", "Velocity"],
  },
];

const faqs = [
  {
    q: "How long until I rank in the top three of Google Maps?",
    a: "Most self-storage clients see meaningful map ranking improvement within 45 to 90 days. The exact timeline depends on your starting position, review count, and how competitive your trade area is. We share a baseline ranking report in week one so you can measure movement against it.",
    open: true,
  },
  {
    q: "Do you handle review responses for us?",
    a: "Yes — either we provide response templates your on-site team uses, or we actively manage every response on your behalf. Either way the review profile stays active, which Google treats as a positive ranking signal.",
  },
  {
    q: "Does this work for multi-location operators?",
    a: "Yes. Multi-location programmes get a localised strategy per facility so your own listings complement each other instead of competing for the same keywords. Pricing scales by facility count.",
  },
  {
    q: "Do I need a new website for Local SEO to work?",
    a: "No. Most of the first-90-day wins come from Google Business Profile optimisation, citation cleanup, and local landing pages added to your existing site. A rebuild is only suggested if the audit shows your current platform is blocking ranking — and we say so directly.",
  },
  {
    q: "How do you measure results?",
    a: "We connect your GA4 and Google Search Console accounts in week one. Monthly reporting ties map pack position movement to reservation form completions and tracked phone calls, so you see which ranking changes actually produced move-ins.",
  },
];

export default function LocalSeoGbpPage() {
  return (
    <div className="v2-home">
      <V2Interactions />
      <V2Nav variant="inner" />

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-top">
            <div>
              <div className="hero-badge">
                <span className="hero-badge-dot"></span>
                Local SEO &amp; Google Business Profile
              </div>
              <h1 className="hero-h1">
                Rank #1–3 on Google Maps<br />
                in your <em>3–5 mile trade area.</em>
              </h1>
              <p className="hero-lead">
                We are a specialist Local SEO partner for independent self-storage operators. We move your facility into the map pack for the storage searches renters actually run inside your service radius — without pay-per-lead fees or generic agency tactics.
              </p>
              <div className="hero-cta-row">
                <a href="/contact" className="btn-hero">
                  Get a free local visibility audit
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
                <a href="#proof" className="btn-hero-ghost">See ranking data →</a>
              </div>
            </div>

            <div className="hero-dashboard reveal">
              <div className="dash-topbar">
                <div className="dash-title">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="6.5" fill="#4285F4" /><path d="M6.5 3.5A3 3 0 1 0 9.5 6.5H6.5V4.8h3.7v.7a4.4 4.4 0 1 1-3.7-4.5V3.5z" fill="#fff" /></svg>
                  Map pack tracker — Live
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div className="dash-live"><span className="dash-live-dot"></span> Tracking</div>
                  <div className="dash-period">Trade area</div>
                </div>
              </div>
              <div className="dash-metrics">
                <div className="dm">
                  <div className="dm-label">Map pack appearances</div>
                  <div className="dm-val">412</div>
                  <div className="dm-delta">↑ 168% vs prior 90d</div>
                </div>
                <div className="dm">
                  <div className="dm-label">Direction requests</div>
                  <div className="dm-val">287</div>
                  <div className="dm-delta">↑ 94% vs prior 90d</div>
                </div>
                <div className="dm">
                  <div className="dm-label">Avg. pack position</div>
                  <div className="dm-val">2.3</div>
                  <div className="dm-delta">Was 8.4 at start</div>
                </div>
              </div>
              <div className="dash-chart">
                <div className="dash-chart-label">Map pack impressions — trailing 14 weeks</div>
                <div className="sparkline">
                  {[18, 24, 28, 32, 41, 48, 54, 61, 68, 74, 80, 86, 91, 96].map((h, i) => (
                    <div
                      key={i}
                      className={`spark-bar${i >= 10 && i < 13 ? " high" : ""}${i === 13 ? " hi" : ""}`}
                      style={{ height: `${h}%`, animationDelay: `${i * 0.04}s` }}
                    />
                  ))}
                </div>
              </div>
              <div className="dash-rankings">
                <div className="dash-rank-head">
                  <div className="drh">Pos.</div>
                  <div className="drh">Keyword</div>
                  <div className="drh" style={{ textAlign: "center" }}>Change</div>
                  <div className="drh" style={{ textAlign: "right" }}>Clicks</div>
                </div>
                <div className="dash-rank-row">
                  <div className="dr-pos p1">#1</div>
                  <div className="dr-kw">storage units near me</div>
                  <div className="dr-change">↑ +9</div>
                  <div className="dr-clicks">724</div>
                </div>
                <div className="dash-rank-row">
                  <div className="dr-pos p1">#2</div>
                  <div className="dr-kw">self storage [city]</div>
                  <div className="dr-change">↑ +6</div>
                  <div className="dr-clicks">548</div>
                </div>
                <div className="dash-rank-row">
                  <div className="dr-pos">#3</div>
                  <div className="dr-kw">climate controlled storage</div>
                  <div className="dr-change new">New</div>
                  <div className="dr-clicks">341</div>
                </div>
                <div className="dash-rank-row">
                  <div className="dr-pos">#4</div>
                  <div className="dr-kw">10x10 storage unit [zip]</div>
                  <div className="dr-change">↑ +4</div>
                  <div className="dr-clicks">219</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...Array(2)].flatMap((_, dup) =>
            ["Google Business Profile", "Map Pack Ranking", "Citations", "NAP Consistency", "Review Velocity", "Local Landing Pages", "Service Area Targeting", "ZIP Keyword Coverage", "GBP Photos", "Posts & Offers", "Q&A Management", "Local Schema"].map((t, i) => (
              <span key={`${dup}-${i}`} className="marquee-item">{t}</span>
            ))
          )}
        </div>
      </div>

      <section className="page-section" id="challenge">
        <div className="inner">
          <div className="pill">Why you are losing local renters</div>
          <h2 className="section-h2">The map pack is winner-take-most.<br />Three failures keep you out of it.</h2>
          <p className="section-lead">If your facility is not in the top three Google Maps results inside your trade area, the majority of nearby clicks go to a competitor. These are the exact gaps we close in the first 90 days.</p>

          <div className="problem-layout">
            <div className="problem-right">
              {problems.map((p) => (
                <div key={p.num} className="problem-card reveal">
                  <div className="problem-card-num">{p.num}</div>
                  <div className="problem-card-title">{p.title}</div>
                  <div className="problem-card-desc">{p.desc}</div>
                  <div className="problem-card-tag">{p.tag}</div>
                </div>
              ))}
            </div>

            <div>
              <div className="problem-visual reveal" style={{ marginBottom: 16 }}>
                <div className="pv-header">
                  <div className="pv-title">What a missed map pack ranking costs</div>
                  <div className="pv-sub">Typical single facility, monthly</div>
                </div>
                <div className="pv-rows">
                  <div className="pv-row">
                    <div className="pv-row-label"><span className="pv-row-icon r"></span>Pay-per-lead aggregator clicks lost</div>
                    <div className="pv-row-val red">$2,400 / mo</div>
                  </div>
                  <div className="pv-row">
                    <div className="pv-row-label"><span className="pv-row-icon a"></span>Paid search spend covering the gap</div>
                    <div className="pv-row-val red">$1,800 / mo</div>
                  </div>
                  <div className="pv-row">
                    <div className="pv-row-label"><span className="pv-row-icon a"></span>Direction requests sent to competitors</div>
                    <div className="pv-row-val red">~210 / mo</div>
                  </div>
                  <div className="pv-row">
                    <div className="pv-row-label"><span className="pv-row-icon g"></span>Organic map pack clicks (after programme)</div>
                    <div className="pv-row-val green">$0 / lead</div>
                  </div>
                </div>
                <div className="pv-total">
                  <div className="pv-total-label">Cost per map pack lead at month 6</div>
                  <div className="pv-total-val">$0.00</div>
                </div>
              </div>

              <div className="inline-cta reveal">
                <div className="inline-cta-text">
                  <strong>See exactly where your pin is losing renters</strong>
                  Free audit. We map the gap between you and the top three results in your trade area.
                </div>
                <a href="/contact" className="btn-inline">Get free audit →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section alt" id="process">
        <div className="inner">
          <div className="pill">Our approach</div>
          <h2 className="section-h2">Four moves that put your facility<br />in the top three.</h2>
          <p className="section-lead">No generic Local SEO playbook. Every step is built for the way renters search for self-storage and the way Google ranks storage facilities specifically.</p>
          <div className="process-steps">
            {steps.map((s, i) => (
              <div key={s.phase} className={`pstep${i === 0 ? " active" : ""} reveal`}>
                <div className="pstep-accent"></div>
                <div className="pstep-phase">{s.phase}</div>
                <div className="pstep-title">{s.title}</div>
                <div className="pstep-desc">{s.desc}</div>
                <div className="svc-tags" style={{ marginTop: 8 }}>
                  {s.tags.map((t) => <span key={t} className="svc-tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
          <div className="process-cta-row reveal">
            <div className="pct-text"><strong>Want to see what each step finds for your facility?</strong> The audit is free and arrives in writing within five business days.</div>
            <a href="/contact" className="btn-pct">Start with a free audit →</a>
          </div>
        </div>
      </section>

      <section className="page-section" id="proof">
        <div className="inner">
          <div className="pill">Verified results</div>
          <h2 className="section-h2">Map pack data from active client accounts.</h2>

          <div className="proof-layout">
            <div className="proof-data-card reveal">
              <div className="pdc-header">
                <div className="pdc-title">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="6.5" fill="#4285F4" /><path d="M6.5 3.5A3 3 0 1 0 9.5 6.5H6.5V4.8h3.7v.7a4.4 4.4 0 1 1-3.7-4.5V3.5z" fill="#fff" /></svg>
                  Single facility, FL — Months 1–9
                </div>
                <div className="pdc-source">GBP Insights</div>
              </div>
              <div className="pdc-kpi-row">
                <div className="pkpi">
                  <div className="pkpi-label">Map clicks</div>
                  <div className="pkpi-val">12.6K</div>
                  <div className="pkpi-delta">↑ 214% vs baseline</div>
                </div>
                <div className="pkpi">
                  <div className="pkpi-label">Avg. pack pos.</div>
                  <div className="pkpi-val">2.3</div>
                  <div className="pkpi-delta">Was 8.4 at start</div>
                </div>
                <div className="pkpi">
                  <div className="pkpi-label">Direction reqs.</div>
                  <div className="pkpi-val">2.4K</div>
                  <div className="pkpi-delta">↑ 167% vs baseline</div>
                </div>
              </div>
              <div className="pos-tracker">
                <div className="pos-label">Google Maps position — primary keywords</div>
                {[
                  { kw: "storage units near me", w: "97%", num: "#1", top: true, delay: 0 },
                  { kw: "self storage [city]", w: "92%", num: "#2", top: true, delay: 0.1 },
                  { kw: "climate controlled storage", w: "85%", num: "#3", top: false, delay: 0.2 },
                  { kw: "10x10 storage unit [zip]", w: "74%", num: "#4", top: false, delay: 0.3 },
                  { kw: "RV storage near [zip]", w: "60%", num: "#6", top: false, delay: 0.4 },
                ].map((row, i) => (
                  <div key={i} className="pos-row">
                    <div className="pos-kw">{row.kw}</div>
                    <div className="pos-track">
                      <div
                        className="pos-fill"
                        style={{ ["--w" as string]: row.w, animationDelay: `${row.delay}s` } as React.CSSProperties}
                      />
                    </div>
                    <div className={`pos-num${row.top ? " top1" : ""}`}>{row.num}</div>
                  </div>
                ))}
              </div>
              <div className="journey-chart">
                <div className="jc-label">Map pack impressions — month by month</div>
                <div className="jc-bars">
                  {[
                    { h: 14, cls: "" },
                    { h: 20, cls: "" },
                    { h: 26, cls: "" },
                    { h: 38, cls: "mid" },
                    { h: 46, cls: "mid" },
                    { h: 58, cls: "high" },
                    { h: 68, cls: "high" },
                    { h: 76, cls: "high" },
                    { h: 92, cls: "peak" },
                  ].map((b, i) => (
                    <div key={i} className={`jc-bar ${b.cls}`} style={{ height: `${b.h}%`, animationDelay: `${0.05 + i * 0.05}s` }} />
                  ))}
                </div>
                <div className="jc-months">
                  {["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9"].map((m) => <span key={m} className="jc-month">{m}</span>)}
                </div>
              </div>
            </div>

            <div className="proof-right">
              <div className="agg-grid reveal">
                <div className="agg-card">
                  <div className="agg-num">2.3</div>
                  <div className="agg-label">Avg. map pack position at month 6</div>
                  <div className="agg-note">Was 8.4 at engagement start</div>
                </div>
                <div className="agg-card">
                  <div className="agg-num">94<span>%</span></div>
                  <div className="agg-label">Clients ranking in top 3 by month 6</div>
                  <div className="agg-note">Across all primary keywords</div>
                </div>
                <div className="agg-card">
                  <div className="agg-num">50<span>+</span></div>
                  <div className="agg-label">Local citations per facility</div>
                  <div className="agg-note">Storage-specific databases included</div>
                </div>
                <div className="agg-card">
                  <div className="agg-num">$0</div>
                  <div className="agg-label">Cost per map pack lead, month 6+</div>
                  <div className="agg-note">Across all active clients</div>
                </div>
              </div>

              <div className="testimonial-card reveal">
                <div className="test-quote">&ldquo;Helped Pickfords in the UK rank their independent facilities across 33 states. The map pack work moved the needle within the first quarter — direction requests started landing before we had even finished the citation cleanup.&rdquo;</div>
                <div className="test-attr"><span className="test-facility">Independent storage facility owner</span> — Florida</div>
              </div>

              <div className="proof-audit-cta reveal">
                <div className="pac-label">Your facility could look like this</div>
                <div className="pac-text">We connect your GBP, GA4, and GSC in the first week. You see your own ranking and conversion data in the same dashboard format above.</div>
                <div className="pac-features">
                  <div className="pac-feat">Map pack gap analysis in week one</div>
                  <div className="pac-feat">Trade-area competitor ranking baseline</div>
                  <div className="pac-feat">Citation and NAP consistency audit</div>
                  <div className="pac-feat">No sales call required to receive the audit</div>
                </div>
                <a href="/contact" className="btn-pac">Request your free audit →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section alt" id="faq">
        <div className="inner">
          <div className="faq-layout">
            <div className="faq-aside">
              <div className="pill">Common questions</div>
              <h2 className="section-h2">Before you hire a Local SEO partner.</h2>
              <p className="section-lead" style={{ marginBottom: 0 }}>If your question is not here, reach out directly. We answer before you commit to anything.</p>
              <div className="faq-aside-cta">
                <div className="fac-text"><strong>Still weighing it up? Talk to us first.</strong>We will review your current map pack rankings, point out the biggest gap, and tell you honestly whether Local SEO is the right move for your facility right now.</div>
                <a href="/contact" className="btn-fac">Request a free conversation →</a>
              </div>
            </div>
            <div className="faq-list">
              {faqs.map((f, i) => (
                <div key={i} className={`faq-item${f.open ? " open" : ""}`}>
                  <div className="faq-q">{f.q} <span className="faq-toggle">+</span></div>
                  <div className="faq-a">{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta" id="audit">
        <div className="inner">
          <h2 className="final-h2">Ready to take the top three<br />of the map in your trade area?</h2>
          <p className="final-lead">Request a free local visibility audit. We review your GBP, citations, and current map pack position, then deliver a written report within five business days.</p>
          <div className="final-actions">
            <a href="/contact" className="btn-final">
              Claim my local audit
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <a href="#proof" className="btn-final-ghost">See ranking data first</a>
          </div>
          <div className="final-reassurance">
            <div className="fr-item">Free, no obligation</div>
            <div className="fr-item">Written report in 5 business days</div>
            <div className="fr-item">No sales call required</div>
            <div className="fr-item">Yours to keep regardless</div>
          </div>
        </div>
      </section>

      <V2Footer />
    </div>
  );
}
