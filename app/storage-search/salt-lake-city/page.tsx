"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LocationPin from "@/components/ui/LocationPin";

const facilities = [
  { name: "Extra Space Storage - 8002 - East Millcreek - E 3300 S", address: "2150 East 3300 South, Salt Lake City, UT 84109", distance: "5.3 miles away", price: "$61", unit: "5' x 5'", fee: "No booking fee shown", href: "https://www.selfstorage.com/self-storage/utah/salt-lake-city/extra-space-storage-8002-east-millcreek-e-3300-s-212335/", online: true, rating: "5.0" },
  { name: "Extra Space Storage - 2267 - Salt Lake City - 324 S State St", address: "324 South State Street, Salt Lake City, UT 84111", distance: "0.2 miles away", price: "$53", unit: "5' x 10'", fee: "No booking fee shown", href: "https://www.selfstorage.com/self-storage/utah/salt-lake-city/extra-space-storage-2267-salt-lake-city-324-s-state-st-243146/" },
  { name: "Extra Space Storage - 8480 - Salt Lake City - 5th West", address: "1150 S 500 W, Salt Lake City, UT 84105", distance: "1.5 miles away", price: "$46", unit: "5' x 5'", fee: "No booking fee shown", href: "https://www.selfstorage.com/self-storage/utah/salt-lake-city/extra-space-storage-8480-salt-lake-city-5th-west-156854/", online: true, rating: "5.0" },
  { name: "Extra Space Storage - 2266 - Salt Lake City - W 100 S", address: "510 West 100 South, Salt Lake City, UT 84101", distance: "0.9 miles away", price: "$22", unit: "5' x 5'", fee: "No booking fee shown", href: "https://www.selfstorage.com/self-storage/utah/salt-lake-city/extra-space-storage-2266-salt-lake-city-w-100-s-243161/", online: true },
  { name: "Extra Space Storage - 5186 - Salt Lake City - S W Temple St", address: "669 South West Temple Street, Salt Lake City, UT 84101", distance: "0.5 miles away", price: "$36", unit: "5' x 10'", fee: "No booking fee shown", href: "https://www.selfstorage.com/self-storage/utah/salt-lake-city/extra-space-storage-5186-salt-lake-city-s-w-temple-st-245969/", online: true },
  { name: "Security Pro Storage", address: "471 West 500 South, Salt Lake City, UT 84101", distance: "0.8 miles away", price: "$49", unit: "5' x 5'", fee: "No booking fee shown", href: "https://www.selfstorage.com/self-storage/utah/salt-lake-city/security-pro-storage-244690/", rating: "4.5" },
  { name: "Diamond Self Storage - SLC North Temple", address: "22 N Orange St, Salt Lake City, UT 84116", distance: "2.7 miles away", price: "$65", unit: "5' x 10'", fee: "No booking fee shown", href: "https://www.selfstorage.com/self-storage/utah/salt-lake-city/diamond-self-storage-slc-north-temple-205589/", rating: "5.0" },
  { name: "700 Block Storage", address: "681 South 600 West, Salt Lake City, UT 84101", distance: "1 mile away", price: "$289", unit: "10' x 20'", fee: "No booking fee shown", href: "https://www.selfstorage.com/self-storage/utah/salt-lake-city/700-block-storage-233124/", online: true, rating: "5.0" },
];

const nearbyCities = ["South Salt Lake", "North Salt Lake", "Millcreek", "Murray", "Taylorsville", "Holladay", "West Valley City", "Woods Cross", "Bountiful", "Kearns"];

