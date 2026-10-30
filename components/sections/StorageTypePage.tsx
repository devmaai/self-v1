import Link from "next/link";
import StorageLocationSearch from "@/components/sections/StorageLocationSearch";
import StorageStateLinks from "@/components/sections/StorageStateLinks";
import { breadcrumbListSchema, faqPageSchema } from "@/lib/schema";

export type TypeIcon = "indoor" | "covered" | "outdoor" | "secure" | "power" | "access" | "boxes" | "shelves";

export type StorageTypeConfig = {
  slug: string;
  name: string;
  heroClass: string;
  h1: React.ReactNode;
  heroText: string;
  pills: string[];
  benefitsHeading: string;
  benefits: { icon: TypeIcon; label: string; title: string; body: string }[];
  sizesHeading: string;
  sizesIntro: string;
  sizes: { label: string; title: string; range: string; area: string; body: string }[];
  compareHeading: string;
  compareIntro: string;
  compareCols: string[];
  compareRows: string[][];
  compareNote: React.ReactNode;
  ctaTitle: string;
  ctaText: string;
  ctaLabel: string;
  feature: { label: string; heading: string; paragraphs: string[]; image: string; alt: string };
  checklistImage: { src: string; alt: string };
  checklist: string[][];
  stepsHeading: string;
  steps: { num: string; title: string; body: string }[];
  faqHeading: string;
  faqs: string[][];
  searchHeading: string;
  searchText: string;
  stateHeading: string;
};

function TypeVisual({ icon }: { icon: TypeIcon }) {
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <div className="climate-benefit-visual" aria-hidden="true">
      <svg viewBox="0 0 160 110">
        {icon === "indoor" && (
          <>
            <path {...stroke} d="M20 50L80 18l60 32" />
            <path {...stroke} d="M30 46v50h100V46" />
            <path {...stroke} d="M50 96V64h60v32" />
            <path {...stroke} d="M50 72h60M50 80h60M50 88h60" />
          </>
        )}
        {icon === "covered" && (
          <>
            <path {...stroke} d="M14 40h132L128 22H32Z" />
            <path {...stroke} d="M28 40v54M132 40v54" />
            <path {...stroke} d="M52 86h56l-6-16H58Z" />
            <circle cx="62" cy="90" r="5" {...stroke} />
            <circle cx="98" cy="90" r="5" {...stroke} />
          </>
        )}
        {icon === "outdoor" && (
          <>
            <circle cx="124" cy="26" r="11" {...stroke} />
            <path {...stroke} d="M124 6v-2M124 48v-2M104 26h-2M146 26h-2" />
            <path {...stroke} d="M14 94h132" />
            <path {...stroke} d="M30 84h60l-8-20H40Z" />
            <circle cx="42" cy="88" r="6" {...stroke} />
            <circle cx="78" cy="88" r="6" {...stroke} />
          </>
        )}
        {icon === "secure" && (
          <>
            <path {...stroke} d="M80 12l40 14v26c0 26-18 42-40 50-22-8-40-24-40-50V26Z" />
            <path {...stroke} d="M62 56l12 12 24-26" strokeWidth={4} />
          </>
        )}
        {icon === "power" && (
          <>
            <rect x="52" y="18" width="56" height="74" rx="8" {...stroke} />
            <path {...stroke} d="M86 34L70 58h20L74 82" strokeWidth={4} />
          </>
        )}
        {icon === "access" && (
          <>
            <path {...stroke} d="M20 94V40M140 94V40" />
            <path {...stroke} d="M20 52h120" />
            <path {...stroke} d="M60 94l8-30h24l8 30" />
            <path {...stroke} d="M80 72v14M74 80l6 6 6-6" />
          </>
        )}
        {icon === "boxes" && (
          <>
            <path {...stroke} d="M30 56h44v40H30ZM86 56h44v40H86ZM58 16h44v40H58Z" />
            <path {...stroke} d="M44 56v12M100 56v12M72 16v12" />
          </>
        )}
        {icon === "shelves" && (
          <>
            <path {...stroke} d="M30 14v84M130 14v84" />
            <path {...stroke} d="M30 38h100M30 66h100M30 94h100" />
            <path {...stroke} d="M42 38V24h22v14M76 66V50h26v16M44 94V78h20v16" />
          </>
        )}
      </svg>
    </div>
  );
}

