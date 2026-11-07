"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import V2StorageForm from "./V2StorageForm";

type V2NavProps = {
  variant?: "home" | "inner";
  initialUnitSize?: string;
};

type MenuKey = "storage" | "owners" | "form" | null;

const FIND_STORAGE_LINKS = [
  { href: "/", label: "Search storage near you", lead: true },
  { href: "/storage-size-guide", label: "Storage size guide" },
  { href: "/storage-unit-size-calculator", label: "Size calculator" },
  { href: "/climate-controlled-storage", label: "Climate controlled storage" },
  { href: "/car-storage", label: "Car storage" },
  { href: "/rv-storage", label: "RV storage" },
  { href: "/boat-storage", label: "Boat storage" },
  { href: "/business-storage", label: "Business storage" },
];

const OWNER_LINKS = [
  { href: "/agency", label: "SEO and AEO services overview", lead: true },
  { href: "/services/local-seo-gbp-optimization", label: "Local SEO and Map Pack" },
  { href: "/services/aeo-geo", label: "AEO and GEO" },
  { href: "/services/technical-seo", label: "Technical SEO" },
  { href: "/services/backlinks", label: "Backlinks" },
  { href: "/services/content-keyword-strategy", label: "Content Writing" },
  { href: "/services/multi-location-seo", label: "Multi-Location SEO" },
  { href: "/services/seo-reporting", label: "SEO Reporting" },
  { href: "/agency#pricing", label: "Pricing" },
  { href: "/about#about-contact", label: "List your facility" },
  { href: "/contact", label: "Request a backlink" },
  { href: "/audit", label: "Request a free SEO & GEO audit" },
];

const Chevron = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function V2Nav({ variant = "home", initialUnitSize = "" }: V2NavProps) {
  // "inner" = storage (renter) side, "home" = SEO side (/agency)
  const isStorageSide = variant === "inner";
  const [open, setOpen] = useState<MenuKey>(initialUnitSize ? "form" : null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  const toggle = (key: MenuKey) => setOpen((cur) => (cur === key ? null : key));

  const dropdown = (key: "storage" | "owners", label: string, links: typeof OWNER_LINKS, active: boolean) => (
    <li
      className={`nav-services nav-menu ${open === key ? "open" : ""} ${active ? "is-active" : ""}`}
      onMouseEnter={() => setOpen(key)}
      onMouseLeave={() => setOpen((cur) => (cur === key ? null : cur))}
    >
      <button
        type="button"
        className="nav-services-trigger"
        aria-expanded={open === key}
        aria-haspopup="true"
        onClick={() => toggle(key)}
      >
        {label}
        <Chevron />
      </button>
      <div className="nav-services-menu">
        {links.map((l) => (
          <Link key={l.href + l.label} href={l.href} className={l.lead ? "nav-menu-lead" : undefined} onClick={() => setOpen(null)}>
            {l.label}
          </Link>
        ))}
      </div>
    </li>
  );

  return (
    <>
      <nav ref={navRef} className={`v2-nav v2-nav-unified ${isStorageSide ? "v2-nav-home" : ""}`}>
        <Link href="/" className="nav-brand">SelfStorage<span>.help</span></Link>
        <ul className="nav-links nav-quick-links">
          {dropdown("storage", "Find Storage", FIND_STORAGE_LINKS, isStorageSide)}
          <li><Link href="/blog">Storage Guides</Link></li>
          {dropdown("owners", "For Storage Owners", OWNER_LINKS, !isStorageSide)}
          <li><Link href="/about">About Us</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
        <div className="nav-actions">
          {isStorageSide ? (
            <>
              <div className="nav-form-dropdown">
                <button
                  type="button"
                  className={`nav-form-toggle ${open === "form" ? "open" : ""}`}
                  onClick={() => toggle("form")}
                  aria-expanded={open === "form"}
                  aria-haspopup="true"
                >
                  Find storage
                  <Chevron />
                </button>
                {open === "form" && (
                  <div className="nav-form-panel">
                    <V2StorageForm initialUnitSize={initialUnitSize} />
                  </div>
                )}
              </div>
              <Link href="/about#about-contact" className="btn-nav-cta">List your facility</Link>
            </>
          ) : (
            <>
              <a href="/agency#proof" className="btn-nav-ghost">See client data</a>
              <a href="/audit" className="btn-nav-cta">Get free audit →</a>
            </>
          )}
        </div>
        <button className="nav-burger" data-mobile-toggle aria-label="Open menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </nav>

      <div className="v2-mobile-menu" data-mobile-panel>
        <ul className="mobile-menu-links">
          <li>
            <details className="mobile-services">
              <summary>Find Storage</summary>
              <ul className="mobile-sub-links">
                {FIND_STORAGE_LINKS.map((l) => (
                  <li key={l.href}><Link href={l.href} data-mobile-close>{l.label}</Link></li>
                ))}
              </ul>
            </details>
          </li>
          <li><Link href="/blog" data-mobile-close>Storage Guides</Link></li>
          <li>
            <details className="mobile-services">
              <summary>For Storage Owners</summary>
              <ul className="mobile-sub-links">
                {OWNER_LINKS.map((l) => (
                  <li key={l.href + l.label}><Link href={l.href} data-mobile-close>{l.label}</Link></li>
                ))}
              </ul>
            </details>
          </li>
          <li><Link href="/about" data-mobile-close>About Us</Link></li>
          <li><Link href="/contact" data-mobile-close>Contact</Link></li>
        </ul>
        <div className="mobile-menu-actions">
          {isStorageSide ? (
            <Link href="/about#about-contact" className="btn-nav-cta" data-mobile-close>List your facility</Link>
          ) : (
            <>
              <a href="/agency#proof" className="btn-nav-ghost" data-mobile-close>See client data</a>
              <a href="/audit" className="btn-nav-cta" data-mobile-close>Get free audit →</a>
            </>
          )}
        </div>
        {isStorageSide && (
          <div className="mobile-menu-form">
            <V2StorageForm initialUnitSize={initialUnitSize} />
          </div>
        )}
      </div>
    </>
  );
}
