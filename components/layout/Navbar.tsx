"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const serviceLinks = [
  { href: "/services/local-seo-gbp-optimization", label: "Local SEO & Map Pack" },
  { href: "/services/aeo-geo", label: "AEO & GEO" },
  { href: "/services/technical-seo", label: "Technical SEO" },
  { href: "/services/backlinks", label: "Backlinks" },
  { href: "/services/content-keyword-strategy", label: "Content Writing" },
  { href: "/services/multi-location-seo", label: "SEO Reporting" },
];

// const whoWeServeLinks = [
//   { href: "/who-we-serve/independent-facility-owners", label: "Independent Owners" },
//   { href: "/who-we-serve/multi-location-operators", label: "Multi-Location Operators" },
//   { href: "/who-we-serve/storage-warehouse", label: "Storage Warehouse" },
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
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement | null>(null);
  function close() { setMenuOpen(false); }

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!servicesRef.current) return;
      if (servicesRef.current.contains(e.target as Node)) return;
      setServicesOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setServicesOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <nav className="v1-chrome">
      <div className="container nav-inner">
        <Link href="/" className="logo" onClick={close}>
          <Image
            src="/images/logo.png"
            alt="SelfStorage.help logo"
            width={36}
            height={36}
            className="logo-mark"
            priority
          />
          SelfStorage.help
        </Link>

        <div className={`nav-links${menuOpen ? " open" : ""}`}>
            <div className={`nav-group ${servicesOpen ? "open" : ""}`} ref={servicesRef}>
              <button
                type="button"
                className="nav-group-trigger"
                aria-expanded={servicesOpen}
                aria-haspopup="menu"
                onClick={() => setServicesOpen(v => !v)}
              >
                Services <ChevronSvg />
              </button>
              <div className="nav-dropdown" role="menu">
                {serviceLinks.map(({ href, label }) => (
                  <Link key={href} href={href} onClick={() => { close(); setServicesOpen(false); }}>{label}</Link>
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
