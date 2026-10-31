import type { Metadata } from "next";
import Link from "next/link";
import StorageLocationSearch from "@/components/sections/StorageLocationSearch";
import StorageStateLinks from "@/components/sections/StorageStateLinks";
import StorageTypeLinks from "@/components/sections/StorageTypeLinks";
import ClimateCityScroller from "@/components/sections/ClimateCityScroller";
import { getClimateStorageSummary } from "@/lib/climateStorage";
import { CITY_IMAGES } from "@/lib/cityImages";
import { breadcrumbListSchema, faqPageSchema } from "@/lib/schema";

export const revalidate = 604800;

export const metadata: Metadata = {
  title: "Climate Controlled Storage Units Near Me | SelfStorage.help",
  description:
    "Compare climate controlled storage units near you. Steady temperature, humidity protection and month-to-month rentals. Search and reserve in minutes.",
  alternates: { canonical: "/climate-controlled-storage" },
};

type BenefitIcon = "temperature" | "humidity" | "indoor" | "secure";

function BenefitVisual({ icon }: { icon: BenefitIcon }) {
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <div className={`climate-benefit-visual climate-benefit-visual-${icon}`} aria-hidden="true">
      <svg viewBox="0 0 160 110">
        {icon === "temperature" && (
          <>
            <circle cx="40" cy="34" r="12" {...stroke} />
            <path {...stroke} d="M40 12v-6M40 62v-6M18 34h-6M68 34h-6M24 18l-4-4M60 54l-4-4M24 50l-4 4M60 14l-4 4" />
            <path {...stroke} d="M80 22a8 8 0 0 1 16 0v44a15 15 0 1 1-16 0Z" />
            <circle cx="88" cy="78" r="7" fill="currentColor" />
            <path {...stroke} d="M88 71V40" strokeWidth={5} />
            <path {...stroke} d="M124 22v36M108 31l32 18M108 49l32-18" />
          </>
        )}
        {icon === "humidity" && (
          <>
            <path {...stroke} d="M62 14C50 32 40 46 40 60a22 22 0 0 0 44 0c0-14-10-28-22-46Z" />
            <path {...stroke} d="M54 64a9 9 0 0 0 9 9" />
            <path {...stroke} d="M100 40h40M100 56h30M100 72h40" />
            <path {...stroke} d="M30 92l100-80" strokeWidth={4} />
          </>
        )}
        {icon === "indoor" && (
          <>
            <path {...stroke} d="M20 50L80 18l60 32" />
            <path {...stroke} d="M30 46v50h100V46" />
            <path {...stroke} d="M44 62h24v34H44ZM92 62h24v34H92Z" />
            <path {...stroke} d="M44 70h24M44 78h24M44 86h24M92 70h24M92 78h24M92 86h24" />
          </>
        )}
        {icon === "secure" && (
          <>
            <path {...stroke} d="M80 12l40 14v26c0 26-18 42-40 50-22-8-40-24-40-50V26Z" />
            <path {...stroke} d="M62 56l12 12 24-26" strokeWidth={4} />
          </>
        )}
      </svg>
    </div>
  );
}

const benefits: { icon: BenefitIcon; label: string; title: string; body: string }[] = [
  { icon: "temperature", label: "Temperature", title: "Steady temperature", body: "Your unit stays within a set range all year, through summer heat and winter freezes." },
  { icon: "humidity", label: "Humidity", title: "Humidity protection", body: "Lower moisture means less risk of mold, mildew, warping and rust." },
  { icon: "indoor", label: "Indoor", title: "Indoor and secure", body: "Interior units inside a covered building, away from dust, pests and weather." },
  { icon: "secure", label: "Peace of mind", title: "Peace of mind", body: "Your belongings come out in the same condition they went in." },
];

