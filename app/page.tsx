import Hero from "@/components/sections/Hero";
import MarqueeBanner from "@/components/sections/MarqueeBanner";
import Problem from "@/components/sections/Problem";
import Services from "@/components/sections/Services";
import CardGrid from "@/components/sections/CardGrid";
import { LocalSeoVisual, TechnicalSeoVisual, MultiLocationVisual } from "@/components/sections/ProgramCardVisuals";
import Process from "@/components/sections/Process";
import VideoPlaceholder from "@/components/sections/VideoPlaceholder";
import GscPerformance from "@/components/sections/GscPerformance";
import Results from "@/components/sections/Results";
import Testimonial from "@/components/sections/Testimonial";
import Operators from "@/components/sections/Operators";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import CTABanner from "@/components/sections/CTABanner";
import Image from "next/image";
import V2Interactions from "@/components/v2/V2Interactions";
import V2ServicesDrawer from "@/components/v2/V2ServicesDrawer";
import V2Nav from "@/components/v2/V2Nav";
import V2Footer from "@/components/v2/V2Footer";

// Real Visibility Index data — daily readings (08.05 → 02.06)
const VISIBILITY_INDEX = [
  { d: "08.05", v: 12 },
  { d: "09.05", v: 68 },
  { d: "11.05", v: 68 },
  { d: "12.05", v: 69 },
  { d: "13.05", v: 73 },
  { d: "14.05", v: 74 },
  { d: "15.05", v: 75 },
  { d: "16.05", v: 79 },
  { d: "17.05", v: 74 },
  { d: "18.05", v: 76 },
  { d: "19.05", v: 56 },
  { d: "20.05", v: 76 },
  { d: "21.05", v: 60 },
  { d: "22.05", v: 64 },
  { d: "24.05", v: 75 },
  { d: "25.05", v: 69 },
  { d: "26.05", v: 69 },
  { d: "27.05", v: 69 },
  { d: "28.05", v: 73 },
  { d: "29.05", v: 67 },
  { d: "30.05", v: 69 },
  { d: "31.05", v: 73 },
  { d: "01.06", v: 72 },
  { d: "02.06", v: 79 },
];

