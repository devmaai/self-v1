import React from "react";
import V2Interactions from "@/components/v2/V2Interactions";
import V2Nav from "@/components/v2/V2Nav";
import V2Footer from "@/components/v2/V2Footer";

export type DashboardMetric = { label: string; value: string; delta: string };
export type DashboardRanking = { pos: string; kw: string; change: string; clicks: string; top?: boolean; isNew?: boolean };
export type ProblemCard = { num: string; title: string; desc: string; tag: string };
export type ApproachStep = { phase: string; title: string; desc: string; tags?: string[] };
export type PositionRow = { kw: string; w: string; num: string; top?: boolean };
export type JourneyBar = { h: number; cls?: "" | "mid" | "high" | "peak" };
export type AggCard = { num: React.ReactNode; label: string; note: string };
export type FaqItem = { q: string; a: string; open?: boolean };

export type V2ServicePageProps = {
  hero: {
    badge: string;
    title: React.ReactNode;
    lead: string;
    primaryCta: { label: string; href: string };
    ghostCta?: { label: string; href: string };
    dashboard: {
      title: string;
      tracking: string;
      period: string;
      metrics: [DashboardMetric, DashboardMetric, DashboardMetric];
      chartLabel: string;
      sparkline: number[];
      rankingsHeader?: { pos: string; kw: string; change: string; clicks: string };
      rankings: DashboardRanking[];
    };
  };
  marquee: string[];
  problem: {
    pill: string;
    headline: React.ReactNode;
    lead: string;
    cards: ProblemCard[];
    visual: {
      title: string;
      sub: string;
      rows: { label: string; value: string; tone: "r" | "a" | "g"; valueClass?: "red" | "green" }[];
      totalLabel: string;
      totalValue: string;
    };
    inlineCta: { strong: string; body: string; ctaLabel: string; ctaHref: string };
  };
  approach: {
    pill: string;
    headline: React.ReactNode;
    lead: string;
    steps: ApproachStep[];
    ctaText: React.ReactNode;
    ctaLabel: string;
    ctaHref: string;
  };
  proof: {
    pill: string;
    headline: string;
    dataCard: {
      title: string;
      source: string;
      kpis: [
        { label: string; value: string; delta: string },
        { label: string; value: string; delta: string },
        { label: string; value: string; delta: string }
      ];
      positionLabel: string;
      positions: PositionRow[];
      journeyLabel: string;
      bars: JourneyBar[];
      months: string[];
    };
    aggCards: AggCard[];
    testimonial: { quote: string; attribution: string; location: string };
    auditCta: {
      label: string;
      text: string;
      features: string[];
      ctaLabel: string;
      ctaHref: string;
    };
  };
  faq: {
    pill: string;
    headline: React.ReactNode;
    lead: string;
    asideStrong: string;
    asideBody: string;
    asideCtaLabel: string;
    asideCtaHref: string;
    items: FaqItem[];
  };
  finalCta: {
    headline: React.ReactNode;
    lead: string;
    primaryLabel: string;
    primaryHref: string;
    ghostLabel: string;
    reassurance: string[];
  };
};

