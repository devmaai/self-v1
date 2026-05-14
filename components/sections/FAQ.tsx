"use client";

import { useState } from "react";
import RevealSection from "@/components/ui/RevealSection";

export interface FAQItem {
  q: string;
  a: string;
}

export interface FAQProps {
  label?: string;
  headline?: React.ReactNode;
  items?: FAQItem[];
}

const defaultItems: FAQItem[] = [
  {
    q: "How long before I see real results?",
    a: "Technical fixes and Google Business Profile work often show lift inside thirty days. Rankings for competitive local terms typically move in the sixty to ninety day window. Content and link-driven gains compound through months three to six. We provide total transparency once we have done the page audit about expected days to see the performance.",
  },
  {
    q: "Do you work exclusively with self-storage operators?",
    a: "Yes. Self-storage is our only vertical. Every strategy, template, and benchmark we use comes from our experience across self storage verticals implemented. We work with some of the biggest storage companies like Pickfords in the UK.",
  },
  {
    q: "What if my website was built on a platform like WordPress or a custom CMS?",
    a: "We work across WordPress, Webflow, Squarespace, Shopify, and most custom CMSes. In the audit phase we assess whether your current platform can support the changes we recommend. If a rebuild is the better long-term answer, we tell you honestly.",
  },
  {
    q: "Do I need to stop running Google Ads?",
    a: "You can. Many clients keep paid search running during the first few months while organic gains materialize. Once organic volume is steady, most clients reduce or eliminate ad spend on their own. We advise the best strategy for the same depending on the storage profile, competition and the location.",
  },
  {
    q: "What is included in the free audit?",
    a: "A detailed report on your current organic visibility, Google Business Profile health, technical site issues, top three local competitors, and a prioritized list of the quickest wins available to you. You can act on the audit whether you work with us or not.",
  },
  {
    q: "Is this a long-term contract?",
    a: "The initial engagement is ninety days because meaningful SEO results need that window to materialize. After that, everything is month-to-month with thirty days notice."},
];

export default function FAQ({
  label = "Common questions",
  headline = (
    <>
      Things storage owners <em>usually ask</em>.
    </>
  ),
  items = defaultItems,
}: FAQProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (i: number) => setActiveIndex((prev) => (prev === i ? null : i));

  return (
    <RevealSection className="faq" id="faq">
      <div className="container">
        <div className="section-label">{label}</div>
        <h2 className="section-title">{headline}</h2>

        <div className="faq-list">
          {items.map((item, i) => (
            <div key={i} className={`faq-item${activeIndex === i ? " active" : ""}`}>
              <div className="faq-q" onClick={() => toggle(i)} role="button" aria-expanded={activeIndex === i}>
                <span>{item.q}</span>
                <div className="faq-toggle" aria-hidden="true">+</div>
              </div>
              <div className="faq-a">{item.a}</div>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
