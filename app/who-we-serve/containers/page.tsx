import { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import ContentBlock from "@/components/sections/ContentBlock";
import FeatureList from "@/components/sections/FeatureList";
import SimpleCTA from "@/components/sections/SimpleCTA";

export const metadata: Metadata = {
  title: "SEO for Storage Container Facilities | SelfStorage.help",
  description:
    "A local SEO and content program built for portable and on-site storage container operators competing on price and convenience.",
};

export default function ContainersPage() {
  return (
    <div className="page-storage-warehouse">
      <PageHero
        eyebrow="For Storage Container Operators"
        headline={<>Rank for renters comparing a <em>storage container</em> to a unit.</>}
        subheadline="A local SEO and content program built for container operators competing on price, delivery, and on-site convenience."
        primaryCta={{ label: "Get my free audit", href: "/audit" }}
      />

      <ContentBlock
        variant="warm"
        label="What you actually need"
        headline="Container renters are price-shopping a specific decision."
        body="Renters searching for a storage container are usually weighing a clear trade-off: a container is often a cheaper storage option than a warehouse unit, and it comes to them instead of the other way around. They want to know delivery and pickup fees, monthly rates by container size, how long the minimum term runs, and whether the container stays on their property or sits in a secured yard. Containers can run well under warehouse rates per square foot, but a renter only commits if the page answers cost and logistics up front. If it does not, they price the next operator in the map pack."
      />

      <FeatureList
        variant="light"
        style="numbered"
        showDividers={false}
        label="How we work"
        headline="How we work with storage container operators."
        items={[
          {
            num: "1",
            title: "Price-intent keyword coverage",
            desc: "We target storage container hire, portable storage, mobile storage, container rental cost, and the long-tail variants renters type, including city and trade-area modifiers.",
          },
          {
            num: "2",
            title: "Content that answers the cost question",
            desc: "Pages on delivery and pickup fees, monthly rates by size, minimum terms, and how a container compares to a warehouse unit on total cost.",
          },
          {
            num: "3",
            title: "Local SEO that wins the comparison",
            desc: "Google Business Profile attributes, photos, and posts that make on-site delivery and pricing visible directly in the map pack.",
          },
        ]}
      />

      <FeatureList
        variant="warm"
        style="bullet"
        showDividers={false}
        label="Typical results"
        headline="What storage container operators typically see."
        items={[
          {
            title: "",
            desc: "Top three rankings for container and portable storage keywords within 90 to 150 days.",
          },
          {
            title: "",
            desc: "More qualified inquiries, since price-aware renters convert once the cost questions are answered.",
          },
          {
            title: "",
            desc: "Lower churn, because renters who chose on total cost stay through longer projects and moves.",
          },
        ]}
      />

      <SimpleCTA
        headline="See how visible your container pricing actually is."
        body="Get a free audit focused on container keyword coverage and local visibility."
        ctaLabel="Get my free audit"
        ctaHref="/audit"
      />
    </div>
  );
}
