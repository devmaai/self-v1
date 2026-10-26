import type { Metadata } from "next";
import Link from "next/link";
import StorageLocationSearch from "@/components/sections/StorageLocationSearch";
import { breadcrumbListSchema, faqPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Climate Controlled Storage Units Near Me | SelfStorage.help",
  description:
    "Compare climate controlled storage units near you. Steady temperature, humidity protection and month-to-month rentals. Search and reserve in minutes.",
  alternates: { canonical: "/climate-controlled-storage" },
};

const benefits = [
  { label: "Temperature", title: "Steady temperature", body: "Your unit stays within a set range all year, through summer heat and winter freezes." },
  { label: "Humidity", title: "Humidity protection", body: "Lower moisture means less risk of mold, mildew, warping and rust." },
  { label: "Indoor", title: "Indoor and secure", body: "Interior units inside a covered building, away from dust, pests and weather." },
  { label: "Peace of mind", title: "Peace of mind", body: "Your belongings come out in the same condition they went in." },
];

const whatToStore = [
  { label: "Furniture", title: "Wood, leather and upholstered furniture", body: "Steady temperature and humidity stop wood from warping and cracking, and keep leather and fabric free of mildew.", image: "/images/climate-storage/furniture-unit.png" },
  { label: "Electronics", title: "TVs, computers and appliances", body: "Heat and moisture damage circuit boards and screens. Climate control keeps electronics dry and within a safe range.", image: "/images/climate-storage/electronics.png" },
  { label: "Documents", title: "Documents, photos and books", body: "Paper curls, yellows and grows mold in damp air. A dry, stable unit keeps records and albums readable.", image: "/images/climate-storage/documents.png" },
  { label: "Heirlooms", title: "Heirlooms, antiques and artwork", body: "Quilts, artwork and family keepsakes need steady conditions over months or years, with no sudden swings.", image: "/images/climate-storage/heirlooms.png" },
  { label: "Bedding", title: "Mattresses and bedding", body: "Mattresses soak up moisture fast. Climate control keeps them dry, fresh and ready to use again.", image: "/images/storage-guide/5_10.jpg" },
  { label: "Collectibles", title: "Records, instruments and clothing", body: "Vinyl warps in heat and instruments react to humidity. Keep collectibles and clothing in a stable unit.", image: "/images/climate-storage/indoor-unit.png" },
];

const comparison = [
  ["Temperature", "Held in a set range all year", "Follows outdoor weather"],
  ["Humidity", "Managed in most units", "Not managed"],
  ["Location", "Indoor, inside a building", "Usually drive-up"],
  ["Best for", "Furniture, electronics, documents, heirlooms", "Tools, bins, outdoor and sports gear"],
  ["Best length of stay", "Any, including long-term", "Short stays in mild weather"],
];

const sizes = [
  { label: "A few items", title: "Boxes and keepsakes", range: "5' x 5'", area: "25 sq ft", body: "Boxes, documents and small keepsakes.", image: "/images/storage-guide/boxes.jpg" },
  { label: "One room", title: "A studio or a few pieces", range: "5' x 10'", area: "50 sq ft", body: "Contents of a studio or a few furniture pieces.", image: "/images/storage-guide/studio.jpg" },
  { label: "Popular size", title: "One-bedroom apartment", range: "10' x 10'", area: "100 sq ft", body: "Furniture, appliances and boxes from a one-bedroom home.", image: "/images/storage-guide/twobedroom.jpg" },
  { label: "Most rented", title: "Two-bedroom apartment", range: "10' x 15'", area: "150 sq ft", body: "Furniture from two bedrooms, a living room and boxes.", image: "/images/storage-guide/threebedroom.jpg" },
  { label: "Whole home", title: "Three-bedroom home", range: "10' x 20'", area: "200 sq ft", body: "Furniture from three bedrooms, living and dining rooms.", image: "/images/storage-guide/fourbedroom.jpg" },
];

const steps = [
  { num: "1", title: "Search", body: "Enter your city or ZIP code." },
  { num: "2", title: "Compare", body: "Filter for climate controlled units and compare sizes, prices and access hours." },
  { num: "3", title: "Reserve", body: "Pick your unit and lock in your price online." },
];

