import { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import FeaturedCaseStudy from "@/components/sections/FeaturedCaseStudy";
import CaseStudiesBrowser, {
  CaseStudyCard,
} from "@/components/sections/CaseStudiesBrowser";
import SimpleCTA from "@/components/sections/SimpleCTA";
import { caseStudies } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Self-Storage SEO Case Studies | SelfStorage.help",
  description:
    "Real occupancy and ranking gains from independent owners, multi-location operators, and specialty storage facilities we have worked with.",
};

const featured = caseStudies.find((c) => c.featured) ?? caseStudies[0];

const cards: CaseStudyCard[] = caseStudies
  .filter((c) => !c.featured)
  .map((c) => ({
    category: c.category,
    eyebrow: c.eyebrow,
    title: c.cardTitle,
    body: c.cardBody,
    image: c.cardImage,
    metric: c.cardMetric,
    href: `/case-studies/${c.slug}`,
  }));

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
        category={`${featured.category} · ${featured.region}`}
        eyebrow="Featured story"
        headline={
          <>
            {featured.headline}{" "}
            {featured.headlineAccent && <em>{featured.headlineAccent}</em>}
          </>
        }
        excerpt={featured.excerpt}
        stats={featured.metrics}
        image={featured.heroImage}
        href={`/case-studies/${featured.slug}`}
      />

      <CaseStudiesBrowser
        label="All stories"
        headline={
          <>
            Outcomes we have delivered <em>for owners like you</em>.
          </>
        }
        intro="Filter by facility type to find the stories closest to your situation."
        cases={cards}
      />

      <SimpleCTA
        headline="Want to see results like these?"
        body="Get a free audit. We will show you the exact gaps between where your facility ranks today and where it should rank."
        ctaLabel="Start my free audit"
      />
    </div>
  );
}
