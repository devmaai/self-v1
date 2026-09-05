"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LocationPin from "@/components/ui/LocationPin";
import StorageStateLinks from "@/components/sections/StorageStateLinks";

const FEATURED_CITIES = [
  "Salt Lake City", "West Valley City", "Cedar City", "Park City", "Heber City", "Brigham City", "Yuba City", "National City", "Culver City", "Daly City", "Redwood City", "King City", "Cathedral City", "Sun City", "Harbor City", "Sand City", "New York City", "Long Island City", "Garden City", "Newburgh", "City Island", "Co-op City", "Starrett City", "LeFrak City", "Kansas City", "Jefferson City", "Platte City", "University City", "Webb City", "Wright City", "Kimberling City", "Crystal City", "Panama City / Panama City Beach", "Lake City", "Cooper City", "Plant City", "Florida City", "Orange City", "Dade City", "Haines City", "Palm City", "Polk City", "Jersey City", "Union City", "Atlantic City", "Ocean City", "Gloucester City", "Neptune City", "Oklahoma City", "Midwest City", "Del City", "Ponca City", "Park City", "Kansas City (KS)", "Junction City", "Garden City", "Dodge City", "Baldwin City", "Missouri City", "Royse City", "League City", "Texas City", "Bay City", "Haltom City", "Universal City", "Lakeside City", "Horizon City", "Rapid City",
];

const STORAGE_TYPES = [
  { icon: "box", title: "Self Storage", body: "Self-storage units are most commonly used to store personal items, furniture, and excess belongings. Units come in different sizes, from small lockers to large spaces.", href: "/storage-search?location=Self%20Storage" },
  { icon: "car", title: "Car Storage", body: "Collector, vintage, classic, or spare cars often need a space to be stored. Choose from indoor, covered, or outdoor options for the protection your vehicle needs.", href: "/storage-search?location=Car%20Storage" },
  { icon: "rv", title: "RV Storage", body: "RV storage is designed for motorhomes, travel trailers, and campers, with options such as electrical hookups, covered spaces, and wide driveways.", href: "/storage-search?location=RV%20Storage" },
  { icon: "boat", title: "Boat Storage", body: "Boat storage can be indoor, covered, or outdoor. Facilities may have restrictions on the size and type of boats they can accommodate.", href: "/storage-search?location=Boat%20Storage" },
  { icon: "climate", title: "Climate Controlled", body: "Climate-controlled self-storage protects your belongings from environmental changes by maintaining consistent temperature and humidity levels.", href: "/storage-search?location=Climate%20Controlled" },
  { icon: "business", title: "Business Storage", body: "Small businesses and entrepreneurs often need additional space to store inventory, documents, and equipment. Business storage is designed to fit those needs.", href: "/storage-search?location=Business%20Storage" },
];

type StorageTypeIconName = (typeof STORAGE_TYPES)[number]["icon"];

function StorageTypeIcon({ name }: { name: StorageTypeIconName }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  if (name === "car") return <svg viewBox="0 0 48 48" aria-hidden="true"><path {...common} d="M9 29h30l-3-9H14l-5 9Z" /><path {...common} d="M12 29v5m24-5v5M15 24h18M13 34h4m14 0h4" /><circle {...common} cx="15" cy="29" r="2" /><circle {...common} cx="33" cy="29" r="2" /></svg>;
  if (name === "rv") return <svg viewBox="0 0 48 48" aria-hidden="true"><path {...common} d="M8 14h25a7 7 0 0 1 7 7v12H8V14Z" /><path {...common} d="M40 26h3v7h-3M13 18h13v9H13zM17 37a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm19 0a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" /></svg>;
  if (name === "boat") return <svg viewBox="0 0 48 48" aria-hidden="true"><path {...common} d="M12 28h25l-4 8H16l-4-8Zm4 0 3-11h9l5 11M23 17v-6m0 0h8l-4 4" /><path {...common} d="M9 39c4-3 7 3 11 0 4-3 7 3 11 0 4-3 7 3 10 0" /></svg>;
  if (name === "climate") return <svg viewBox="0 0 48 48" aria-hidden="true"><path {...common} d="M24 9v20M24 29a6 6 0 1 0 4 6V9a4 4 0 0 0-8 0v26a6 6 0 1 0 4-6Z" /><path {...common} d="M11 17h6m-6 7h6m14-7h6m-6 7h6" /></svg>;
  if (name === "business") return <svg viewBox="0 0 48 48" aria-hidden="true"><rect {...common} x="7" y="11" width="25" height="25" rx="2" /><path {...common} d="M14 36V19h11v17M12 16h15M36 23v13m-5-6h10m-8-5 3-3 3 3" /></svg>;
  return <svg viewBox="0 0 48 48" aria-hidden="true"><path {...common} d="M8 15h32v22H8zM8 15l5-5h22l5 5M16 15v22m16-22v22M8 27h32" /><path {...common} d="M20 21h8" /></svg>;
}

