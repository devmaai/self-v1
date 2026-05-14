import { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import FeatureList from "@/components/sections/FeatureList";
import ContentBlock from "@/components/sections/ContentBlock";
import Testimonial from "@/components/sections/Testimonial";
import FAQ from "@/components/sections/FAQ";
import SimpleCTA from "@/components/sections/SimpleCTA";

export const metadata: Metadata = {
  title: "Technical SEO for Self-Storage | SelfStorage.help",
  description:
    "We fix the technical foundations of your self-storage website so Google can crawl it, renters can load it instantly, and your booking software converts the traffic you earn.",
};

export default function TechnicalSeoPage() {
  return (
    <>
      <PageHero
        eyebrow="Technical SEO"
        headline="Rank on AEO & GEO: Get Found in AI Answers, Not Just Google Search"
        subheadline={"SEO is not dead. It has changed. When potential renters ask AI tools like Google Gemini, ChatGPT, or Perplexity “best climate-controlled storage near me” or “cheapest 10x10 storage units near me,” your facility needs to be the one they recommend and not your competitors.\nWe help self-storage operators dominate both traditional local search and the new Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) landscape."}
        primaryCta={{ label: "Get Your Free AEO + GEO Visibility Audit", href: "/contact" }}
        note="100% focused on self-storage occupancy growth."
      />

      <FeatureList
        variant="warm"
        style="bullet"
        label="The problem"
        headline="AI is changing how renters find self storage units. Is your unit showing up?"
        bulletTitleSuffix=""
        intro="Renters are no longer just typing into Google. They’re asking AI assistants complex, conversational questions. If your facility isn’t 
        optimized for these new “answer engines,” you’re losing move-ins to competitors,  
        even if you rank decently on traditional Google Maps.\nHere’s what’s happening to most independent operators:"
        items={[
          {
            title: "Missing from AI Answers — ",
            desc: "When someone asks “Is climate-controlled storage worth it near my home?”, your facility is never mentioned.",
          },
          {
            title: "Outranked by National Chains — ",
            desc: "Big brands with strong entity authority and structured content dominate AI-generated recommendations.",
          },
          {
            title: "Generic Content Fails AI — ",
            desc: "Stock photos, thin descriptions, and unoptimized pages are ignored by AI models that need clear, authoritative, structured information.",
          },
          {
            title: "No Control Over the Narrative — ",
            desc: "AI tools synthesize answers from multiple sources. If your data is inconsistent or outdated, you lose influence over what renters hear.",
          },
          {
            title: "Lost Zero-Click Opportunities — ",
            desc: "Many renters get full answers (including facility recommendations) without ever clicking through to a website or map.",
          },
        ]}
      />

      <FeatureList
        variant="light"
        style="numbered"
        label="Our approach"
        headline="How We Rank Self-Storage Facilities on AEO & GEO"
        intro="We don’t do generic AI optimization. Every tactic is built specifically for storage operators and focused on one outcome: more qualified move-ins from both Google and AI-powered search."
        items={[
          {
            num: "1",
            title: "Entity Authority & Citation Consistency",
            desc: "We strengthen your business as a recognizable “entity” across the web with consistent NAP (Name, Address, Phone), high-quality citations, and storage-specific schema markup so AI tools confidently recommend your facility.",
          },
          {
            num: "2",
            title: "Answer-First Content Creation",
            desc: "We build hyper-targeted content that directly answers the questions real renters ask AI- “What size storage unit do I need?”, “Is drive-up access worth it?”, “Climate-controlled vs non-climate controlled”, optimized for both featured snippets and generative AI.",
          },
          {
            num: "3",
            title: "Structured Data & Schema Mastery",
            desc: "Advanced schema implementation (including unit-type, pricing, availability signals, and review markup) helps AI engines understand and trust your data more than competitors.",
          },
          {
            num: "4",
            title: "Google Business Profile + Local Signals",
            desc: "We optimize your GBP for both traditional Map Pack and AI Overviews by maintaining fresh photos, posts, reviews, and accurate attributes (gate hours, climate control, vehicle/RV storage, etc.).",
          },
          {
            num: "5",
            title: "Multi-Location & Portfolio Optimization",
            desc: "For operators with 2+ facilities, we prevent cannibalization while building unified authority that lifts every location in AI responses.",
          },
        ]}
      />

      <ContentBlock
        variant="dark"
        label="The storage edge"
        headline="Most generalist SEO teams have never seen a storEDGE backend."
        body="We work with the software the self-storage industry actually uses. That means we know where to look when a booking page fails to render for Googlebot, and we know which platform settings change what search engines see. We also understand the difference between a unit availability page and a landing page, and we structure both for the searches they are meant to capture."
      />

      <Testimonial
        quote={
          <>
            Our booking pages were loading in 6 to 8 seconds on mobile. After the technical fixes,
            page speed dropped to under 2 seconds and our reservation completion rate jumped by 31%.
          </>
        }
        avatarInitials="TX"
        name="Multi-location operator, Texas"
      />

      <FAQ
        label="Common questions"
        headline={<>Things owners <em>usually ask</em>.</>}
        items={[
          {
            q: "Will you break my website?",
            a: "No. Every change is tested in staging first, and we coordinate with your web team or platform provider before deploying.",
          },
          {
            q: "Do you work with WordPress, Wix, Squarespace, and custom builds?",
            a: "Yes, along with the industry platforms like storEDGE, SiteLink, and Storable-powered websites. We adapt our approach to what your facility already uses.",
          },
          {
            q: "How long until I see results from technical SEO?",
            a: "Ranking improvements from technical fixes typically appear within four to eight weeks, as Google re-crawls and re-indexes your site. Page speed improvements show up in conversion rate data almost immediately.",
          },
          {
            q: "Is this a one-time project or ongoing?",
            a: "Foundations are a one-time project that takes 30 to 60 days. Ongoing technical SEO maintenance is included in our monthly programs to catch regressions from platform updates, new page launches, and CMS changes.",
          },
        ]}
      />

      <SimpleCTA
        headline="Find the technical problems costing you reservations."
        body="Get a free technical audit. We will show you the exact pages and issues hurting your search rankings and your booking completion rates."
        ctaLabel="Get my free technical audit"
      />
    </>
  );
}
