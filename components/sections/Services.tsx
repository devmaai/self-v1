"use client";

import Link from "next/link";
import { useState } from "react";
import RevealSection from "@/components/ui/RevealSection";

export interface ServiceItem {
  num: string;
  title: string;
  desc: string;
  tags: string[];
  href?: string;
}

export interface ServicesProps {
  label?: string;
  headline?: React.ReactNode;
  intro?: string;
  items?: ServiceItem[];
}

const defaultItems: ServiceItem[] = [
  {
    num: "01",
    title: "Local SEO & Map Pack",
    desc: " Own the local 3-pack for \"storage near me\" searches in your city. GMB optimization, citation building, and review systems built for storage operators.",
    tags: ["GBP", "Citations", "NAP"],
    href: "/services/local-seo-gbp-optimization",
  },
  {
    num: "02",
    title: "AEO & GEO",
    desc: "Get cited by ChatGPT, Perplexity, and Google AI Overviews when renters ask about storage. AEO and GEO services built for self storage operators.",
    tags: ["Schema", "CRO", "Geo pages"],
    href: "/services/aeo-geo",
  },
  {
    num: "03",
    title: "Technical SEO",
    desc: "Fix the technical issues holding your storage website back. Site speed, schema, crawlability, and Core Web Vitals work built for storage operators.",
    tags: ["CWV", "Audit", "Speed"],
    href: "/services/technical-seo",
  },
  {
    num: "04",
    title: "Backlinks",
    desc: "Earn the links that actually move rankings. Local outreach, digital PR, and resource link building built for self storage operators.",
    tags: ["Reviews", "Reputation"],
    href: "/services/backlinks",
  },
  {
    num: "05",
    title: "Content Writing",
    desc: "Storage-literate writers who produce content that ranks, builds authority, and helps renters choose your facility. Built for storage operators.",
    tags: ["Blog", "Guides", "Intent"],
    href: "/services/content-keyword-strategy",
  },
  {
    num: "06",
    title: "SEO Reporting",
    desc: "See exactly what your SEO investment produces. Live dashboards, monthly reports, and metrics that tie directly to bookings.",
    tags: ["GA4", "Monthly"],
    href: "/services/seo-reporting",
  },
];

export default function Services({
  label = "What we do",
  headline = (
    <>
      Built specifically for <em>self-storage operators</em>.
    </>
  ),
  intro = "We only work with storage facilities. Every strategy, every landing page, and every optimization is informed by real patterns we have seen across dozens of storage business operators, from single facilities to regional portfolios.",
  items = defaultItems,
}: ServicesProps) {
  const [openNum, setOpenNum] = useState<string | null>(null);

  const handleMobileToggle = (e: React.MouseEvent, num: string) => {
    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      e.preventDefault();
      setOpenNum((cur) => (cur === num ? null : num));
    }
  };

  return (
    <RevealSection className="services" id="services">
      <div className="container">
        <div className="section-label">{label}</div>
        <h2 className="section-title">{headline}</h2>
        <p className="section-intro">{intro}</p>

        <div className="services-list">
          {items.map((item) => {
            const isOpen = openNum === item.num;
            const className = `service-row${isOpen ? " is-open" : ""}`;
            const inner = (
              <>
                <div className="service-num">{item.num}</div>
                <div><h3>{item.title}</h3></div>
                <div><p>{item.desc}</p></div>
                <div className="service-tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="service-tag">{tag}</span>
                  ))}
                </div>
                <span className="sr-toggle" aria-hidden="true" />
              </>
            );
            return item.href ? (
              <Link
                key={item.num}
                href={item.href}
                className={className}
                onClick={(e) => handleMobileToggle(e, item.num)}
              >
                {inner}
              </Link>
            ) : (
              <div
                key={item.num}
                className={className}
                onClick={(e) => handleMobileToggle(e, item.num)}
              >
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </RevealSection>
  );
}