const UNIT_SIZES = [
  { icon: "▧", title: "Small Units", range: "25 to 75 SQ FT", sizes: ["5' x 5'", "5' x 10'", "5' x 15'"], looksLike: "A closet, a half bathroom, or a small bedroom.", fits: "Small furniture and personal items stored in boxes to the contents that make up a small bedroom." },
  { icon: "▦", title: "Medium Units", range: "75 to 200 SQ FT", sizes: ["10' x 10'", "10' x 15'", "10' x 20'"], looksLike: "An average bedroom or a small garage depending on the unit size.", fits: "The contents of a one-bedroom apartment to the contents of a two-to-three bedroom house." },
  { icon: "▥", title: "Large Units", range: "200 to 300 SQ FT", sizes: ["10' x 25'", "10' x 30'"], looksLike: "A large bedroom to a two-car garage depending on the unit size.", fits: "The contents of a three-bedroom house or full garage to the contents of a four or five-bedroom house." },
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

      <section className="storage-types" aria-labelledby="storage-types-heading">
        <div className="storage-guide-heading">
          <span className="storage-search-label">Find the right fit</span>
          <h2 id="storage-types-heading">Types of self storage</h2>
          <p>Learn more about the types of self storage to identify what type of storage unit you need.</p>
        </div>
        <div className="storage-types-grid">
          {STORAGE_TYPES.map((type) => (
            <article className="storage-type-item" key={type.title}>
              <div className="storage-type-icon"><StorageTypeIcon name={type.icon} /></div>
              <div><h3>{type.title}</h3><p>{type.body}</p><Link href={type.href}>Learn about {type.title} <span aria-hidden="true">→</span></Link></div>
            </article>
          ))}
        </div>
      </section>

      <section className="unit-size-guide" aria-labelledby="unit-size-heading">
        <div className="storage-guide-heading">
          <span className="storage-guide-symbol" aria-hidden="true">↕</span>
          <h2 id="unit-size-heading">Picking a storage unit size</h2>
          <p>Use our storage unit size guide to identify what size storage unit you need.</p>
          <Link className="storage-guide-link" href="/storage-search">View the full size guide <span aria-hidden="true">→</span></Link>
        </div>
        <div className="unit-size-grid">
          {UNIT_SIZES.map((unit) => (
            <article className="unit-size-card" key={unit.title}>
              <div className="unit-size-icon" aria-hidden="true">{unit.icon}</div>
              <h3>{unit.title}</h3><span className="unit-size-range">{unit.range}</span>
              <div className="unit-size-tags">{unit.sizes.map((size) => <span key={size}>{size}</span>)}</div>
              <p><strong>Looks Like:</strong> {unit.looksLike}</p><p><strong>Fits:</strong> {unit.fits}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="storage-search-note">
        <div className="storage-search-note-mark" aria-hidden="true">+</div>
        <div><strong>Looking for a specific facility?</strong><span>Search by ZIP code above and we&apos;ll point you toward storage options in that area.</span></div>
      </section>

      <StorageStateLinks />
      <nav className="storage-search-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/storage-search">Storage search</Link><span>/</span><span aria-current="page">Featured cities and storage guides</span></nav>
    </main>
  );
}
