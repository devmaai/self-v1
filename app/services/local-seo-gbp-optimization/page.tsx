import { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import FeatureList from "@/components/sections/FeatureList";
import ContentBlock from "@/components/sections/ContentBlock";
import Testimonial from "@/components/sections/Testimonial";
import FAQ from "@/components/sections/FAQ";
import SimpleCTA from "@/components/sections/SimpleCTA";

export const metadata: Metadata = {
  title: "Local SEO & Google Business Profile Optimization | SelfStorage.help",
  description:
    "Our Local SEO and Google Maps program puts your facility in front of renters the moment they search for storage in your area.",
};

export default function LocalSeoGbpPage() {
  return (
    <>
      <PageHero
        eyebrow="Local SEO & GBP Optimization"
        headline="Get Your Self-Storage Facility Ranking #1–3 on Google Maps"
        subheadline={`We are a specialized Local SEO agency that helps independent self-storage owners dominate local Google Maps rankings in their 3–5 mile radius.`}
        primaryCta={{ label: "Get a free local visibility audit", href: "/contact" }}
        primaryCtaTone="rust"
        note="100% focused on self-storage occupancy growth."
      />

      <FeatureList
        variant="warm"
        style="bullet"
        label="The problem"
        headline="We Put Independent Storage Facilities on Page 1 of Google Maps"
        intro="If your facility is not in the top three results on Google Maps, you are losing the majority of local clicks to the facility down the road. The three failure modes we see most often:"
        showDividers={false}
        items={[
          {
            title: "Location drift",
            desc: "Your facility shows up several miles from where it actually sits, so renters call someone closer.",
          },
          {
            title: "Review gap",
            desc: "Your compitetor shows up with 4.8 stars and 200+ reviews while you have 3 old reviews, so renters choose them before they even see you.",
          },
          {
            title: "Wrong hours",
            desc: "Renters see incorrect office hours or gate access times and assume you are closed when they are ready to move in.",
          },
        ]}
      />

      <FeatureList
        variant="light"
        style="numbered"
        label="Our approach"
        headline="We optimize your storage business listings for organic lead generation"
        centeredHeadline
        showDividers={false}
        items={[
          {
            num: "1",
            title: "Google Business Profile mastery",
            desc: "We manage your listing weekly. High-quality photos of every unit type, posts and offers kept current, correct primary category selection, properly configured attributes, and the structured data that signals to Google that your facility is the most relevant result in its radius.",
          },
          {
            num: "2",
            title: "Near-me keyword optimization",
            desc: 'We build and optimize local landing pages for the phrases renters actually use: "climate-controlled storage in {City}," "vehicle and RV storage near {Neighborhood}," "cheapest 10x10 units near me," and "drive-up storage units in {ZIP}."',
          },
          {
            num: "3",
            title: "Hyper-local citation building",
            desc: "We list your facility in 50+ local directories and self-storage-specific databases. Consistent Name, Address, and Phone information across citations builds the topical authority that lifts your map rankings.",
          },
        ]}
      />

      <ContentBlock
        variant="dark"
        label="The storage edge"
        headline="Local SEO for self storage units need special expertise."
        body="Storage facilities have specifics that a generalist playbook misses. Here is how we handle them:"
        showDividers={false}
        bullets={[
          "Gate access versus office hours. We configure your listing so Google clearly shows when your office is staffed and when renters can access their units, which reduces phone inquiries about hours.",
          "Unit-level conversion tracking. We connect Google Business Profile interactions to your booking software, so you can see which map clicks became reservations.",
          "Neighborhood-level targeting. We target the specific zip codes and neighborhoods that drive revenue to your facility, not just the city you are in.",
        ]}
      />

      <Testimonial
        quote={
          <>
            Helped Pickfords in the UK to rank for their independent facilities across 33 states.
          </>
        }
        avatarInitials="FL"
        name="Independent storage facility owner, Florida"
      />

      <FAQ
        label="Common questions"
        headline={<>Before you hire an SEO expert, <em>Ask this</em>.</>}
        items={[
          {
            q: "How long will it take to rank in the top three positions of the Google Maps?",
            a: "Most of our self-storage clients see meaningful map ranking improvement within 45 to 90 days. The exact timeline depends on your starting position, review count, and the competitive density of your trade area.",
          },
          {
            q: "Do you handle review responses?",
            a: "Yes. We can provide response templates your on-site team uses, or we can actively manage responses on your behalf. Either approach keeps your review profile active, which Google treats as a positive signal.",
          },
          {
            q: "Does this work across multiple locations?",
            a: "Yes. We run multi-location local SEO programs for operators with five, fifteen, or fifty-plus facilities. Each location gets its own localized strategy so your facilities complement each other instead of competing for the same keywords.",
          },
          {
            q: "Do I need a new website for Local SEO to work?",
            a: "No. Most of the wins in the first 90 days come from Google Business Profile optimization, citation cleanup, and local landing pages. A website rebuild is only needed if your current site has severe technical problems, and we will tell you honestly after the audit.",
          },
        ]}
      />

      <SimpleCTA
        headline="Ready to fill your units?"
        body="Get a free audit of your current Google Maps performance. We will show you exactly where you are losing renters and how to fix it."
        ctaLabel="Claim my local audit"
      />
    </>
  );
}
