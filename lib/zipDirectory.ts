import { readFile } from "node:fs/promises";
import path from "node:path";
import { normalizeZip } from "@/lib/zipCodes";
import { US_STATE_NAMES } from "@/lib/usStates";

export type ZipRecord = {
  zip: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
};

type RawZipRecord = [number, number, string, string];

export type CityRecord = {
  city: string;
  state: string;
  /** Representative ZIP for links and display. */
  zip: string;
  latitude: number;
  longitude: number;
  /** Number of ZIP codes the dataset lists for this city. */
  zipCount: number;
};

type ZipDirectory = {
  byZip: Map<string, ZipRecord>;
  sortedZips: string[];
  cities: CityRecord[];
};

let directoryPromise: Promise<ZipDirectory> | null = null;

async function readDirectory(): Promise<ZipDirectory> {
  const file = path.join(process.cwd(), "data", "us-zip-codes.json");
  const raw = JSON.parse(await readFile(file, "utf8")) as Record<string, RawZipRecord>;
  const byZip = new Map<string, ZipRecord>();

  for (const [zip, [latitude, longitude, city, state]] of Object.entries(raw)) {
    if (!/^\d{5}$/.test(zip) || !city || !state) continue;
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) continue;
    byZip.set(zip, { zip, city, state, latitude, longitude });
  }

  const cityVotes = new Map<string, CityRecord & { latitudeTotal: number; longitudeTotal: number; members: ZipRecord[] }>();
  for (const record of byZip.values()) {
    const key = `${record.city.toLowerCase()}|${record.state}`;
    const existing = cityVotes.get(key);
    if (!existing) {
      cityVotes.set(key, {
        city: record.city,
        state: record.state,
        zip: record.zip,
        latitude: record.latitude,
        longitude: record.longitude,
        latitudeTotal: record.latitude,
        longitudeTotal: record.longitude,
        zipCount: 1,
        members: [record],
      });
      continue;
    }
    existing.latitudeTotal += record.latitude;
    existing.longitudeTotal += record.longitude;
    existing.zipCount += 1;
    existing.members.push(record);
  }

  const cities = [...cityVotes.values()]
    .map(({ latitudeTotal, longitudeTotal, members, ...city }) => {
      const latitude = latitudeTotal / city.zipCount;
      const longitude = longitudeTotal / city.zipCount;
      // Link to the ZIP closest to the city centre, not the lowest-numbered
      // one (which is often a PO box or single-building ZIP).
      // Many cities share one coordinate across all ZIPs, so ties go to the
      // median ZIP instead of the first or last.
      const ranked = members
        .map((member) => ({
          zip: member.zip,
          distance: (member.latitude - latitude) ** 2 + (member.longitude - longitude) ** 2,
        }))
        .sort((first, second) => first.distance - second.distance || first.zip.localeCompare(second.zip));
      const tied = ranked.filter((entry) => entry.distance - ranked[0].distance < 1e-9);
      const zip = tied[Math.floor((tied.length - 1) / 2)].zip;
      return { ...city, zip, latitude, longitude };
    })
    .sort((first, second) => first.city.localeCompare(second.city));

  return { byZip, sortedZips: [...byZip.keys()].sort(), cities };
}

/**
 * All US ZIP codes with their approximate centre point. Loaded once per
 * server process and reused by the search API and ZIP results pages.
 */
export function getZipDirectory(): Promise<ZipDirectory> {
  if (!directoryPromise) {
    directoryPromise = readDirectory().catch(() => ({ byZip: new Map(), sortedZips: [], cities: [] }));
  }
  return directoryPromise;
}

export async function lookupZipRecord(value: string): Promise<ZipRecord | undefined> {
  const zip = normalizeZip(value);
  if (!zip) return undefined;
  return (await getZipDirectory()).byZip.get(zip);
}

