import Hero from "@/components/sections/Hero";
import MarqueeBanner from "@/components/sections/MarqueeBanner";
import Problem from "@/components/sections/Problem";
import Services from "@/components/sections/Services";
import CardGrid from "@/components/sections/CardGrid";
import { LocalSeoVisual, TechnicalSeoVisual, MultiLocationVisual } from "@/components/sections/ProgramCardVisuals";
import Process from "@/components/sections/Process";
import VideoPlaceholder from "@/components/sections/VideoPlaceholder";
import Results from "@/components/sections/Results";
import Testimonial from "@/components/sections/Testimonial";
import Operators from "@/components/sections/Operators";
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
            visual: <LocalSeoVisual />,
          },
          {
            eyebrow: "Site Performance",
            title: "Technical SEO",
            body: "Fast, crawlable sites that load on mobile and convert reservations.",
            href: "/services/technical-seo",
            ctaLabel: "Learn more",
            visual: <TechnicalSeoVisual />,
          },
          {
            eyebrow: "Portfolio Growth",
            title: "Multi-Location SEO",
            body: "Scale local visibility across every facility without internal cannibalization.",
            href: "/services/multi-location-seo",
            ctaLabel: "Learn more",
            visual: <MultiLocationVisual />,
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
      <VideoPlaceholder />
      <Results />
      <Testimonial />

      <Operators />

      <Pricing />
      <FAQ label="" />
      <CTABanner />
    </>
  );
}
