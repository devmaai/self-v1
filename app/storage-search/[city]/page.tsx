import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import StorageStateLinks from "@/components/sections/StorageStateLinks";
import LocationPin from "@/components/ui/LocationPin";

export const revalidate = 604800;

const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1ZU1TRtVeYWstC7QUJUY6s8F5GNxzDLLyROW3STwKwjk/export?format=csv&gid=122002072";

const CITY_STATES: Record<string, string> = {
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
};

type Facility = {
  name: string;
  address: string;
  price: string;
  unit: string;
  quantity: string;
  href: string;
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

async function getFacilities(city: string, state: string): Promise<Facility[]> {
  const response = await fetch(SHEET_CSV_URL, { next: { revalidate } });
  if (!response.ok) throw new Error(`Storage data request failed: ${response.status}`);

  const rows = parseCsv(await response.text()).filter((row) => row.city === city && row.state === state && row.facility_id && row.size);
  return rows.map((row) => ({
    name: row.facility_name,
    address: `${city}, ${state}`,
    price: `$${row.price}`,
    unit: row.size,
    quantity: row.quantity_available,
    href: `/storage-search?location=${encodeURIComponent(`${city}, ${state}`)}`,
  }));
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
      <section className="city-storage-hero"><div className="city-storage-hero-inner"><div className="city-storage-breadcrumb"><Link href="/storage-search">Storage search</Link><span>/</span>{city}</div><div className="city-storage-eyebrow"><span /> Live local availability</div><h1>Cheap self storage<br /><em>in {city}, {state}.</em></h1><p>Compare storage units, sizes, and move-in prices from facilities in {city}.</p><div className="city-storage-hero-facts"><span><strong>{facilities.length}</strong> live listings</span><span><strong>From {facilities[0].price}</strong> available</span><span><strong>{state}</strong> local market</span></div></div></section>
      <section className="city-storage-results" aria-labelledby="city-results-heading"><div className="city-storage-results-head"><div><span className="city-storage-label">{city}, {state}</span><h2 id="city-results-heading">Storage units near you</h2><p>Live listings refreshed weekly. Prices and availability can change, so confirm details before reserving.</p></div><label className="city-storage-sort">Sort by <select defaultValue="recommended"><option value="recommended">Recommended</option><option value="price">Lowest price</option></select></label></div><div className="city-storage-layout"><div className="city-storage-list">{facilities.map((facility) => <article className="facility-card" key={`${facility.name}-${facility.unit}`}><div className="facility-card-top"><div><span className="facility-distance">Live listing</span><h3>{facility.name}</h3><p>{facility.address}</p></div><div className="facility-pin"><LocationPin /></div></div><div className="facility-card-meta"><span className="facility-unit">{facility.unit}</span><span className="facility-price"><strong>{facility.price}</strong> / month</span><span className="facility-fee">{facility.quantity} available</span></div><div className="facility-card-bottom"><div className="facility-signals"><span className="facility-online">From live sheet</span></div><a href={facility.href}>Search nearby <span aria-hidden="true">↗</span></a></div></article>)}</div><aside className="city-storage-map" aria-label={`${city} storage area map`}><div className="map-grid" /><div className="map-route map-route-one" /><div className="map-route map-route-two" /><div className="map-marker marker-one">1</div><div className="map-marker marker-two">$</div><div className="map-marker marker-three">3</div><div className="map-label">{city} storage area</div><span className="map-compass">N</span></aside></div></section>
      <section className="city-storage-info"><div className="city-storage-info-grid"><div><span className="city-storage-label">{city} self storage information</span><h2>Storage for moves, seasons, and everyday space.</h2></div><div><p>Compare unit sizes and current prices from storage facilities serving {city}.</p><p>Review the unit size, monthly price, and availability before you reserve.</p></div></div></section>
      <StorageStateLinks /><nav className="storage-search-breadcrumb city-storage-bottom-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/storage-search">Storage search</Link><span>/</span><span aria-current="page">{city}, {state}</span></nav>
    </main>
  );
}