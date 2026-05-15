"use client";
import { useState } from "react";
import Link from "next/link";

const serviceLinks = [
  { href: "/services/local-seo-gbp-optimization", label: "Local SEO & GBP" },
  { href: "/services/aeo-geo", label: "AEO & GEO" },
  { href: "/services/technical-seo", label: "Technical SEO" },
  { href: "/services/backlinks", label: "Backlinks" },
  { href: "/services/content-keyword-strategy", label: "Content & Keywords" },
  { href: "/services/multi-location-seo", label: "Multi-Location SEO" },
];

// const whoWeServeLinks = [
//   { href: "/who-we-serve/independent-facility-owners", label: "Independent Owners" },
//   { href: "/who-we-serve/multi-location-operators", label: "Multi-Location Operators" },
//   { href: "/who-we-serve/climate-controlled-facilities", label: "Climate-Controlled" },
//   { href: "/who-we-serve/vehicle-rv-boat-storage", label: "Vehicle, RV & Boat" },
//   { href: "/who-we-serve/new-facility-openings", label: "New Facility Openings" },
// ];

const ChevronSvg = () => (
  <svg width="11" height="7" viewBox="0 0 11 7" fill="none" aria-hidden="true">
    <path d="M1 1L5.5 6L10 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  function close() { setMenuOpen(false); }

  return (
    <nav>
      <div className="container nav-inner">
        <Link href="/" className="logo" onClick={close}>
          <span className="logo-mark" />
          SelfStorage.help
        </Link>

        <div className={`nav-links${menuOpen ? " open" : ""}`}>
          <div className="nav-group">
            <Link href="/#services" className="nav-group-trigger" onClick={close}>
              Services <ChevronSvg />
            </Link>
            <div className="nav-dropdown">
              {serviceLinks.map(({ href, label }) => (
                <Link key={href} href={href} onClick={close}>{label}</Link>
              ))}
            </div>
          </div>

          {/* <div className="nav-group">
            <Link href="/who-we-serve/independent-facility-owners" className="nav-group-trigger" onClick={close}>
              Who We Serve <ChevronSvg />
            </Link>
            <div className="nav-dropdown">
              {whoWeServeLinks.map(({ href, label }) => (
                <Link key={href} href={href} onClick={close}>{label}</Link>
              ))}
            </div>
          </div> */}

          <Link href="/case-studies" onClick={close}>Case Studies</Link>
          <Link href="/resources" onClick={close}>Resources</Link>

          <Link href="/contact" className="nav-cta" onClick={close}>
            Free Audit
          </Link>
        </div>

        <button
          className="hamburger"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(v => !v)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  );
}
