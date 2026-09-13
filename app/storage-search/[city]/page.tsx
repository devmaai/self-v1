import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import StorageStateLinks from "@/components/sections/StorageStateLinks";
import CityStorageResults, { type CityStorageFacility } from "@/components/sections/CityStorageResults";
import StorageLocationSearch from "@/components/sections/StorageLocationSearch";
import { CITY_COORDINATES } from "@/lib/cityCoordinates";

export const revalidate = 604800;

const SPREADSHEET_ID = "1ZU1TRtVeYWstC7QUJUY6s8F5GNxzDLLyROW3STwKwjk";
const FACILITIES_CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=Facilities`;
const UNITS_CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=Units`;

const CITY_STATES: Record<string, string> = {
  "american-fork": "UT", "apple-valley": "UT", bluffdale: "UT", bountiful: "UT", "cedar-city": "UT", centerville: "UT", clearfield: "UT", clinton: "UT", draper: "UT", farmington: "UT", "garden-city": "UT", grantsville: "UT", "heber-city": "UT", herriman: "UT", highland: "UT", hooper: "UT", hurricane: "UT", kearns: "UT", layton: "UT", lehi: "UT", lindon: "UT", logan: "UT", magna: "UT", midvale: "UT", millcreek: "UT", "mountain-green": "UT", murray: "UT", "north-logan": "UT", "north-ogden": "UT", "north-salt-lake": "UT", ogden: "UT", orem: "UT", "park-city": "UT", parowan: "UT", payson: "UT", "pleasant-grove": "UT", providence: "UT", provo: "UT", richmond: "UT", riverdale: "UT", riverton: "UT", roosevelt: "UT", "salt-lake-city": "UT", sandy: "UT", "saratoga-springs": "UT", "south-jordan": "UT", "south-salt-lake": "UT", "spanish-fork": "UT", springville: "UT", "st-george": "UT", sunset: "UT", "syracuse-ut": "UT", taylorsville: "UT", tooele: "UT", washington: "UT", "west-bountiful": "UT", "west-jordan": "UT", "west-point": "UT", "west-valley-city": "UT", "woods-cross": "UT",
  anaheim: "CA", bakersfield: "CA", "cathedral-city": "CA", "chula-vista": "CA", "culver-city": "CA", "daly-city": "CA", "elk-grove": "CA", fontana: "CA", fremont: "CA", fresno: "CA", "garden-grove": "CA", glendale: "CA", "harbor-city": "CA", "huntington-beach": "CA", irvine: "CA", "long-beach": "CA", "los-angeles": "CA", modesto: "CA", "moreno-valley": "CA", "national-city": "CA", oakland: "CA", oceanside: "CA", ontario: "CA", oxnard: "CA", "rancho-cucamonga": "CA", "redwood-city": "CA", riverside: "CA", sacramento: "CA", "san-bernardino": "CA", "san-diego": "CA", "san-francisco": "CA", "san-jose": "CA", "sand-city": "CA", "santa-ana": "CA", "santa-clarita": "CA", "santa-rosa": "CA", stockton: "CA", "sun-city": "CA", "yuba-city": "CA",
  "boca-raton": "FL", brandon: "FL", "cape-coral": "FL", clearwater: "FL", "coral-springs": "FL", davie: "FL", "fort-lauderdale": "FL", gainesville: "FL", hialeah: "FL", hollywood: "FL", jacksonville: "FL", "lake-worth": "FL", lakeland: "FL", miami: "FL", "miami-gardens": "FL", miramar: "FL", orlando: "FL", "palm-bay": "FL", "palm-coast": "FL", "pembroke-pines": "FL", plantation: "FL", "pompano-beach": "FL", "port-st-lucie": "FL", riverview: "FL", "saint-cloud": "FL", "spring-hill": "FL", "st-petersburg": "FL", tallahassee: "FL", tampa: "FL", "west-palm-beach": "FL",
  andover: "KS", "bonner-springs": "KS", "de-soto": "KS", derby: "KS", "el-dorado": "KS", eudora: "KS", gardner: "KS", haysville: "KS", hutchinson: "KS", "kansas-city-ks": "KS", lansing: "KS", lawrence: "KS", leavenworth: "KS", lenexa: "KS", maize: "KS", "manhattan-ks": "KS", merriam: "KS", mission: "KS", newton: "KS", olathe: "KS", "overland-park": "KS", "park-city-ks": "KS", salina: "KS", shawnee: "KS", "spring-hill-ks": "KS", topeka: "KS", "valley-center": "KS", wichita: "KS", winfield: "KS",
  affton: "MO", arnold: "MO", ballwin: "MO", belton: "MO", "blue-springs": "MO", chesterfield: "MO", "creve-coeur": "MO", fenton: "MO", florissant: "MO", gladstone: "MO", grandview: "MO", hazelwood: "MO", independence: "MO", "kansas-city": "MO", kirkwood: "MO", "lake-st-louis": "MO", "lees-summit": "MO", liberty: "MO", "maryland-heights": "MO", mehlville: "MO", oakville: "MO", ofallon: "MO", raymore: "MO", raytown: "MO", springfield: "MO", "st-charles": "MO", "st-louis": "MO", "st-peters": "MO", "webster-groves": "MO", wentzville: "MO",
  albany: "NY", bronx: "NY", brooklyn: "NY", buffalo: "NY", "clifton-park": "NY", commack: "NY", coram: "NY", hempstead: "NY", henrietta: "NY", hicksville: "NY", "huntington-station": "NY", manhattan: "NY", "mount-vernon": "NY", "new-rochelle": "NY", "new-york-city": "NY", "niagara-falls": "NY", penfield: "NY", queens: "NY", rochester: "NY", schenectady: "NY", "spring-valley": "NY", "staten-island": "NY", syracuse: "NY", troy: "NY", "valley-stream": "NY", "west-babylon": "NY", "west-seneca": "NY", "white-plains": "NY", yonkers: "NY",
  bartlesville: "OK", bethany: "OK", bixby: "OK", "broken-arrow": "OK", chickasha: "OK", choctaw: "OK", claremore: "OK", coweta: "OK", "del-city": "OK", edmond: "OK", "el-reno": "OK", glenpool: "OK", guthrie: "OK", jenks: "OK", lawton: "OK", "midwest-city": "OK", moore: "OK", mustang: "OK", newcastle: "OK", norman: "OK", "oklahoma-city": "OK", owasso: "OK", "sand-springs": "OK", sapulpa: "OK", "shawnee-ok": "OK", stillwater: "OK", tulsa: "OK", "warr-acres": "OK", yukon: "OK",
  aberdeen: "SD", "belle-fourche": "SD", "box-elder": "SD", "brandon-sd": "SD", brookings: "SD", canton: "SD", custer: "SD", deadwood: "SD", "dell-rapids": "SD", harrisburg: "SD", "hot-springs": "SD", huron: "SD", lead: "SD", madison: "SD", milbank: "SD", mitchell: "SD", "north-sioux-city": "SD", pierre: "SD", "rapid-city": "SD", redfield: "SD", "sioux-falls": "SD", sisseton: "SD", spearfish: "SD", sturgis: "SD", tea: "SD", vermillion: "SD", volga: "SD", watertown: "SD", winner: "SD", yankton: "SD",
  amarillo: "TX", arlington: "TX", austin: "TX", brownsville: "TX", carrollton: "TX", "corpus-christi": "TX", cypress: "TX", dallas: "TX", denton: "TX", "el-paso": "TX", "fort-worth": "TX", frisco: "TX", garland: "TX", "grand-prairie": "TX", houston: "TX", irving: "TX", killeen: "TX", laredo: "TX", lewisville: "TX", lubbock: "TX", mcallen: "TX", mckinney: "TX", mesquite: "TX", midland: "TX", pasadena: "TX", pearland: "TX", plano: "TX", "round-rock": "TX", "san-antonio": "TX", waco: "TX",
};

