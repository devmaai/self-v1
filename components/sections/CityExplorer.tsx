"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LocationPin from "@/components/ui/LocationPin";
import { resolveStorageSearchHref, STATE_PAGE_SLUGS } from "@/lib/storageSearchLookup";
import { CITY_STATES, PUBLISHED_CITY_SLUGS } from "@/lib/cityStates";
import { US_STATE_NAMES } from "@/lib/usStates";

const NAME_OVERRIDES: Record<string, string> = {
  "lees-summit": "Lee's Summit",
  ofallon: "O'Fallon",
};

function cityNameFromSlug(slug: string) {
  if (NAME_OVERRIDES[slug]) return NAME_OVERRIDES[slug];
  return slug
    .split("-")
    .map((part, index) => (index === 0 && part === "st" ? "St." : part[0].toUpperCase() + part.slice(1)))
    .join(" ");
}

// Every live city is featured; drafted cities stay hidden.
const FEATURED_CITIES = [...PUBLISHED_CITY_SLUGS].map((slug) => ({
  name: cityNameFromSlug(slug),
  slug,
  state: CITY_STATES[slug],
}));

// Finds a state named in the search text, e.g. "Missouri storage prices" -> "MO".
function stateInQuery(normalized: string): string | undefined {
  return Object.entries(US_STATE_NAMES).find(([, name]) => normalized.includes(name.toLowerCase()))?.[0];
}

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
    const byLetter = SORTED_FEATURED_CITIES.filter((city) => cityLetter === "all" || city.name.startsWith(cityLetter));
    if (!normalized || /^\d{5}(-\d{4})?$/.test(normalized)) return byLetter;
    const byCity = byLetter.filter((city) => city.name.toLowerCase().includes(normalized) || normalized.includes(city.name.toLowerCase()));
    if (byCity.length) return byCity;
    const state = stateInQuery(normalized);
    const byState = state ? byLetter.filter((city) => city.state === state) : [];
    // Never leave the list empty: fall back to every live city.
    return byState.length ? byState : byLetter;
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