export default function SaltLakeCityStoragePage() {
  const router = useRouter();
  const [location, setLocation] = useState("Salt Lake City, UT");

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = location.trim();
    if (value) router.push(`/storage-search?location=${encodeURIComponent(value)}`);
  }

  return (
    <main className="city-storage-page">
      <section className="city-storage-hero">
        <div className="city-storage-hero-inner">
          <div className="city-storage-breadcrumb"><Link href="/storage-search">Storage search</Link><span>/</span>Salt Lake City</div>
          <div className="city-storage-eyebrow"><span /> Live local availability</div>
          <h1>Cheap self storage<br /><em>in Salt Lake City, UT.</em></h1>
          <p>Compare storage units, sizes, and move-in prices from facilities across Salt Lake City and the Wasatch Front.</p>
          <form className="city-storage-search" onSubmit={handleSearch} role="search">
            <label className="sr-only" htmlFor="salt-lake-location">Enter ZIP code or city</label>
            <LocationPin className="city-storage-search-pin" />
            <input id="salt-lake-location" value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Enter ZIP code or city" autoComplete="postal-code" />
            <button type="submit">Find storage <span aria-hidden="true">→</span></button>
          </form>
          <div className="city-storage-hero-facts"><span><strong>88</strong> facilities found</span><span><strong>From $15</strong> small units</span><span><strong>84101</strong> central ZIP</span></div>
        </div>
      </section>

      <section className="city-storage-results" aria-labelledby="salt-lake-results-heading">
        <div className="city-storage-results-head">
          <div><span className="city-storage-label">Salt Lake City, Utah</span><h2 id="salt-lake-results-heading">Storage units near you</h2><p>Showing 1 - 8 of 88 facilities. Prices and availability can change, so confirm details before reserving.</p></div>
          <label className="city-storage-sort">Sort by <select defaultValue="recommended"><option value="recommended">Recommended</option><option value="price">Lowest price</option><option value="distance">Closest first</option></select></label>
        </div>
        <div className="city-storage-layout">
          <div className="city-storage-list">
            {facilities.map((facility) => <article className="facility-card" key={facility.name}><div className="facility-card-top"><div><span className="facility-distance">{facility.distance}</span><h3>{facility.name}</h3><p>{facility.address}</p></div><div className="facility-pin"><LocationPin /></div></div><div className="facility-card-meta"><span className="facility-unit">{facility.unit}</span><span className="facility-price"><strong>{facility.price}</strong> / month</span><span className="facility-fee">{facility.fee}</span></div><div className="facility-card-bottom"><div className="facility-signals">{facility.online && <span className="facility-online">Online move-in</span>}{facility.rating && <span className="facility-rating">{facility.rating} <span aria-hidden="true">★</span></span>}</div><a href={facility.href} target="_blank" rel="noreferrer">View units <span aria-hidden="true">↗</span></a></div></article>)}
          </div>
          <aside className="city-storage-map" aria-label="Salt Lake City storage area map"><div className="map-grid" /><div className="map-route map-route-one" /><div className="map-route map-route-two" /><div className="map-marker marker-one">1</div><div className="map-marker marker-two">$</div><div className="map-marker marker-three">3</div><div className="map-label">Salt Lake City storage area</div><span className="map-compass">N</span></aside>
        </div>
      </section>

      <section className="city-storage-info"><div className="city-storage-info-grid"><div><span className="city-storage-label">Salt Lake City self storage information</span><h2>Storage for life at the Crossroads of the West.</h2></div><div><p>Salt Lake City storage gives residents flexible space for moves, seasonal gear, business inventory, and everything that comes with life near the Wasatch Mountains.</p><p>Compare Salt Lake City mini storage by ZIP code, unit size, monthly price, and move-in options before you reserve.</p></div></div><div className="city-storage-feature-row"><div><strong>Common sizes</strong><span>5' x 5' to 10' x 20'</span></div><div><strong>Popular amenities</strong><span>Climate control, drive-up access</span></div><div><strong>Average unit price</strong><span>$75.00 in recent reservations</span></div></div></section>

      <section className="city-storage-links"><div><span className="city-storage-label">Keep exploring</span><h2>Nearby Utah cities</h2></div><div className="nearby-city-grid">{nearbyCities.map((city) => <Link href={`/storage-search?location=${encodeURIComponent(city + ", UT")}`} key={city}>{city}</Link>)}</div></section>
    </main>
  );
}