function cityMatchScore(city: CityRecord, query: string): number {
  const [rawCity, rawState] = query.split(",").map((part) => part.trim());
  const name = city.city.toLowerCase();
  const cityQuery = rawCity || query;

  if (rawState) {
    const stateMatches =
      city.state.toLowerCase() === rawState || (US_STATE_NAMES[city.state] ?? "").toLowerCase() === rawState;
    if (!stateMatches) return -1;
  }

  if (name === cityQuery || name.startsWith(cityQuery)) return 0;
  if (name.split(/\s+/).some((word) => word.startsWith(cityQuery))) return 1;
  if (name.includes(cityQuery)) return 2;
  return -1;
}

/** City names across the whole ZIP directory, best match first. */
export async function searchCityRecords(query: string, limit = 8): Promise<CityRecord[]> {
  const normalized = query.trim().toLowerCase();
  if (normalized.length < 2) return [];

  return (await getZipDirectory()).cities
    .map((city) => ({ city, score: cityMatchScore(city, normalized) }))
    .filter((entry) => entry.score >= 0)
    .sort((first, second) => (
      first.score - second.score ||
      second.city.zipCount - first.city.zipCount ||
      first.city.city.localeCompare(second.city.city)
    ))
    .slice(0, limit)
    .map((entry) => entry.city);
}

/** ZIP codes beginning with the given digits, in numeric order. */
export async function searchZipRecords(prefix: string, limit = 12): Promise<ZipRecord[]> {
  const digits = prefix.replace(/\D/g, "").slice(0, 5);
  if (digits.length < 2) return [];

  const directory = await getZipDirectory();
  const zips = directory.sortedZips;

  // Binary search for the first ZIP at or after the prefix, then walk forward
  // while the numeric prefix still matches.
  let low = 0;
  let high = zips.length;
  while (low < high) {
    const middle = Math.floor((low + high) / 2);
    if (zips[middle] < digits) low = middle + 1;
    else high = middle;
  }

  const matches: ZipRecord[] = [];
  for (let index = low; index < zips.length && matches.length < limit; index += 1) {
    const zip = zips[index];
    if (!zip.startsWith(digits)) break;
    const record = directory.byZip.get(zip);
    if (record) matches.push(record);
  }
  return matches;
}

function milesBetween(latitude: number, longitude: number, targetLatitude: number, targetLongitude: number) {
  const latitudeDelta = ((targetLatitude - latitude) * Math.PI) / 180;
  const longitudeDelta = ((targetLongitude - longitude) * Math.PI) / 180;
  const latitudeRadians = (latitude * Math.PI) / 180;
  const targetLatitudeRadians = (targetLatitude * Math.PI) / 180;
  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(latitudeRadians) * Math.cos(targetLatitudeRadians) * Math.sin(longitudeDelta / 2) ** 2;
  return 3959 * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

export type NearbyZipRecord = ZipRecord & { distanceMiles: number };

/** Closest ZIP code centre points to a browser geolocation or search result. */
export async function findNearestZipRecords(
  latitude: number,
  longitude: number,
  limit = 8,
): Promise<NearbyZipRecord[]> {
  const count = Math.max(1, Math.floor(limit));
  const directory = await getZipDirectory();
  const nearest: NearbyZipRecord[] = [];

  const insert = (entry: NearbyZipRecord) => {
    let index = nearest.length;
    while (index > 0 && nearest[index - 1].distanceMiles > entry.distanceMiles) index -= 1;
    nearest.splice(index, 0, entry);
    if (nearest.length > count) nearest.pop();
  };

  for (const record of directory.byZip.values()) {
    const distanceMiles = milesBetween(latitude, longitude, record.latitude, record.longitude);
    if (nearest.length < count || distanceMiles < nearest[nearest.length - 1].distanceMiles) {
      insert({ ...record, distanceMiles });
    }
  }

  return nearest;
}

/** Closest ZIP code centre point to a browser geolocation result. */
export async function findNearestZipRecord(latitude: number, longitude: number): Promise<ZipRecord | undefined> {
  return (await findNearestZipRecords(latitude, longitude, 1))[0];
}
