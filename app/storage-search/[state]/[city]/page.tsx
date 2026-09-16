import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import StorageStateLinks from "@/components/sections/StorageStateLinks";
import CityStorageResults, { type CityStorageFacility } from "@/components/sections/CityStorageResults";
import StorageLocationSearch from "@/components/sections/StorageLocationSearch";
import { CITY_COORDINATES } from "@/lib/cityCoordinates";
import { CITY_STATES, CITY_NAME_OVERRIDES } from "@/lib/cityStates";
import { US_STATE_NAMES } from "@/lib/usStates";
import { STATE_PAGE_SLUGS } from "@/lib/storageSearchLookup";
import { getCitySeoContent, fillPricePlaceholder } from "@/lib/citySeoContent";

export const revalidate = 604800;

const SPREADSHEET_ID = "1ZU1TRtVeYWstC7QUJUY6s8F5GNxzDLLyROW3STwKwjk";
const FACILITIES_CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=Facilities`;
const UNITS_CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=Units`;

type SheetRow = {
  facility_id: string;
  facility_name: string;
  state: string;
  city: string;
  size: string;
  quantity_available: string;
  price: string;
  regular_price: string;
  street_address: string;
  zip: string;
  facility_url: string;
  distance_mi: string;
  latitude: string;
  longitude: string;
};

type FacilityUnit = {
  size: string;
  price: string;
  regularPrice: string;
  quantity: string;
};

type Facility = {
  name: string;
  address: string;
  units: FacilityUnit[];
  href: string;
  city: string;
  state: string;
  distanceMiles: number;
  isNearby: boolean;
  latitude: number;
  longitude: number;
};

/**
 * Full-text CSV parser: tracks quote state across the whole document rather
 * than splitting on newlines first, so quoted fields containing embedded
 * line breaks (e.g. facility descriptions) don't shift subsequent columns.
 */
function parseCsv(csv: string): Record<string, string>[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < csv.length; index += 1) {
    const character = csv[index];
    const nextCharacter = csv[index + 1];

    if (character === '"' && nextCharacter === '"') {
      value += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      row.push(value);
      value = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && nextCharacter === "\n") index += 1;
      row.push(value);
      rows.push(row);
      row = [];
      value = "";
    } else {
      value += character;
    }
  }

  if (value || row.length) {
    row.push(value);
    rows.push(row);
  }

  const headers = rows[0] ?? [];
  return rows.slice(1).map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""])));
}

let storageRowsCache: { expiresAt: number; rows: SheetRow[] } | null = null;
let storageRowsRequest: Promise<SheetRow[]> | null = null;

async function fetchLiveRows(): Promise<SheetRow[]> {
  const [facilitiesResponse, unitsResponse] = await Promise.all([
    fetch(FACILITIES_CSV_URL, { next: { revalidate }, signal: AbortSignal.timeout(10000) }),
    fetch(UNITS_CSV_URL, { next: { revalidate }, signal: AbortSignal.timeout(10000) }),
  ]);
  if (!facilitiesResponse.ok) throw new Error(`Facilities sheet request failed: ${facilitiesResponse.status}`);
  if (!unitsResponse.ok) throw new Error(`Units sheet request failed: ${unitsResponse.status}`);

  const facilityRows = parseCsv(await facilitiesResponse.text());
  const unitRows = parseCsv(await unitsResponse.text());
  const facilityById = new Map(facilityRows.map((row) => [row.facility_id, row]));

  return unitRows
    .map((unit): SheetRow => {
      const facility = facilityById.get(unit.facility_id);
      return {
        facility_id: unit.facility_id ?? "",
        facility_name: unit.facility_name || facility?.name || "",
        state: facility?.state || unit.state || "",
        city: facility?.city || unit.city || "",
        size: unit.size ?? "",
        quantity_available: unit.quantity_available ?? "",
        price: unit.price ?? "",
        regular_price: unit.regular_price ?? "",
        street_address: facility?.street_address ?? "",
        zip: facility?.zip ?? "",
        facility_url: facility?.facility_url ?? "",
        distance_mi: facility?.distance_mi ?? "",
        latitude: facility?.latitude ?? "",
        longitude: facility?.longitude ?? "",
      };
    })
    .filter((row) => row.facility_id && row.size && row.price && row.latitude && row.longitude);
}

async function fetchFallbackRows(): Promise<SheetRow[]> {
  const localCsv = await readFile(path.join(process.cwd(), "sheet_870162583.csv"), "utf8");
  return parseCsv(localCsv).filter((row) => row.facility_id && row.size && row.price && row.latitude && row.longitude) as unknown as SheetRow[];
}

async function getStorageRows() {
  if (storageRowsCache && storageRowsCache.expiresAt > Date.now()) return storageRowsCache.rows;
  if (storageRowsRequest) return storageRowsRequest;

  storageRowsRequest = fetchLiveRows()
    .catch(async () => {
      try {
        return await fetchFallbackRows();
      } catch {
        return [];
      }
    })
    .then((rows) => {
      storageRowsCache = { expiresAt: Date.now() + revalidate * 1000, rows };
      return rows;
    })
    .finally(() => {
      storageRowsRequest = null;
    });

  return storageRowsRequest;
}

