import { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import FeatureList from "@/components/sections/FeatureList";
import ContentBlock from "@/components/sections/ContentBlock";
import Testimonial from "@/components/sections/Testimonial";
import FAQ from "@/components/sections/FAQ";
import SimpleCTA from "@/components/sections/SimpleCTA";

export const metadata: Metadata = {
  title: "Technical SEO for Self-Storage | SelfStorage.help",
  description:
    "We fix the technical foundations of your self-storage website so Google can crawl it, renters can load it instantly, and your booking software converts the traffic you earn.",
};

export default function TechnicalSeoPage() {
  return (
    <>
      <PageHero
        eyebrow="Technical SEO"
        headline="Fast sites book more reservations."
        subheadline="We fix the technical foundations of your self-storage website so Google can crawl it, renters can load it instantly, and your booking software actually converts the traffic you earn."
        primaryCta={{ label: "Get my free technical audit", href: "/contact" }}
      />

      <FeatureList
        variant="warm"
        style="bullet"
        label="The problem"
        headline="Your website is quietly losing reservations."
        intro="A self-storage website has three technical jobs: load fast, stay crawlable, and pass booking data cleanly. When any of these break, move-ins drop before you notice. The most common issues we find:"
        items={[
          {
            title: "",
            desc: "Pages that take five seconds or longer to load on a phone, which kills mobile reservations.",
          },
          {
            title: "",
            desc: "Booking software that renders through JavaScript in ways Google cannot crawl, hiding your unit inventory from search results.",
          },
          {
            title: "",
            desc: "Duplicate pages generated automatically by your platform that dilute the ranking signals of your best pages.",
          },
          {
            title: "",
            desc: "A robots.txt file or meta robots tag accidentally blocking your most important pages from being indexed.",
          },
          {
            title: "",
            desc: "Missing or broken structured data, so Google cannot understand that you are a self-storage facility with specific services and hours.",
          },
        ]}
      />

      <FeatureList
        variant="light"
        style="numbered"
        label="Our approach"
        headline="Our technical SEO framework."
        items={[
          {
            num: "1",
            title: "Core Web Vitals and mobile speed",
            desc: "We tune images, clean up render-blocking scripts, and work with your platform to get Largest Contentful Paint under 2.5 seconds on 4G mobile. Most renters search on a phone. A fast page is a booked page.",
          },
          {
            num: "2",
            title: "Booking software integration",
            desc: "We work with the major self-storage platforms (SiteLink, storEDGE, Easy Storage Solutions, Storable, and others) to make sure your unit inventory and pricing data is crawlable and properly structured for search engines.",
          },
          {
            num: "3",
            title: "Structured data for self-storage",
            desc: "We implement the full schema markup stack: LocalBusiness, Service, FAQPage, BreadcrumbList, and SelfStorage where supported. Proper schema lifts click-through rates from search results and feeds Google's knowledge of your facility.",
          },
          {
            num: "4",
            title: "Crawling and indexing hygiene",
            desc: "We audit robots.txt, sitemap.xml, canonical tags, pagination, and internal linking. We find and fix orphaned pages, thin duplicate pages, and soft 404 errors that waste Google's crawl budget.",
          },
          {
            num: "5",
            title: "Site architecture",
            desc: "We map your pages so that each unit size, each service, and each location has a single canonical URL that earns authority. No more five near-duplicate pages splitting the ranking signals between them.",
          },
        ]}
      />

      <ContentBlock
        variant="dark"
        label="The storage edge"
        headline="Most generalist SEO teams have never seen a storEDGE backend."
        body="We work with the software the self-storage industry actually uses. That means we know where to look when a booking page fails to render for Googlebot, and we know which platform settings change what search engines see. We also understand the difference between a unit availability page and a landing page, and we structure both for the searches they are meant to capture."
      />

      <Testimonial
        quote={
          <>
            Our booking pages were loading in 6 to 8 seconds on mobile. After the technical fixes,
            page speed dropped to under 2 seconds and our reservation completion rate jumped by 31%.
          </>
        }
        avatarInitials="TX"
        name="Multi-location operator, Texas"
      />

      <FAQ
        label="Common questions"
        headline={<>Things owners <em>usually ask</em>.</>}
        items={[
          {
            q: "Will you break my website?",
            a: "No. Every change is tested in staging first, and we coordinate with your web team or platform provider before deploying.",
          },
          {
            q: "Do you work with WordPress, Wix, Squarespace, and custom builds?",
            a: "Yes, along with the industry platforms like storEDGE, SiteLink, and Storable-powered websites. We adapt our approach to what your facility already uses.",
          },
          {
            q: "How long until I see results from technical SEO?",
            a: "Ranking improvements from technical fixes typically appear within four to eight weeks, as Google re-crawls and re-indexes your site. Page speed improvements show up in conversion rate data almost immediately.",
          },
          {
            q: "Is this a one-time project or ongoing?",
            a: "Foundations are a one-time project that takes 30 to 60 days. Ongoing technical SEO maintenance is included in our monthly programs to catch regressions from platform updates, new page launches, and CMS changes.",
          },
        ]}
      />

      <SimpleCTA
        headline="Find the technical problems costing you reservations."
        body="Get a free technical audit. We will show you the exact pages and issues hurting your search rankings and your booking completion rates."
        ctaLabel="Get my free technical audit"
      />
    </>
  );
}
