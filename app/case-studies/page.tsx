import { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import CardGrid from "@/components/sections/CardGrid";
import SimpleCTA from "@/components/sections/SimpleCTA";

export const metadata: Metadata = {
  title: "Self-Storage SEO Case Studies | SelfStorage.help",
  description:
    "Case studies from independent owners, multi-location operators, and specialty storage facilities we have worked with.",
};

const caseStudies = [
  {
    eyebrow: "Independent · Florida · Local SEO",
    title: "From position 7 to the map pack top three in 60 days.",
    body: "A single-location operator in Florida had strong occupancy history but had lost visibility after a Google algorithm update. Direction requests tripled within 60 days of our local SEO rollout.",
    href: "#",
    ctaLabel: "Read the case study",
  },
  {
    eyebrow: "Multi-location · Southeast · Portfolio SEO",
    title: "Portfolio-wide top three rankings in six months.",
    body: "A twelve-facility operator across three states had four locations stuck below the map pack. Within six months, every facility ranked in the top three for its primary keyword set.",
    href: "#",
    ctaLabel: "Read the case study",
  },
  {
    eyebrow: "Vehicle & RV · Arizona · Content + Local SEO",
    title: "38% more vehicle storage reservations year over year.",
    body: "A vehicle and RV storage specialist in Arizona built out vehicle-specific keyword clusters and seasonal content. Organic reservations for vehicle spaces grew 38% year over year.",
    href: "#",
    ctaLabel: "Read the case study",
  },
  {
    eyebrow: "Climate-controlled · Texas · Conversion",
    title: "Premium unit occupancy at 97% in eight months.",
    body: "A climate-controlled facility in Texas targeted renters storing high-value items. Combined GBP optimization and climate-specific content pushed premium unit occupancy to 97%.",
    href: "#",
    ctaLabel: "Read the case study",
  },
  {
    eyebrow: "Pre-opening · Colorado · Full program",
    title: "Hit 62% occupancy in month 12.",
    body: "A new facility in Colorado started the pre-opening SEO program six months before doors opened. By month 12, occupancy reached 62%, well ahead of the owner's underwriting assumptions.",
    href: "#",
    ctaLabel: "Read the case study",
  },
  {
    eyebrow: "Independent · Ohio · Map Pack",
    title: "Moved from page two to the top three-pack.",
    body: "A single-location operator in Ohio was invisible for their primary city term. Citation cleanup and GBP optimization moved them from page two to the three-pack in four months.",
    href: "#",
    ctaLabel: "Read the case study",
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        headline={<>Real facilities, <em>real occupancy gains</em>.</>}
        subheadline="Case studies from independent owners, multi-location operators, and specialty storage facilities we have worked with."
      />

      <CardGrid
        variant="light"
        cols={3}
        label="Results"
        headline="Outcomes we have delivered for owners like you."
        cards={caseStudies}
      />

      <SimpleCTA
        headline="Want to see results like these?"
        body="Get a free audit. We will show you the exact gaps between where your facility ranks today and where it should rank."
        ctaLabel="Start my free audit"
      />
    </>
  );
}