const LOCAL_RADIUS_MILES = 15;
const FALLBACK_RESULT_COUNT = 12;

function milesBetween(center: { latitude: number; longitude: number }, latitude: number, longitude: number) {
  const latitudeDelta = ((latitude - center.latitude) * Math.PI) / 180;
  const longitudeDelta = ((longitude - center.longitude) * Math.PI) / 180;
  const latitudeRadians = (center.latitude * Math.PI) / 180;
  const targetLatitudeRadians = (latitude * Math.PI) / 180;
  const haversine = Math.sin(latitudeDelta / 2) ** 2
    + Math.cos(latitudeRadians) * Math.cos(targetLatitudeRadians) * Math.sin(longitudeDelta / 2) ** 2;
  return 3959 * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

type FacilitiesResult = {
  facilities: Facility[];
  /** False when the city has no rows of its own and results are the closest
   *  matches found nationwide instead of genuinely nearby ones. */
  hasLocalData: boolean;
};

async function getFacilities(citySlug: string, city: string, state: string): Promise<FacilitiesResult> {
  const rows = await getStorageRows();
  const cityRows = rows.filter((row) => row.city === city && row.state === state);
  const cityCoordinates = cityRows.reduce(
    (center, row) => {
      const latitude = Number(row.latitude);
      const longitude = Number(row.longitude);
      if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return center;
      center.latitude += latitude;
      center.longitude += longitude;
      center.count += 1;
      return center;
    },
    { latitude: 0, longitude: 0, count: 0 },
  );

  const hasLocalData = cityRows.length > 0 && cityCoordinates.count > 0;
  const center = hasLocalData
    ? { latitude: cityCoordinates.latitude / cityCoordinates.count, longitude: cityCoordinates.longitude / cityCoordinates.count }
    : CITY_COORDINATES[citySlug]
      ? { latitude: CITY_COORDINATES[citySlug][0], longitude: CITY_COORDINATES[citySlug][1] }
      : null;

  if (!center) return { facilities: [], hasLocalData: false };

  let candidateRows = rows;
  if (hasLocalData) {
    // Cheap bounding-box pre-check before the trig-heavy haversine call, since the
    // vast majority of rows in the shared, nationwide sheet are nowhere near this city.
    const milesPerDegreeLat = 69;
    const latDeltaLimit = LOCAL_RADIUS_MILES / milesPerDegreeLat;
    const lonDeltaLimit = LOCAL_RADIUS_MILES / (milesPerDegreeLat * Math.cos((center.latitude * Math.PI) / 180) || 1);

    candidateRows = rows.filter((row) => {
      const latitude = Number(row.latitude);
      const longitude = Number(row.longitude);
      if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return false;
      if (Math.abs(latitude - center.latitude) > latDeltaLimit) return false;
      if (Math.abs(longitude - center.longitude) > lonDeltaLimit) return false;
      return milesBetween(center, latitude, longitude) <= LOCAL_RADIUS_MILES;
    });
  }

  const grouped = new Map<string, Facility>();
  for (const row of candidateRows) {
    const latitude = Number(row.latitude);
    const longitude = Number(row.longitude);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) continue;

    let facility = grouped.get(row.facility_id);
    if (!facility) {
      facility = {
        name: row.facility_name,
        address: [row.street_address, row.city, row.state, row.zip].filter(Boolean).join(", "),
        units: [],
        href: `/storage-search?location=${encodeURIComponent(`${row.city}, ${row.state}`)}`,
        city: row.city,
        state: row.state,
        distanceMiles: milesBetween(center, latitude, longitude),
        isNearby: row.city !== city || row.state !== state,
        latitude,
        longitude,
      };
      grouped.set(row.facility_id, facility);
    }
    facility.units.push({
      size: row.size,
      price: `$${row.price}`,
      regularPrice: row.regular_price ? `$${row.regular_price}` : "",
      quantity: row.quantity_available,
    });
  }
  for (const facility of grouped.values()) {
    facility.units.sort((first, second) => priceNumber(first.price) - priceNumber(second.price));
  }

  const sorted = [...grouped.values()].sort((first, second) => {
    if (first.isNearby !== second.isNearby) return first.isNearby ? 1 : -1;
    return first.distanceMiles - second.distanceMiles;
  });

  // Without local data we searched the entire nationwide sheet, so cap the
  // list to the genuinely closest handful rather than showing everything.
  const facilities = hasLocalData ? sorted : sorted.slice(0, FALLBACK_RESULT_COUNT);

  return { facilities, hasLocalData };
}

