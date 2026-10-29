import type { Metadata } from "next";
import Link from "next/link";
import StorageLocationSearch from "@/components/sections/StorageLocationSearch";
import StorageStateLinks from "@/components/sections/StorageStateLinks";
import { getClimateStorageSummary } from "@/lib/climateStorage";
import { breadcrumbListSchema, faqPageSchema } from "@/lib/schema";
import { US_STATE_NAMES } from "@/lib/usStates";

export const revalidate = 604800;

export const metadata: Metadata = {
  title: "Climate Controlled Storage by City and Brand | SelfStorage.help",
  description:
    "Browse every city with climate controlled storage on SelfStorage.help. Compare facilities, starting prices and the storage brands that offer climate controlled units.",
  alternates: { canonical: "/climate-controlled-storage/cities" },
};

const compareChecks = [
  ["Temperature range", "Ask what range the building holds in summer and winter."],
  ["Humidity control", "Confirm the unit manages moisture as well as heat and cold."],
  ["Interior access", "Interior units off a hallway stay more stable than units near exterior doors."],
  ["Monthly price", "Compare the regular rate as well as any first-month offer."],
  ["Access hours", "Check gate and building hours if you need to visit often."],
  ["Pest control and cleanliness", "Visit or ask how the building is cleaned and checked."],
];

const climateByState = [
  ["California", "Inland cities get long, hot summers, while coastal cities stay mild with damp air. Climate control matters most inland and for long stays near the coast."],
  ["Missouri", "Humid summers and freezing winters put wood, paper and fabric through big swings. Climate control is the safer choice for most stays."],
  ["New York", "Humid summers, cold winters and freeze-thaw cycles make climate control a smart pick for furniture, documents and keepsakes."],
  ["Utah", "Dry air and cold winters with hot summers in the south. Climate control protects items from temperature swings, especially in St. George."],
];

const cityFaqs = [
  ["Should I choose a climate controlled or a regular storage unit?", "Choose climate controlled storage for furniture, documents, photos, heirlooms or anything that can warp, crack or mold, and for any stay through summer, winter or a humid season. A regular unit works for tools, plastic bins and outdoor gear."],
  ["Will furniture be safe in a non-climate controlled unit for 3 months?", "Solid, well-wrapped furniture can be fine for a few months in mild weather. If those months include summer heat, winter freezes or humid weather, or the pieces are upholstered or antique, choose a climate controlled unit."],
  ["What is the best way to store family heirlooms long term?", "Pick an interior climate controlled unit with humidity control. Use acid-free boxes for photos and papers, wrap textiles in cotton or acid-free tissue, keep everything off the floor and check on the unit every few months."],
  ["Is heated storage the same as climate controlled storage?", "No. Heated storage only keeps a unit from getting too cold. Climate controlled storage manages heat and cold all year, and usually humidity too."],
  ["How do I find climate controlled storage facilities near me?", "Pick your city above to compare facilities with climate controlled units, or search by ZIP code below. Compare the temperature range, humidity control, price and access hours before you book."],
  ["Any tips for renting a climate controlled unit for the first time?", "Visit before you sign, ask what the unit's temperature range is, clean and dry everything before you store it, use breathable covers instead of plastic wrap, and keep a photo inventory of what goes in."],
];

