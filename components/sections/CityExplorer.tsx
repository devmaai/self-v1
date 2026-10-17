"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LocationPin from "@/components/ui/LocationPin";
import { resolveStorageSearchHref, STATE_PAGE_SLUGS } from "@/lib/storageSearchLookup";
import { CITY_STATES, isCityPublished } from "@/lib/cityStates";

const ALL_FEATURED_CITIES = [
  { name: "Salt Lake City", slug: "salt-lake-city" },
  { name: "West Valley City", slug: "west-valley-city" },
  { name: "Cedar City", slug: "cedar-city" },
  { name: "Park City", slug: "park-city" },
  { name: "Heber City", slug: "heber-city" },
  { name: "Brigham City", slug: "brigham-city" },
  { name: "Yuba City", slug: "yuba-city" },
  { name: "National City", slug: "national-city" },
  { name: "Culver City", slug: "culver-city" },
  { name: "Daly City", slug: "daly-city" },
  { name: "Redwood City", slug: "redwood-city" },
  { name: "King City", slug: "king-city" },
  { name: "Cathedral City", slug: "cathedral-city" },
  { name: "Sun City", slug: "sun-city" },
  { name: "Harbor City", slug: "harbor-city" },
  { name: "Sand City", slug: "sand-city" },
  { name: "New York City", slug: "new-york-city" },
  { name: "Long Island City", slug: "long-island-city" },
  { name: "Newburgh", slug: "newburgh" },
  { name: "City Island", slug: "city-island" },
  { name: "Co-op City", slug: "co-op-city" },
  { name: "Starrett City", slug: "starrett-city" },
  { name: "LeFrak City", slug: "lefrak-city" },
  { name: "Kansas City", slug: "kansas-city" },
  { name: "Jefferson City", slug: "jefferson-city" },
  { name: "Platte City", slug: "platte-city" },
  { name: "University City", slug: "university-city" },
  { name: "Webb City", slug: "webb-city" },
  { name: "Wright City", slug: "wright-city" },
  { name: "Kimberling City", slug: "kimberling-city" },
  { name: "Crystal City", slug: "crystal-city" },
];

// Only cities that are live appear; drafted cities stay hidden.
const FEATURED_CITIES = ALL_FEATURED_CITIES.filter((city) => isCityPublished(city.slug));

const SORTED_FEATURED_CITIES = [...FEATURED_CITIES].sort((first, second) => first.name.localeCompare(second.name));
const CITY_LETTERS = [...new Set(SORTED_FEATURED_CITIES.map((city) => city.name[0]))];

function cityHref(city: (typeof FEATURED_CITIES)[number]) {
  const state = CITY_STATES[city.slug];
  const stateSlug = state ? STATE_PAGE_SLUGS[state] : undefined;
  if (stateSlug) return `/storage-search/${stateSlug}/${city.slug}`;
  return `/storage-search?location=${encodeURIComponent(city.name)}`;
}

export default function CityExplorer({ initialLocation }: { initialLocation: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialLocation);
  const [searchedLocation, setSearchedLocation] = useState(initialLocation);
  const [cityLetter, setCityLetter] = useState("all");

  const matchingCities = useMemo(() => {
    const normalized = searchedLocation.trim().toLowerCase();
    return SORTED_FEATURED_CITIES.filter((city) => {
      const matchesLetter = cityLetter === "all" || city.name.startsWith(cityLetter);
      const matchesSearch = !normalized || /^\d{5}(-\d{4})?$/.test(normalized) || city.name.toLowerCase().includes(normalized);
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
              <Link className="storage-city-card" href={cityHref(city)} key={`${city.slug}-${index}`}>
                <span>{city.name}</span>
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
