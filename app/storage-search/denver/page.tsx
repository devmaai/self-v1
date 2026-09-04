"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LocationPin from "@/components/ui/LocationPin";

const facilities = [
  {
    name: "Extra Space Storage - 2014 - Denver 900 Grant Street",
    address: "900 Grant Street, Denver, CO 80203",
    distance: "0.7 miles away",
    price: "$51",
    unit: "5' x 5'",
    fee: "$29 in fees",
    href: "https://www.selfstorage.com/self-storage/colorado/denver/extra-space-storage-2014-denver-900-grant-street-228939/",
    online: true,
  },
  {
    name: "Public Storage - Denver - 2900 Fox St",
    address: "2900 Fox St, Denver, CO 80202",
    distance: "1.4 miles away",
    price: "$54",
    unit: "5' x 5'",
    fee: "$29 in fees",
    href: "https://www.selfstorage.com/self-storage/colorado/denver/public-storage-denver-2900-fox-st-214414/",
    rating: "4.5",
  },
  {
    name: "Public Storage - Denver - 2100 Blake Street",
    address: "2100 Blake Street, Denver, CO 80205",
    distance: "1.1 miles away",
    price: "$44.80",
    unit: "5' x 5'",
    fee: "$29 in fees",
    href: "https://www.selfstorage.com/self-storage/colorado/denver/public-storage-denver-2100-blake-street-215144/",
    rating: "4.5",
  },
  {
    name: "Extra Space Storage - 2016 - Denver - 2255 Champa Street",
    address: "2255 Champa Street, Denver, CO 80205",
    distance: "1 mile away",
    price: "$51",
    unit: "5' x 5'",
    fee: "$29 in fees",
    href: "https://www.selfstorage.com/self-storage/colorado/denver/extra-space-storage-2016-denver-2255-champa-street-228941/",
    online: true,
  },
  {
    name: "Midgard Self Storage - Denver - 741 Osage Street",
    address: "741 Osage Street, Denver, CO 80204",
    distance: "1.2 miles away",
    price: "$42",
    unit: "5' x 5'",
    fee: "No booking fee shown",
    href: "https://www.selfstorage.com/self-storage/colorado/denver/midgard-self-storage-denver-741-osage-street-224758/",
    rating: "3.5",
  },
  {
    name: "Mini U Storage - Iliff",
    address: "7600 E Iliff Ave, Denver, CO 80231",
    distance: "6.5 miles away",
    price: "$19",
    unit: "5' x 5'",
    fee: "$20 in fees",
    href: "https://www.selfstorage.com/self-storage/colorado/denver/mini-u-storage-iliff-153130/",
    rating: "4.0",
  },
  {
    name: "Public Storage - Denver - 4403 S Tamarac Parkway",
    address: "4403 S Tamarac Parkway, Denver, CO 80237",
    distance: "8.7 miles away",
    price: "$29.40",
    unit: "5' x 5'",
    fee: "$29 in fees",
    href: "https://www.selfstorage.com/self-storage/colorado/denver/public-storage-denver-4403-s-tamarac-parkway-214421/",
    rating: "4.5",
  },
  {
    name: "SecureSpace Self Storage Park Hill Denver",
    address: "7200 East 36th Avenue, Denver, CO 80207",
    distance: "4.9 miles away",
    price: "$41",
    unit: "5' x 10'",
    fee: "$29 in fees",
    href: "https://www.selfstorage.com/self-storage/colorado/denver/securespace-self-storage-park-hill-denver-224180/",
    rating: "4.0",
  },
];

const nearbyCities = ["Glendale", "Lakewood", "Wheat Ridge", "Commerce City", "Englewood", "Arvada", "Federal Heights", "Westminster", "Greenwood Village", "Littleton"];

