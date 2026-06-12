import { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import ContentBlock from "@/components/sections/ContentBlock";
import FeatureList from "@/components/sections/FeatureList";
import Testimonial from "@/components/sections/Testimonial";
import SimpleCTA from "@/components/sections/SimpleCTA";

export const metadata: Metadata = {
  title: "SEO for Independent Self-Storage Owners | SelfStorage.help",
  description:
    "Performance SEO for independent self-storage owners who want to compete with the REITs without the staffing, the overhead, or the long agency sales process.",
};

export default function IndependentOwnersPage() {
  return (
    <>
      <PageHero
        eyebrow="For Independent Owners"
        headline="Fill units without hiring a marketing team."
        subheadline="Performance SEO for independent self-storage owners who want to compete with the REITs without the staffing, the overhead, or the long agency sales process."
        primaryCta={{ label: "Get my free audit", href: "/audit" }}
      />

      <ContentBlock
        variant="warm"
        label="What you actually need"
        headline="You need a partner who handles the whole program."
        body="As an independent owner, you are trying to do everything. You are managing the facility, handling staff, responding to tenants, and also expected to run marketing. You do not have time to become an expert in Google Business Profile, technical SEO, and paid search on top of everything else. You need a partner who handles the whole program, reports on the numbers that matter, and gives you back your time."
      />

      <FeatureList
        variant="light"
        style="numbered"
        label="How we work"
        headline="How we work with independent owners."
        items={[
          {
            num: "1",
            title: "Local visibility first",
            desc: "We start with Google Business Profile optimization, citation cleanup, and local landing pages, because those generate the fastest occupancy wins for independent owners.",
          },
          {
            num: "2",
            title: "Monthly reporting in plain English",
            desc: "You get a one-page monthly summary showing what we did, what moved, and what is next. No 40-slide decks.",
          },
          {
            num: "3",
            title: "Flat monthly pricing",
            desc: "You know exactly what you are paying, every month. No surprise fees, no project-based add-ons.",
          },
        ]}
      />

      <FeatureList
        variant="warm"
        style="bullet"
        label="Typical results"
        headline="What independent clients see within 90 days."
        items={[
          { title: "", desc: "Top three map pack rankings for their primary keyword set." },
          { title: "", desc: "2x to 3x increase in Google Business Profile direction requests." },
          { title: "", desc: "15% to 30% increase in website visits from local search." },
        ]}
      />

      <Testimonial
        quote={
          <>
            I do not have time to learn SEO. I have a facility to run. SelfStorage.help took the
            whole thing off my plate, and six months later we are at 92% occupancy.
          </>
        }
        avatarInitials="GA"
        name="Owner, single-facility independent, Georgia"
      />

      <SimpleCTA
        headline="Find out what your facility is missing."
        body="Get a free audit. We will show you the three or four highest-impact fixes we would prioritize in your first 90 days."
        ctaLabel="Get my free audit"
        ctaHref="/audit"
      />
    </>
  );
}
