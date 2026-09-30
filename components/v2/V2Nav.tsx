"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import V2StorageForm from "./V2StorageForm";

type V2NavProps = {
  variant?: "home" | "inner";
};

export default function V2Nav({ variant = "home" }: V2NavProps) {
  const isConsumerHome = variant === "inner";
  const prefix = variant === "home" ? "#" : "/agency#";
  const [formOpen, setFormOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!formOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        setFormOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFormOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [formOpen]);

  if (isConsumerHome) {
    return (
      <>
        <nav className="v2-nav v2-nav-home">
          <Link href="/" className="nav-brand">SelfStorage<span>.help</span></Link>
          <ul className="nav-links nav-quick-links">
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/storage-size-guide">Size Guide</Link></li>
          </ul>
          <div className="nav-actions">
            <div className="nav-form-dropdown" ref={formRef}>
              <button
                className={`nav-form-toggle ${formOpen ? "open" : ""}`}
                onClick={() => setFormOpen(!formOpen)}
                aria-expanded={formOpen}
                aria-haspopup="true"
              >
                Find Storage
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {formOpen && (
                <div className="nav-form-panel">
                  <V2StorageForm />
                </div>
              )}
            </div>
            <Link href="/agency" className="btn-nav-cta nav-business-owner">
              For Business Owners →
            </Link>
          </div>
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
          <div className="mobile-menu-form">
            <V2StorageForm />
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
          <div className="nav-form-dropdown" ref={formRef}>
            <button
              className={`nav-form-toggle ${formOpen ? "open" : ""}`}
              onClick={() => setFormOpen(!formOpen)}
              aria-expanded={formOpen}
              aria-haspopup="true"
            >
              Find Storage
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {formOpen && (
              <div className="nav-form-panel">
                <V2StorageForm />
              </div>
            )}
          </div>
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
        <div className="mobile-menu-form">
          <V2StorageForm />
        </div>
      </div>
    </>
  );
}
