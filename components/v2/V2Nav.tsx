"use client";
import Link from "next/link";

type V2NavProps = {
  variant?: "home" | "inner";
};

export default function V2Nav({ variant = "home" }: V2NavProps) {
  const isConsumerHome = variant === "inner";
  const prefix = variant === "home" ? "#" : "/agency#";

  if (isConsumerHome) {
    return (
      <>
        <nav className="v2-nav v2-nav-home">
          <Link href="/" className="nav-brand">SelfStorage<span>.help</span></Link>
          <ul className="nav-links nav-quick-links">
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/storage-size-guide">Size Guide</Link></li>
          </ul>
          <Link href="/agency" className="btn-nav-cta nav-business-owner">
            For Business Owners →
          </Link>
          <button className="nav-burger" data-mobile-toggle aria-label="Open menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </nav>

        <div className="v2-mobile-menu" data-mobile-panel>
          <ul className="mobile-menu-links">
            <li><Link href="/blog" data-mobile-close>Blog</Link></li>
            <li><Link href="/storage-size-guide" data-mobile-close>Size Guide</Link></li>
          </ul>
          <div className="mobile-menu-actions">
            <Link href="/agency" className="btn-nav-cta" data-mobile-close>
              For Business Owners →
            </Link>
          </div>
        </div>
      </>
    );
  }

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
          <a href="/audit" className="btn-nav-cta">Get free audit →</a>
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
          <a href="/audit" className="btn-nav-cta" data-mobile-close>Get free audit →</a>
        </div>
      </div>
    </>
  );
}