export default function HomePage() {
  // Visibility Index line-chart geometry (SVG user units)
  const viMax = 80;
  const VW = 820;
  const VH = 180;
  const mL = 30;
  const mR = 14;
  const mT = 12;
  const mB = 40;
  const viX = (i: number) => mL + (i / (VISIBILITY_INDEX.length - 1)) * (VW - mL - mR);
  const viY = (val: number) => mT + (1 - val / viMax) * (VH - mT - mB);
  const viLine = VISIBILITY_INDEX.map((p, i) => `${viX(i).toFixed(1)},${viY(p.v).toFixed(1)}`).join(" ");
  const viTicks = [0, 40, 80];
  const viFirst = VISIBILITY_INDEX[0].v;
  const viLast = VISIBILITY_INDEX[VISIBILITY_INDEX.length - 1].v;

  return (
    <>
      <div className="v1-home">
        <Hero />
        <MarqueeBanner />
        <Problem />
        <Services />

        <CardGrid
          variant="warm"
          cols={3}
          label="Explore our services"
          headline={<>Three programs. One outcome: <em>More Move-ins</em>.</>}
          cards={[
            {
              eyebrow: "Local Search",
              title: "Local SEO & GBP",
              body: "Own the map pack and Google Maps results in your trade area.",
              href: "/services/local-seo-gbp-optimization",
              ctaLabel: "Learn more",
              visual: <LocalSeoVisual />,
            },
            {
              eyebrow: "Site Performance",
              title: "Technical SEO",
              body: "Fast, crawlable sites that load on mobile and convert reservations.",
              href: "/services/technical-seo",
              ctaLabel: "Learn more",
              visual: <TechnicalSeoVisual />,
            },
            {
              eyebrow: "Portfolio Growth",
              title: "Multi-Location SEO",
              body: "Scale local visibility across every facility without internal cannibalization.",
              href: "/services/multi-location-seo",
              ctaLabel: "Learn more",
              visual: <MultiLocationVisual />,
            },
          ]}
        />

        <div className="visibility-image-section">
          <div className="container">
            <Image
              src="/images/visibility-metrics.png"
              alt="Visibility - Search Impressions, Maps Impressions, Clicks metrics"
              width={1344}
              height={240}
              quality={90}
              priority
            />
          </div>
        </div>

        <GscPerformance />

        <Process />
        <VideoPlaceholder />
        <Results />
        <Testimonial />

        <Operators />

        <Pricing />
        <FAQ label="" />
        <CTABanner />
      </div>

      <div className="v2-home">
        <V2Interactions />
        <V2Nav variant="home" />

        <section className="hero">
          <div className="hero-inner">
            <div className="hero-top">
              <div>
                <div className="hero-badge">
                  <span className="hero-badge-dot"></span>
                  Specialist SEO for self-storage operators
                </div>
                <h1 className="hero-h1">
                  Your storage facility should rank<br />
                  where <em>local renters search.</em>
                </h1>
                <p className="hero-lead">
                  Independent self-storage operators lose move-ins every day to bigger chains and listing platforms that charge them per lead. We specialise in SEO &amp; AEO for self-storage business owners and fix the organic search gap so renters find your storage facility first.
                </p>
                <div className="hero-cta-row">
                  <a href="/audit" className="btn-hero">
                    Get your free site audit
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </a>
                  <a href="#proof" className="btn-hero-ghost">See ranking data →</a>
                </div>
              </div>

              <div className="hero-dashboard reveal">
                <div className="dash-topbar">
                  <div className="dash-title">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="6.5" fill="#4285F4" /><path d="M6.5 3.5A3 3 0 1 0 9.5 6.5H6.5V4.8h3.7v.7a4.4 4.4 0 1 1-3.7-4.5V3.5z" fill="#fff" /></svg>
                    Search Console — Live data
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div className="dash-live"><span className="dash-live-dot"></span> Connected</div>
                    <div className="dash-period">Last 90 days</div>
                  </div>
                </div>
                <div className="dash-metrics">
                  <div className="dm">
                    <div className="dm-label">Impressions</div>
                    <div className="dm-val">9.25M</div>
                    <div className="dm-delta flat">Storage search demand</div>
                  </div>
                  <div className="dm">
                    <div className="dm-label">Clicks</div>
                    <div className="dm-val">43.3K</div>
                    <div className="dm-delta flat">Organic site visits</div>
                  </div>
                  <div className="dm">
                    <div className="dm-label">Avg. CTR</div>
                    <div className="dm-val">0.5%</div>
                    <div className="dm-delta flat">Clicks per impression</div>
                  </div>
                </div>
                <div className="dash-chart">
                  <div className="dash-chart-label">Visibility Index — daily, last 24 days</div>
                  <div className="sparkline">
                    {VISIBILITY_INDEX.map(({ v }, i) => (
                      <div
                        key={i}
                        className={`spark-bar${v >= 74 ? " high" : ""}${i === VISIBILITY_INDEX.length - 1 ? " hi" : ""}`}
                        style={{ height: `${v}%`, animationDelay: `${i * 0.03}s` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="dash-rankings">
                  <div className="dash-rank-head">
                    <div className="drh">Top query</div>
                    <div className="drh" style={{ textAlign: "right" }}>Clicks</div>
                    <div className="drh" style={{ textAlign: "right" }}>Impressions</div>
                  </div>
                  {[
                    { kw: "self storage near me", clicks: 7, impr: "69,247" },
                    { kw: "self storage", clicks: 7, impr: "30,633" },
                    { kw: "furniture self storage", clicks: 0, impr: "17,285" },
                    { kw: "cheap self storage", clicks: 0, impr: "14,477" },
                    { kw: "self storage cost", clicks: 5, impr: "13,509" },
                  ].map((r) => (
                    <div key={r.kw} className="dash-rank-row">
                      <div className="dr-kw">{r.kw}</div>
                      <div className="dr-clk">{r.clicks}</div>
                      <div className="dr-impr">{r.impr}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...Array(2)].flatMap((_, dup) =>
              ["Local SEO","Google Maps Ranking","GBP Optimisation","Technical SEO","Location Pages","Citation Building","Content Writing","AEO & GEO","Backlink Building","Core Web Vitals","Review Strategy","SEO Reporting"].map((t, i) => (
                <span key={`${dup}-${i}`} className="marquee-item">{t}</span>
              ))
            )}
          </div>
        </div>

        <section className="page-section" id="challenge">
          <div className="inner">
            <div className="pill">Why organic search matters for storage</div>
            <h2 className="section-h2">Every week you are invisible on Google,<br />a renter chooses someone else.</h2>
            <p className="section-lead">Independent operators across the USA are losing ground to national chains and listing platforms that dominate the same searches their local customers run. Here is what that actually costs.</p>

            <div className="demand-band reveal">
              <div className="demand-stat">
                <div className="demand-num accent">619K</div>
                <div className="demand-text">Search impressions one storage site earned for self-storage queries in 12 months. The demand is already there.</div>
              </div>
              <div className="demand-stat">
                <div className="demand-num warn">39.8</div>
                <div className="demand-text">Its average Google position. Buried on page four, where almost no renter ever looks.</div>
              </div>
              <div className="demand-stat">
                <div className="demand-num warn">0.1%</div>
                <div className="demand-text">Share of that demand it actually turned into clicks. Nearly all of it went to someone else.</div>
              </div>
            </div>

            <div className="problem-layout">
              <div className="problem-right">
                <div className="problem-card reveal">
                  <div className="problem-card-num">Problem 01</div>
                  <div className="problem-card-title">Your Google Business Profile is not optimised for storage searches</div>
                  <div className="problem-card-desc">Missing service categories, incomplete coverage areas, and outdated photos give Google fewer signals to rank your listing above competitors. The map pack goes to whoever has the most complete and active profile.</div>
                  <div className="problem-card-tag">GBP · Citations · NAP consistency</div>
                </div>
                <div className="problem-card reveal">
                  <div className="problem-card-num">Problem 02</div>
                  <div className="problem-card-title">Your website does not target the terms renters actually search</div>
                  <div className="problem-card-desc">Pages without unit-size terms, zip code content, or neighbourhood-specific copy miss the searches that convert. Renters searching for &ldquo;10x10 storage unit 78201&rdquo; will not find a generic homepage.</div>
                  <div className="problem-card-tag">Content · Location pages · Unit-size pages</div>
                </div>
                <div className="problem-card reveal">
                  <div className="problem-card-num">Problem 03</div>
                  <div className="problem-card-title">Technical issues prevent Google from crawling and ranking your pages</div>
                  <div className="problem-card-desc">Slow load times on mobile, missing schema markup, and crawl errors keep your pages suppressed regardless of how good your content is. A site that does not load in under 2 seconds loses both rankings and reservations.</div>
                  <div className="problem-card-tag">Core Web Vitals · Schema · Speed</div>
                </div>
              </div>

              <div>
                <div className="problem-visual reveal" style={{ marginBottom: 16 }}>
                  <div className="pv-header">
                    <div className="pv-title">What you are paying per move-in today</div>
                    <div className="pv-sub">Estimated for a typical single facility</div>
                  </div>
                  <div className="pv-rows">
                    <div className="pv-row">
                      <div className="pv-row-label"><span className="pv-row-icon r"></span>Paid ads (Google Local Services)</div>
                      <div className="pv-row-val red">$85–$140 / lead</div>
                    </div>
                    <div className="pv-row">
                      <div className="pv-row-label"><span className="pv-row-icon a"></span>Listing platform cut (aggregator)</div>
                      <div className="pv-row-val red">$60–$110 / move-in</div>
                    </div>
                    <div className="pv-row">
                      <div className="pv-row-label"><span className="pv-row-icon a"></span>Pay-per-lead directory</div>
                      <div className="pv-row-val red">$40–$80 / inquiry</div>
                    </div>
                    <div className="pv-row">
                      <div className="pv-row-label"><span className="pv-row-icon g"></span>Organic search (after SEO programme)</div>
                      <div className="pv-row-val green">$0 / lead</div>
                    </div>
                  </div>
                  <div className="pv-total">
                    <div className="pv-total-label">Your organic cost per lead at month 6</div>
                    <div className="pv-total-val">$0.00</div>
                  </div>
                </div>

                <div className="inline-cta reveal">
                  <div className="inline-cta-text">
                    <strong>See what you are losing each month</strong>
                    Get a free audit. We map your gaps and show you exactly what it would take to rank.
                  </div>
                  <a href="/audit" className="btn-inline">Get free audit →</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section alt" id="services">
          <div className="inner">
            <div className="pill">What we do</div>
            <h2 className="section-h2">Six services. All built specifically<br />for self-storage operators.</h2>
            <p className="section-lead">We do not do generic SEO. Our activities are tailored for real estate owners, especially focused on growing the business for self-storage business owners.</p>
            <V2ServicesDrawer />
          </div>
        </section>

        <section className="page-section" id="proof">
          <div className="inner">
            <div className="pill">Verified results</div>
            <h2 className="section-h2">Data from active client accounts.</h2>

            <div className="proof-layout">
              <div className="proof-left">
                <div className="proof-data-card reveal">
                <div className="pdc-header">
                  <div className="pdc-title">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="6.5" fill="#4285F4" /><path d="M6.5 3.5A3 3 0 1 0 9.5 6.5H6.5V4.8h3.7v.7a4.4 4.4 0 1 1-3.7-4.5V3.5z" fill="#fff" /></svg>
                    Search Console — Pickfords
                  </div>
                  <div className="pdc-source">Last 12 months</div>
                </div>
                <div className="pdc-kpi-row">
                  <div className="pkpi">
                    <div className="pkpi-label">Organic clicks</div>
                    <div className="pkpi-val">185K</div>
                    <div className="pkpi-delta flat">Last 12 months</div>
                  </div>
                  <div className="pkpi">
                    <div className="pkpi-label">Impressions</div>
                    <div className="pkpi-val">36.1M</div>
                    <div className="pkpi-delta flat">Self-storage demand</div>
                  </div>
                  <div className="pkpi">
                    <div className="pkpi-label">Avg. position</div>
                    <div className="pkpi-val">18.3</div>
                    <div className="pkpi-delta flat">Across tracked queries</div>
                  </div>
                </div>
                <div className="pos-tracker">
                  <div className="pos-label">Top self-storage queries — by impressions</div>
                  {[
                    { kw: "self storage near me", w: "100%", num: "69,247", delay: 0 },
                    { kw: "self storage", w: "44%", num: "30,633", delay: 0.1 },
                    { kw: "furniture self storage", w: "25%", num: "17,285", delay: 0.2 },
                    { kw: "cheap self storage", w: "21%", num: "14,477", delay: 0.3 },
                    { kw: "self storage cost", w: "20%", num: "13,509", delay: 0.4 },
                  ].map((row, i) => (
                    <div key={i} className="pos-row">
                      <div className="pos-kw">{row.kw}</div>
                      <div className="pos-track">
                        <div
                          className="pos-fill"
                          style={{ ["--w" as string]: row.w, animationDelay: `${row.delay}s` } as React.CSSProperties}
                        />
                      </div>
                      <div className="pos-num val">{row.num}</div>
                    </div>
                  ))}
                </div>
                <div className="journey-chart">
                  <div className="jc-label">Organic clicks — month by month</div>
                  <div className="jc-bars">
                    {[
                      { h: 12, cls: "" },
                      { h: 18, cls: "" },
                      { h: 22, cls: "" },
                      { h: 34, cls: "mid" },
                      { h: 42, cls: "mid" },
                      { h: 55, cls: "high" },
                      { h: 64, cls: "high" },
                      { h: 72, cls: "high" },
                      { h: 88, cls: "peak" },
                    ].map((b, i) => (
                      <div key={i} className={`jc-bar ${b.cls}`} style={{ height: `${b.h}%`, animationDelay: `${0.05 + i * 0.05}s` }} />
                    ))}
                  </div>
                  <div className="jc-months">
                    {["M1","M2","M3","M4","M5","M6","M7","M8","M9"].map((m) => <span key={m} className="jc-month">{m}</span>)}
                  </div>
                </div>
                </div>

                <div className="vi-card reveal">
                  <div className="vi-head">
                    <div className="vi-head-main">
                      <div className="vi-title">Visibility Index — onboarding ramp</div>
                      <div className="vi-value">
                        <span className="vi-from">{viFirst}</span>
                        <span className="vi-arrow">→</span>
                        {viLast}
                      </div>
                    </div>
                    <span className="vi-trend-up">↑ {viLast - viFirst} pts in {VISIBILITY_INDEX.length} days</span>
                  </div>
                  <div className="vi-chart">
                    <svg viewBox={`0 0 ${VW} ${VH}`} role="img" aria-label={`Visibility Index trend from ${viFirst} to ${viLast}`}>
                      {viTicks.map((t) => (
                        <g key={t}>
                          <line className="vi-grid" x1={mL} y1={viY(t)} x2={VW - mR} y2={viY(t)} />
                          <text className="vi-axis" x={mL - 8} y={viY(t) + 3} textAnchor="end">{t}</text>
                        </g>
                      ))}
                      <polyline className="vi-line" points={viLine} fill="none" />
                      {VISIBILITY_INDEX.map((p, i) => (
                        <circle
                          key={p.d}
                          className="vi-dot"
                          cx={viX(i)}
                          cy={viY(p.v)}
                          r={2.4}
                          style={{ animationDelay: `${0.5 + i * 0.045}s` }}
                        />
                      ))}
                      {VISIBILITY_INDEX.map((p, i) =>
                        i % 4 === 0 || i === VISIBILITY_INDEX.length - 1 ? (
                          <text
                            key={p.d}
                            className="vi-axis"
                            x={viX(i)}
                            y={VH - mB + 18}
                            textAnchor="middle"
                          >
                            {p.d}
                          </text>
                        ) : null
                      )}
                    </svg>
                  </div>
                </div>
              </div>

              <div className="proof-right">
                <div className="agg-grid reveal">
                  <div className="agg-card">
                    <div className="agg-num">94<span>%</span></div>
                    <div className="agg-label">Client renewal at year two</div>
                    <div className="agg-note">All engagements since 2025</div>
                  </div>
                  <div className="agg-card">
                    <div className="agg-num">34</div>
                    <div className="agg-label">Facilities in active programme</div>
                    <div className="agg-note">Single and multi-location</div>
                  </div>
                  <div className="agg-card">
                    <div className="agg-num">4.1</div>
                    <div className="agg-label">Avg. map pack position at month 6</div>
                    <div className="agg-note">Was 14.7 at engagement start</div>
                  </div>
                  <div className="agg-card">
                    <div className="agg-num">$0</div>
                    <div className="agg-label">Organic cost per lead, month 6+</div>
                    <div className="agg-note">Across all active clients</div>
                  </div>
                </div>

                <div className="proof-audit-cta reveal">
                  <div className="pac-label">Your facility could look like this</div>
                  <div className="pac-text">We connect your GSC and GA4 in the first week. You see your own data in the same dashboard format above.</div>
                  <div className="pac-features">
                    <div className="pac-feat">Full technical audit delivered in week one</div>
                    <div className="pac-feat">GBP and map pack gap analysis included</div>
                    <div className="pac-feat">Keyword ranking baseline report</div>
                    <div className="pac-feat">No sales call required to receive the audit</div>
                  </div>
                  <a href="/audit" className="btn-pac">Request your free audit →</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section alt" id="process">
          <div className="inner">
            <div className="pill">How it works</div>
            <h2 className="section-h2">Four phases. Ninety days to<br />measurable ranking lift.</h2>
            <p className="section-lead">No six-month setup period. Quick wins are prioritised in week one while the long-term foundation is built in parallel. Rankings begin moving before the first reporting call.</p>
            <div className="process-steps">
              {[
                { phase: "Phase 01", days: "Days 1 – 7", title: "Audit", desc: "Full technical and content audit of your site, GBP, reviews, and competitor landscape. We connect your GA4 and GSC accounts and deliver a written report with prioritised fixes.", out: "✓ Delivered week 1", active: true },
                { phase: "Phase 02", days: "Days 8 – 30", title: "Foundation", desc: "Indexation fixes, schema implementation, citation building, and GBP optimisation. This is where most storage sites double their search visibility. Review automation rolls out in months two and three.", out: "✓ Rankings start moving", active: false },
                { phase: "Phase 03", days: "Days 31 – 60", title: "Scale", desc: "Location pages, unit-size content, link earning, and review velocity campaigns. Rankings compound as content depth and domain authority grow together across your target service area.", out: "✓ Organic leads increasing", active: false },
                { phase: "Phase 04", days: "Days 61 – 90+", title: "Measure", desc: "Monthly reports connect every ranking position to move-in volume via your GA4 data. We adjust the programme based on what the numbers show. Reporting is tied directly to your accounts.", out: "✓ Monthly reporting call", active: false },
              ].map((s, i) => (
                <div key={i} className={`pstep${s.active ? " active" : ""} reveal`}>
                  <div className="pstep-accent"></div>
                  <div className="pstep-phase">{s.phase}</div>
                  <div className="pstep-days">{s.days}</div>
                  <div className="pstep-title">{s.title}</div>
                  <div className="pstep-desc">{s.desc}</div>
                  <div className="pstep-output">{s.out}</div>
                </div>
              ))}
            </div>
            <div className="process-cta-row reveal">
              <div className="pct-text"><strong>Ready to see what phase one finds in your site?</strong> The audit is free and delivered in writing within five business days.</div>
              <a href="/audit" className="btn-pct">Start with a free audit →</a>
            </div>
          </div>
        </section>

        <section className="page-section" id="pricing">
          <div className="inner">
            <div className="pill">Pricing</div>
            <h2 className="section-h2">Three programmes. Month-to-month<br />after the first ninety days.</h2>
            <p className="section-lead">No long-term contracts. No setup fees. Pause or adjust as your portfolio changes. The first ninety days are a fixed onboarding period so we can build the foundation properly.</p>
            <div className="pricing-grid">
              <div className="pricing-card reveal">
                <div className="pc-head">
                  <div className="pc-tier">Single Facility</div>
                  <div className="pc-for">For one-location operators</div>
                  <div className="pc-price">$1,450 <sub>/ month</sub></div>
                </div>
                <ul className="pc-features">
                  <li className="pc-feat">Complete technical SEO audit</li>
                  <li className="pc-feat">Google Business Profile optimisation</li>
                  <li className="pc-feat">One primary location landing page</li>
                  <li className="pc-feat">Monthly content — two pieces</li>
                  <li className="pc-feat">Review automation setup</li>
                  <li className="pc-feat">Monthly GA4 and GSC reporting call</li>
                </ul>
                <div className="pc-cta"><a href="/audit" className="pc-btn">Start with Single →</a></div>
              </div>
              <div className="pricing-card featured reveal">
                <div className="pc-head">
                  <div className="pc-badge">Most common</div>
                  <div className="pc-tier">Growth Portfolio</div>
                  <div className="pc-for">For two to five facilities</div>
                  <div className="pc-price">$2,950 <sub>/ month</sub></div>
                </div>
                <ul className="pc-features">
                  <li className="pc-feat">Everything in Single Facility</li>
                  <li className="pc-feat">Location landing page per facility</li>
                  <li className="pc-feat">Unit-size and type sub-pages</li>
                  <li className="pc-feat">Monthly content — four pieces</li>
                  <li className="pc-feat">Local citation building</li>
                  <li className="pc-feat">Dedicated SEO lead on your account</li>
                  <li className="pc-feat">Quarterly strategy review</li>
                </ul>
                <div className="pc-cta"><a href="/audit" className="pc-btn primary">Start with Growth →</a></div>
              </div>
              <div className="pricing-card reveal">
                <div className="pc-head">
                  <div className="pc-tier">Regional Scale</div>
                  <div className="pc-for">For six-plus facilities</div>
                  <div className="pc-price">$5,200 <sub>/ month</sub></div>
                </div>
                <ul className="pc-features">
                  <li className="pc-feat">Everything in Growth Portfolio</li>
                  <li className="pc-feat">Custom content calendar</li>
                  <li className="pc-feat">Competitor gap analysis quarterly</li>
                  <li className="pc-feat">Link earning campaigns</li>
                  <li className="pc-feat">Dedicated project manager</li>
                  <li className="pc-feat">Weekly reporting dashboard access</li>
                  <li className="pc-feat">Priority response SLA</li>
                </ul>
                <div className="pc-cta"><a href="/audit" className="pc-btn">Talk to us →</a></div>
              </div>
            </div>
            <div className="pricing-guarantee reveal">
              <div className="pg-icon">✓</div>
              <div className="pg-text"><span>No long-term contracts.</span> Month-to-month after the first 90-day onboarding period. Exit with 30 days notice at any point.</div>
            </div>
          </div>
        </section>

        <section className="page-section alt" id="faq">
          <div className="inner">
            <div className="faq-layout">
              <div className="faq-aside">
                <div className="pill">Common questions</div>
                <h2 className="section-h2">Questions operators ask before starting.</h2>
                <p className="section-lead" style={{ marginBottom: 0 }}>If your question is not here, reach out directly. We answer before you commit to anything.</p>
                <div className="faq-aside-cta">
                  <div className="fac-text"><strong>Still not sure? Talk to us first.</strong>We will answer your questions, review your current rankings, and tell you honestly whether SEO makes sense for your facility right now.</div>
                  <a href="/audit" className="btn-fac">Request a free conversation →</a>
                </div>
              </div>
              <div className="faq-list">
                {[
                  { q: "How long before I see results from SEO?", a: "Most clients see ranking movement within the first 30 days as we fix technical issues and complete the GBP optimisation. Meaningful traffic and lead increases typically appear between months two and four. Move-in volume tied directly to organic search becomes measurable by month five or six. The exact timeline depends on your starting position and how competitive your local market is.", open: true },
                  { q: "Do I need to change my existing website?", a: "In most cases, no. We work on top of your existing site, implementing technical fixes and adding content pages. If your current platform has fundamental limitations that prevent SEO progress, we will identify this clearly in the audit and explain the options. We will not recommend a rebuild unless the data supports it." },
                  { q: "What does the free audit actually include?", a: "The audit covers: technical site health, GBP completeness and gap analysis, current keyword rankings and map pack position, competitor landscape in your trade area, content gaps, and backlink profile. You receive a written report with prioritised recommendations. You keep the report whether you engage with us or not." },
                  { q: "How does reporting connect to my actual bookings?", a: "We connect your GA4 account to track reservation form completions and phone call events as conversions from week one. Monthly reports show which search terms and pages drove those conversion events. You see which ranking improvements translate into actual enquiries and move-ins, not just traffic numbers." },
                  { q: "Is there a minimum contract length?", a: "The first 90 days are a fixed onboarding period. After that, the programme runs month-to-month. You can pause or exit with 30 days notice at any point after the initial period." },
                  { q: "Do you work with multi-location operators?", a: "Yes. The Growth Portfolio and Regional Scale programmes are specifically designed for operators running two to five or six-plus facilities. Each location gets its own targeted programme to avoid internal cannibalisation, where one of your own facilities competes against another in the same search results." },
                ].map((f, i) => (
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
            <h2 className="final-h2">Find out exactly where your facility<br />is losing organic search visibility.</h2>
            <p className="final-lead">Request a free audit. We review your site, GBP, and local rankings and deliver a written report within five business days. No sales call required to receive it.</p>
            <div className="final-actions">
              <a href="/audit" className="btn-final">
                Get my free audit
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
    </>
  );
}
