import Hero from "@/components/sections/Hero";
import MarqueeBanner from "@/components/sections/MarqueeBanner";
import Problem from "@/components/sections/Problem";
import Services from "@/components/sections/Services";
import CardGrid from "@/components/sections/CardGrid";
import Process from "@/components/sections/Process";
import Results from "@/components/sections/Results";
import Testimonial from "@/components/sections/Testimonial";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import CTABanner from "@/components/sections/CTABanner";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeBanner />
      <Problem />
      <Services />

      <CardGrid
        variant="warm"
        cols={3}
        label="Explore our services"
        headline={<>Three programs. One outcome: <em>More Move-ins</em>.</>}
        cards={[
          {
            eyebrow: "Local Search",
            title: "Local SEO & GBP",
            body: "Own the map pack and Google Maps results in your trade area.",
            href: "/services/local-seo-gbp-optimization",
            ctaLabel: "Learn more",
          },
          {
            eyebrow: "Site Performance",
            title: "Technical SEO",
            body: "Fast, crawlable sites that load on mobile and convert reservations.",
            href: "/services/technical-seo",
            ctaLabel: "Learn more",
          },
          // {
          //   eyebrow: "Search Content",
          //   title: "Content & Keywords",
          //   body: "Pages that answer what renters are searching before they book.",
          //   href: "/services/content-keyword-strategy",
          //   ctaLabel: "Learn more",
          // },
          {
            eyebrow: "Portfolio Growth",
            title: "Multi-Location SEO",
            body: "Scale local visibility across every facility without internal cannibalization.",
            href: "/services/multi-location-seo",
            ctaLabel: "Learn more",
          },
        ]}
      />

      <div className="visibility-image-section">
        <div className="container">
          <Image
            src="/images/visibility-metrics.png"
            alt="Visibility - Search Impressions, Maps Impressions, Clicks metrics"
            width={1344}
            height={240}
            quality={90}
            priority
          />
        </div>
      </div>
      
      <Process />
      <Results />
      <Testimonial />

      <CardGrid
        variant="light"
        cols={3}
        // label="Who we work with"
        headline={<>Built for operators who <em>run the Business themselves</em>.</>}
        intro="From single-facility independents to regional portfolios, every program is tailored to how you actually operate."
        cards={[
          {
            // eyebrow: "Single Facilities",
            title: "Independent Owners",
            body: "Fill units without hiring a marketing team or learning SEO yourself.",
            href: "/who-we-serve/independent-facility-owners",
            ctaLabel: "Learn more",
          },
          {
            // eyebrow: "Portfolio Growth",
            title: "Multi-Location Operators",
            body: "Consistent local visibility across every facility, with portfolio-level reporting.",
            href: "/who-we-serve/multi-location-operators",
            ctaLabel: "Learn more",
          },
          {
            // eyebrow: "Premium Units",
            title: "Storage Warehouse",
            body: "Warehouse facilities provide excellent security, 24/7 access, and flexible space options.",
            href: "/who-we-serve/storage-warehouse",
            ctaLabel: "Learn more",
          },
          {
            // eyebrow: "Specialty Storage",
            title: "Containers",
            body: "Hiring a storage container is often a cheaper storage option than placing items in a warehouse unit.",
            href: "/who-we-serve/containers",
            ctaLabel: "Learn more",
          },
          {
            // eyebrow: "New Development",
            title: "Furniture depositories ",
            body: "The moving firm takes care of transport. Storage prices may be competitive.",
            href: "/who-we-serve/furniture-depositories",
            ctaLabel: "Learn more",
          },
          // {
          //   eyebrow: "See Results",
          //   title: "Case Studies",
          //   body: "Real facilities, real occupancy gains. See what we delivered for operators like you.",
          //   href: "/case-studies",
          //   ctaLabel: "Browse case studies",
          // },
        ]}
      />

      <Pricing />
      <FAQ label="" />
      <CTABanner />
    </>
  );
}
