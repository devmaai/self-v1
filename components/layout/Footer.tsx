import Link from "next/link";

export default function Footer() {
  return (
    <footer>
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
              <li><Link href="/case-studies">Case Studies</Link></li>
              <li><Link href="/resources">Resources</Link></li>
              <li><Link href="/#process">Our Process</Link></li>
              <li><Link href="/#pricing">Pricing</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 SelfStorage.help. Operated by MAAI LLC, Wyoming, USA.</div>
          <div>
            <a href="mailto:hello@selfstorage.help">hello@selfstorage.help</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
