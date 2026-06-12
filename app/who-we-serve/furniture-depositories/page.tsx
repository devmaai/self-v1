import { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import ContentBlock from "@/components/sections/ContentBlock";
import FeatureList from "@/components/sections/FeatureList";
import SimpleCTA from "@/components/sections/SimpleCTA";

export const metadata: Metadata = {
  title: "SEO for Furniture Depositories | SelfStorage.help",
  description:
    "A local SEO and content program built for furniture depositories where the moving firm handles transport and storage pricing stays competitive.",
};

export default function FurnitureDepositoriesPage() {
  return (
    <div className="page-storage-warehouse">
      <PageHero
        eyebrow="For Furniture Depositories"
        headline={<>Rank for movers searching for a <em>furniture depository</em>.</>}
        subheadline="A local SEO and content program built for depositories where the moving firm handles transport and pricing stays competitive."
        primaryCta={{ label: "Get my free audit", href: "/audit" }}
      />

      <ContentBlock
        variant="warm"
        label="What you actually need"
        headline="Depository renters are between two homes, not browsing."
        body="People searching for a furniture depository are usually mid-move: a renovation, a sale that closed before the next purchase, or a relocation with a gap. They want a service, not a unit. The moving firm takes care of transport in and out, the goods sit inventoried and secured, and storage prices can stay competitive against renting a unit plus hiring movers twice. They are comparing on what is included: collection, packing, inventory, insured storage, and redelivery on a date that can move. If the page does not spell out the full service and what it costs, the search goes to the next depository in the map pack."
      />

      <FeatureList
        variant="light"
        style="numbered"
        showDividers={false}
        label="How we work"
        headline="How we work with furniture depositories."
        items={[
          {
            num: "1",
            title: "Service-intent keyword coverage",
            desc: "We target furniture depository, furniture storage with collection, removals and storage, and the long-tail variants movers type, including city and trade-area modifiers.",
          },
          {
            num: "2",
            title: "Content that explains the full service",
            desc: "Pages on collection and redelivery, inventoried and insured storage, how pricing compares to a unit plus movers, and how flexible the storage term is.",
          },
          {
            num: "3",
            title: "Local SEO that surfaces the service",
            desc: "Google Business Profile attributes, photos, and posts that make collection, transport, and redelivery visible directly in the map pack.",
          },
        ]}
      />

      <FeatureList
        variant="warm"
        style="bullet"
        showDividers={false}
        label="Typical results"
        headline="What furniture depositories typically see."
        items={[
          {
            title: "",
            desc: "Top three rankings for depository and removals-and-storage keywords within 90 to 150 days.",
          },
          {
            title: "",
            desc: "Higher average booking value, since full-service depository jobs bundle transport and storage.",
          },
          {
            title: "",
            desc: "Lower churn, because renters between homes stay through the full gap until redelivery.",
          },
        ]}
      />

      <SimpleCTA
        headline="See how visible your depository service actually is."
        body="Get a free audit focused on depository keyword coverage and local visibility."
        ctaLabel="Get my free audit"
        ctaHref="/audit"
      />
    </div>
  );
}
