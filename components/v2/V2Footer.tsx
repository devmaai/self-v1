import Link from "next/link";

export default function V2Footer() {
  return (
    <footer className="v2-footer">
      <div className="footer-grid">
        <div>
          <div className="fb-brand">SelfStorage<span>.help</span></div>
          <div className="fb-desc">Specialist SEO for independent self-storage operators across the USA. Single-facility to regional portfolio. Operated under MAAI LLC, Wyoming.</div>
        </div>
        <div>
          <div className="fc-head">Contact</div>
          <ul className="fc-links">
            <li><a href="mailto:business@maai.agency">business@maai.agency</a></li>
            <li><Link href="/audit">Request an audit</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-copy">© 2026 MAAI LLC. All rights reserved.</div>
        <div className="footer-copy" style={{ display: "flex", gap: 20 }}>
          <Link href="/privacy" style={{ color: "rgba(255,255,255,0.2)" }}>Privacy Policy</Link>
          <Link href="/terms" style={{ color: "rgba(255,255,255,0.2)" }}>Terms</Link>
        </div>
      </div>
    </footer>
  );
}