// The slug-derived title case doesn't always match how a city is actually
// named in the sheet (NYC boroughs in particular are filed under plain
// "New York" rather than "New York City" or "Manhattan"). This overrides
// the city name used to query the data, independent of the URL slug.
const CITY_NAME_OVERRIDES: Record<string, string> = {
  manhattan: "New York",
  "new-york-city": "New York",
};

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

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = citySlug.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join(" ");
  return { title: `${city} Self Storage | Find Storage Units Near You`, description: `Compare live self storage unit sizes and prices in ${city}.` };
}

export default async function LiveCityStoragePage({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params;
  const state = CITY_STATES[citySlug];
  if (!state) notFound();

  const city = citySlug.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join(" ");
  const queryCity = CITY_NAME_OVERRIDES[citySlug] ?? city;
  const { facilities, hasLocalData } = await getFacilities(citySlug, queryCity, state);
  if (!facilities.length) notFound();

  const lowestPrice = facilities
    .flatMap((facility) => facility.units.map((unit) => priceNumber(unit.price)))
    .reduce((lowest, value) => Math.min(lowest, value), Number.POSITIVE_INFINITY);
  const closest = facilities[0];

  return (
    <main className="city-storage-page">
      <section className="city-storage-hero">
        <div className="city-storage-hero-inner">
          <div className="city-storage-breadcrumb"><Link href="/storage-search">Storage search</Link><span>/</span>{city}</div>
          <div className="city-storage-eyebrow"><span /> {hasLocalData ? "Live local availability" : "Nearest available listings"}</div>
          <h1>Cheap self storage<br /><em>in {city}, {state}.</em></h1>
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
      <StorageLocationSearch /><StorageStateLinks /><nav className="storage-search-breadcrumb city-storage-bottom-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/storage-search">Storage search</Link><span>/</span><span aria-current="page">{city}, {state}</span></nav>
    </main>
  );
}