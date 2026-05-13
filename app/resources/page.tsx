import { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import CardGrid from "@/components/sections/CardGrid";
import CTABanner from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Self-Storage SEO Resources | SelfStorage.help",
  description:
    "Blog posts, deep guides, free tools, and a working glossary built for operators who want to understand the work, not just outsource it.",
};

const resourceSections = [
  {
    eyebrow: "Blog",
    title: "Weekly posts on self-storage SEO",
    body: "Google algorithm updates, local SEO tactics, self-storage marketing trends, and operator case studies. Published weekly.",
    href: "/contact",
    ctaLabel: "Coming soon",
  },
  {
    eyebrow: "Guides",
    title: "Long-form reference material",
    body: "The 2026 Self-Storage SEO Playbook. The Unit Size Guide Template. The Pre-Opening Marketing Timeline. Each guide is a downloadable, self-contained resource.",
    href: "/contact",
    ctaLabel: "Coming soon",
  },
  {
    eyebrow: "Tools",
    title: "Free calculators and checkers",
    body: "Local Visibility Checker, Google Business Profile Grader, Occupancy Calculator, Unit Mix Analyzer. Built specifically for storage facilities, free to use.",
    href: "/contact",
    ctaLabel: "Coming soon",
  },
  {
    eyebrow: "Glossary",
    title: "Every term, in plain English",
    body: "Map pack, local pack, direction requests, economic occupancy, canonical URL, schema markup, and more. Written for operators, not marketers.",
    href: "/contact",
    ctaLabel: "Coming soon",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        headline={<>Everything we know about self-storage SEO, <em>in one place</em>.</>}
        subheadline="Blog posts, deep guides, free tools, and a working glossary, built for operators who want to understand the work, not just outsource it."
      />

      <CardGrid
        variant="light"
        cols={2}
        label="What you will find"
        headline="Free guidance for self-storage operators."
        cards={resourceSections}
      />

      <CTABanner
        headline={<>One practical email per month. <em>No fluff.</em></>}
        subtext="Self-storage marketing tactics, algorithm updates, and case study summaries. Built for operators. Unsubscribe anytime."
        placeholder="your@email.com"
        ctaLabel="Subscribe"
        note="No spam. One email per month."
      />
    </>
  );
}
