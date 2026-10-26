import type { Metadata } from "next";
import Link from "next/link";
import StorageLocationSearch from "@/components/sections/StorageLocationSearch";
import StorageStateLinks from "@/components/sections/StorageStateLinks";
import { getClimateStorageSummary } from "@/lib/climateStorage";
import { breadcrumbListSchema } from "@/lib/schema";
import { US_STATE_NAMES } from "@/lib/usStates";

export const revalidate = 604800;

export const metadata: Metadata = {
  title: "Climate Controlled Storage by City and Brand | SelfStorage.help",
  description:
    "Browse every city with climate controlled storage on SelfStorage.help. Compare facilities, starting prices and the storage brands that offer climate controlled units.",
  alternates: { canonical: "/climate-controlled-storage/cities" },
};

export default async function ClimateCitiesPage() {
  const { cities, brands } = await getClimateStorageSummary();
  const states = [...new Set(cities.map((c) => c.state))].sort((a, b) => (US_STATE_NAMES[a] ?? a).localeCompare(US_STATE_NAMES[b] ?? b));
  const breadcrumbSchema = breadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Climate controlled storage", path: "/climate-controlled-storage" },
    { name: "Cities and brands", path: "/climate-controlled-storage/cities" },
  ]);

  return (
    <main className="storage-size-guide-page climate-storage-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

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
          <p>Pick your city to compare live prices and availability from each brand.</p>
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
                  <div className="climate-brand-chips">
                    {c.brands.slice(0, 3).map((brand) => <span key={brand}>{brand}</span>)}
                    {c.brands.length > 3 && <span>+{c.brands.length - 3} more</span>}
                  </div>
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
          <div className="storage-size-table-wrap">
            <table className="storage-size-table">
              <thead><tr><th>Brand</th><th>Facilities with climate control</th><th>Cities</th></tr></thead>
              <tbody>
                {brands.map((brand) => (
                  <tr key={brand.name}><th scope="row">{brand.name}</th><td>{brand.facilityCount}</td><td>{brand.cityCount}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <StorageLocationSearch
        heading="Looking for climate controlled storage near you?"
        subtext="Search by ZIP code, city, or state to compare climate controlled units in that area."
      />
      <StorageStateLinks heading="Climate controlled storage by state" />
    </main>
  );
}
