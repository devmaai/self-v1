import { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import FeatureList from "@/components/sections/FeatureList";
import ContentBlock from "@/components/sections/ContentBlock";
import Testimonial from "@/components/sections/Testimonial";
import FAQ from "@/components/sections/FAQ";
import SimpleCTA from "@/components/sections/SimpleCTA";

export const metadata: Metadata = {
  title: "Content & Keyword Strategy for Self-Storage | SelfStorage.help",
  description:
    "Unit size guides, city pages, and seasonal content built to rank for the searches your renters actually make and compound in traffic value year after year.",
};

export default function ContentKeywordStrategyPage() {
  return (
    <>
      <PageHero
        eyebrow="Content & Keyword Strategy"
        headline="Content that brings renters to your door."
        subheadline="Unit size guides, moving checklists, city and neighborhood pages, and seasonal content built to rank for the searches your renters actually make and to compound in traffic value year after year."
        primaryCta={{ label: "Get my free content audit", href: "/contact" }}
      />

      <FeatureList
        variant="warm"
        style="bullet"
        label="The problem"
        headline="Your website answers zero of the questions renters are asking Google."
        intro="Before a renter reserves a unit, they usually search five to fifteen times. They are comparing sizes, asking about climate control, looking up moving truck rentals, and reading about what they can and cannot store. If your website does not answer those questions, a competitor's blog or an aggregator site does, and that visitor is gone."
        items={[
          { title: "", desc: "No unit size guides, so renters go to a national chain's website instead." },
          { title: "", desc: "No neighborhood or city pages, so local searches send traffic to aggregators." },
          { title: "", desc: "No seasonal content, so you miss the peaks when storage demand spikes." },
        ]}
      />

      <FeatureList
        variant="light"
        style="numbered"
        label="Our approach"
        headline="Our content and keyword framework."
        items={[
          {
            num: "1",
            title: "Keyword architecture for self-storage",
            desc: "We map every page your facility needs across five content categories: core service pages, location pages, unit size guides, move-in and moving content, and informational content covering climate control, security, and long-term storage tips.",
          },
          {
            num: "2",
            title: "Search intent matching",
            desc: 'Every page is built to match what the searcher actually wants. A page targeting "10x10 storage unit" shows a renter what fits in that size, what it typically costs in your market, and a clear booking path. A page targeting "how to pack fragile items" earns trust first and introduces your facility naturally.',
          },
          {
            num: "3",
            title: "Local landing pages done right",
            desc: "A city or neighborhood page is a real page with real content, not a thin template with the city name swapped in. Each page covers what storage in that specific area looks like, references landmarks renters recognize, and links to the nearest facility you operate.",
          },
          {
            num: "4",
            title: "Seasonal and recurring content",
            desc: "College move-in and move-out, holiday decoration storage, seasonal gear rotation, summer RV storage, winter boat storage. We build a calendar so your content is always timely.",
          },
          {
            num: "5",
            title: "On-page optimization",
            desc: "Title tags, meta descriptions, headers, image alt text, internal linking, and schema markup. Every page is built to rank from day one.",
          },
        ]}
      />

      <ContentBlock
        variant="dark"
        label="The storage edge"
        headline="A storage content plan looks nothing like an e-commerce content plan."
        body="Self-storage content has specific high-intent patterns. Unit size guides convert. Neighborhood pages convert. Moving checklists convert. General lifestyle blog posts about decluttering rarely do. We know the difference and we only build what earns you reservations."
      />

      <Testimonial
        quote={
          <>
            In twelve months, our blog went from driving almost no traffic to pulling in 4,200
            organic visits a month. Roughly 14% of those visits now book a unit within 30 days.
          </>
        }
        avatarInitials="CO"
        name="Three-facility operator, Colorado"
      />

      <FAQ
        label="Common questions"
        headline={<>Things owners <em>usually ask</em>.</>}
        items={[
          {
            q: "Who writes the content?",
            a: "Our writers. We have a pool of writers trained on self-storage conventions, pricing language, and local market patterns. You review and approve every piece before it publishes.",
          },
          {
            q: "How many pieces of content do I need?",
            a: "It depends on your current coverage and competitive landscape. A typical starting program covers 12 core service and location pages plus 24 to 48 informational pieces over the first year.",
          },
          {
            q: "Will the content be unique to my facility?",
            a: "Yes. Every piece is written for your facility, your market, and your unit mix. We never use templated content that gets duplicated across multiple clients.",
          },
          {
            q: "How long does content take to rank?",
            a: "Core service and location pages typically rank within 60 to 120 days. Informational content can take 3 to 9 months depending on keyword difficulty, but once it ranks it tends to stay ranked for years.",
          },
        ]}
      />

      <SimpleCTA
        headline="Find the content gaps costing you reservations."
        body="Get a free content and keyword audit. We will show you the queries renters in your area are making that your site does not rank for yet."
        ctaLabel="Get my free content audit"
      />
    </>
  );
}
