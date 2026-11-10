import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import CityStorageResults from "@/components/sections/CityStorageResults";
import StateZipSearch from "@/components/sections/StateZipSearch";
import StorageLocationSearch from "@/components/sections/StorageLocationSearch";
import StorageStateLinks from "@/components/sections/StorageStateLinks";
import { breadcrumbListSchema } from "@/lib/schema";
import { normalizeZip } from "@/lib/zipCodes";
import { searchStorageByZip } from "@/lib/zipSearch";

export const revalidate = 604800;

const BASE_URL = "https://www.selfstorage.help";

export async function generateMetadata({ params }: { params: Promise<{ zip: string }> }): Promise<Metadata> {
  const { zip: rawZip } = await params;
  const zip = normalizeZip(decodeURIComponent(rawZip));
  if (!zip) {
    return { title: "ZIP code not found | SelfStorage.help" };
  }

  const result = await searchStorageByZip(zip);
  const location = result ? `${result.city}, ${result.state}` : "your area";
  const facilityCount = result?.facilities.length ?? 0;
  const canonical = `${BASE_URL}/storage-search/zip/${zip}`;

  if (!result || facilityCount === 0) {
    return {
      title: `Storage Units Near ${zip}${result ? ` (${result.city}, ${result.state})` : ""} | SelfStorage.help`,
      description: `We could not find storage facilities within 100 miles of ZIP code ${zip}${result ? ` in ${result.city}, ${result.state}` : ""}. Try another ZIP code or browse storage by city and state.`,
      alternates: { canonical },
      robots: { index: false, follow: true },
    };
  }

  return {
    title: `Storage Units Near ${zip} (${location}) | SelfStorage.help`,
    description: `Compare ${facilityCount} storage ${facilityCount === 1 ? "facility" : "facilities"} within ${result.radiusMiles} miles of ZIP code ${zip} in ${location}. Browse live unit sizes and monthly prices.`,
    alternates: { canonical },
  };
}

export default async function ZipStoragePage({ params }: { params: Promise<{ zip: string }> }) {
  const { zip: rawZip } = await params;
  const zip = normalizeZip(decodeURIComponent(rawZip));
  if (!zip) notFound();

  const result = await searchStorageByZip(zip);
  if (!result) redirect(`/storage-search/unavailable?zip=${zip}`);

  const locationLabel = `${result.city}, ${result.state}`;
  const hasResults = result.facilities.length > 0;
  const closest = result.facilities[0];
  const lowestPrice = result.lowestPrice;
  const nearbyZips = result.nearbyZips.filter((nearby) => nearby.zip !== zip);

  const breadcrumbSchema = breadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Storage by state", path: "/storage-state-usa" },
    { name: `Storage near ${zip}`, path: `/storage-search/zip/${zip}` },
  ]);

  return (
    <main className="city-storage-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="city-storage-hero">
        <div className="city-storage-hero-inner">
          <div className="city-storage-breadcrumb">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/storage-state-usa">Storage by state</Link><span>/</span>
            <span aria-current="page">ZIP {zip}</span>
          </div>
          <div className="city-storage-eyebrow"><span /> {result.hasLocalData ? "Live local availability" : "Nearby storage search"}</div>
          <h1>Storage units<br /><em>near {zip}.</em></h1>
          {hasResults && result.hasLocalData && (
            <p>Compare storage units, sizes, and move-in prices from facilities in {locationLabel} and nearby communities.</p>
          )}
          {hasResults && !result.hasLocalData && closest && (
            <p>We don&apos;t have a facility listed in {zip} yet. Here are the closest listed options, starting {closest.distanceMiles.toFixed(0)} miles away in {closest.city}, {closest.state}.</p>
          )}
          {!hasResults && (
            <p>We don&apos;t have a storage facility listed within 100 miles of {zip}. Try a nearby ZIP code or browse storage by city and state.</p>
          )}
          <div className="city-storage-hero-facts">
            <span><strong>{result.facilities.length}</strong> {result.facilities.length === 1 ? "facility" : "facilities"} nearby</span>
            {lowestPrice !== null && <span><strong>From ${lowestPrice}</strong> per month</span>}
            <span><strong>{result.radiusMiles} mi</strong> search radius</span>
          </div>
          <StateZipSearch id="zip-hero-search" defaultValue={zip} />
        </div>
      </section>

      {hasResults ? (
        <CityStorageResults city={`${locationLabel} · ${zip}`} facilities={result.facilities} />
      ) : (
        <section className="city-storage-results zip-storage-empty" aria-labelledby="zip-empty-heading">
          <div className="city-storage-results-head">
            <div>
              <span className="city-storage-label">{locationLabel}</span>
              <h2 id="zip-empty-heading">No listings within 100 miles of {zip}</h2>
              <p>Storage listings change often. Try another ZIP code or city above, or browse storage by state.</p>
            </div>
          </div>
        </section>
      )}

      {hasResults && (nearbyZips.length > 0 || result.nearbyCities.length > 0) && (
        <section className="city-storage-links" aria-labelledby="nearby-areas-heading">
          <div>
            <span className="city-storage-label">Keep exploring</span>
            <h2 id="nearby-areas-heading">Nearby ZIP codes and cities</h2>
          </div>

          {nearbyZips.length > 0 && (
            <div className="nearby-area-group">
              <h3>Nearby ZIP codes</h3>
              <div className="nearby-city-grid">
                {nearbyZips.map((nearby) => (
                  <Link href={`/storage-search/zip/${nearby.zip}`} key={nearby.zip}>
                    {nearby.zip}
                    <small>{nearby.city}, {nearby.state} · {nearby.distanceMiles.toFixed(1)} mi</small>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {result.nearbyCities.length > 0 && (
            <div className="nearby-area-group">
              <h3>Nearby cities</h3>
              <div className="nearby-city-grid">
                {result.nearbyCities.map((nearby) => (
                  <Link href={nearby.href} key={`${nearby.city}-${nearby.state}`}>
                    {nearby.city}, {nearby.state}
                    <small>{nearby.distanceMiles.toFixed(1)} mi away</small>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      <StorageLocationSearch heading="Looking for storage in another area?" />
      <StorageStateLinks />
      <nav className="storage-search-breadcrumb city-storage-bottom-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span>/</span>
        <Link href="/storage-state-usa">Storage by state</Link><span>/</span>
        <span aria-current="page">Storage near {zip}</span>
      </nav>
    </main>
  );
}
