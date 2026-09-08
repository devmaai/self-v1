"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LocationPin from "@/components/ui/LocationPin";
import StorageStateLinks from "@/components/sections/StorageStateLinks";

const facilities = [
  { name: "Extra Space Storage - 1783 - Murray - Van Winkle Expressway", address: "5572 Van Winkle, Salt Lake City, UT 84117", distance: "2.9 miles away", price: "$35", unit: "5' x 5'", fee: "Fees shown: $29", href: "https://www.selfstorage.com/self-storage/utah/salt-lake-city/extra-space-storage-1783-murray-van-winkle-expressway-210773/", online: true },
  { name: "Extra Space Storage - 8002 - East Millcreek - E 3300 S", address: "2150 East 3300 South, Salt Lake City, UT 84109", distance: "13.4 miles away", price: "$58", unit: "5' x 5'", fee: "Fees shown: $29", href: "https://www.selfstorage.com/self-storage/utah/salt-lake-city/extra-space-storage-8002-east-millcreek-e-3300-s-212335/", online: true },
  { name: "Extra Space Storage - 2266 - Salt Lake City - W 100 S", address: "510 West 100 South, Salt Lake City, UT 84101", distance: "8.5 miles away", price: "$46", unit: "5' x 10'", fee: "Fees shown: $29", href: "https://www.selfstorage.com/self-storage/utah/salt-lake-city/extra-space-storage-2266-salt-lake-city-w-100-s-243161/", online: true },
  { name: "Extra Space Storage - 2267 - Salt Lake City - 324 S State St", address: "324 South State Street, Salt Lake City, UT 84111", distance: "8.8 miles away", price: "$53", unit: "5' x 10'", fee: "Fees shown: $29", href: "https://www.selfstorage.com/self-storage/utah/salt-lake-city/extra-space-storage-2267-salt-lake-city-324-s-state-st-243146/", online: true },
  { name: "Extra Space Storage - 8480 - Salt Lake City - 5th West", address: "1150 S 500 W, Salt Lake City, UT 84105", distance: "10.1 miles away", price: "$46", unit: "5' x 5'", fee: "Fees shown: $29", href: "https://www.selfstorage.com/self-storage/utah/salt-lake-city/extra-space-storage-8480-salt-lake-city-5th-west-156854/", online: true },
  { name: "Public Storage - Salt Lake City - 1545 E 3900 South Street", address: "1545 E 3900 South Street, Salt Lake City, UT 84124", distance: "14 miles away", price: "$44", unit: "5' x 5'", fee: "Fees shown: $29", href: "https://www.selfstorage.com/self-storage/utah/salt-lake-city/public-storage-salt-lake-city-1545-e-3900-south-street-215142/", online: true },
  { name: "Extra Space Storage - 5186 - Salt Lake City - S W Temple St", address: "669 South West Temple Street, Salt Lake City, UT 84101", distance: "9.3 miles away", price: "$36", unit: "5' x 10'", fee: "Fees shown: $29", href: "https://www.selfstorage.com/self-storage/utah/salt-lake-city/extra-space-storage-5186-salt-lake-city-s-w-temple-st-245969/", online: true },
  { name: "Diamond Self Storage - SLC North Temple", address: "22 N Orange St, Salt Lake City, UT 84116", distance: "8.9 miles away", price: "$65", unit: "5' x 10'", fee: "Fees shown: $25", href: "https://www.selfstorage.com/self-storage/utah/salt-lake-city/diamond-self-storage-slc-north-temple-205589/" },
  { name: "Security Pro Storage", address: "471 West 500 South, Salt Lake City, UT 84101", distance: "9.1 miles away", price: "$49", unit: "5' x 5'", fee: "Fees shown: $29", href: "https://www.selfstorage.com/self-storage/utah/salt-lake-city/security-pro-storage-244690/", online: true },
  { name: "Public Storage - Salt Lake City - 1560 West North Temple", address: "1560 West North Temple, Salt Lake City, UT 84116", distance: "8.5 miles away", price: "$164", unit: "10' x 20'", fee: "Fees shown: $29", href: "https://www.selfstorage.com/self-storage/utah/salt-lake-city/public-storage-salt-lake-city-1560-west-north-temple-215143/", online: true },
  { name: "700 Block Storage", address: "681 South 600 West, Salt Lake City, UT 84101", distance: "9.4 miles away", price: "$200", unit: "10' x 15'", fee: "Fees shown: $20", href: "https://www.selfstorage.com/self-storage/utah/salt-lake-city/700-block-storage-233124/", online: true },
  { name: "StorQuest Economy - Salt Lake City / Warm Springs", address: "2267 Warm Springs Road, Salt Lake City, UT 84116", distance: "5.6 miles away", price: "$39", unit: "5' x 10'", fee: "Fees shown: $29", href: "https://www.selfstorage.com/self-storage/utah/salt-lake-city/storquest-economy-salt-lake-city-warm-springs-228083/" },
  { name: "1196 StorQuest Economy - Salt Lake City / 2100", address: "160 West 2100 South Expressway, Salt Lake City, UT 84115", distance: "11.3 miles away", price: "$27", unit: "5' x 5'", fee: "Fees shown: $29", href: "https://www.selfstorage.com/self-storage/utah/salt-lake-city/1196-storquest-economy-salt-lake-city-2100-235619/" },
  { name: "StoragePLUS - Salt Lake", address: "4018 S 300 W, Salt Lake City, UT 84107", distance: "14.1 miles away", price: "$38", unit: "5' x 8'", fee: "No booking fee shown", href: "https://www.selfstorage.com/self-storage/utah/salt-lake-city/storageplus-salt-lake-107638/" },
  { name: "CubeSmart Self Storage - Salt Lake City - 3528 South 300 West", address: "3528 South 300 West, Salt Lake City, UT 84115", distance: "13.5 miles away", price: "$28.80", unit: "5' x 5'", fee: "Fees shown: $29", href: "https://www.selfstorage.com/self-storage/utah/salt-lake-city/cubesmart-self-storage-salt-lake-city-3528-south-300-west-63268/" },
  { name: "Big Ben's Moving and Storage - South Salt Lake", address: "3701 S 700 W, Salt Lake City, UT 84119", distance: "13.8 miles away", price: "$42", unit: "5' x 5'", fee: "Fees shown: $25", href: "https://www.selfstorage.com/self-storage/utah/salt-lake-city/big-ben-s-moving-and-storage-south-salt-lake-105289/" },
  { name: "Holladay Self Storage", address: "4700 South Highland Drive, Salt Lake City, UT 84117", distance: "3.7 miles away", price: "$412", unit: "10' x 25'", fee: "Fees shown: $25", href: "https://www.selfstorage.com/self-storage/utah/salt-lake-city/holladay-self-storage-150483/" },
  { name: "Diamond Self Storage - SLC Redwood", address: "22 N Orange St, Salt Lake City, UT 84116", distance: "8.9 miles away", price: "$50", unit: "5' x 10'", fee: "Fees shown: $25", href: "https://www.selfstorage.com/self-storage/utah/salt-lake-city/diamond-self-storage-slc-redwood-235954/" },
  { name: "CubeSmart Self Storage - Salt Lake City - 350 S Redwood Road", address: "350 S Redwood Road, Salt Lake City, UT 84104", distance: "9.4 miles away", price: "$27.60", unit: "5' x 5'", fee: "Fees shown: $29", href: "https://www.selfstorage.com/self-storage/utah/salt-lake-city/cubesmart-self-storage-salt-lake-city-350-s-redwood-road-63267/" },
  { name: "Extra Space Storage - 8021 - Taylorsville - W 6020 S", address: "1740 West 6020 South, Salt Lake City, UT 84129", distance: "6.8 miles away", price: "$22", unit: "5' x 5'", fee: "Fees shown: $29", href: "https://www.selfstorage.com/self-storage/utah/salt-lake-city/extra-space-storage-8021-taylorsville-w-6020-s-156705/", online: true },
  { name: "Brickyard Self Storage", address: "1066 East 3300 South, Salt Lake City, UT 84106", distance: "13.1 miles away", price: "$45", unit: "5' x 5'", fee: "Fees shown: $15", href: "https://www.selfstorage.com/self-storage/utah/salt-lake-city/brickyard-self-storage-218215/" },
  { name: "Prime Storage - Salt Lake City", address: "1880 South 500 West, Salt Lake City, UT 84115", distance: "11.1 miles away", price: "$492", unit: "12' x 25'", fee: "Fees shown: $29", href: "https://www.selfstorage.com/self-storage/utah/salt-lake-city/prime-storage-salt-lake-city-228574/", online: true },
  { name: "StoragePLUS - Murray", address: "820 Woodoak Ln, Salt Lake City, UT 84107", distance: "3.6 miles away", price: "$35", unit: "5' x 5'", fee: "No booking fee shown", href: "https://www.selfstorage.com/self-storage/utah/salt-lake-city/storageplus-murray-107637/" },
  { name: "Extra Space Storage - 1006 - Salt Lake City - West 5520 South", address: "5520 South 3915 West, Salt Lake City, UT 84129", distance: "9.1 miles away", price: "$31", unit: "5' x 10'", fee: "Fees shown: $29", href: "https://www.selfstorage.com/self-storage/utah/salt-lake-city/extra-space-storage-1006-salt-lake-city-west-5520-south-210755/", online: true },
  { name: "54 Storage", address: "3850 West 5400 South, Salt Lake City, UT 84118", distance: "9.1 miles away", price: "$135", unit: "10' x 15'", fee: "Fees shown: $15", href: "https://www.selfstorage.com/self-storage/utah/salt-lake-city/54-storage-222443/" },
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
          <div className="city-storage-hero-facts"><span><strong>25</strong> facilities found</span><span><strong>From $22</strong> small units</span><span><strong>84101</strong> central ZIP</span></div>
        </div>
      </section>

      <section className="city-storage-results" aria-labelledby="salt-lake-results-heading">
        <div className="city-storage-results-head">
          <div><span className="city-storage-label">Salt Lake City, Utah</span><h2 id="salt-lake-results-heading">Storage units near you</h2><p>Showing 1 - 25 of 25 facilities. Prices and availability can change, so confirm details before reserving.</p></div>
          <label className="city-storage-sort">Sort by <select defaultValue="recommended"><option value="recommended">Recommended</option><option value="price">Lowest price</option><option value="distance">Closest first</option></select></label>
        </div>
        <div className="city-storage-layout">
          <div className="city-storage-list">
            {facilities.map((facility) => <article className="facility-card" key={facility.name}><div className="facility-card-top"><div><span className="facility-distance">{facility.distance}</span><h3>{facility.name}</h3><p>{facility.address}</p></div><div className="facility-pin"><LocationPin /></div></div><div className="facility-card-meta"><span className="facility-unit">{facility.unit}</span><span className="facility-price"><strong>{facility.price}</strong> / month</span><span className="facility-fee">{facility.fee}</span></div><div className="facility-card-bottom"><div className="facility-signals">{facility.online && <span className="facility-online">Online move-in</span>}</div><a href={facility.href} target="_blank" rel="noreferrer">View units <span aria-hidden="true">↗</span></a></div></article>)}
          </div>
          <aside className="city-storage-map" aria-label="Salt Lake City storage area map"><div className="map-grid" /><div className="map-route map-route-one" /><div className="map-route map-route-two" /><div className="map-marker marker-one">1</div><div className="map-marker marker-two">$</div><div className="map-marker marker-three">3</div><div className="map-label">Salt Lake City storage area</div><span className="map-compass">N</span></aside>
        </div>
      </section>

      <section className="city-storage-info"><div className="city-storage-info-grid"><div><span className="city-storage-label">Salt Lake City self storage information</span><h2>Storage for life at the Crossroads of the West.</h2></div><div><p>Salt Lake City storage gives residents flexible space for moves, seasonal gear, business inventory, and everything that comes with life near the Wasatch Mountains.</p><p>Compare Salt Lake City mini storage by ZIP code, unit size, monthly price, and move-in options before you reserve.</p></div></div><div className="city-storage-feature-row"><div><strong>Common sizes</strong><span>5' x 5' to 12' x 25'</span></div><div><strong>Popular amenities</strong><span>Climate control, drive-up access</span></div><div><strong>Average unit price</strong><span>$83.50 in recent reservations</span></div></div></section>

      <section className="city-storage-links"><div><span className="city-storage-label">Keep exploring</span><h2>Nearby Utah cities</h2></div><div className="nearby-city-grid">{nearbyCities.map((city) => <Link href={`/storage-search?location=${encodeURIComponent(city + ", UT")}`} key={city}>{city}</Link>)}</div></section>
      <StorageStateLinks />
      <nav className="storage-search-breadcrumb city-storage-bottom-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/storage-search">Storage search</Link><span>/</span><span aria-current="page">Salt Lake City, Utah</span></nav>
    </main>
  );
}