const checklist = [
  ["Temperature range", "Ask what range the unit holds"],
  ["Humidity", "Confirm whether humidity is controlled"],
  ["Access", "Check access hours and gate entry"],
  ["Rules", "Review what you cannot store"],
  ["Offers", "Ask about first-month offers"],
  ["Insurance", "Check your insurance coverage"],
];

const faqs = [
  ["Is climate controlled storage worth it?", "Yes, if you are storing furniture, electronics, documents or heirlooms, or storing through extreme heat, cold or humidity."],
  ["How much is a climate controlled storage unit?", "Price depends on unit size, city and facility. Search your area to see current climate controlled rates side by side."],
  ["What is the difference between climate controlled and temperature controlled storage?", "Temperature controlled storage manages heat and cold. Climate controlled storage usually manages humidity too."],
  ["Can I store furniture without climate control for 3 months?", "Only in mild weather with solid, well-covered pieces. For upholstery, antiques or a stay through summer or winter, choose climate control."],
  ["Can I rent month to month?", "Most units on SelfStorage.help are available month to month. Check each listing for terms."],
];

export default function ClimateControlledStoragePage() {
  const faqSchema = faqPageSchema(faqs.map(([question, answer]) => ({ question, answer })));
  const breadcrumbSchema = breadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Storage search", path: "/storage-search" },
    { name: "Climate controlled storage", path: "/climate-controlled-storage" },
  ]);

  return (
    <main className="storage-size-guide-page climate-storage-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="storage-size-guide-hero hero-photo hero-photo-climate">
        <div className="storage-size-guide-hero-inner">
          <nav className="storage-search-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span><Link href="/storage-search">Storage search</Link><span>/</span><span aria-current="page">Climate controlled storage</span>
          </nav>
          <span className="storage-size-guide-eyebrow"><span /> Climate Controlled Storage</span>
          <h1>Climate controlled storage units <em>near you.</em></h1>
          <p>Protect your furniture, electronics and keepsakes from heat, cold and humidity. Compare units near you and reserve in minutes.</p>
          <ul className="climate-trust-pills">
            <li>Month-to-month rentals</li>
            <li>No booking fees</li>
            <li>Compare prices side by side</li>
          </ul>
        </div>
      </section>

      <StorageLocationSearch />

      <section className="climate-benefits" aria-labelledby="climate-benefits-heading">
        <div className="storage-size-guide-heading">
          <span className="storage-size-guide-label">Benefits</span>
          <h2 id="climate-benefits-heading">Why choose climate controlled storage</h2>
        </div>
        <div className="climate-benefit-grid">
          {benefits.map((b) => (
            <article className="climate-benefit" key={b.title}>
              <span className="storage-size-card-label">{b.label}</span>
              <h3>{b.title}</h3>
              <p>{b.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="storage-size-guide-content" aria-labelledby="climate-store-heading">
        <div className="storage-size-guide-heading">
          <span className="storage-size-guide-label">What to store</span>
          <h2 id="climate-store-heading">What needs a climate controlled storage unit?</h2>
          <p>If you would not leave it in a hot garage for a summer, store it in climate control.</p>
        </div>
        <div className="storage-size-guide-grid climate-grid-3">
          {whatToStore.map((item) => (
            <article className="storage-size-card climate-card" key={item.title}>
              <div className="storage-box-visual"><img src={item.image} alt={`${item.title} in climate controlled storage`} /></div>
              <span className="storage-size-card-label">{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <Link href="/storage-search">See units near me <span aria-hidden="true">→</span></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="storage-size-chart-section" aria-labelledby="climate-compare-heading">
        <div className="storage-size-guide-heading">
          <span className="storage-size-guide-label">Quick comparison</span>
          <h2 id="climate-compare-heading">Climate controlled vs regular storage unit</h2>
          <p>See how the two unit types differ before you choose.</p>
        </div>
        <div className="storage-size-table-wrap">
          <table className="storage-size-table">
            <thead><tr><th>Feature</th><th>Climate controlled</th><th>Regular unit</th></tr></thead>
            <tbody>{comparison.map((row) => <tr key={row[0]}><th scope="row">{row[0]}</th><td>{row[1]}</td><td>{row[2]}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="storage-size-note"><strong>Storing furniture for just a few months?</strong> Climate control is the safer pick if your stay covers summer, winter or a humid season.</p>
      </section>

      <section className="storage-size-guide-content" aria-labelledby="climate-sizes-heading">
        <div className="storage-size-guide-heading">
          <span className="storage-size-guide-label">Size picker</span>
          <h2 id="climate-sizes-heading">Find the right climate controlled unit size</h2>
          <p>Match what you are storing to a unit size. Leave a small walkway so you can reach everything.</p>
        </div>
        <div className="storage-size-guide-grid climate-grid-3">
          {sizes.map((size) => (
            <article className="storage-size-card climate-card" key={size.range}>
              <div className="storage-box-visual"><img src={size.image} alt={`${size.range} storage unit`} /></div>
              <span className="storage-size-card-label">{size.label}</span>
              <h3>{size.title}</h3>
              <div className="storage-size-card-range"><strong>{size.range}</strong><span>{size.area}</span></div>
              <p>{size.body}</p>
              <Link href="/storage-search">Find units <span aria-hidden="true">→</span></Link>
            </article>
          ))}
          <article className="storage-size-card climate-card climate-card-cta">
            <span className="storage-size-card-label">Not sure?</span>
            <h3>See every unit size</h3>
            <p>Compare all sizes with what fits in each one.</p>
            <Link href="/storage-size-guide">Compare sizes and prices <span aria-hidden="true">→</span></Link>
          </article>
        </div>
      </section>

      <section className="storage-size-feature storage-size-feature-vehicle" aria-labelledby="climate-longterm-heading">
        <div className="storage-size-feature-copy">
          <span className="storage-size-guide-label">Long-term and heirloom storage</span>
          <h2 id="climate-longterm-heading">Long-term climate controlled storage for things you can&apos;t replace</h2>
          <p>Storing family heirlooms, photos or antiques for months or years? Choose an interior climate controlled unit with humidity control for the most stable conditions.</p>
          <p>Use acid-free boxes, keep items off the floor and visit every few months.</p>
          <p><Link className="climate-inline-link" href="/storage-search">Find long-term storage <span aria-hidden="true">→</span></Link></p>
        </div>
        <div className="storage-vehicle-visual"><img src="/images/climate-storage/indoor-corridor.png" alt="Indoor climate controlled storage corridor" /></div>
      </section>

      <section className="storage-size-feature storage-size-feature-business" aria-labelledby="climate-checklist-heading">
        <div className="storage-vehicle-visual"><img src="/images/climate-storage/family-moving.jpg" alt="Family moving boxes into a storage unit" /></div>
        <div className="storage-size-feature-copy">
          <span className="storage-size-guide-label">First-time renter checklist</span>
          <h2 id="climate-checklist-heading">Before you book: quick checklist</h2>
          <div className="storage-reference-list">
            <strong>Check these before you sign</strong>
            {checklist.map(([label, detail]) => <div key={label}><span>{label}</span><b>{detail}</b></div>)}
          </div>
        </div>
      </section>

      <section className="storage-size-guide-content" aria-labelledby="climate-steps-heading">
        <div className="storage-size-guide-heading">
          <span className="storage-size-guide-label">How it works</span>
          <h2 id="climate-steps-heading">Book climate controlled storage in 3 steps</h2>
        </div>
        <div className="climate-steps">
          {steps.map((s) => (
            <article className="climate-step" key={s.num}>
              <span className="climate-step-num">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </article>
          ))}
        </div>
        <p className="climate-center-link"><Link className="climate-inline-link" href="/storage-search">Start your search <span aria-hidden="true">→</span></Link></p>
      </section>

      <section className="storage-size-faq" aria-labelledby="climate-faq-heading">
        <div className="storage-size-guide-heading">
          <span className="storage-size-guide-label">Common questions</span>
          <h2 id="climate-faq-heading">Climate controlled storage FAQs</h2>
        </div>
        <div className="storage-size-faq-list">
          {faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}
        </div>
      </section>

      <section className="storage-size-guide-cta">
        <div>
          <span className="storage-size-guide-label">Ready to reserve?</span>
          <h2>Find climate controlled storage near you today</h2>
        </div>
        <Link href="/storage-search">Search units <span aria-hidden="true">→</span></Link>
      </section>
    </main>
  );
}
