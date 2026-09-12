import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import StorageStateLinks from "@/components/sections/StorageStateLinks";
import CityStorageResults, { type CityStorageFacility } from "@/components/sections/CityStorageResults";
import StorageLocationSearch from "@/components/sections/StorageLocationSearch";

export const revalidate = 604800;

const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1ZU1TRtVeYWstC7QUJUY6s8F5GNxzDLLyROW3STwKwjk/export?format=csv&gid=870162583";

const CITY_STATES: Record<string, string> = {
  "american-fork": "UT", "apple-valley": "UT", bluffdale: "UT", bountiful: "UT", "cedar-city": "UT", centerville: "UT", clearfield: "UT", clinton: "UT", draper: "UT", farmington: "UT", "garden-city": "UT", grantsville: "UT", "heber-city": "UT", herriman: "UT", highland: "UT", hooper: "UT", hurricane: "UT", kearns: "UT", layton: "UT", lehi: "UT", lindon: "UT", logan: "UT", magna: "UT", midvale: "UT", millcreek: "UT", "mountain-green": "UT", murray: "UT", "north-logan": "UT", "north-ogden": "UT", "north-salt-lake": "UT", ogden: "UT", orem: "UT", "park-city": "UT", parowan: "UT", payson: "UT", "pleasant-grove": "UT", providence: "UT", provo: "UT", richmond: "UT", riverdale: "UT", riverton: "UT", roosevelt: "UT", "salt-lake-city": "UT", sandy: "UT", "saratoga-springs": "UT", "south-jordan": "UT", "south-salt-lake": "UT", "spanish-fork": "UT", springville: "UT", "st-george": "UT", sunset: "UT", syracuse: "UT", taylorsville: "UT", tooele: "UT", washington: "UT", "west-bountiful": "UT", "west-jordan": "UT", "west-point": "UT", "west-valley-city": "UT", "woods-cross": "UT",
  "yuba-city": "CA",
  "national-city": "CA",
  "culver-city": "CA",
  "daly-city": "CA",
  "redwood-city": "CA",
  "cathedral-city": "CA",
  "sun-city": "CA",
  "harbor-city": "CA",
  "sand-city": "CA",
};

type SheetRow = {
  facility_id: string;
  facility_name: string;
  state: string;
  city: string;
  size: string;
  quantity_available: string;
  price: string;
  street_address: string;
  zip: string;
  facility_url: string;
  distance_mi: string;
  latitude: string;
  longitude: string;
};

type Facility = {
  name: string;
  address: string;
  price: string;
  unit: string;
  quantity: string;
  href: string;
  city: string;
  distanceMiles: number;
  isNearby: boolean;
  latitude: number;
  longitude: number;
};

function parseCsvLine(line: string) {
  const values: string[] = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"' && line[index + 1] === '"') {
      value += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      values.push(value.trim());
      value = "";
    } else {
      value += character;
    }
  }

  values.push(value.trim());
  return values;
}

function parseCsv(csv: string): SheetRow[] {
  const lines = csv.split(/\r?\n/).filter(Boolean);
  const headers = parseCsvLine(lines[0]);

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    return headers.reduce((row, header, index) => {
      row[header as keyof SheetRow] = values[index] ?? "";
      return row;
    }, {} as SheetRow);
  });
}

let storageRowsCache: { expiresAt: number; rows: SheetRow[] } | null = null;
let storageRowsRequest: Promise<SheetRow[]> | null = null;

