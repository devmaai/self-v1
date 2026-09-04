"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LocationPin from "@/components/ui/LocationPin";

const FEATURED_CITIES = [
  "Salt Lake City", "West Valley City", "Cedar City", "Park City", "Heber City", "Brigham City", "Yuba City", "National City", "Culver City", "Daly City", "Redwood City", "King City", "Cathedral City", "Sun City", "Harbor City", "Sand City", "New York City", "Long Island City", "Garden City", "Newburgh", "City Island", "Co-op City", "Starrett City", "LeFrak City", "Kansas City", "Jefferson City", "Platte City", "University City", "Webb City", "Wright City", "Kimberling City", "Crystal City", "Panama City / Panama City Beach", "Lake City", "Cooper City", "Plant City", "Florida City", "Orange City", "Dade City", "Haines City", "Palm City", "Polk City", "Jersey City", "Union City", "Atlantic City", "Ocean City", "Gloucester City", "Neptune City", "Oklahoma City", "Midwest City", "Del City", "Ponca City", "Park City", "Kansas City (KS)", "Junction City", "Garden City", "Dodge City", "Baldwin City", "Missouri City", "Royse City", "League City", "Texas City", "Bay City", "Haltom City", "Universal City", "Lakeside City", "Horizon City", "Rapid City",
];

function cityHref(city: string) {
  if (city === "Salt Lake City") return "/storage-search/salt-lake-city";
  return `/storage-search?location=${encodeURIComponent(city)}`;
}

export default function StorageSearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [searchedLocation, setSearchedLocation] = useState("");

  useEffect(() => {
    const location = new URLSearchParams(window.location.search).get("location") ?? "";
    setQuery(location);
    setSearchedLocation(location);
  }, []);

  const matchingCities = useMemo(() => {
    const normalized = searchedLocation.trim().toLowerCase();
    if (!normalized || /^\d{5}(-\d{4})?$/.test(normalized)) return FEATURED_CITIES;
    return FEATURED_CITIES.filter((city) => city.toLowerCase().includes(normalized));
  }, [searchedLocation]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const location = query.trim();
    if (!location) return;
    setSearchedLocation(location);
    router.replace(`/storage-search?location=${encodeURIComponent(location)}`);
  }

  return (
    <main className="storage-search-page">
      <section className="storage-search-hero">
        <div className="storage-search-hero-inner">
          <div className="storage-search-kicker"><span /> Storage search, made simple</div>
          <h1>Find a storage unit<br /><em>near you.</em></h1>
          <p>Compare storage options in your area and find a space that fits your move, your budget, and your plans.</p>
          <form className="storage-search-form" onSubmit={handleSubmit} role="search">
            <label className="sr-only" htmlFor="storage-location">Enter ZIP code or city</label>
            <LocationPin className="storage-search-pin" />
            <input id="storage-location" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Enter ZIP code or city" autoComplete="postal-code" />
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

      <section className="storage-search-note">
        <div className="storage-search-note-mark" aria-hidden="true">+</div>
        <div><strong>Looking for a specific facility?</strong><span>Search by ZIP code above and we&apos;ll point you toward storage options in that area.</span></div>
      </section>
    </main>
  );
}