export default function DenverStoragePage() {
  const router = useRouter();
  const [location, setLocation] = useState("Denver, CO");

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = location.trim();
    if (value) router.push(`/storage-search?location=${encodeURIComponent(value)}`);
  }

  return (
    <main className="city-storage-page">
      <section className="city-storage-hero">
        <div className="city-storage-hero-inner">
          <div className="city-storage-breadcrumb"><Link href="/storage-search">Storage search</Link><span>/</span>Denver</div>
          <div className="city-storage-eyebrow"><span /> Live local availability</div>
          <h1>Cheap self storage<br /><em>in Denver, CO.</em></h1>
          <p>Compare storage units, sizes, and move-in prices from facilities across Denver and nearby communities.</p>
          <form className="city-storage-search" onSubmit={handleSearch} role="search">
            <label className="sr-only" htmlFor="denver-location">Enter ZIP code or city</label>
            <LocationPin className="city-storage-search-pin" />
            <input id="denver-location" value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Enter ZIP code or city" autoComplete="postal-code" />
            <button type="submit">Find storage <span aria-hidden="true">→</span></button>
          </form>
          <div className="city-storage-hero-facts"><span><strong>206</strong> facilities found</span><span><strong>From $19</strong> small units</span><span><strong>80203</strong> central ZIP</span></div>
        </div>
      </section>

      <section className="city-storage-results" aria-labelledby="denver-results-heading">
        <div className="city-storage-results-head">
          <div><span className="city-storage-label">Denver, Colorado</span><h2 id="denver-results-heading">Storage units near you</h2><p>Showing 1 - 8 of 206 facilities. Prices and availability can change, so confirm details before reserving.</p></div>
          <label className="city-storage-sort">Sort by <select defaultValue="recommended"><option value="recommended">Recommended</option><option value="price">Lowest price</option><option value="distance">Closest first</option></select></label>
        </div>
        <div className="city-storage-layout">
          <div className="city-storage-list">
            {facilities.map((facility) => (
              <article className="facility-card" key={facility.name}>
                <div className="facility-card-top"><div><span className="facility-distance">{facility.distance}</span><h3>{facility.name}</h3><p>{facility.address}</p></div><div className="facility-pin"><LocationPin /></div></div>
                <div className="facility-card-meta"><span className="facility-unit">{facility.unit}</span><span className="facility-price"><strong>{facility.price}</strong> / month</span><span className="facility-fee">{facility.fee}</span></div>
                <div className="facility-card-bottom"><div className="facility-signals">{facility.online && <span className="facility-online">Online move-in</span>}{facility.rating && <span className="facility-rating">{facility.rating} <span aria-hidden="true">★</span></span>}</div><a href={facility.href} target="_blank" rel="noreferrer">View units <span aria-hidden="true">↗</span></a></div>
              </article>
            ))}
          </div>
          <aside className="city-storage-map" aria-label="Denver storage area map"><div className="map-grid" /><div className="map-route map-route-one" /><div className="map-route map-route-two" /><div className="map-marker marker-one">1</div><div className="map-marker marker-two">$</div><div className="map-marker marker-three">3</div><div className="map-label">Denver storage area</div><span className="map-compass">N</span></aside>
        </div>
      </section>

      <section className="city-storage-info"><div className="city-storage-info-grid"><div><span className="city-storage-label">Denver self storage information</span><h2>Storage that fits the Mile High City.</h2></div><div><p>Whether you are moving across town, making room for a growing business, or storing a car between seasons, Denver facilities offer flexible unit sizes and locations across the metro area.</p><p>Use the search above to check a ZIP code or neighborhood, then compare monthly rates, unit sizes, and move-in options before you reserve.</p></div></div><div className="city-storage-feature-row"><div><strong>Common sizes</strong><span>5' x 5' to 10' x 20'</span></div><div><strong>Popular amenities</strong><span>Climate control, drive-up access</span></div><div><strong>Average unit price</strong><span>$62.34 in recent reservations</span></div></div></section>

      <section className="city-storage-links"><div><span className="city-storage-label">Keep exploring</span><h2>Nearby Colorado cities</h2></div><div className="nearby-city-grid">{nearbyCities.map((city) => <Link href={`/storage-search?location=${encodeURIComponent(city + ", CO")}`} key={city}>{city}</Link>)}</div></section>
    </main>
  );
}
