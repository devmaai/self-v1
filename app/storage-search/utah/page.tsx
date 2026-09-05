import type { Metadata } from "next";
import Link from "next/link";
import StorageStateLinks from "@/components/sections/StorageStateLinks";

export const metadata: Metadata = {
  title: "Utah Self Storage | Find Storage Units Near You",
  description: "Compare self storage options across Utah, including Salt Lake City, West Valley City, Cedar City, Park City, Heber City, and Brigham City.",
};

const UTAH_CITIES = [
  "Salt Lake City",
  "West Valley City",
  "Cedar City",
  "Park City",
  "Heber City",
  "Brigham City",
];

const FAQS = [
  {
    question: "How does self storage work in Utah?",
    answer: "You choose a facility and unit size, review the price and access details, then complete the rental agreement and move your belongings in. Most facilities bill monthly and provide a personal access code or key.",
  },
  {
    question: "What storage unit size do I need?",
    answer: "A 5 by 5 or 5 by 10 unit usually works for boxes and a few pieces of furniture. A 10 by 10 unit can hold the contents of a one-bedroom home, while larger units are better for multi-room homes, business inventory, vehicles, or seasonal equipment.",
  },
  {
    question: "What should I look for in a Utah storage facility?",
    answer: "Compare location, monthly price, access hours, security, climate control, drive-up access, insurance requirements, and any administration or move-in fees before reserving a unit.",
  },
  {
    question: "Do I need climate-controlled storage in Utah?",
    answer: "Climate control can be useful for electronics, wood furniture, documents, artwork, and other items that may be affected by temperature swings or humidity. Everyday household items may be fine in a standard unit when packed and protected properly.",
  },
];

export default function UtahStoragePage() {
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
          <div className="city-storage-breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/storage-search">Storage search</Link><span>/</span>Utah</div>
          <span className="city-storage-eyebrow"><span /> Utah storage guide</span>
          <h1>Find self storage<br /><em>across Utah.</em></h1>
          <p>Compare storage units, prices, and amenities in Utah communities from the Wasatch Front to southern Utah.</p>
          <Link className="state-storage-cta" href="/storage-search?location=Utah">Search Utah storage <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="state-storage-cities" aria-labelledby="utah-cities-heading">
        <div className="state-storage-heading"><span className="city-storage-label">Featured locations</span><h2 id="utah-cities-heading">Utah cities with storage options</h2><p>Start with a featured Utah city, or search by ZIP code to find facilities near your move.</p></div>
        <div className="state-city-grid">{UTAH_CITIES.map((city) => <Link href={city === "Salt Lake City" ? "/storage-search/salt-lake-city" : `/storage-search?location=${encodeURIComponent(city + ", UT")}`} key={city}>{city}<span aria-hidden="true">→</span></Link>)}</div>
      </section>

      <section className="state-storage-content" aria-labelledby="utah-storage-heading">
        <div><span className="city-storage-label">Utah self storage information</span><h2 id="utah-storage-heading">Storage for moves, seasons, and everyday space.</h2></div>
        <div><p>Utah storage customers use units for apartment moves, home renovations, outdoor gear, business inventory, and seasonal belongings. A facility near your home or work can make access easier, while a lower-cost location farther away may work well for items you rarely need.</p><p>When comparing facilities, look at the full monthly cost, including required insurance, deposits, administrative fees, and promotional pricing. Then match the unit type to what you are storing and how often you need to access it.</p></div>
      </section>

      <section className="state-storage-guide" aria-labelledby="utah-size-guide-heading">
        <div className="state-storage-heading"><span className="city-storage-label">Storage unit guide</span><h2 id="utah-size-guide-heading">Choose a unit size with confidence.</h2><p>Use the contents of your home, apartment, or business as a starting point. Leave a little room for walkways so you can reach what is inside.</p></div>
        <div className="state-size-grid">
          <article><strong>5' x 5' to 5' x 10'</strong><h3>Small units</h3><p>Boxes, seasonal clothing, small furniture, or the contents of a dorm room or closet.</p></article>
          <article><strong>10' x 10' to 10' x 15'</strong><h3>Medium units</h3><p>The contents of a one-bedroom apartment, several rooms, or small business inventory.</p></article>
          <article><strong>10' x 20' and larger</strong><h3>Large units</h3><p>Multiple bedrooms, a full home, large equipment, or bulky items that need extra floor space.</p></article>
        </div>
      </section>

      <section className="state-storage-faq" aria-labelledby="utah-faq-heading">
        <div className="state-storage-heading"><span className="city-storage-label">Common questions</span><h2 id="utah-faq-heading">Utah storage questions, answered.</h2></div>
        <div className="state-faq-list">{FAQS.map((faq) => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div>
      </section>

      <StorageStateLinks />
      <nav className="storage-search-breadcrumb city-storage-bottom-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/storage-search">Storage search</Link><span>/</span><span aria-current="page">Utah</span></nav>
    </main>
  );
}
