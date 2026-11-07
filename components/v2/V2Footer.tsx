import Link from "next/link";

// blogColumn kept for backward compatibility; every page now shares one footer.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function V2Footer({ blogColumn = false }: { blogColumn?: boolean }) {
  return (
    <footer className="v2-footer">
      <div className="footer-grid footer-grid-unified">
        <div>
          <div className="fb-brand">SelfStorage<span>.help</span></div>
          <p className="fb-desc">
            A self storage comparison site listing all the storage units in your city to help you find the cheapest and best available options.
          </p>
          <p className="fb-desc">
            If you own a storage facility, you can reach out to us to list your units or to grow your self storage business in your area with SEO, GEO and AI optimization.
          </p>
        </div>
        <div>
          <div className="fc-head">For renters</div>
          <ul className="fc-links">
            <li><Link href="/">Find storage unit near you</Link></li>
            <li><Link href="/storage-search">Storage by state</Link></li>
            <li><Link href="/climate-controlled-storage">Storage types</Link></li>
            <li><Link href="/storage-size-guide">Storage size guide</Link></li>
            <li><Link href="/storage-unit-size-calculator">Size calculator</Link></li>
            <li><Link href="/blog">Storage guides</Link></li>
          </ul>
        </div>
        <div>
          <div className="fc-head">For storage owners</div>
          <ul className="fc-links">
            <li><Link href="/agency">SEO and AEO services</Link></li>
            <li><Link href="/about#about-contact">List your facility</Link></li>
            <li><Link href="/contact">Request a backlink</Link></li>
            <li><Link href="/agency#pricing">Pricing</Link></li>
            <li><Link href="/agency#proof">Client results</Link></li>
            <li><Link href="/audit">Request a free SEO &amp; GEO audit</Link></li>
          </ul>
        </div>
        <div>
          <div className="fc-head">Company</div>
          <ul className="fc-links">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-copy">© 2026 SelfStorage.help. Operated by MAAI LLC, Wyoming, USA.</div>
        <div className="footer-copy"><a href="mailto:business@maai.agency">business@maai.agency</a></div>
      </div>
    </footer>
  );
}
