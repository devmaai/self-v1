import { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import ContentBlock from "@/components/sections/ContentBlock";
import FeatureList from "@/components/sections/FeatureList";
import SimpleCTA from "@/components/sections/SimpleCTA";

export const metadata: Metadata = {
  title: "SEO for Climate-Controlled Self-Storage Facilities | SelfStorage.help",
  description:
    "A local SEO and content program built for facilities where climate control is a core offering and a premium differentiator.",
};

export default function ClimateControlledPage() {
  return (
    <>
      <PageHero
        eyebrow="For Climate-Controlled Facilities"
        headline={<>Rank for the renters who actually want <em>climate-controlled</em> storage.</>}
        subheadline="A local SEO and content program built for facilities where climate control is a core offering and a premium differentiator."
        primaryCta={{ label: "Get my free audit", href: "/contact" }}
      />

      <ContentBlock
        variant="warm"
        label="What you actually need"
        headline="Premium renters search differently."
        body="Renters who want climate-controlled storage search differently than general storage renters. They are storing furniture, musical instruments, documents, electronics, or art. They are willing to pay a premium. They are comparing facilities on specifics: is it temperature-controlled only, or humidity-controlled too? What temperature range is maintained? Does the facility have 24-hour climate monitoring? If your pages do not answer those questions, a premium renter moves on."
      />

      <FeatureList
        variant="light"
        style="numbered"
        label="How we work"
        headline="How we work with climate-controlled facilities."
        items={[
          {
            num: "1",
            title: "Climate-specific keyword coverage",
            desc: "We target climate-controlled, temperature-controlled, humidity-controlled, and the long-tail variants renters actually use.",
          },
          {
            num: "2",
            title: "Content that converts premium renters",
            desc: "Guides on what to store in climate control, temperature ranges to expect, and how climate control differs from basic indoor storage.",
          },
          {
            num: "3",
            title: "Local SEO that highlights the premium offering",
            desc: "Google Business Profile attributes, photos, and posts that make climate control visible in search results.",
          },
        ]}
      />

      <FeatureList
        variant="warm"
        style="bullet"
        label="Typical results"
        headline="What facilities with climate-controlled offerings typically see."
        items={[
          {
            title: "",
            desc: "Top three rankings for climate-controlled keywords within 90 to 150 days.",
          },
          {
            title: "",
            desc: "Higher average reservation value, since climate-controlled units convert at premium rates.",
          },
          {
            title: "",
            desc: "Lower churn, because renters storing high-value items tend to stay longer.",
          },
        ]}
      />

      <SimpleCTA
        headline="See how visible your climate-controlled units actually are."
        body="Get a free audit focused on climate-controlled keyword coverage and local visibility."
        ctaLabel="Get my free audit"
      />
    </>
  );
}
