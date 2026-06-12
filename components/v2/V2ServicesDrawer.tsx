"use client";
import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import type { V2ServicePageProps } from "./services/V2ServicePage";
import { localSeoContent } from "./services/localSeoContent";
import { aeoGeoContent } from "./services/aeoGeoContent";
import { technicalSeoContent } from "./services/technicalSeoContent";
import { backlinksContent } from "./services/backlinksContent";
import { contentStrategyContent } from "./services/contentStrategyContent";
import { multiLocationContent } from "./services/multiLocationContent";

type Service = {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tags: string[];
  content: V2ServicePageProps;
};

const SERVICES: Service[] = [
  {
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="#0EA5E9" strokeWidth="1.6" /><path d="M10 6v5l3 2" stroke="#0EA5E9" strokeWidth="1.6" strokeLinecap="round" /></svg>,
    title: "Local SEO & Google Maps Ranking",
    desc: "Own the map pack for storage searches in your trade area. We handle GBP optimisation, citation building, review systems, and the NAP consistency that keeps your listing in the top 3.",
    tags: ["GBP", "Citations", "NAP", "Map Pack"],
    content: localSeoContent,
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="5" width="14" height="10" rx="2" stroke="#0EA5E9" strokeWidth="1.6" /><path d="M7 9h6M7 12h4" stroke="#0EA5E9" strokeWidth="1.6" strokeLinecap="round" /></svg>,
    title: "AEO & GEO — AI Search Visibility",
    desc: "Get cited by ChatGPT, Perplexity, and Google AI Overviews when renters ask about storage. Schema markup, GEO pages, and structured content built for the way AI answers search queries.",
    tags: ["Schema", "GEO Pages", "AI Search"],
    content: aeoGeoContent,
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 16V8l6-4 6 4v8" stroke="#0EA5E9" strokeWidth="1.6" strokeLinejoin="round" /><rect x="8" y="11" width="4" height="5" rx="0.5" stroke="#0EA5E9" strokeWidth="1.4" /></svg>,
    title: "Technical SEO",
    desc: "Fast, crawlable storage websites that load on mobile and convert reservations. Core Web Vitals, crawl error resolution, schema implementation, and site speed work built for storage platforms.",
    tags: ["CWV", "Speed", "Crawl", "Schema"],
    content: technicalSeoContent,
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4v12M4 10h12" stroke="#0EA5E9" strokeWidth="1.6" strokeLinecap="round" /><circle cx="10" cy="10" r="7" stroke="#0EA5E9" strokeWidth="1.6" /></svg>,
    title: "Backlink Building",
    desc: "Earn the links that move Google rankings. Local outreach, digital PR, and resource link building designed for independent self-storage operators. No link farms, no shortcuts that penalise you later.",
    tags: ["Local Outreach", "Digital PR", "Authority"],
    content: backlinksContent,
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 8h10M5 12h7" stroke="#0EA5E9" strokeWidth="1.6" strokeLinecap="round" /><rect x="3" y="4" width="14" height="12" rx="2" stroke="#0EA5E9" strokeWidth="1.6" /></svg>,
    title: "SEO Content Writing",
    desc: "Storage-specific writers who produce content that ranks, builds authority, and helps renters choose your facility. Unit-size pages, location guides, neighbourhood content, and monthly blog articles.",
    tags: ["Location Pages", "Unit Pages", "Blog"],
    content: contentStrategyContent,
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 14l4-4 3 3 5-6" stroke="#0EA5E9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><rect x="3" y="3" width="14" height="14" rx="2" stroke="#0EA5E9" strokeWidth="1.6" /></svg>,
    title: "SEO Reporting & Analytics",
    desc: "Live dashboards connected to your GA4 and Google Search Console accounts. Monthly reports that connect ranking movements directly to move-in volume so you know exactly what the SEO programme produces.",
    tags: ["GA4", "GSC", "Monthly Report"],
    content: multiLocationContent,
  },
];

export default function V2ServicesDrawer() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const open = (i: number) => {
    setOpenIndex(i);
    setOpenFaq(0);
  };
  const close = useCallback(() => setOpenIndex(null), []);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close]);

  const active = openIndex === null ? null : SERVICES[openIndex];

  return (
    <>
      <div className="services-grid">
        {SERVICES.map((s, i) => (
          <button key={i} type="button" className="svc-card svc-card-btn reveal" onClick={() => open(i)}>
            <div className="svc-icon">{s.icon}</div>
            <div className="svc-title">{s.title}</div>
            <div className="svc-desc">{s.desc}</div>
            <div className="svc-tags">{s.tags.map((t) => <span key={t} className="svc-tag">{t}</span>)}</div>
            <span className="svc-link">Learn more →</span>
          </button>
        ))}
      </div>

      <div className="svc-cta-bar reveal">
        <div className="svc-cta-text">
          Not sure which services your facility needs?
          <span>We map the gaps in a free audit and recommend only what will move rankings for your specific location.</span>
        </div>
        <a href="/audit" className="btn-cta-dark">Get your free audit →</a>
      </div>

      {mounted && createPortal(
      <div className={`v2-home svc-drawer-portal${active ? " open" : ""}`}>
      <div className={`svc-drawer-root${active ? " open" : ""}`} aria-hidden={!active}>
        <div className="svc-drawer-backdrop" onClick={close} />
        <aside className="svc-drawer" role="dialog" aria-modal="true" aria-label={active ? active.title : undefined}>
          {active && (
            <>
              <div className="svc-drawer-head">
                <div className="svc-drawer-head-main">
                  <div className="svc-drawer-head-icon">{active.icon}</div>
                  <div>
                    <div className="svc-drawer-pill">{active.content.approach.pill}</div>
                    <h3 className="svc-drawer-title">{active.title}</h3>
                  </div>
                </div>
                <button type="button" className="svc-drawer-close" onClick={close} aria-label="Close">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                </button>
              </div>

              <div className="svc-drawer-body">
                <p className="svc-drawer-lead">{active.content.approach.lead}</p>

                <div className="svc-drawer-section-label">What we actually do</div>
                <div className="svc-drawer-steps">
                  {active.content.approach.steps.map((step) => (
                    <div key={step.phase} className="svc-drawer-step">
                      <div className="svc-drawer-step-phase">{step.phase}</div>
                      <div className="svc-drawer-step-title">{step.title}</div>
                      <div className="svc-drawer-step-desc">{step.desc}</div>
                      {step.tags && step.tags.length > 0 && (
                        <div className="svc-tags">{step.tags.map((t) => <span key={t} className="svc-tag">{t}</span>)}</div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="svc-drawer-section-label">Common questions</div>
                <div className="svc-drawer-faq">
                  {active.content.faq.items.slice(0, 3).map((f, i) => (
                    <div key={i} className={`svc-drawer-faq-item${openFaq === i ? " open" : ""}`}>
                      <button type="button" className="svc-drawer-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                        {f.q}
                        <span className="svc-drawer-faq-toggle">+</span>
                      </button>
                      <div className="svc-drawer-faq-a">{f.a}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="svc-drawer-foot">
                <a href="/audit" className="btn-cta-dark" onClick={close}>Get your free audit →</a>
              </div>
            </>
          )}
        </aside>
      </div>
      </div>,
      document.body
      )}
    </>
  );
}