export default async function ClimateCitiesPage() {
  const { cities, brands, ratings } = await getClimateStorageSummary();
  const ratingByHref = new Map(ratings.map((r) => [r.href, r]));
  const ratingSource = ratings.some((r) => r.source === "google") ? "Google reviews" : "renter reviews on facility listings";
  const states = [...new Set(cities.map((c) => c.state))].sort((a, b) => (US_STATE_NAMES[a] ?? a).localeCompare(US_STATE_NAMES[b] ?? b));
  const faqSchema = faqPageSchema(cityFaqs.map(([question, answer]) => ({ question, answer })));
  const breadcrumbSchema = breadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Climate controlled storage", path: "/climate-controlled-storage" },
    { name: "Cities and brands", path: "/climate-controlled-storage/cities" },
  ]);

  return (
    <main className="storage-size-guide-page climate-storage-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="storage-size-guide-hero hero-photo hero-photo-climate">
        <div className="storage-size-guide-hero-inner">
          <nav className="storage-search-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span><Link href="/climate-controlled-storage">Climate controlled storage</Link><span>/</span><span aria-current="page">Cities and brands</span>
          </nav>
          <span className="storage-size-guide-eyebrow"><span /> Climate Controlled Storage</span>
          <h1>Climate controlled storage <em>by city and brand.</em></h1>
          <p>Browse every city where you can compare climate controlled units, see starting prices, and find the storage brands that offer them.</p>
        </div>
      </section>

      <section className="storage-size-guide-content" aria-labelledby="climate-all-cities-heading">
        <div className="storage-size-guide-heading">
          <span className="storage-size-guide-label">All cities</span>
          <h2 id="climate-all-cities-heading">Cities with climate controlled storage</h2>
          <p>Pick your city to compare live prices and availability. Star ratings show the top-rated brands in each city, based on {ratingSource}, updated weekly.</p>
        </div>
        {states.map((state) => (
          <div className="climate-state-group" key={state}>
            <h3>{US_STATE_NAMES[state] ?? state}</h3>
            <div className="climate-city-grid">
              {cities.filter((c) => c.state === state).map((c) => (
                <Link className="climate-city-card" href={c.href} key={c.href}>
                  <div className="climate-city-top">
                    <h4>{c.city}, {c.state}</h4>
                    {c.fromPrice !== null && <span className="climate-city-price">From ${c.fromPrice}/mo</span>}
                  </div>
                  <p>{c.facilityCount} {c.facilityCount === 1 ? "facility" : "facilities"} with climate controlled units</p>
                  {ratingByHref.get(c.href) ? (
                    <ol className="climate-card-ratings" aria-label={`Top-rated brands in ${c.city}`}>
                      {ratingByHref.get(c.href)!.brands.map((b) => (
                        <li key={b.brand}><span>{b.brand}</span><b><span className="climate-star" aria-hidden="true">★</span> {b.rating} <small>({b.reviews.toLocaleString()})</small></b></li>
                      ))}
                    </ol>
                  ) : (
                    <div className="climate-brand-chips">
                      {c.brands.slice(0, 3).map((brand) => <span key={brand}>{brand}</span>)}
                      {c.brands.length > 3 && <span>+{c.brands.length - 3} more</span>}
                    </div>
                  )}
                  <span className="climate-city-link">View {c.city} units <span aria-hidden="true">→</span></span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {brands.length > 0 && (
        <section className="storage-size-chart-section" aria-labelledby="climate-brands-heading">
          <div className="storage-size-guide-heading">
            <span className="storage-size-guide-label">Compare brands</span>
            <h2 id="climate-brands-heading">Brands offering climate controlled storage</h2>
            <p>Compare these storage brands side by side in the cities above.</p>
          </div>
          <div className="climate-brand-pills">
            {brands.filter((b) => b.facilityCount >= 2).map((brand) => (
              <span key={brand.name}><strong>{brand.name}</strong><small>{brand.facilityCount} {brand.facilityCount === 1 ? "facility" : "facilities"} · {brand.cityCount} {brand.cityCount === 1 ? "city" : "cities"}</small></span>
            ))}
          </div>
          {brands.filter((b) => b.facilityCount < 2).length > 0 && (
            <p className="climate-brand-note">Plus {brands.filter((b) => b.facilityCount < 2).length} local and independent storage brands. Pick a city above to see them all.</p>
          )}
        </section>
      )}

      <section className="storage-size-feature storage-size-feature-vehicle" aria-labelledby="climate-compare-facilities-heading">
        <div className="storage-size-feature-copy">
          <h2 id="climate-compare-facilities-heading">How to compare climate controlled storage facilities near you</h2>
          <p>Every brand runs its climate controlled buildings a little differently. Before you book a unit in your city, check these six things side by side.</p>
          <div className="storage-reference-list climate-checklist-list">
            <strong>Compare facilities on</strong>
            {compareChecks.map(([label, detail]) => <div key={label}><span>{label}</span><b>{detail}</b></div>)}
          </div>
        </div>
        <div className="storage-vehicle-visual"><img src="/images/climate-storage/indoor-unit.png" alt="Interior climate controlled storage unit" /></div>
      </section>

      <section className="storage-size-feature storage-size-feature-business" aria-labelledby="climate-heated-heading">
        <div className="storage-vehicle-visual"><img src="/images/climate-storage/furniture-unit.png" alt="Furniture stored in an indoor storage unit" /></div>
        <div className="storage-size-feature-copy">
          <h2 id="climate-heated-heading">Heated storage vs climate controlled storage</h2>
          <p>Heated storage units keep your belongings from freezing in winter, but they do not cool the unit in summer or manage moisture. Climate controlled storage holds a steady range all year and usually controls humidity too.</p>
          <p>If you are storing for a few winter months only, heated storage can work for sturdy items. For furniture, documents, heirlooms or long term storage through every season, climate controlled storage near you is the safer choice.</p>
        </div>
      </section>

      <section className="storage-size-chart-section" aria-labelledby="climate-by-state-heading">
        <div className="storage-size-guide-heading">
          <h2 id="climate-by-state-heading">Do you need climate control where you live?</h2>
          <p>Local weather decides how much climate control matters. Here is how it plays out in the states we cover.</p>
        </div>
        <div className="storage-size-table-wrap">
          <table className="storage-size-table">
            <thead><tr><th>State</th><th>What to expect</th></tr></thead>
            <tbody>{climateByState.map(([state, note]) => <tr key={state}><th scope="row">{state}</th><td>{note}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="storage-size-faq" aria-labelledby="climate-city-faq-heading">
        <div className="storage-size-guide-heading">
          <h2 id="climate-city-faq-heading">Climate controlled storage questions</h2>
        </div>
        <div className="storage-size-faq-list">
          {cityFaqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}
        </div>
      </section>

      <StorageLocationSearch
        heading="Looking for climate controlled storage near you?"
        subtext="Search by ZIP code, city, or state to compare climate controlled units in that area."
      />
      <StorageStateLinks heading="Climate controlled storage by state" />
    </main>
  );
}