const itemSizes = [
  { label: "Furniture", title: "One room of furniture", range: "5' x 10'", area: "50 sq ft", body: "A bedroom set, a sofa or a few wood and leather pieces kept free of warping and mildew.", image: "/images/climate-storage/furniture-unit.png" },
  { label: "Furniture", title: "A whole home of furniture", range: "10' x 15' to 10' x 20'", area: "150 to 200 sq ft", body: "Furniture from a two to three bedroom home, with room for a walkway.", image: "/images/storage-guide/fourbedroom.jpg" },
  { label: "Documents", title: "Documents and photos", range: "5' x 5'", area: "25 sq ft", body: "File boxes, albums and books, kept away from the damp air that curls and yellows paper.", image: "/images/climate-storage/documents.png" },
  { label: "Heirlooms", title: "Heirlooms, antiques and artwork", range: "5' x 5' to 5' x 10'", area: "25 to 50 sq ft", body: "Quilts, artwork and family keepsakes that need steady conditions over months or years.", image: "/images/climate-storage/heirlooms.png" },
  { label: "Bedding", title: "Mattresses and bedding", range: "5' x 10'", area: "50 sq ft", body: "A mattress set stored upright with bedding, kept dry and ready to use again.", image: "/images/storage-guide/5_10.jpg" },
  { label: "Collectibles", title: "Records, instruments and clothing", range: "5' x 5'", area: "25 sq ft", body: "Vinyl, instruments and seasonal clothing, kept away from the heat and humidity that damage them.", image: "/images/climate-storage/indoor-unit.png" },
];

const comparison = [
  ["Temperature", "Held in a set range all year", "Follows outdoor weather"],
  ["Humidity", "Managed in most units", "Not managed"],
  ["Location", "Indoor, inside a building", "Usually drive-up"],
  ["Best for", "Furniture, documents, heirlooms, collectibles", "Tools, bins, outdoor and sports gear"],
  ["Best length of stay", "Any, including long-term", "Short stays in mild weather"],
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
  ["Is climate controlled storage worth it?", "Yes, if you are storing furniture, documents, heirlooms or collectibles, or storing through extreme heat, cold or humidity."],
  ["How much is a climate controlled storage unit?", "Price depends on unit size, city and facility. Search your area to see current climate controlled rates side by side."],
  ["What is the difference between climate controlled and temperature controlled storage?", "Temperature controlled storage manages heat and cold. Climate controlled storage usually manages humidity too."],
  ["Can I store furniture without climate control for 3 months?", "Only in mild weather with solid, well-covered pieces. For upholstery, antiques or a stay through summer or winter, choose climate control."],
  ["Can I rent month to month?", "Most units on SelfStorage.help are available month to month. Check each listing for terms."],
  ["Do I need climate controlled storage in Florida or Texas?", "In humid states like Florida, Louisiana and coastal Texas, climate control is the safer choice for furniture, documents, electronics and anything that can mold or warp."],
  ["Is climate controlled storage needed in cold states?", "In Minnesota, Michigan, New York and other northern states, freezing temperatures can crack wood, damage electronics and ruin liquids. Climate control keeps your unit above freezing."],
  ["Is climate control worth it in dry desert states?", "In Arizona and Nevada, the main risk is extreme summer heat. Climate control keeps vinyl records, photos, candles and electronics from warping or melting."],
];

