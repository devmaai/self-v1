import { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import ContentBlock from "@/components/sections/ContentBlock";
import FeatureList from "@/components/sections/FeatureList";
import SimpleCTA from "@/components/sections/SimpleCTA";

export const metadata: Metadata = {
  title: "SEO for New Self-Storage Facility Openings | SelfStorage.help",
  description:
    "A pre-opening SEO program designed to have your facility ranked, reviewed, and reserving units the moment your doors open.",
};

export default function NewFacilityOpeningsPage() {
  return (
    <>
      <PageHero
        eyebrow="For New Facility Openings"
        headline={<>Hit your lease-up targets <em>from day one</em>.</>}
        subheadline="A pre-opening SEO program designed to have your facility ranked, reviewed, and reserving units the moment your doors open."
        primaryCta={{ label: "Get my free pre-opening plan", href: "/audit" }}
      />

      <ContentBlock
        variant="warm"
        label="What you actually need"
        headline="The first six months after opening are critical."
        body="The first six months after opening are critical. Your lease-up curve sets your refinancing timeline, your cash flow, and your valuation. A facility that hits 60% occupancy in month 12 is a very different asset than one that hits 60% in month 24. The mistake we see most often is operators waiting until opening day to start marketing. By then, Google has no profile to rank, you have zero reviews, and you are two months behind where you should have been."
      />

      <FeatureList
        variant="light"
        style="numbered"
        label="How we work"
        headline="Five focus areas, sequenced across the six months before opening."
        items={[
          {
            num: "Month 6",
            title: "Google Business Profile creation and claim",
            desc: "Create and verify your listing as soon as your facility has a street address.",
          },
          {
            num: "Month 5",
            title: "Website and location pages",
            desc: "Launch a fast, crawlable site with every unit size, every service, and every neighborhood page ready to rank.",
          },
          {
            num: "Month 4",
            title: "Content and keyword foundation",
            desc: "Publish the core informational content that ranks over time.",
          },
          {
            num: "Month 2",
            title: "Citation building and local authority",
            desc: "Get listed in every relevant local directory and self-storage database.",
          },
          {
            num: "Month 1",
            title: "Review velocity and paid search launch",
            desc: "Activate paid search for move-in-ready renters and begin the review program the moment you have your first tenants.",
          },
        ]}
      />

      <FeatureList
        variant="warm"
        style="bullet"
        label="Typical results"
        headline="Facilities that follow the full pre-opening program typically hit:"
        items={[
          { title: "", desc: "50% to 70% occupancy by month 12." },
          { title: "", desc: "Top three map rankings within 4 to 6 months of opening." },
          { title: "", desc: "First 25 Google reviews within 90 days of opening." },
        ]}
      />

      <SimpleCTA
        headline="Planning a grand opening?"
        body="Get a free pre-opening plan. Tell us your opening date and we will map out what should happen every month between now and doors open."
        ctaLabel="Get my free pre-opening plan"
        ctaHref="/audit"
      />
    </>
  );
}
