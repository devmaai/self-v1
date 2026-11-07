import Link from "next/link";
import StorageLocationSearch from "@/components/sections/StorageLocationSearch";
import StorageStateLinks from "@/components/sections/StorageStateLinks";
import StateZipSearch from "@/components/sections/StateZipSearch";
import CityLetterIndex, { letterAnchor } from "@/components/sections/CityLetterIndex";
import { getStorageSummary, isDriveUp } from "@/lib/climateStorage";
import { breadcrumbListSchema, faqPageSchema } from "@/lib/schema";
import { US_STATE_NAMES } from "@/lib/usStates";
import type { TypeCitiesConfig } from "@/lib/storageTypeCities";

/** "[Type] storage by city and brand" page, laid out like the climate controlled one. */
export default async function StorageTypeCitiesPage({ c }: { c: TypeCitiesConfig }) {
  const { cities, brands, ratings } = await getStorageSummary(isDriveUp);
  const ratingByHref = new Map(ratings.map((r) => [r.href, r]));
  const ratingSource = ratings.some((r) => r.source === "google") ? "Google reviews" : "renter reviews on facility listings";
  const states = [...new Set(cities.map((city) => city.state))].sort((a, b) => (US_STATE_NAMES[a] ?? a).localeCompare(US_STATE_NAMES[b] ?? b));
  const faqSchema = faqPageSchema(c.faqs.map(([question, answer]) => ({ question, answer })));
  const breadcrumbSchema = breadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: c.name, path: `/${c.slug}` },
    { name: "Cities and brands", path: `/${c.slug}/cities` },
  ]);

  const letters = new Set(cities.map((x) => x.city.trim()[0]?.toUpperCase()).filter(Boolean) as string[]);
  const usedLetters = new Set<string>();

  return (
    <main className="storage-size-guide-page climate-storage-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className={`storage-size-guide-hero hero-photo ${c.heroClass}`}>
        <div className="storage-size-guide-hero-inner">
          <nav className="storage-search-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span><Link href={`/${c.slug}`}>{c.name}</Link><span>/</span><span aria-current="page">Cities and brands</span>
          </nav>
          <span className="storage-size-guide-eyebrow"><span /> {c.name}</span>
          <h1>{c.name} <em>by city and brand.</em></h1>
          <p>{c.intro}</p>
          <StateZipSearch id="type-cities-zip" />
        </div>
      </section>

      <section className="storage-size-guide-content" aria-labelledby={`${c.slug}-all-cities-heading`}>
        <div className="storage-size-guide-heading">
          <span className="storage-size-guide-label">All cities</span>
          <h2 id={`${c.slug}-all-cities-heading`}>Cities with {c.lower}</h2>
          <p>Pick your city to compare live prices and availability. Star ratings show the top-rated brands in each city, based on {ratingSource}, updated weekly.</p>
        </div>
        <CityLetterIndex letters={letters} />
        {states.map((state) => (
          <div className="climate-state-group" key={state}>
            <h3>{US_STATE_NAMES[state] ?? state}</h3>
            <div className="climate-city-grid">
              {cities.filter((city) => city.state === state).map((city) => (
                <Link className="climate-city-card" href={city.href} key={city.href} id={letterAnchor(city.city, usedLetters)}>
                  <div className="climate-city-top">
                    <h4>{city.city}, {city.state}</h4>
                    {city.fromPrice !== null && <span className="climate-city-price">From ${city.fromPrice}/mo</span>}
                  </div>
                  <p>{city.facilityCount} {city.facilityCount === 1 ? "facility" : "facilities"} {c.cardLine}</p>
                  {ratingByHref.get(city.href) ? (
                    <ol className="climate-card-ratings" aria-label={`Top-rated brands in ${city.city}`}>
                      {ratingByHref.get(city.href)!.brands.map((b) => (
                        <li key={b.brand}><span>{b.brand}</span><b><span className="climate-star" aria-hidden="true">★</span> {b.rating} <small>({b.reviews.toLocaleString()})</small></b></li>
                      ))}
                    </ol>
                  ) : (
                    <div className="climate-brand-chips">
                      {city.brands.slice(0, 3).map((brand) => <span key={brand}>{brand}</span>)}
                      {city.brands.length > 3 && <span>+{city.brands.length - 3} more</span>}
                    </div>
                  )}
                  <span className="climate-city-link">View {city.city} units <span aria-hidden="true">→</span></span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {brands.length > 0 && (
        <section className="storage-size-chart-section" aria-labelledby={`${c.slug}-brands-heading`}>
          <div className="storage-size-guide-heading">
            <span className="storage-size-guide-label">Compare brands</span>
            <h2 id={`${c.slug}-brands-heading`}>Brands offering {c.lower}</h2>
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

      <section className="storage-size-feature storage-size-feature-vehicle" aria-labelledby={`${c.slug}-compare-heading`}>
        <div className="storage-size-feature-copy">
          <h2 id={`${c.slug}-compare-heading`}>{c.compareHeading}</h2>
          <p>{c.compareIntro}</p>
          <div className="storage-reference-list climate-checklist-list">
            <strong>Compare facilities on</strong>
            {c.checks.map(([label, detail]) => <div key={label}><span>{label}</span><b>{detail}</b></div>)}
          </div>
        </div>
        <div className="storage-vehicle-visual"><img src={c.image} alt={c.imageAlt} /></div>
      </section>

      <section className="storage-size-faq" aria-labelledby={`${c.slug}-city-faq-heading`}>
        <div className="storage-size-guide-heading">
          <h2 id={`${c.slug}-city-faq-heading`}>{c.name} questions</h2>
        </div>
        <div className="storage-size-faq-list">
          {c.faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}
        </div>
      </section>

      <StorageLocationSearch
        heading={`Looking for ${c.lower} near you?`}
        subtext={`Search by ZIP code, city, or state to compare ${c.lower} in that area.`}
      />
      <StorageStateLinks heading={`${c.name} by state`} />
    </main>
  );
}