async function getStorageRows() {
  if (storageRowsCache && storageRowsCache.expiresAt > Date.now()) return storageRowsCache.rows;
  if (storageRowsRequest) return storageRowsRequest;

  storageRowsRequest = fetch(SHEET_CSV_URL, {
    next: { revalidate },
    signal: AbortSignal.timeout(8000),
  })
    .then(async (response) => {
      if (!response.ok) throw new Error(`Storage data request failed: ${response.status}`);
      return parseCsv(await response.text()).filter((row) => row.facility_id && row.size && row.price);
    })
    .catch(async () => {
      try {
        const localCsv = await readFile(path.join(process.cwd(), "sheet_870162583.csv"), "utf8");
        return parseCsv(localCsv).filter((row) => row.facility_id && row.size && row.price);
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

async function getFacilities(city: string, state: string): Promise<Facility[]> {
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

  if (!cityRows.length || !cityCoordinates.count) return [];

  const center = {
    latitude: cityCoordinates.latitude / cityCoordinates.count,
    longitude: cityCoordinates.longitude / cityCoordinates.count,
  };
  const nearbyRadiusMiles = 15;
  const milesBetween = (latitude: number, longitude: number) => {
    const latitudeDelta = (latitude - center.latitude) * Math.PI / 180;
    const longitudeDelta = (longitude - center.longitude) * Math.PI / 180;
    const latitudeRadians = center.latitude * Math.PI / 180;
    const targetLatitudeRadians = latitude * Math.PI / 180;
    const haversine = Math.sin(latitudeDelta / 2) ** 2
      + Math.cos(latitudeRadians) * Math.cos(targetLatitudeRadians) * Math.sin(longitudeDelta / 2) ** 2;
    return 3959 * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
  };

  // Cheap bounding-box pre-check before the trig-heavy haversine call, since the
  // vast majority of rows in the shared, nationwide sheet are nowhere near this city.
  const milesPerDegreeLat = 69;
  const latDeltaLimit = nearbyRadiusMiles / milesPerDegreeLat;
  const lonDeltaLimit = nearbyRadiusMiles / (milesPerDegreeLat * Math.cos((center.latitude * Math.PI) / 180) || 1);

  const candidateRows = rows.filter((row) => {
    const latitude = Number(row.latitude);
    const longitude = Number(row.longitude);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return false;
    if (Math.abs(latitude - center.latitude) > latDeltaLimit) return false;
    if (Math.abs(longitude - center.longitude) > lonDeltaLimit) return false;
    return milesBetween(latitude, longitude) <= nearbyRadiusMiles;
  });
  const grouped = new Map<string, Facility>();
  for (const row of candidateRows) {
    if (grouped.has(row.facility_id)) continue;
    const distanceMiles = milesBetween(Number(row.latitude), Number(row.longitude));
    grouped.set(row.facility_id, {
      name: row.facility_name,
      address: [row.street_address, row.city, row.state, row.zip].filter(Boolean).join(", "),
      price: `$${row.price}`,
      unit: row.size,
      quantity: row.quantity_available,
      href: `/storage-search?location=${encodeURIComponent(`${row.city}, ${row.state}`)}`,
      city: row.city,
      distanceMiles,
      isNearby: row.city !== city || row.state !== state,
      latitude: Number(row.latitude),
      longitude: Number(row.longitude),
    });
  }
  return [...grouped.values()].sort((first, second) => {
    if (first.isNearby !== second.isNearby) return first.isNearby ? 1 : -1;
    return first.distanceMiles - second.distanceMiles;
  });
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
  const facilities = await getFacilities(city, state);
  if (!facilities.length) notFound();

  return (
    <main className="city-storage-page">
      <section className="city-storage-hero"><div className="city-storage-hero-inner"><div className="city-storage-breadcrumb"><Link href="/storage-search">Storage search</Link><span>/</span>{city}</div><div className="city-storage-eyebrow"><span /> Live local availability</div><h1>Cheap self storage<br /><em>in {city}, {state}.</em></h1><p>Compare storage units, sizes, and move-in prices from facilities in {city} and nearby communities.</p><div className="city-storage-hero-facts"><span><strong>{facilities.length}</strong> live listings</span><span><strong>From {facilities[0].price}</strong> available</span><span><strong>{state}</strong> local market</span></div></div></section>
      <CityStorageResults city={`${city}, ${state}`} facilities={facilities as CityStorageFacility[]} />
      <section className="city-storage-info"><div className="city-storage-info-grid"><div><span className="city-storage-label">{city} self storage information</span><h2>Storage for moves, seasons, and everyday space.</h2></div><div><p>Compare unit sizes and current prices from storage facilities serving {city}.</p><p>Review the unit size, monthly price, and availability before you reserve.</p></div></div></section>
      <StorageLocationSearch /><StorageStateLinks /><nav className="storage-search-breadcrumb city-storage-bottom-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/storage-search">Storage search</Link><span>/</span><span aria-current="page">{city}, {state}</span></nav>
    </main>
  );
}