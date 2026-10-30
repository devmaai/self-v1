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
  const VH = 300;
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

  const faqItems: Array<{ q: string; a: string; open?: boolean }> = [
    { q: "How long before I see results from SEO?", a: "Most clients see ranking movement within the first 30 days as we fix technical issues and complete the GBP optimisation. Meaningful traffic and lead increases typically appear between months two and four. Move-in volume tied directly to organic search becomes measurable by month five or six. The exact timeline depends on your starting position and how competitive your local market is.", open: true },
    { q: "Do I need to change my existing website?", a: "In most cases, no. We work on top of your existing site, implementing technical fixes and adding content pages. If your current platform has fundamental limitations that prevent SEO progress, we will identify this clearly in the audit and explain the options. We will not recommend a rebuild unless the data supports it." },
    { q: "What does the free audit actually include?", a: "The audit covers: technical site health, GBP completeness and gap analysis, current keyword rankings and map pack position, competitor landscape in your trade area, content gaps, and backlink profile. You receive a written report with prioritised recommendations. You keep the report whether you engage with us or not." },
    { q: "How does reporting connect to my actual bookings?", a: "We connect your GA4 account to track reservation form completions and phone call events as conversions from week one. Monthly reports show which search terms and pages drove those conversion events. You see which ranking improvements translate into actual enquiries and move-ins, not just traffic numbers." },
    { q: "Is there a minimum contract length?", a: "The first 90 days are a fixed onboarding period. After that, the programme runs month-to-month. You can pause or exit with 30 days notice at any point after the initial period." },
    { q: "Do you work with multi-location operators?", a: "Yes. The Growth Portfolio and Regional Scale programmes are specifically designed for operators running two to five or six-plus facilities. Each location gets its own targeted programme to avoid internal cannibalisation, where one of your own facilities competes against another in the same search results." },
  ];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="v2-home agency-brand">
        <V2Interactions />
        <V2Nav variant="home" />

        <section className="hero hero-agency">
          <div className="hero-inner">
            <div className="hero-top">
              <div>
                <h1 className="hero-h1">
                  We rank your local self storage units<br />
                  <em className="hero-h1-line">in the top three positions.</em>
                </h1>
                <div className="hero-cta-row">
                  <a href="/contact" className="btn-hero btn-hero-lg">
                    Contact us
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </a>
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
            <h2 className="section-h2">Why your storage unit is not visible on Google</h2>

            <div className="problem-layout problem-layout-agency">
              <div className="problem-right">
                <div className="problem-card reveal">
                  <div className="problem-card-num">Problem 01</div>
                  <div className="problem-card-title">Your Google Business Profile is not optimised for storage searches</div>
                  <div className="problem-card-desc">Missing service categories, incomplete coverage areas, and outdated photos give Google fewer signals to rank your listing above competitors. The map pack goes to whoever has the most complete and active profile.</div>
                </div>
                <div className="problem-card reveal">
                  <div className="problem-card-num">Problem 02</div>
                  <div className="problem-card-title">Your website does not target the terms renters actually search</div>
                  <div className="problem-card-desc">Pages without unit-size terms, zip code content, or neighbourhood-specific copy miss the searches that convert. Renters searching for &ldquo;10x10 storage unit 78201&rdquo; will not find a generic homepage.</div>
                </div>
                <div className="problem-card reveal">
                  <div className="problem-card-num">Problem 03</div>
                  <div className="problem-card-title">Technical issues prevent Google from crawling and ranking your pages</div>
                  <div className="problem-card-desc">Slow load times on mobile, missing schema markup, and crawl errors keep your pages suppressed regardless of how good your content is. A site that does not load in under 2 seconds loses both rankings and reservations.</div>
                </div>
                <div className="problem-card reveal">
                  <div className="problem-card-num">Problem 04</div>
                  <div className="problem-card-title">Your website and Google Business Profile are not optimized for AI search</div>
                  <div className="problem-card-desc">Renters now ask ChatGPT, Perplexity and Google AI Overviews where to find storage. Without structured data, clear answers and consistent business details, AI tools have nothing to cite, so your facility is left out of their recommendations.</div>
                </div>
              </div>

              <div>
                <div className="cost-visual reveal">
                  <div className="cost-title">What you are paying per move-in today</div>
                  <div className="cost-sub">Estimated for a typical single facility</div>
                  <div className="cost-rows">
                    <div className="cost-row">
                      <div className="cost-row-top"><span className="cost-label">Paid ads (Google Local Services)</span><span className="cost-val r">$85–$140 <small>per lead</small></span></div>
                      <div className="cost-track"><div className="cost-bar r" style={{ left: "61%", width: "39%" }}></div></div>
                    </div>
                    <div className="cost-row">
                      <div className="cost-row-top"><span className="cost-label">Listing platform cut</span><span className="cost-val a">$60–$110 <small>per move-in</small></span></div>
                      <div className="cost-track"><div className="cost-bar a" style={{ left: "43%", width: "36%" }}></div></div>
                    </div>
                    <div className="cost-row">
                      <div className="cost-row-top"><span className="cost-label">Pay-per-lead directory</span><span className="cost-val a">$40–$80 <small>per inquiry</small></span></div>
                      <div className="cost-track"><div className="cost-bar a" style={{ left: "29%", width: "28%" }}></div></div>
                    </div>
                  </div>
                  <div className="cost-organic">
                    <div className="cost-organic-dot"></div>
                    <div>
                      <div className="cost-organic-label">Organic search, after your SEO programme</div>
                      <div className="cost-organic-val">$0 per lead</div>
                    </div>
                  </div>
                </div>

                <div className="inline-cta inline-cta-rust reveal">
                  <div className="inline-cta-text">
                    <strong>Rank in the top three positions of Google and AI search</strong>
                    Talk to us about moving your facility into the top three.
                  </div>
                  <a href="/contact" className="btn-inline">Contact us →</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section services-agency" id="services">
          <div className="inner">
            <div className="pill">What we do</div>
            <h2 className="section-h2">Steps to rank your self storage unit in SEO and AEO</h2>
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
              </div>

              <div className="proof-right">
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
            </div>
          </div>
        </section>

        <section className="page-section" id="pricing">
          <div className="inner">
            <div className="pill">Pricing</div>
            <h2 className="section-h2">Three programmes. Month-to-month<br />after the first ninety days.</h2>
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
            <div className="pricing-cta-row reveal">
              <a href="/contact" className="btn-hero btn-hero-lg">
                Contact us
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
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
                {faqItems.map((f, i) => (
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
            <div className="final-actions">
              <a href="/audit" className="btn-final">
                Request a free audit
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </div>
            <div className="final-reassurance">
              <div className="fr-item">Free, no obligation</div>
              <div className="fr-item">Written report in 5 business days</div>
              <div className="fr-item">No sales call required</div>
            </div>
          </div>
        </section>

        <section className="backlink-cta" id="backlinks">
          <div className="inner">
            <h2 className="backlink-h2">Want a backlink from SelfStorage.help?</h2>
            <a href="/contact" className="btn-backlink">Request a backlink →</a>
          </div>
        </section>

        <V2Footer blogColumn />
      </div>
    </>
  );
}
