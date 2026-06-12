import { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import ContentBlock from "@/components/sections/ContentBlock";
import FeatureList from "@/components/sections/FeatureList";
import SimpleCTA from "@/components/sections/SimpleCTA";

export const metadata: Metadata = {
  title: "SEO for Storage Warehouse Facilities | SelfStorage.help",
  description:
    "A local SEO and content program built for warehouse storage facilities competing for business inventory, equipment, and overflow stock renters.",
};

export default function StorageWarehousePage() {
  return (
    <div className="page-storage-warehouse">
      <PageHero
        eyebrow="For Storage Warehouse Facilities"
        headline={<>Rank for the businesses searching for a <em>storage warehouse</em>.</>}
        subheadline="A local SEO and content program built for warehouse facilities competing on security, 24/7 access, and flexible space."
        primaryCta={{ label: "Get my free audit", href: "/audit" }}
      />

      <ContentBlock
        variant="warm"
        label="What you actually need"
        headline="Warehouse renters search like buyers, not browsers."
        body="Businesses looking for warehouse storage search differently than household renters. They are storing inventory, equipment, documents, seasonal stock, or commercial vehicles, and they compare facilities on specifics: is access really 24/7, what does the security setup actually cover, how flexible are the space options, and can the unit scale as the business grows. Warehouse storage often costs a fraction of traditional commercial lease space with no long-term commitment, but a renter only learns that if your pages say it. If those questions are not answered on the page, the search moves to the next facility in the map pack."
      />

      <FeatureList
        variant="light"
        style="numbered"
        showDividers= {false}
        label="How we work"
        headline="How we work with storage warehouse facilities."
        items={[
          {
            num: "1",
            title: "Commercial keyword coverage",
            desc: "We target storage warehouse, business storage, commercial storage, inventory storage, and the long-tail variants businesses actually type, including city and trade-area modifiers.",
          },
          {
            num: "2",
            title: "Content that answers buying questions",
            desc: "Pages on security and surveillance, 24/7 access, unit sizes and flexible terms, and how warehouse storage compares to leasing commercial space.",
          },
          {
            num: "3",
            title: "Local SEO that surfaces the offering",
            desc: "Google Business Profile attributes, photos, and posts that make 24/7 access and business storage visible directly in the map pack.",
          },
        ]}
      />

      <FeatureList
        variant="warm"
        style="bullet"
        showDividers={false}
        label="Typical results"
        headline="What warehouse storage facilities typically see."
        items={[
          {
            title: "",
            desc: "Top three rankings for business and commercial storage keywords within 90 to 150 days.",
          },
          {
            title: "",
            desc: "Higher average reservation value, since business renters take larger units on longer terms.",
          },
          {
            title: "",
            desc: "Lower churn, because commercial tenants storing inventory and equipment tend to stay longer.",
          },
        ]}
      />

      <SimpleCTA
        headline="See how visible your warehouse storage actually is."
        body="Get a free audit focused on commercial keyword coverage and local visibility."
        ctaLabel="Get my free audit"
        ctaHref="/audit"
      />
    </div>
  );
}
