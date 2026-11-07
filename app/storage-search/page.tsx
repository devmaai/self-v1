import type { Metadata } from "next";
import Link from "next/link";
import { CITY_STATES, isCityPublished } from "@/lib/cityStates";
import { STATE_PAGE_SLUGS } from "@/lib/storageSearchLookup";
import { US_STATE_NAMES } from "@/lib/usStates";
import { breadcrumbListSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Storage Units by State | Find Self Storage in Your City",
  description: "Browse self storage by state. Pick your state, open the city list, and compare storage unit prices, sizes and availability near you.",
  alternates: { canonical: "/storage-search" },
};

const CITY_NAME_FIXES: Record<string, string> = {
  "st-george": "St. George",
  "st-louis": "St. Louis",
  "st-charles": "St. Charles",
  "st-peters": "St. Peters",
  "lees-summit": "Lee's Summit",
  ofallon: "O'Fallon",
  "syracuse-ut": "Syracuse",
};

function cityName(slug: string): string {
  return CITY_NAME_FIXES[slug] ?? slug.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

// Every live state, with its published cities sorted A to Z.
const STATES = Object.entries(STATE_PAGE_SLUGS)
  .map(([code, slug]) => ({
    code,
    slug,
    name: US_STATE_NAMES[code] ?? code,
    cities: Object.entries(CITY_STATES)
      .filter(([citySlug, state]) => state === code && isCityPublished(citySlug))
      .map(([citySlug]) => ({ slug: citySlug, name: cityName(citySlug) }))
      .sort((a, b) => a.name.localeCompare(b.name)),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export default function StorageByStatePage() {
  const breadcrumbs = breadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Storage by state", path: "/storage-search" },
  ]);

  return (
    <main className="state-storage-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <section className="state-storage-hero">
        <div className="state-storage-hero-inner">
          <h1>Storage units <em>by state</em></h1>
          <p>Choose your state, open the city list, and go straight to storage units near you with prices, sizes and availability.</p>
        </div>
      </section>

      <section className="state-storage-faq" aria-labelledby="states-heading">
        <div className="state-storage-heading">
          <h2 id="states-heading">Find storage in your state</h2>
          <p>Select a state to see every city we cover. Tap a city to compare storage units there, or open the state page for an overview.</p>
        </div>
        <div className="state-faq-list">
          {STATES.map((state) => (
            <details key={state.code}>
              <summary>
                {state.name} ({state.cities.length} cities)
                <span aria-hidden="true">+</span>
              </summary>
              <div className="state-city-grid state-hub-cities">
                <Link href={`/storage-search/${state.slug}`}>All of {state.name}<span aria-hidden="true">→</span></Link>
                {state.cities.map((city) => (
                  <Link key={city.slug} href={`/storage-search/${state.slug}/${city.slug}`}>
                    {city.name}, {state.code}<span aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
