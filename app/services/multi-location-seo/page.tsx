import { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import FeatureList from "@/components/sections/FeatureList";
import ContentBlock from "@/components/sections/ContentBlock";
import Testimonial from "@/components/sections/Testimonial";
import FAQ from "@/components/sections/FAQ";
import SimpleCTA from "@/components/sections/SimpleCTA";

export const metadata: Metadata = {
  title: "Multi-Location SEO for Self-Storage | SelfStorage.help",
  description:
    "Scale local SEO across every facility you operate without pitting your own locations against each other for the same keywords.",
};

export default function MultiLocationSeoPage() {
  return (
    <>
      <PageHero
        eyebrow="Multi-Location SEO"
        headline="Scale local SEO across every facility you operate."
        subheadline="Whether you run five facilities or fifty, we build a local SEO program that lifts every location without pitting your own facilities against each other for the same keywords."
        primaryCta={{ label: "Get my free multi-location audit", href: "/contact" }}
      />

      <FeatureList
        variant="warm"
        style="bullet"
        label="The problem"
        headline="Scaling local SEO without a system creates new problems."
        intro="Multi-location operators face a different challenge than single-facility owners. When your facilities sit close to each other, poor SEO architecture causes them to compete for the same searches. The issues we see most often:"
        items={[
          {
            title: "",
            desc: "Duplicate or near-duplicate location pages that confuse Google about which to rank.",
          },
          {
            title: "",
            desc: "Inconsistent Name, Address, and Phone data across listings, which weakens map rankings at every location.",
          },
          {
            title: "",
            desc: "Reviews concentrated at one or two facilities while others sit with fewer than ten reviews each.",
          },
          {
            title: "",
            desc: "No shared reporting, so operations leaders cannot see which locations are winning and which are stuck.",
          },
        ]}
      />

      <FeatureList
        variant="light"
        style="numbered"
        label="Our approach"
        headline="Our multi-location framework."
        items={[
          {
            num: "1",
            title: "Location page architecture at scale",
            desc: "We design a template-based location page system where each page has unique, substantive content about that specific facility, its trade area, and its unit mix. No thin duplicates. No near-identical paragraphs with the city name swapped in.",
          },
          {
            num: "2",
            title: "Google Business Profile management across the portfolio",
            desc: "We manage every listing through a centralized workflow: consistent business category, attributes, hours, photos, and posts across every facility, with location-specific details where they matter.",
          },
          {
            num: "3",
            title: "Review velocity program",
            desc: "Every facility gets a system for earning new reviews weekly. We track review count, average rating, and response rate across your portfolio so underperforming locations get attention before they drag down rankings.",
          },
          {
            num: "4",
            title: "Trade area mapping",
            desc: "We map every facility's actual trade area and identify overlap zones where two of your facilities compete for the same renters. For each overlap, we choose which facility wins which keyword, and we build the local pages and GBP settings accordingly.",
          },
          {
            num: "5",
            title: "Portfolio-level reporting",
            desc: "One dashboard covering every facility: map rankings, direction requests, phone calls, website visits, and reservations attributed to search. Roll-up views for ownership. Facility-level views for operations.",
          },
        ]}
      />

      <ContentBlock
        variant="dark"
        label="The storage edge"
        headline="Operators with 5+ facilities run into challenges generalist agencies rarely see."
        body="Multi-location self-storage SEO has specifics that single-facility SEO and multi-location retail SEO both miss. Overlap zones between two of your own facilities need different handling than overlap with a competitor. Review programs need to be adapted to kiosk-staffed versus fully-staffed facilities. Reporting has to answer which facility is stuck at a glance. We have built the systems to answer all of that."
      />

      <Testimonial
        quote={
          <>
            We run twelve facilities across three states. Before working with SelfStorage.help,
            three of our locations were stuck in the map pack. Within six months, every facility
            ranked in the top three for its core keyword set.
          </>
        }
        avatarInitials="SE"
        name="Regional director, multi-location operator, Southeast US"
      />

      <FAQ
        label="Common questions"
        headline={<>Things operators <em>usually ask</em>.</>}
        items={[
          {
            q: "How many facilities do I need to qualify for the multi-location program?",
            a: "The program is built for operators with five or more facilities. Owners with two to four facilities are better served by our standard Local SEO program with custom reporting.",
          },
          {
            q: "Do you work with kiosk-based facilities?",
            a: "Yes. Kiosk facilities need specific Google Business Profile configuration and review program adjustments, which we handle.",
          },
          {
            q: "Can you coordinate with my in-house marketing team?",
            a: "Yes. We often work alongside in-house teams, taking the local SEO and content production work while your team handles brand, paid media, or other marketing functions.",
          },
          {
            q: "What reporting do I get?",
            a: "Monthly portfolio-level rollups plus a live dashboard with facility-level data refreshed weekly. If you have a BI stack, we can feed data into it directly.",
          },
        ]}
      />

      <SimpleCTA
        headline="Ready to scale local SEO across your portfolio?"
        body="Get a free multi-location audit. We will map every facility's current visibility, flag the gaps, and show you the quickest path to lifting occupancy across the portfolio."
        ctaLabel="Get my free multi-location audit"
      />
    </>
  );
}