function priceNumber(price: string): number {
  const value = Number(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(value) ? value : Number.POSITIVE_INFINITY;
}

export async function generateMetadata({ params }: { params: Promise<{ state: string; city: string }> }): Promise<Metadata> {
  const { state: stateSlug, city: citySlug } = await params;
  const city = citySlug.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join(" ");
  const state = CITY_STATES[citySlug];
  if (!state || STATE_PAGE_SLUGS[state] !== stateSlug) {
    return { title: `${city} Self Storage | Find Storage Units Near You`, description: `Compare live self storage unit sizes and prices in ${city}.` };
  }
  const seoContent = await getCitySeoContent(citySlug, state);
  if (seoContent?.metaTitle && seoContent?.metaDescription) {
    return { title: seoContent.metaTitle, description: seoContent.metaDescription };
  }
  return { title: `${city} Self Storage | Find Storage Units Near You`, description: `Compare live self storage unit sizes and prices in ${city}.` };
}

export default async function LiveCityStoragePage({ params }: { params: Promise<{ state: string; city: string }> }) {
  const { state: stateSlug, city: citySlug } = await params;
  const state = CITY_STATES[citySlug];
  if (!state || STATE_PAGE_SLUGS[state] !== stateSlug) notFound();

  const city = citySlug.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join(" ");
  const queryCity = CITY_NAME_OVERRIDES[citySlug] ?? city;
  const stateName = US_STATE_NAMES[state] ?? state;
  const statePageSlug = STATE_PAGE_SLUGS[state];
  const [{ facilities, hasLocalData }, seoContent] = await Promise.all([
    getFacilities(citySlug, queryCity, state),
    getCitySeoContent(citySlug, state),
  ]);
  if (!facilities.length) notFound();

  const lowestPrice = facilities
    .flatMap((facility) => facility.units.map((unit) => priceNumber(unit.price)))
    .reduce((lowest, value) => Math.min(lowest, value), Number.POSITIVE_INFINITY);
  const closest = facilities[0];
  const fromPrice = Number.isFinite(lowestPrice) ? `$${lowestPrice}` : "our listed rates";
  const fillPrice = (text: string) => fillPricePlaceholder(text, fromPrice);

  return (
    <main className="city-storage-page">
      <section className="city-storage-hero">
        <div className="city-storage-hero-inner">
          <div className="city-storage-breadcrumb">
            <Link href="/storage-search">Storage search</Link><span>/</span>
            {statePageSlug ? <Link href={`/storage-search/${statePageSlug}`}>{stateName}</Link> : <span>{stateName}</span>}<span>/</span>
            {city}
          </div>
          <div className="city-storage-eyebrow"><span /> {hasLocalData ? "Live local availability" : "Nearest available listings"}</div>
          {seoContent?.h1 ? <h1>{seoContent.h1}</h1> : <h1>Cheap self storage<br /><em>in {city}, {state}.</em></h1>}
          {hasLocalData ? (
            <p>Compare storage units, sizes, and move-in prices from facilities in {city} and nearby communities.</p>
          ) : (
            <p>We don&apos;t have facilities listed in {city} yet. Here are the closest listed options we could find, starting {closest.distanceMiles.toFixed(0)} miles away in {closest.city}, {closest.state}.</p>
          )}
          <div className="city-storage-hero-facts"><span><strong>{facilities.length}</strong> {hasLocalData ? "live listings" : "nearest listings"}</span><span><strong>From ${lowestPrice}</strong> available</span><span><strong>{state}</strong> local market</span></div>
        </div>
      </section>
      <CityStorageResults city={`${city}, ${state}`} facilities={facilities as CityStorageFacility[]} />
      <section className="city-storage-info"><div className="city-storage-info-grid"><div><span className="city-storage-label">{city} self storage information</span><h2>Storage for moves, seasons, and everyday space.</h2></div><div><p>Compare unit sizes and current prices from storage facilities serving {city}.</p><p>Review the unit size, monthly price, and availability before you reserve.</p></div></div></section>
      {seoContent && (
        <section className="city-storage-seo">
          <div className="city-storage-seo-inner">
            {seoContent.intro && <p className="city-storage-seo-intro">{fillPrice(seoContent.intro)}</p>}
            {seoContent.sections.map((section) => (
              <div className="city-storage-seo-section" key={section.heading}>
                <h2>{section.heading}</h2>
                <p>{fillPrice(section.body)}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      {seoContent && seoContent.faqs.length > 0 && (
        <section className="city-storage-faq">
          <div className="city-storage-faq-inner">
            <h2>{seoContent.faqHeading}</h2>
            <div className="city-storage-faq-list">
              {seoContent.faqs.map((faq) => (
                <div className="city-storage-faq-item" key={faq.question}>
                  <h3>{faq.question}</h3>
                  <p>{fillPrice(faq.answer)}</p>
                </div>
              ))}
            </div>
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: seoContent.faqs.map((faq) => ({
                  "@type": "Question",
                  name: faq.question,
                  acceptedAnswer: { "@type": "Answer", text: fillPrice(faq.answer) },
                })),
              }),
            }}
          />
        </section>
      )}
      <StorageLocationSearch /><StorageStateLinks /><nav className="storage-search-breadcrumb city-storage-bottom-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/storage-search">Storage search</Link><span>/</span><span aria-current="page">{city}, {state}</span></nav>
    </main>
  );
}