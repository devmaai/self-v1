import { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import ContentBlock from "@/components/sections/ContentBlock";
import FeatureList from "@/components/sections/FeatureList";
import Testimonial from "@/components/sections/Testimonial";
import SimpleCTA from "@/components/sections/SimpleCTA";

export const metadata: Metadata = {
  title: "SEO for Multi-Location Self-Storage Operators | SelfStorage.help",
  description:
    "One partner, one reporting layer, and consistent visibility gains across every location in your portfolio.",
};

export default function MultiLocationOperatorsPage() {
  return (
    <>
      <PageHero
        eyebrow="For Multi-Location Operators"
        headline="Scale local SEO across every facility you operate."
        subheadline="For regional and national operators running five or more facilities who need one partner, one reporting layer, and consistent visibility gains across every location."
        primaryCta={{ label: "Get my free multi-location audit", href: "/audit" }}
      />

      <ContentBlock
        variant="warm"
        label="What you actually need"
        headline="You need a partner with systems, not just tactics."
        body="Running five, fifteen, or fifty facilities creates marketing challenges that single-location operators never face. Your facilities can cannibalize each other in overlap zones. Your review velocity varies wildly across locations. Your on-site staff follows different processes at different sites. And your leadership team needs one view of what is working portfolio-wide. You need a partner with systems, not just tactics."
      />

      <FeatureList
        variant="light"
        style="numbered"
        label="How we work"
        headline="How we work with multi-location operators."
        items={[
          {
            num: "1",
            title: "Portfolio-wide local SEO architecture",
            desc: "One system for location pages, one workflow for Google Business Profile management, one review program, applied consistently across every facility.",
          },
          {
            num: "2",
            title: "Overlap zone resolution",
            desc: "We map where your facilities compete with each other and we choose which facility wins which keyword, so internal cannibalization stops.",
          },
          {
            num: "3",
            title: "Operational alignment",
            desc: "We train your on-site teams on the review program, the photo upload cadence, and any on-site tasks that support local SEO.",
          },
          {
            num: "4",
            title: "Roll-up reporting for leadership",
            desc: "Portfolio-level dashboards for ownership and operations leadership. Facility-level dashboards for site managers.",
          },
        ]}
      />

      <FeatureList
        variant="warm"
        style="bullet"
        label="Typical results"
        headline="What operators see within six months."
        items={[
          { title: "", desc: "Every facility ranking in the top three for its primary keyword." },
          { title: "", desc: "Portfolio-wide direction request volume up 2x to 3x." },
          { title: "", desc: "Review velocity standardized at 8+ new reviews per facility per month." },
        ]}
      />

      <Testimonial
        quote={
          <>
            Before SelfStorage.help, four of our twelve facilities were consistently behind. Now the
            entire portfolio performs to a predictable standard, and we can identify which location
            is stuck in our dashboard in about 30 seconds.
          </>
        }
        avatarInitials="SE"
        name="VP of Operations, twelve-facility operator, Southeast US"
      />

      <SimpleCTA
        headline="Ready to run local SEO like a system?"
        body="Get a free multi-location audit. We will map the current state of every facility and show you the path to portfolio-wide performance."
        ctaLabel="Get my free multi-location audit"
        ctaHref="/audit"
      />
    </>
  );
}