export default async function ClimateControlledStoragePage() {
  const { cities } = await getClimateStorageSummary();
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
          <p>Protect your furniture, documents and keepsakes from heat, cold and humidity. Compare units near you and reserve in minutes.</p>
          <ul className="climate-trust-pills">
            <li>Month-to-month rentals</li>
            <li>No booking fees</li>
            <li>Compare prices side by side</li>
          </ul>
        </div>
      </section>

      <section className="climate-benefits" aria-labelledby="climate-benefits-heading">
        <div className="storage-size-guide-heading">
          <span className="storage-size-guide-label">Benefits</span>
          <h2 id="climate-benefits-heading">Why choose climate controlled storage</h2>
        </div>
        <div className="climate-benefit-grid">
          {benefits.map((b) => (
            <article className="climate-benefit" key={b.title}>
              <BenefitVisual icon={b.icon} />
              <span className="storage-size-card-label">{b.label}</span>
              <h3>{b.title}</h3>
              <p>{b.body}</p>
            </article>
          ))}
        </div>
      </section>

      {cities.length > 0 && (
        <section className="storage-search-directory climate-city-section" aria-labelledby="climate-cities-heading">
          <div className="storage-search-section-heading">
            <div>
              <span className="storage-search-label">Compare by city</span>
              <h2 id="climate-cities-heading">Climate controlled storage by city</h2>
            </div>
          </div>
          <ClimateCityScroller cities={cities} images={CITY_IMAGES} />
          <p className="climate-center-link"><Link className="climate-button" href="/climate-controlled-storage/cities">Explore all climate controlled cities and brands <span aria-hidden="true">→</span></Link></p>
        </section>
      )}

      <section className="storage-size-guide-content" aria-labelledby="climate-items-heading">
        <div className="storage-size-guide-heading">
          <span className="storage-size-guide-label">Sizes by item</span>
          <h2 id="climate-items-heading">The right climate controlled unit size for what you store</h2>
          <p>Find the unit size that fits your belongings. Leave a small walkway so you can reach everything.</p>
        </div>
        <div className="storage-size-guide-grid climate-grid-3">
          {itemSizes.map((item) => (
            <article className="storage-size-card climate-card" key={item.title}>
              <div className="storage-box-visual"><img src={item.image} alt={`${item.title} in climate controlled storage`} /></div>
              <span className="storage-size-card-label">{item.label}</span>
              <h3>{item.title}</h3>
              <div className="storage-size-card-range"><strong>{item.range}</strong><span>{item.area}</span></div>
              <p>{item.body}</p>
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

      <section className="storage-size-chart-section" aria-labelledby="climate-compare-heading">
        <div className="storage-size-guide-heading">
          <span className="storage-size-guide-label">Quick comparison</span>
          <h2 id="climate-compare-heading" className="type-one-line">Climate controlled vs regular storage unit</h2>
        </div>
        <div className="storage-size-table-wrap">
          <table className="storage-size-table">
            <thead><tr><th>Feature</th><th>Climate controlled</th><th>Regular unit</th></tr></thead>
            <tbody>{comparison.map((row) => <tr key={row[0]}><th scope="row">{row[0]}</th><td>{row[1]}</td><td>{row[2]}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="storage-size-note"><strong>Storing furniture for just a few months?</strong> Climate control is the safer pick if your stay covers summer, winter or a humid season.</p>
        <div className="climate-table-cta">
          <div>
            <strong>Ready to compare climate controlled units?</strong>
            <span>See prices, sizes and availability from facilities near you.</span>
          </div>
          <Link href="/storage-search">Compare climate controlled units <span aria-hidden="true">→</span></Link>
        </div>
      </section>


      <section className="storage-size-feature storage-size-feature-vehicle" aria-labelledby="climate-longterm-heading">
        <div className="storage-size-feature-copy">
          <span className="storage-size-guide-label">Long-term and heirloom storage</span>
          <h2 id="climate-longterm-heading">Long-term climate controlled storage for things you can&apos;t replace</h2>
          <p>Storing family heirlooms, photos or antiques for months or years? Choose an interior climate controlled unit with humidity control for the most stable conditions.</p>
          <p>Use acid-free boxes, keep items off the floor and visit every few months.</p>
        </div>
        <div className="storage-vehicle-visual"><img src="/images/climate-storage/indoor-corridor.png" alt="Indoor climate controlled storage corridor" /></div>
      </section>

      <section className="storage-size-feature storage-size-feature-business" aria-labelledby="climate-checklist-heading">
        <div className="storage-vehicle-visual"><img src="/images/climate-storage/family-moving.jpg" alt="Family moving boxes into a storage unit" /></div>
        <div className="storage-size-feature-copy">
          <span className="storage-size-guide-label">First-time renter checklist</span>
          <h2 id="climate-checklist-heading">Before you book climate controlled storage: quick checklist</h2>
          <div className="storage-reference-list climate-checklist-list">
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
        <p className="climate-center-link"><a className="climate-button" href="#climate-search">Start your search <span aria-hidden="true">→</span></a></p>
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

      <StorageTypeLinks current="/climate-controlled-storage" />
      <StorageLocationSearch
        id="climate-search"
        heading="Looking for climate controlled storage near you?"
        subtext="Search by ZIP code, city, or state to compare climate controlled units in that area."
      />
      <StorageStateLinks label="Explore more locations" heading="Climate controlled storage by state" />
    </main>
  );
}
