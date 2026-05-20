"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import RevealSection from "@/components/ui/RevealSection";

export interface CaseStudyCard {
  category: string;
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  href?: string;
  metric?: string;
}

export interface CaseStudiesBrowserProps {
  label?: string;
  headline?: React.ReactNode;
  intro?: string;
  cases: CaseStudyCard[];
}

export default function CaseStudiesBrowser({
  label = "All stories",
  headline,
  intro,
  cases,
}: CaseStudiesBrowserProps) {
  const categories = useMemo(() => {
    const set = new Set<string>();
    cases.forEach((c) => set.add(c.category));
    return ["All stories", ...Array.from(set)];
  }, [cases]);

  const [active, setActive] = useState("All stories");

  const visible =
    active === "All stories"
      ? cases
      : cases.filter((c) => c.category === active);

  return (
    <RevealSection className="case-browser">
      <div className="container">
        {label && <div className="section-label">{label}</div>}
        {headline && <h2 className="section-title">{headline}</h2>}
        {intro && <p className="section-intro">{intro}</p>}

        <div className="case-filter">
          <span className="case-filter-label">Show me:</span>
          <div className="case-filter-chips">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`case-filter-chip${active === cat ? " is-active" : ""}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="case-grid">
          {visible.map((c, i) => {
            const inner = (
              <>
                <div
                  className="case-card-media"
                  style={{ backgroundImage: `url(${c.image})` }}
                >
                  <span className="case-card-badge">{c.category}</span>
                  {c.metric && (
                    <span className="case-card-metric">{c.metric}</span>
                  )}
                </div>
                <div className="case-card-body">
                  <div className="case-card-eyebrow">{c.eyebrow}</div>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                  <span className="case-card-link">Read more →</span>
                </div>
              </>
            );
            return c.href ? (
              <Link key={`${c.title}-${i}`} href={c.href} className="case-card">
                {inner}
              </Link>
            ) : (
              <div key={`${c.title}-${i}`} className="case-card">
                {inner}
              </div>
            );
          })}
        </div>

        {visible.length === 0 && (
          <p className="case-empty">No stories in this category yet. Check back soon.</p>
        )}
      </div>
    </RevealSection>
  );
}
