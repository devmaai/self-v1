"use client";
import Link from "next/link";

type V2NavProps = {
  variant?: "home" | "inner";
};

export default function V2Nav({ variant = "home" }: V2NavProps) {
  const prefix = variant === "home" ? "#" : "/#";

  return (
    <>
      <nav className="v2-nav">
        <Link href="/" className="nav-brand">SelfStorage<span>.help</span></Link>
        <ul className="nav-links">
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
