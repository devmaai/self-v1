import type { ReactNode } from "react";
import Link from "next/link";
import StorageStateLinks from "@/components/sections/StorageStateLinks";

type StateStorageConfig = {
  state: string;
  abbreviation: string;
  region: string;
  cities: string[];
  description: string;
  content: ReactNode;
};

const FAQS = [
  {
    question: "How does self storage work?",
    answer: "You choose a facility and unit size, review the price and access details, then complete the rental agreement and move your belongings in. Most facilities bill monthly and provide a personal access code or key.",
  },
  {
    question: "What storage unit size do I need?",
    answer: "A 5 by 5 or 5 by 10 unit usually works for boxes and a few pieces of furniture. A 10 by 10 unit can hold the contents of a one-bedroom home, while larger units are better for multi-room homes, business inventory, vehicles, or seasonal equipment.",
  },
  {
    question: "What should I compare before renting?",
    answer: "Compare location, monthly price, access hours, security, climate control, drive-up access, insurance requirements, and any administration or move-in fees before reserving a unit.",
  },
  {
    question: "Do I need climate-controlled storage?",
    answer: "Climate control can be useful for electronics, wood furniture, documents, artwork, and other items that may be affected by temperature swings or humidity. Everyday household items may be fine in a standard unit when packed and protected properly.",
  },
];

export default function StateStoragePage({ config }: { config: StateStorageConfig }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <main className="state-storage-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="state-storage-hero">
        <div className="state-storage-hero-inner">
          <div className="city-storage-breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/storage-search">Storage search</Link><span>/</span>{config.state}</div>
          <span className="city-storage-eyebrow"><span /> {config.state} storage guide</span>
          <h1>Cheap <span className="state-storage-nowrap">self storage</span><br /><em>units across {config.state}.</em></h1>
          <p>{config.description}</p>
          <Link className="state-storage-cta" href={`/storage-search?location=${encodeURIComponent(config.state)}`}>Search {config.state} storage <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="state-storage-cities" aria-labelledby={`${config.state.toLowerCase()}-cities-heading`}>
        <div className="state-storage-heading"><span className="city-storage-label">Featured locations</span><h2 id={`${config.state.toLowerCase()}-cities-heading`}>{config.state} cities with storage options</h2><p>Start with a featured {config.state} city, or search by ZIP code to find facilities near your move.</p></div>
        <div className="state-city-grid">{config.cities.map((city) => <Link href={`/storage-search?location=${encodeURIComponent(`${city}, ${config.abbreviation}`)}`} key={city}>{city}<span aria-hidden="true">→</span></Link>)}</div>
      </section>

      <section className="state-storage-content" aria-labelledby={`${config.state.toLowerCase()}-storage-heading`}>
        <div><span className="city-storage-label">{config.state} self storage information</span><h2 id={`${config.state.toLowerCase()}-storage-heading`}>Storage for moves, seasons, and everyday space.</h2></div>
        <div>{config.content}</div>
      </section>

      <section className="state-storage-guide" aria-labelledby={`${config.state.toLowerCase()}-size-guide-heading`}>
        <div className="state-storage-heading"><span className="city-storage-label">Storage unit guide</span><h2 id={`${config.state.toLowerCase()}-size-guide-heading`}>Choose a unit size with confidence.</h2><p>Use the contents of your home, apartment, or business as a starting point. Leave a little room for walkways so you can reach what is inside.</p><Link className="state-storage-guide-button" href="/storage-search#unit-size-guide">View the full storage size guide <span aria-hidden="true">→</span></Link></div>
        <div className="state-size-grid">
          <article><strong>5' x 5' to 5' x 10'</strong><h3>Small units</h3><p>Boxes, seasonal clothing, small furniture, or the contents of a dorm room or closet.</p></article>
          <article><strong>10' x 10' to 10' x 15'</strong><h3>Medium units</h3><p>The contents of a one-bedroom apartment, several rooms, or small business inventory.</p></article>
          <article><strong>10' x 20' and larger</strong><h3>Large units</h3><p>Multiple bedrooms, a full home, large equipment, or bulky items that need extra floor space.</p></article>
        </div>
      </section>

      <section className="state-storage-faq" aria-labelledby={`${config.state.toLowerCase()}-faq-heading`}>
        <div className="state-storage-heading"><span className="city-storage-label">Common questions</span><h2 id={`${config.state.toLowerCase()}-faq-heading`}>{config.state} storage questions, answered.</h2></div>
        <div className="state-faq-list">{FAQS.map((faq) => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div>
      </section>

      <StorageStateLinks />
      <nav className="storage-search-breadcrumb city-storage-bottom-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/storage-search">Storage search</Link><span>/</span><span aria-current="page">{config.state}</span></nav>
    </main>
  );
}
