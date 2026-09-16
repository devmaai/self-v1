"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LocationPin from "@/components/ui/LocationPin";
import { resolveStorageSearchHref, STATE_PAGE_SLUGS } from "@/lib/storageSearchLookup";
import { CITY_STATES } from "@/lib/cityStates";

const FEATURED_CITIES = [
  "Salt Lake City", "West Valley City", "Cedar City", "Park City", "Heber City", "Brigham City", "Yuba City", "National City", "Culver City", "Daly City", "Redwood City", "King City", "Cathedral City", "Sun City", "Harbor City", "Sand City", "New York City", "Long Island City", "Garden City", "Newburgh", "City Island", "Co-op City", "Starrett City", "LeFrak City", "Kansas City", "Jefferson City", "Platte City", "University City", "Webb City", "Wright City", "Kimberling City", "Crystal City", "Panama City / Panama City Beach", "Lake City", "Cooper City", "Plant City", "Florida City", "Orange City", "Dade City", "Haines City", "Palm City", "Polk City", "Jersey City", "Union City", "Atlantic City", "Ocean City", "Gloucester City", "Neptune City", "Oklahoma City", "Midwest City", "Del City", "Ponca City", "Park City", "Kansas City (KS)", "Junction City", "Garden City", "Dodge City", "Baldwin City", "Missouri City", "Royse City", "League City", "Texas City", "Bay City", "Haltom City", "Universal City", "Lakeside City", "Horizon City", "Rapid City",
];

const SORTED_FEATURED_CITIES = [...FEATURED_CITIES].sort((first, second) => first.localeCompare(second));
const CITY_LETTERS = [...new Set(SORTED_FEATURED_CITIES.map((city) => city[0]))];

function cityHref(city: string) {
  const liveCitySlugs: Record<string, string> = {
    "Yuba City": "yuba-city",
    "National City": "national-city",
    "Culver City": "culver-city",
    "Daly City": "daly-city",
    "Redwood City": "redwood-city",
    "Cathedral City": "cathedral-city",
    "Sun City": "sun-city",
    "Harbor City": "harbor-city",
    "Sand City": "sand-city",
  };
  const guessedSlug = city.toLowerCase().replace(/\./g, "").replace(/ /g, "-");
  const slug = liveCitySlugs[city] ?? guessedSlug;
  const state = CITY_STATES[slug];
  const stateSlug = state ? STATE_PAGE_SLUGS[state] : undefined;
  if (stateSlug) return `/storage-search/${stateSlug}/${slug}`;
  return `/storage-search?location=${encodeURIComponent(city)}`;
}

export default function CityExplorer({ initialLocation }: { initialLocation: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialLocation);
  const [searchedLocation, setSearchedLocation] = useState(initialLocation);
  const [cityLetter, setCityLetter] = useState("all");

  const matchingCities = useMemo(() => {
    const normalized = searchedLocation.trim().toLowerCase();
    return SORTED_FEATURED_CITIES.filter((city) => {
      const matchesLetter = cityLetter === "all" || city.startsWith(cityLetter);
      const matchesSearch = !normalized || /^\d{5}(-\d{4})?$/.test(normalized) || city.toLowerCase().includes(normalized);
      return matchesLetter && matchesSearch;
    });
  }, [cityLetter, searchedLocation]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const location = query.trim();
    if (!location) return;

    const href = resolveStorageSearchHref(location);
    if (!href.startsWith("/storage-search?location=")) {
      router.push(href);
      return;
    }

    setSearchedLocation(location);
    router.replace(href);
  }

  return (
    <>
      <section className="storage-search-hero">
        <div className="storage-search-hero-inner">
          <div className="storage-search-kicker"><span /> Storage search, made simple</div>
          <h1>Find a storage unit<br /><em>near you.</em></h1>
          <p>Compare storage options in your area and find a space that fits your move, your budget, and your plans.</p>
          <form className="storage-search-form" onSubmit={handleSubmit} role="search">
            <label className="sr-only" htmlFor="storage-location">Enter ZIP code, city, or state</label>
            <LocationPin className="storage-search-pin" />
            <input id="storage-location" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Enter ZIP code, city, or state" autoComplete="postal-code" />
            <button type="submit">Find units <span aria-hidden="true">→</span></button>
          </form>
          {searchedLocation && (
            <p className="storage-search-status" aria-live="polite">
              Searching around <strong>{searchedLocation}</strong>{matchingCities.length < FEATURED_CITIES.length ? `, ${matchingCities.length} featured ${matchingCities.length === 1 ? "city" : "cities"} found` : ""}.
            </p>
          )}
        </div>
      </section>

      <section className="storage-search-directory" aria-labelledby="featured-cities-heading">
        <div className="storage-search-section-heading">
          <div>
            <span className="storage-search-label">Explore by location</span>
            <h2 id="featured-cities-heading">Featured cities</h2>
          </div>
          <p>Browse storage locations in popular cities, or search above for your ZIP code.</p>
        </div>
        <label className="storage-city-filter">Browse by letter
          <select value={cityLetter} onChange={(event) => setCityLetter(event.target.value)}>
            <option value="all">All cities</option>
            {CITY_LETTERS.map((letter) => <option value={letter} key={letter}>{letter}</option>)}
          </select>
        </label>
        {matchingCities.length ? (
          <div className="storage-city-grid">
            {matchingCities.map((city, index) => (
              <Link className="storage-city-card" href={cityHref(city)} key={`${city}-${index}`}>
                <span>{city}</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="storage-search-empty">
            <h3>No featured city matches yet.</h3>
            <p>Try a different city name or enter a ZIP code to search the area around you.</p>
          </div>
        )}
      </section>
    </>
  );
}