export default function V2ServicePage({ hero, marquee, problem, approach, proof, faq, finalCta }: V2ServicePageProps) {
  const rh = hero.dashboard.rankingsHeader ?? { pos: "Pos.", kw: "Keyword", change: "Change", clicks: "Clicks" };
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
                {hero.badge}
              </div>
              <h1 className="hero-h1">{hero.title}</h1>
              <p className="hero-lead">{hero.lead}</p>
              <div className="hero-cta-row">
                <a href={hero.primaryCta.href} className="btn-hero">
                  {hero.primaryCta.label}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
                {hero.ghostCta && (
                  <a href={hero.ghostCta.href} className="btn-hero-ghost">{hero.ghostCta.label}</a>
                )}
              </div>
            </div>

            <div className="hero-dashboard reveal">
              <div className="dash-topbar">
                <div className="dash-title">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="6.5" fill="#4285F4" /><path d="M6.5 3.5A3 3 0 1 0 9.5 6.5H6.5V4.8h3.7v.7a4.4 4.4 0 1 1-3.7-4.5V3.5z" fill="#fff" /></svg>
                  {hero.dashboard.title}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div className="dash-live"><span className="dash-live-dot"></span> {hero.dashboard.tracking}</div>
                  <div className="dash-period">{hero.dashboard.period}</div>
                </div>
              </div>
              <div className="dash-metrics">
                {hero.dashboard.metrics.map((m, i) => (
                  <div key={i} className="dm">
                    <div className="dm-label">{m.label}</div>
                    <div className="dm-val">{m.value}</div>
                    <div className="dm-delta">{m.delta}</div>
                  </div>
                ))}
              </div>
              <div className="dash-chart">
                <div className="dash-chart-label">{hero.dashboard.chartLabel}</div>
                <div className="sparkline">
                  {hero.dashboard.sparkline.map((h, i) => (
                    <div
                      key={i}
                      className={`spark-bar${i >= hero.dashboard.sparkline.length - 4 && i < hero.dashboard.sparkline.length - 1 ? " high" : ""}${i === hero.dashboard.sparkline.length - 1 ? " hi" : ""}`}
                      style={{ height: `${h}%`, animationDelay: `${i * 0.04}s` }}
                    />
                  ))}
                </div>
              </div>
              <div className="dash-rankings">
                <div className="dash-rank-head">
                  <div className="drh">{rh.pos}</div>
                  <div className="drh">{rh.kw}</div>
                  <div className="drh" style={{ textAlign: "center" }}>{rh.change}</div>
                  <div className="drh" style={{ textAlign: "right" }}>{rh.clicks}</div>
                </div>
                {hero.dashboard.rankings.map((r, i) => (
                  <div key={i} className="dash-rank-row">
                    <div className={`dr-pos${r.top ? " p1" : ""}`}>{r.pos}</div>
                    <div className="dr-kw">{r.kw}</div>
                    <div className={`dr-change${r.isNew ? " new" : ""}`}>{r.change}</div>
                    <div className="dr-clicks">{r.clicks}</div>
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
            marquee.map((t, i) => <span key={`${dup}-${i}`} className="marquee-item">{t}</span>)
          )}
        </div>
      </div>

      <section className="page-section" id="challenge">
        <div className="inner">
          <div className="pill">{problem.pill}</div>
          <h2 className="section-h2">{problem.headline}</h2>
          <p className="section-lead">{problem.lead}</p>

          <div className="problem-layout">
            <div className="problem-right">
              {problem.cards.map((p) => (
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
                  <div className="pv-title">{problem.visual.title}</div>
                  <div className="pv-sub">{problem.visual.sub}</div>
                </div>
                <div className="pv-rows">
                  {problem.visual.rows.map((row, i) => (
                    <div key={i} className="pv-row">
                      <div className="pv-row-label"><span className={`pv-row-icon ${row.tone}`}></span>{row.label}</div>
                      <div className={`pv-row-val${row.valueClass ? ` ${row.valueClass}` : ""}`}>{row.value}</div>
                    </div>
                  ))}
                </div>
                <div className="pv-total">
                  <div className="pv-total-label">{problem.visual.totalLabel}</div>
                  <div className="pv-total-val">{problem.visual.totalValue}</div>
                </div>
              </div>

              <div className="inline-cta reveal">
                <div className="inline-cta-text">
                  <strong>{problem.inlineCta.strong}</strong>
                  {problem.inlineCta.body}
                </div>
                <a href={problem.inlineCta.ctaHref} className="btn-inline">{problem.inlineCta.ctaLabel}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section alt" id="process">
        <div className="inner">
          <div className="pill">{approach.pill}</div>
          <h2 className="section-h2">{approach.headline}</h2>
          <p className="section-lead">{approach.lead}</p>
          <div className="process-steps">
            {approach.steps.map((s, i) => (
              <div key={s.phase} className={`pstep${i === 0 ? " active" : ""} reveal`}>
                <div className="pstep-accent"></div>
                <div className="pstep-phase">{s.phase}</div>
                <div className="pstep-title">{s.title}</div>
                <div className="pstep-desc">{s.desc}</div>
                {s.tags && s.tags.length > 0 && (
                  <div className="svc-tags" style={{ marginTop: 8 }}>
                    {s.tags.map((t) => <span key={t} className="svc-tag">{t}</span>)}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="process-cta-row reveal">
            <div className="pct-text">{approach.ctaText}</div>
            <a href={approach.ctaHref} className="btn-pct">{approach.ctaLabel}</a>
          </div>
        </div>
      </section>

      <section className="page-section" id="proof">
        <div className="inner">
          <div className="pill">{proof.pill}</div>
          <h2 className="section-h2">{proof.headline}</h2>

          <div className="proof-layout">
            <div className="proof-data-card reveal">
              <div className="pdc-header">
                <div className="pdc-title">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="6.5" fill="#4285F4" /><path d="M6.5 3.5A3 3 0 1 0 9.5 6.5H6.5V4.8h3.7v.7a4.4 4.4 0 1 1-3.7-4.5V3.5z" fill="#fff" /></svg>
                  {proof.dataCard.title}
                </div>
                <div className="pdc-source">{proof.dataCard.source}</div>
              </div>
              <div className="pdc-kpi-row">
                {proof.dataCard.kpis.map((k, i) => (
                  <div key={i} className="pkpi">
                    <div className="pkpi-label">{k.label}</div>
                    <div className="pkpi-val">{k.value}</div>
                    <div className="pkpi-delta">{k.delta}</div>
                  </div>
                ))}
              </div>
              <div className="pos-tracker">
                <div className="pos-label">{proof.dataCard.positionLabel}</div>
                {proof.dataCard.positions.map((row, i) => (
                  <div key={i} className="pos-row">
                    <div className="pos-kw">{row.kw}</div>
                    <div className="pos-track">
                      <div
                        className="pos-fill"
                        style={{ ["--w" as string]: row.w, animationDelay: `${i * 0.1}s` } as React.CSSProperties}
                      />
                    </div>
                    <div className={`pos-num${row.top ? " top1" : ""}`}>{row.num}</div>
                  </div>
                ))}
              </div>
              <div className="journey-chart">
                <div className="jc-label">{proof.dataCard.journeyLabel}</div>
                <div className="jc-bars">
                  {proof.dataCard.bars.map((b, i) => (
                    <div key={i} className={`jc-bar ${b.cls ?? ""}`} style={{ height: `${b.h}%`, animationDelay: `${0.05 + i * 0.05}s` }} />
                  ))}
                </div>
                <div className="jc-months">
                  {proof.dataCard.months.map((m) => <span key={m} className="jc-month">{m}</span>)}
                </div>
              </div>
            </div>

            <div className="proof-right">
              <div className="agg-grid reveal">
                {proof.aggCards.map((a, i) => (
                  <div key={i} className="agg-card">
                    <div className="agg-num">{a.num}</div>
                    <div className="agg-label">{a.label}</div>
                    <div className="agg-note">{a.note}</div>
                  </div>
                ))}
              </div>

              <div className="testimonial-card reveal">
                <div className="test-quote">&ldquo;{proof.testimonial.quote}&rdquo;</div>
                <div className="test-attr"><span className="test-facility">{proof.testimonial.attribution}</span> — {proof.testimonial.location}</div>
              </div>

              <div className="proof-audit-cta reveal">
                <div className="pac-label">{proof.auditCta.label}</div>
                <div className="pac-text">{proof.auditCta.text}</div>
                <div className="pac-features">
                  {proof.auditCta.features.map((f, i) => <div key={i} className="pac-feat">{f}</div>)}
                </div>
                <a href={proof.auditCta.ctaHref} className="btn-pac">{proof.auditCta.ctaLabel}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section alt" id="faq">
        <div className="inner">
          <div className="faq-layout">
            <div className="faq-aside">
              <div className="pill">{faq.pill}</div>
              <h2 className="section-h2">{faq.headline}</h2>
              <p className="section-lead" style={{ marginBottom: 0 }}>{faq.lead}</p>
              <div className="faq-aside-cta">
                <div className="fac-text"><strong>{faq.asideStrong}</strong>{faq.asideBody}</div>
                <a href={faq.asideCtaHref} className="btn-fac">{faq.asideCtaLabel}</a>
              </div>
            </div>
            <div className="faq-list">
              {faq.items.map((f, i) => (
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
          <h2 className="final-h2">{finalCta.headline}</h2>
          <p className="final-lead">{finalCta.lead}</p>
          <div className="final-actions">
            <a href={finalCta.primaryHref} className="btn-final">
              {finalCta.primaryLabel}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <a href="#proof" className="btn-final-ghost">{finalCta.ghostLabel}</a>
          </div>
          <div className="final-reassurance">
            {finalCta.reassurance.map((r) => <div key={r} className="fr-item">{r}</div>)}
          </div>
        </div>
      </section>

      <V2Footer />
    </div>
  );
}