export default function StorageTypePage({ c }: { c: StorageTypeConfig }) {
  const faqSchema = faqPageSchema(c.faqs.map(([question, answer]) => ({ question, answer })));
  const breadcrumbSchema = breadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Storage search", path: "/storage-search" },
    { name: c.name, path: `/${c.slug}` },
  ]);
  const searchId = `${c.slug}-search`;

  return (
    <main className="storage-size-guide-page climate-storage-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className={`storage-size-guide-hero hero-photo ${c.heroClass}`}>
        <div className="storage-size-guide-hero-inner">
          <nav className="storage-search-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span><Link href="/storage-search">Storage search</Link><span>/</span><span aria-current="page">{c.name}</span>
          </nav>
          <h1>{c.h1}</h1>
          <p>{c.heroText}</p>
          <ul className="climate-trust-pills">{c.pills.map((p) => <li key={p}>{p}</li>)}</ul>
        </div>
      </section>

      <section className="climate-benefits" aria-labelledby={`${c.slug}-benefits-heading`}>
        <div className="storage-size-guide-heading">
          <h2 id={`${c.slug}-benefits-heading`}>{c.benefitsHeading}</h2>
        </div>
        <div className="climate-benefit-grid">
          {c.benefits.map((b) => (
            <article className="climate-benefit" key={b.title}>
              <TypeVisual icon={b.icon} />
              <span className="storage-size-card-label">{b.label}</span>
              <h3>{b.title}</h3>
              <p>{b.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="storage-size-guide-content" aria-labelledby={`${c.slug}-sizes-heading`}>
        <div className="storage-size-guide-heading">
          <h2 id={`${c.slug}-sizes-heading`}>{c.sizesHeading}</h2>
          <p>{c.sizesIntro}</p>
        </div>
        <div className="storage-size-guide-grid climate-grid-3">
          {c.sizes.map((s) => (
            <article className="storage-size-card climate-card" key={s.title}>
              <span className="storage-size-card-label">{s.label}</span>
              <h3>{s.title}</h3>
              <div className="storage-size-card-range"><strong>{s.range}</strong><span>{s.area}</span></div>
              <p>{s.body}</p>
            </article>
          ))}
          <article className="storage-size-card climate-card climate-card-cta">
            <span className="storage-size-card-label">Not sure?</span>
            <h3>See every unit size</h3>
            <p>Compare all sizes with what fits in each one.</p>
            <Link href="/storage-size-guide">View the size guide <span aria-hidden="true">→</span></Link>
          </article>
        </div>
      </section>

      <section className="storage-size-chart-section" aria-labelledby={`${c.slug}-compare-heading`}>
        <div className="storage-size-guide-heading">
          <h2 id={`${c.slug}-compare-heading`}>{c.compareHeading}</h2>
          <p>{c.compareIntro}</p>
        </div>
        <div className="storage-size-table-wrap">
          <table className="storage-size-table">
            <thead><tr>{c.compareCols.map((col) => <th key={col}>{col}</th>)}</tr></thead>
            <tbody>{c.compareRows.map((row) => <tr key={row[0]}><th scope="row">{row[0]}</th>{row.slice(1).map((cell, i) => <td key={i}>{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <p className="storage-size-note">{c.compareNote}</p>
        <div className="climate-table-cta">
          <div>
            <strong>{c.ctaTitle}</strong>
            <span>{c.ctaText}</span>
          </div>
          <Link href="/storage-search">{c.ctaLabel} <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="storage-size-feature storage-size-feature-vehicle" aria-labelledby={`${c.slug}-feature-heading`}>
        <div className="storage-size-feature-copy">
          <h2 id={`${c.slug}-feature-heading`}>{c.feature.heading}</h2>
          {c.feature.paragraphs.map((p) => <p key={p}>{p}</p>)}
        </div>
        <div className="storage-vehicle-visual"><img src={c.feature.image} alt={c.feature.alt} /></div>
      </section>

      <section className="storage-size-feature storage-size-feature-business" aria-labelledby={`${c.slug}-checklist-heading`}>
        <div className="storage-vehicle-visual"><img src={c.checklistImage.src} alt={c.checklistImage.alt} /></div>
        <div className="storage-size-feature-copy">
          <h2 id={`${c.slug}-checklist-heading`}>Before you book: quick checklist</h2>
          <div className="storage-reference-list climate-checklist-list">
            <strong>Check these before you sign</strong>
            {c.checklist.map(([label, detail]) => <div key={label}><span>{label}</span><b>{detail}</b></div>)}
          </div>
        </div>
      </section>

      <section className="storage-size-guide-content" aria-labelledby={`${c.slug}-steps-heading`}>
        <div className="storage-size-guide-heading">
          <h2 id={`${c.slug}-steps-heading`}>{c.stepsHeading}</h2>
        </div>
        <div className="climate-steps">
          {c.steps.map((s) => (
            <article className="climate-step" key={s.num}>
              <span className="climate-step-num">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </article>
          ))}
        </div>
        <p className="climate-center-link"><a className="climate-button" href={`#${searchId}`}>Start your search <span aria-hidden="true">→</span></a></p>
      </section>

      <section className="storage-size-faq" aria-labelledby={`${c.slug}-faq-heading`}>
        <div className="storage-size-guide-heading">
          <h2 id={`${c.slug}-faq-heading`}>{c.faqHeading}</h2>
        </div>
        <div className="storage-size-faq-list">
          {c.faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}
        </div>
      </section>

      <StorageLocationSearch id={searchId} heading={c.searchHeading} subtext={c.searchText} />
      <StorageStateLinks label="Explore more locations" heading={c.stateHeading} />
    </main>
  );
}
