"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { STORAGE_STATES } from "@/components/sections/StorageStateLinks";

export default function Footer() {
  const router = useRouter();
  const [location, setLocation] = useState("");

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = location.trim();
    if (!value) return;
    router.push(`/storage-search?location=${encodeURIComponent(value)}`);
  }

  return (
    <footer className="v1-chrome">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h4>SelfStorage.help</h4>
            <p>
              Performance SEO built for independent self-storage operators across the US. We help
              small operators win local search against national chains.
            </p>
          </div>
          <div className="footer-col">
            <h5>Services</h5>
            <ul>
              <li><Link href="/services/local-seo-gbp-optimization">Local SEO &amp; Map Pack</Link></li>
              <li><Link href="/services/Aeo&Geo">AEO &amp; GEO</Link></li>
              <li><Link href="/services/technical-seo">Technical SEO</Link></li>
              <li><Link href="/services/backlinks">Backlinks</Link></li>
              <li><Link href="/services/content-keyword-strategy">Content Writing</Link></li>
              <li><Link href="/services/SEO-reporting">SEO Reporting</Link></li>
            </ul>
          </div>
          {/* <div className="footer-col">
            <h5>Who We Serve</h5>
            <ul>
              <li><Link href="/who-we-serve/independent-facility-owners">Independent Owners</Link></li>
              <li><Link href="/who-we-serve/multi-location-operators">Multi-Location Operators</Link></li>
              <li><Link href="/who-we-serve/storage-warehouse">Storage Warehouse</Link></li>
              <li><Link href="/who-we-serve/vehicle-rv-boat-storage">Vehicle, RV &amp; Boat</Link></li>
              <li><Link href="/who-we-serve/new-facility-openings">New Facility Openings</Link></li>
            </ul>
          </div> */}
          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><Link href="/agency#process">Our Process</Link></li>
              <li><Link href="/agency#pricing">Pricing</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-col footer-storage">
            <h5>Find storage</h5>
            <form className="footer-search" onSubmit={handleSearch} role="search">
              <label htmlFor="footer-location" className="sr-only">Search by city or ZIP code</label>
              <input
                id="footer-location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="City or ZIP code"
                autoComplete="postal-code"
              />
              <button type="submit" aria-label="Search storage locations">Search</button>
            </form>
            <div className="footer-state-links">
              {STORAGE_STATES.map((state) => (
                <Link href={state.href} key={state.name}>{state.name}</Link>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 SelfStorage.help. Operated by MAAI LLC, Wyoming, USA.</div>
          <div>
            <a href="mailto:business@maai.agency">business@maai.agency</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
