import { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import ContentBlock from "@/components/sections/ContentBlock";
import FeatureList from "@/components/sections/FeatureList";
import SimpleCTA from "@/components/sections/SimpleCTA";

export const metadata: Metadata = {
  title: "SEO for Vehicle, RV & Boat Storage | SelfStorage.help",
  description:
    "Specialized SEO for facilities that offer outdoor, covered, or enclosed vehicle storage, where the renter profile and search patterns are nothing like traditional storage.",
};

export default function VehicleRvBoatStoragePage() {
  return (
    <>
      <PageHero
        eyebrow="For Vehicle, RV & Boat Storage"
        headline={<>Book more vehicle, RV, and boat <em>storage spaces</em>.</>}
        subheadline="Specialized SEO for facilities that offer outdoor, covered, or enclosed vehicle storage, where the renter profile and search patterns are nothing like traditional storage."
        primaryCta={{ label: "Get my free audit", href: "/contact" }}
      />

      <ContentBlock
        variant="warm"
        label="What you actually need"
        headline="Vehicle storage renters search with very specific intent."
        body='Vehicle storage renters search with very specific intent. "RV storage near me," "covered boat storage {city}," "enclosed vehicle storage with power." Their trade area is also different: RV owners will drive 20 miles for the right facility, while traditional storage renters rarely travel beyond 5 miles. Your SEO program has to account for both differences.'
      />

      <FeatureList
        variant="light"
        style="numbered"
        label="How we work"
        headline="How we work with vehicle storage facilities."
        items={[
          {
            num: "1",
            title: "Vehicle-specific keyword architecture",
            desc: "Separate page clusters for RV, boat, classic car, commercial vehicle, and trailer storage.",
          },
          {
            num: "2",
            title: "Expanded trade area targeting",
            desc: "We target a larger radius for vehicle storage campaigns since renters travel further, while keeping tight targeting for traditional storage.",
          },
          {
            num: "3",
            title: "Seasonal content calendar",
            desc: "Summer RV prep, winter boat winterization, seasonal storage changeovers, snowbird patterns.",
          },
          {
            num: "4",
            title: "Photos and specs that convert",
            desc: "We coordinate on-site photography showing parking spaces, covered canopies, enclosed units, and any power, water, or wash bay amenities.",
          },
        ]}
      />

      <FeatureList
        variant="warm"
        style="bullet"
        label="Typical results"
        headline="What vehicle storage clients typically see."
        items={[
          {
            title: "",
            desc: "40% to 80% increase in vehicle-specific reservations year over year.",
          },
          {
            title: "",
            desc: "Strong seasonal performance aligned to RV and boat storage peaks.",
          },
          {
            title: "",
            desc: "Clear separation in reporting between traditional unit and vehicle storage performance.",
          },
        ]}
      />

      <SimpleCTA
        headline="See how your vehicle storage ranks today."
        body="Get a free audit focused on RV, boat, and vehicle storage keyword coverage."
        ctaLabel="Get my free audit"
      />
    </>
  );
}
