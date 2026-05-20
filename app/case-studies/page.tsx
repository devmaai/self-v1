import { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import FeaturedCaseStudy from "@/components/sections/FeaturedCaseStudy";
import CaseStudiesBrowser, {
  CaseStudyCard,
} from "@/components/sections/CaseStudiesBrowser";
import SimpleCTA from "@/components/sections/SimpleCTA";

export const metadata: Metadata = {
  title: "Self-Storage SEO Case Studies | SelfStorage.help",
  description:
    "Real occupancy and ranking gains from independent owners, multi-location operators, and specialty storage facilities we have worked with.",
};

const cases: CaseStudyCard[] = [
  {
    category: "Multi-Location",
    eyebrow: "Southeast · Portfolio SEO",
    title: "Portfolio-wide top three rankings in six months.",
    body: "A twelve-facility operator across three states had four locations stuck below the map pack. Within six months, every facility ranked in the top three for its primary keyword set.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    metric: "+312%",
    href: "#",
  },
  {
    category: "Vehicle & RV",
    eyebrow: "Arizona · Content + Local SEO",
    title: "38% more vehicle storage reservations year over year.",
    body: "A vehicle and RV storage specialist in Arizona built out vehicle-specific keyword clusters and seasonal content. Organic reservations for vehicle spaces grew 38% year over year.",
    image:
      "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=1200&q=80",
    metric: "+38%",
    href: "#",
  },
  {
    category: "Climate-Controlled",
    eyebrow: "Texas · Conversion",
    title: "Premium unit occupancy at 97% in eight months.",
    body: "A climate-controlled facility in Texas targeted renters storing high-value items. Combined GBP optimization and climate-specific content pushed premium unit occupancy to 97%.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
    metric: "97%",
    href: "#",
  },
  {
    category: "Pre-Opening",
    eyebrow: "Colorado · Full program",
    title: "Hit 62% occupancy by month twelve.",
    body: "A new facility in Colorado started the pre-opening SEO program six months before doors opened. By month 12, occupancy reached 62%, well ahead of the owner's underwriting assumptions.",
    image:
      "https://images.unsplash.com/photo-1591588582259-e675bd2e6088?auto=format&fit=crop&w=1200&q=80",
    metric: "62%",
    href: "#",
  },
  {
    category: "Independent",
    eyebrow: "Ohio · Map Pack",
    title: "Page two to the top three-pack in four months.",
    body: "A single-location operator in Ohio was invisible for their primary city term. Citation cleanup and GBP optimization moved them from page two to the three-pack in four months.",
    image:
      "https://images.unsplash.com/photo-1601158935942-52255782d322?auto=format&fit=crop&w=1200&q=80",
    metric: "Top 3",
    href: "#",
  },
  {
    category: "Multi-Location",
    eyebrow: "Pacific Northwest · Portfolio",
    title: "Cut paid acquisition spend by 41%.",
    body: "An eight-facility regional operator was leaning hard on paid ads to keep occupancy up. After eighteen months of organic SEO compounding, they cut paid spend 41% with no occupancy drop.",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80",
    metric: "-41%",
    href: "#",
  },
  {
    category: "Climate-Controlled",
    eyebrow: "Georgia · Content",
    title: "Climate-search visibility up 4x in nine months.",
    body: "A boutique climate-controlled operator in Atlanta wanted to own searches around wine, documents, and art storage. Targeted content clusters quadrupled non-brand visibility.",
    image:
      "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=1200&q=80",
    metric: "4x",
    href: "#",
  },
  {
    category: "Vehicle & RV",
    eyebrow: "Florida · Seasonal SEO",
    title: "Snowbird-season inquiries doubled.",
    body: "A coastal RV and boat storage facility relied on seasonal demand from northern visitors. Snowbird-targeted content and GBP posts doubled fall-season inquiries year over year.",
    image:
      "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?auto=format&fit=crop&w=1200&q=80",
    metric: "2x",
    href: "#",
  },
  {
    category: "Independent",
    eyebrow: "Tennessee · Reviews + GBP",
    title: "From 28 reviews to 184 in one year.",
    body: "A second-generation family operator in Nashville had a strong reputation offline but no reviews. A structured review-request workflow added 156 reviews and lifted average rating to 4.8.",
    image:
      "https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=1200&q=80",
    metric: "+156",
    href: "#",
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="page-case-studies">
      <PageHero
        eyebrow="Case Studies"
        headline={
          <>
            Real facilities, <em>real occupancy gains</em>.
          </>
        }
        subheadline="Stories from independent owners, multi-location operators, and specialty storage facilities we have worked with. Filter by what looks closest to your portfolio."
      />

      <FeaturedCaseStudy
        category="Independent · Florida"
        eyebrow="Featured story"
        headline={
          <>
            From position seven to the <em>map pack top three</em> in 60 days.
          </>
        }
        excerpt="A single-location operator in Florida had strong occupancy history but had lost visibility after a Google algorithm update. Citation cleanup, GBP overhaul, and a focused on-page rebuild tripled direction requests inside two months — without paid ads."
        stats={[
          { value: "3x", label: "Direction requests" },
          { value: "60d", label: "To top-three rankings" },
          { value: "+22%", label: "Move-ins, 90 days" },
        ]}
        image="https://images.unsplash.com/photo-1577906096429-f73c2c312435?auto=format&fit=crop&w=1600&q=80"
      />

      <CaseStudiesBrowser
        label="All stories"
        headline={
          <>
            Outcomes we have delivered <em>for owners like you</em>.
          </>
        }
        intro="Filter by facility type to find the stories closest to your situation."
        cases={cases}
      />

      <SimpleCTA
        headline="Want to see results like these?"
        body="Get a free audit. We will show you the exact gaps between where your facility ranks today and where it should rank."
        ctaLabel="Start my free audit"
      />
    </div>
  );
}
