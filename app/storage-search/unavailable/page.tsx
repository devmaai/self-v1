import type { Metadata } from "next";
import Link from "next/link";
import StateZipSearch from "@/components/sections/StateZipSearch";

export const metadata: Metadata = {
  title: "No Storage Facilities Found | SelfStorage.help",
  description: "We could not find a listed storage facility for that ZIP code.",
  robots: { index: false, follow: true },
};

export default async function UnavailableZipPage({
  searchParams,
}: {
  searchParams: Promise<{ zip?: string }>;
}) {
  const { zip } = await searchParams;
  const searchedZip = zip?.trim().slice(0, 60) || "that location";

  return (
    <main className="city-storage-page">
      <section className="city-storage-hero">
        <div className="city-storage-hero-inner">
          <div className="city-storage-breadcrumb">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/storage-state-usa">Storage by state</Link><span>/</span>
            <span aria-current="page">No facilities found</span>
          </div>
          <div className="city-storage-eyebrow"><span /> Storage search</div>
          <h1>No facilities found<br /><em>for {searchedZip}.</em></h1>
          <p>We could not match that search to a ZIP code or city with listed storage. Check the spelling, or try a nearby ZIP code or city.</p>
          <StateZipSearch id="unavailable-zip-search" />
        </div>
      </section>
      <section className="city-storage-results">
        <div className="city-storage-results-head">
          <div>
            <span className="city-storage-label">Search another area</span>
            <h2>Keep looking nearby</h2>
            <p>Enter a ZIP code, city, or state above, or browse storage by state to compare available facilities.</p>
          </div>
        </div>
        <Link className="state-storage-cta" href="/storage-state-usa">Browse storage by state <span aria-hidden="true">→</span></Link>
      </section>
    </main>
  );
}
