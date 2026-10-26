import { readFile } from "node:fs/promises";
import path from "node:path";
import { CITY_NAME_OVERRIDES, CITY_STATES, PUBLISHED_CITY_SLUGS } from "./cityStates";
import { parseCsv, STORAGE_DATA_REVALIDATE } from "./liveStorageData";
import { STATE_PAGE_SLUGS } from "./storageSearchLookup";

const SPREADSHEET_ID = "1ZU1TRtVeYWstC7QUJUY6s8F5GNxzDLLyROW3STwKwjk";
const sheetUrl = (sheet: string) => `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${sheet}`;

type ClimateUnit = { facilityId: string; facilityName: string; city: string; state: string; price: number };

export type ClimateCity = {
  city: string;
  state: string;
  href: string;
  facilityCount: number;
  fromPrice: number | null;
  brands: string[];
};

export type ClimateBrand = { name: string; facilityCount: number; cityCount: number };

const isClimate = (amenities: string) => /climate controlled/i.test(amenities ?? "");
const toPrice = (value: string) => {
  const n = Number(String(value ?? "").replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : Number.POSITIVE_INFINITY;
};
const LOCATION_WORDS = /\s+(?:manhattan|brooklyn|queens|bronx|staten island|NY|CA|UT|MO)(?:\s.*)?$/;
export const brandOf = (facilityName: string, city = "") => {
  let name = facilityName.split(" - ")[0].split(/(?<=storage)-/i)[0].trim();
  if (city) {
    const index = name.toLowerCase().indexOf(` ${city.toLowerCase()}`);
    if (index > 0) name = name.slice(0, index);
  }
  return name.replace(/\s+(manhattan|brooklyn|queens|bronx|staten island)\b.*$/i, "").replace(LOCATION_WORDS, "").replace(/\s+(of|at|in|on)$/i, "").trim();
};
const cityKey = (city: string, state: string) => `${city.trim().toLowerCase().replace(/[.']/g, "")}|${state.trim().toUpperCase()}`;
const titleFromSlug = (slug: string) => slug.replace(/-(ut|ks|ok|sd)$/, "").split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

async function fetchLiveUnits(): Promise<ClimateUnit[]> {
  const [facilitiesResponse, unitsResponse] = await Promise.all([
    fetch(sheetUrl("Facilities"), { next: { revalidate: STORAGE_DATA_REVALIDATE }, signal: AbortSignal.timeout(10000) }),
    fetch(sheetUrl("Units"), { next: { revalidate: STORAGE_DATA_REVALIDATE }, signal: AbortSignal.timeout(10000) }),
  ]);
  if (!facilitiesResponse.ok || !unitsResponse.ok) throw new Error("Climate storage sheet request failed");
  const facilities = new Map(parseCsv(await facilitiesResponse.text()).map((row) => [row.facility_id, row]));
  return parseCsv(await unitsResponse.text())
    .filter((unit) => unit.facility_id && isClimate(unit.amenities))
    .map((unit) => {
      const facility = facilities.get(unit.facility_id);
      return {
        facilityId: unit.facility_id,
        facilityName: unit.facility_name || facility?.name || "",
        city: facility?.city || unit.city || "",
        state: facility?.state || unit.state || "",
        price: toPrice(unit.price),
      };
    });
}

async function fetchFallbackUnits(): Promise<ClimateUnit[]> {
  const csv = await readFile(path.join(process.cwd(), "sheet_870162583.csv"), "utf8");
  return parseCsv(csv)
    .filter((row) => row.facility_id && isClimate(row.amenities))
    .map((row) => ({ facilityId: row.facility_id, facilityName: row.facility_name || row.name, city: row.city, state: row.state, price: toPrice(row.price) }));
}

export async function getClimateStorageSummary(): Promise<{ cities: ClimateCity[]; brands: ClimateBrand[] }> {
  let units: ClimateUnit[] = [];
  try {
    units = await fetchLiveUnits();
  } catch {
    try {
      units = await fetchFallbackUnits();
    } catch {
      units = [];
    }
  }

  const byCity = new Map<string, ClimateUnit[]>();
  for (const unit of units) {
    const key = cityKey(unit.city, unit.state);
    byCity.set(key, [...(byCity.get(key) ?? []), unit]);
  }

  const seen = new Set<string>();
  const cities: ClimateCity[] = [];
  for (const slug of PUBLISHED_CITY_SLUGS) {
    const state = CITY_STATES[slug];
    const stateSlug = STATE_PAGE_SLUGS[state];
    if (!state || !stateSlug) continue;
    const cityName = CITY_NAME_OVERRIDES[slug] ?? titleFromSlug(slug);
    const key = cityKey(cityName, state);
    if (seen.has(key)) continue;
    const cityUnits = byCity.get(key);
    if (!cityUnits?.length) continue;
    seen.add(key);
    const facilityIds = new Set(cityUnits.map((u) => u.facilityId));
    const lowest = Math.min(...cityUnits.map((u) => u.price));
    const brandCounts = new Map<string, number>();
    for (const id of facilityIds) {
      const unit = cityUnits.find((u) => u.facilityId === id);
      const name = brandOf(unit?.facilityName ?? "", unit?.city);
      if (name) brandCounts.set(name, (brandCounts.get(name) ?? 0) + 1);
    }
    cities.push({
      city: slug === "new-york-city" ? "New York City" : cityUnits[0].city.trim() || titleFromSlug(slug),
      state,
      href: `/storage-search/${stateSlug}/${slug}`,
      facilityCount: facilityIds.size,
      fromPrice: Number.isFinite(lowest) ? Math.round(lowest) : null,
      brands: [...brandCounts.entries()].sort((a, b) => b[1] - a[1]).map(([name]) => name),
    });
  }
  cities.sort((a, b) => b.facilityCount - a.facilityCount);

  const brandMap = new Map<string, { facilities: Set<string>; cities: Set<string> }>();
  for (const unit of units) {
    const key = cityKey(unit.city, unit.state);
    if (!seen.has(key)) continue;
    const name = brandOf(unit.facilityName, unit.city);
    if (!name) continue;
    const entry = brandMap.get(name) ?? { facilities: new Set(), cities: new Set() };
    entry.facilities.add(unit.facilityId);
    entry.cities.add(key);
    brandMap.set(name, entry);
  }
  const brands = [...brandMap.entries()]
    .map(([name, entry]) => ({ name, facilityCount: entry.facilities.size, cityCount: entry.cities.size }))
    .sort((a, b) => b.facilityCount - a.facilityCount);

  return { cities, brands };
}
