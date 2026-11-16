import type { Metadata } from "next";
import V2Interactions from "@/components/v2/V2Interactions";
import V2Nav from "@/components/v2/V2Nav";
import V2Footer from "@/components/v2/V2Footer";
import GeoGridTool from "@/components/geogrid/GeoGridTool";

export const metadata: Metadata = {
  title: "Free Google Maps Geo-Grid Rank Tracker for Self-Storage | SelfStorage.help",
  description:
    "See where your storage facility ranks on Google Maps across 25 points around your location. Enter your business, address and keyword for a free geo-grid scan.",
  alternates: { canonical: "/geo-grid-tracker" },
};

export default function GeoGridTrackerPage() {
  return (
    <div className="v2-home">
      <V2Interactions />
      <V2Nav variant="home" />

      <section className="final-cta lead-page">
        <div className="inner geogrid-inner">
          <h1 className="final-h2">Free Google Maps geo-grid rank tracker for storage facilities.</h1>
          <p className="final-lead">
            Renters see different map results depending on where they stand. Enter your facility, address and keyword to
            see your Google Maps ranking across a 5 × 5 grid of 25 points around you.
          </p>
          <GeoGridTool />
        </div>
      </section>

      <V2Footer />
    </div>
  );
}
