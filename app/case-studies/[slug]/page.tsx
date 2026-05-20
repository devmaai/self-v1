import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import RevealSection from "@/components/ui/RevealSection";
import SimpleCTA from "@/components/sections/SimpleCTA";
import {
  caseStudies,
  getCaseStudy,
  getRelatedCaseStudies,
} from "@/lib/case-studies";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Case study not found | SelfStorage.help" };
  return {
    title: `${study.cardTitle} | SelfStorage.help`,
    description: study.excerpt,
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const related = getRelatedCaseStudies(slug, 3);

  return (
    <div className="page-case-detail">
      {/* HERO */}
      <section className="case-detail-hero">
        <div className="container">
          <Link href="/case-studies" className="case-detail-back">
            ← All case studies
          </Link>
          <div className="case-detail-tags">
            <span className="case-detail-tag">{study.category}</span>
            <span className="case-detail-tag-sep">·</span>
            <span className="case-detail-tag-plain">{study.region}</span>
            <span className="case-detail-tag-sep">·</span>
            <span className="case-detail-tag-plain">{study.service}</span>
          </div>
          <h1 className="case-detail-headline">
            {study.headline}{" "}
            {study.headlineAccent && <em>{study.headlineAccent}</em>}
          </h1>
          <p className="case-detail-excerpt">{study.excerpt}</p>

          <div className="case-detail-hero-grid">
            <div
              className="case-detail-hero-media"
              style={{ backgroundImage: `url(${study.heroImage})` }}
            />
            <ul className="case-detail-metrics">
              {study.metrics.map((m, i) => (
                <li key={i}>
                  <span className="case-detail-metric-value">{m.value}</span>
                  <span className="case-detail-metric-label">{m.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ABOUT — warm */}
      <RevealSection className="case-detail-about">
        <div className="container">
          <div className="case-detail-about-grid">
            <div>
              <div className="section-label">About the facility</div>
              <h2 className="section-title">{study.about.company}</h2>
              <p className="case-detail-about-body">{study.about.body}</p>
            </div>
            <dl className="case-detail-spec">
              <div>
                <dt>Location</dt>
                <dd>{study.about.location}</dd>
              </div>
              {study.about.units && (
                <div>
                  <dt>Inventory</dt>
                  <dd>{study.about.units}</dd>
                </div>
              )}
              {study.about.facilities && (
                <div>
                  <dt>Footprint</dt>
                  <dd>{study.about.facilities}</dd>
                </div>
              )}
              <div>
                <dt>Service</dt>
                <dd>{study.service}</dd>
              </div>
            </dl>
          </div>
        </div>
      </RevealSection>

      {/* CHALLENGE — light */}
      <RevealSection className="case-detail-challenge">
        <div className="container">
          <div className="case-detail-block-grid">
            <div className="case-detail-block-head">
              <div className="section-label">The challenge</div>
              <h2 className="section-title">
                Where the facility was <em>before we started</em>.
              </h2>
            </div>
            <ul className="case-detail-bullets">
              {study.challenge.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </RevealSection>

      {/* APPROACH — dark */}
      <RevealSection className="case-detail-approach">
        <div className="container">
          <div className="section-label">Our approach</div>
          <h2 className="section-title">
            What we actually did, <em>step by step</em>.
          </h2>
          <div className="case-detail-approach-grid">
            {study.approach.map((a, i) => (
              <div key={i} className="case-detail-approach-card">
                <span className="case-detail-approach-num">{a.num}</span>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* RESULTS — warm with embedded screenshots */}
      <RevealSection className="case-detail-results">
        <div className="container">
          <div className="section-label">The results</div>
          <h2 className="section-title">
            What the data <em>looked like</em>.
          </h2>
          <p className="case-detail-results-intro">{study.resultsIntro}</p>

          {study.resultsImages && study.resultsImages.length > 0 && (
            <div className="case-detail-screens">
              {study.resultsImages.map((img, i) => (
                <figure key={i} className="case-detail-screen">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.src} alt={img.alt} loading="lazy" />
                  {img.caption && <figcaption>{img.caption}</figcaption>}
                </figure>
              ))}
            </div>
          )}

          <ul className="case-detail-result-bullets">
            {study.resultsBullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      </RevealSection>

      {/* QUOTE — steel */}
      <RevealSection className="case-detail-quote">
        <div className="container">
          <blockquote>
            <p>&ldquo;{study.quote.text}&rdquo;</p>
            <div className="case-detail-quote-meta">
              <strong>{study.quote.name}</strong>
              <span>{study.quote.role}</span>
            </div>
          </blockquote>
        </div>
      </RevealSection>

      {/* RELATED */}
      {related.length > 0 && (
        <RevealSection className="case-detail-related">
          <div className="container">
            <div className="section-label">Other stories</div>
            <h2 className="section-title">
              More <em>occupancy gains</em> like this.
            </h2>
            <div className="case-detail-related-grid">
              {related.map((r, i) => (
                <Link
                  key={i}
                  href={`/case-studies/${r.slug}`}
                  className="case-card"
                >
                  <div
                    className="case-card-media"
                    style={{ backgroundImage: `url(${r.cardImage})` }}
                  >
                    <span className="case-card-badge">{r.category}</span>
                    {r.cardMetric && (
                      <span className="case-card-metric">{r.cardMetric}</span>
                    )}
                  </div>
                  <div className="case-card-body">
                    <div className="case-card-eyebrow">{r.eyebrow}</div>
                    <h3>{r.cardTitle}</h3>
                    <p>{r.cardBody}</p>
                    <span className="case-card-link">Read more →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </RevealSection>
      )}

      <SimpleCTA
        headline="Want results like these for your facility?"
        body="Get a free audit. We will show you the exact gaps between where your facility ranks today and where it should rank."
        ctaLabel="Start my free audit"
      />
    </div>
  );
}
