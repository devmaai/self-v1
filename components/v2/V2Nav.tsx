"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const serviceLinks = [
  { href: "/services/local-seo-gbp-optimization", label: "Local SEO & Map Pack" },
  { href: "/services/aeo-geo", label: "AEO & GEO" },
  { href: "/services/technical-seo", label: "Technical SEO" },
  { href: "/services/backlinks", label: "Backlinks" },
  { href: "/services/content-keyword-strategy", label: "Content Writing" },
  { href: "/services/multi-location-seo", label: "SEO Reporting" },
];

type V2NavProps = {
  variant?: "home" | "inner";
};

export default function V2Nav({ variant = "home" }: V2NavProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (ref.current.contains(e.target as Node)) return;
      setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const prefix = variant === "home" ? "#" : "/#";

  return (
    <>
      <nav className="v2-nav">
        <Link href="/" className="nav-brand">SelfStorage<span>.help</span></Link>
        <ul className="nav-links">
          <li ref={ref} className={`nav-services${open ? " open" : ""}`}>
            <button
              type="button"
              className="nav-services-trigger"
              aria-expanded={open}
              aria-haspopup="menu"
              onClick={() => setOpen(v => !v)}
            >
              Services
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="nav-services-menu" role="menu">
              {serviceLinks.map(({ href, label }) => (
                <Link key={href} href={href} role="menuitem" onClick={() => setOpen(false)}>{label}</Link>
              ))}
            </div>
          </li>
          <li><a href={`${prefix}proof`}>Results</a></li>
          <li><a href={`${prefix}process`}>Process</a></li>
          <li><a href={`${prefix}pricing`}>Pricing</a></li>
          <li><a href={`${prefix}faq`}>FAQ</a></li>
        </ul>
        <div className="nav-actions">
          <a href={`${prefix}proof`} className="btn-nav-ghost">See client data</a>
          <a href={variant === "home" ? "#audit" : "/contact"} className="btn-nav-cta">Get free audit →</a>
        </div>
        <button className="nav-burger" data-mobile-toggle aria-label="Open menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </nav>

      <div className="v2-mobile-menu" data-mobile-panel>
        <ul className="mobile-menu-links">
          <li>
            <details className="mobile-services">
              <summary>Services</summary>
              <ul className="mobile-sub-links">
                {serviceLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} data-mobile-close>{label}</Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
          <li><a href={`${prefix}proof`} data-mobile-close>Results</a></li>
          <li><a href={`${prefix}process`} data-mobile-close>Process</a></li>
          <li><a href={`${prefix}pricing`} data-mobile-close>Pricing</a></li>
          <li><a href={`${prefix}faq`} data-mobile-close>FAQ</a></li>
        </ul>
        <div className="mobile-menu-actions">
          <a href={`${prefix}proof`} className="btn-nav-ghost" data-mobile-close>See client data</a>
          <a href={variant === "home" ? "#audit" : "/contact"} className="btn-nav-cta" data-mobile-close>Get free audit →</a>
        </div>
      </div>
    </>
  );
}
