import type { CityStorageFacility } from "@/components/sections/CityStorageResults";
import { getStorageRows, priceNumber, type SheetRow } from "@/lib/liveStorageData";
import { cityPageHref } from "@/lib/storageSearchLookup";
import { US_STATE_NAMES } from "@/lib/usStates";
import { normalizeZip } from "@/lib/zipCodes";
import { findNearestZipRecords, lookupZipRecord } from "@/lib/zipDirectory";
import { buildCityStorageFacilities } from "@/lib/zipStorageFacilities";

/** Public Storage-style widening search: start local, then broaden. */
const RADIUS_STEPS = [15, 30, 60, 100] as const;
const MIN_RADIUS_RESULTS = 3;
const MAX_FACILITIES = 60;
const MAX_NEARBY = 10;

type Centre = { latitude: number; longitude: number };

export type NearbyZip = {
  zip: string;
  city: string;
  state: string;
  distanceMiles: number;
};

export type NearbyCity = {
  city: string;
  state: string;
  zip: string;
  distanceMiles: number;
  href: string;
};

export type ZipSearchResult = {
  zip: string;
  city: string;
  state: string;
  stateName: string;
  latitude: number;
  longitude: number;
  radiusMiles: number;
  facilities: CityStorageFacility[];
  nearbyZips: NearbyZip[];
  nearbyCities: NearbyCity[];
  lowestPrice: number | null;
  hasLocalData: boolean;
};

function milesBetween(centre: Centre, latitude: number, longitude: number) {
  const latitudeDelta = ((latitude - centre.latitude) * Math.PI) / 180;
  const longitudeDelta = ((longitude - centre.longitude) * Math.PI) / 180;
  const latitudeRadians = (centre.latitude * Math.PI) / 180;
  const targetLatitudeRadians = (latitude * Math.PI) / 180;
  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(latitudeRadians) * Math.cos(targetLatitudeRadians) * Math.sin(longitudeDelta / 2) ** 2;
  return 3959 * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

function dominantLocation(rows: SheetRow[]): { city: string; state: string } | null {
  const votes = new Map<string, { count: number; city: string; state: string }>();
  for (const row of rows) {
    const city = row.city.trim();
    const state = row.state.trim().toUpperCase();
    if (!city || !state) continue;
    const key = `${city.toLowerCase()}|${state}`;
    const vote = votes.get(key);
    votes.set(key, { count: (vote?.count ?? 0) + 1, city, state });
  }

  let best: { city: string; state: string } | null = null;
  let bestCount = 0;
  for (const vote of votes.values()) {
    if (vote.count > bestCount) {
      best = { city: vote.city, state: vote.state };
      bestCount = vote.count;
    }
  }
  return best;
}

function averageCentre(rows: SheetRow[]): Centre | null {
  let latitude = 0;
  let longitude = 0;
  let count = 0;
  for (const row of rows) {
    const rowLatitude = Number(row.latitude);
    const rowLongitude = Number(row.longitude);
    if (!Number.isFinite(rowLatitude) || !Number.isFinite(rowLongitude)) continue;
    latitude += rowLatitude;
    longitude += rowLongitude;
    count += 1;
  }
  if (!count) return null;
  return { latitude: latitude / count, longitude: longitude / count };
}

function cityHref(city: string, state: string, zip: string) {
  return cityPageHref(city, state) ?? `/storage-search/zip/${zip}`;
}

// getStorageRows() returns the same array until its TTL expires, so this keeps
// the expensive row-to-facility grouping from running twice per page render
// (metadata and page) or on every request in a warm server process.
let facilitiesCache: { rows: SheetRow[]; facilities: CityStorageFacility[] } | null = null;

function allFacilities(rows: SheetRow[]): CityStorageFacility[] {
  if (facilitiesCache?.rows === rows) return facilitiesCache.facilities;
  const facilities = buildCityStorageFacilities(rows);
  facilitiesCache = { rows, facilities };
  return facilities;
}

/**
 * Resolves a ZIP code to its storage market: exact facilities when we have
 * them, then the nationwide ZIP centroid, then a widening radius of nearby
 * facilities. Pages use this for both the result cards and the surrounding
 * "nearby areas" links.
 */
export async function searchStorageByZip(rawZip: string): Promise<ZipSearchResult | null> {
  const zip = normalizeZip(rawZip);
  if (!zip) return null;

  const rows = await getStorageRows();
  const zipRows = rows.filter((row) => normalizeZip(row.zip) === zip);
  const zipLocation = dominantLocation(zipRows);
  const zipCentre = averageCentre(zipRows);
  const record = zipCentre && zipLocation ? null : await lookupZipRecord(zip);

  const centre = zipCentre ?? (record ? { latitude: record.latitude, longitude: record.longitude } : null);
  if (!centre) return null;

  const city = zipLocation?.city ?? record?.city ?? "";
  const state = zipLocation?.state ?? record?.state ?? "";
  if (!city || !state) return null;

  const ranked = allFacilities(rows)
    .map((facility) => ({
      ...facility,
      distanceMiles: milesBetween(centre, facility.latitude, facility.longitude),
      isNearby: true,
    }))
    .filter((facility) => Number.isFinite(facility.distanceMiles))
    .sort((first, second) => first.distanceMiles - second.distanceMiles);

  let radiusMiles: number = RADIUS_STEPS[RADIUS_STEPS.length - 1];
  if (ranked.length > 0) {
    const targetCount = Math.min(MIN_RADIUS_RESULTS, ranked.length);
    for (const step of RADIUS_STEPS) {
      const count = ranked.filter((facility) => facility.distanceMiles <= step).length;
      if (count >= targetCount) {
        radiusMiles = step;
        break;
      }
    }
  }

  const facilities = ranked
    .filter((facility) => facility.distanceMiles <= radiusMiles)
    .slice(0, MAX_FACILITIES);

  let nearbyZips: NearbyZip[] = [];
  let nearbyCities: NearbyCity[] = [];

  if (facilities.length > 0) {
    const seenZips = new Set<string>([zip]);
    const seenCities = new Set<string>([`${city.toLowerCase()}|${state}`]);

    for (const facility of facilities) {
      const nearbyZip = normalizeZip(facility.address.match(/(\d{5})(?:-\d{4})?\s*$/)?.[0] ?? "") ?? "";
      if (nearbyZip && !seenZips.has(nearbyZip) && nearbyZips.length < MAX_NEARBY) {
        seenZips.add(nearbyZip);
        nearbyZips.push({
          zip: nearbyZip,
          city: facility.city,
          state: facility.state,
          distanceMiles: facility.distanceMiles,
        });
      }

      const key = `${facility.city.toLowerCase()}|${facility.state}`;
      if (!seenCities.has(key) && nearbyCities.length < MAX_NEARBY) {
        seenCities.add(key);
        const representativeZip = nearbyZip || zip;
        nearbyCities.push({
          city: facility.city,
          state: facility.state,
          zip: representativeZip,
          distanceMiles: facility.distanceMiles,
          href: cityHref(facility.city, facility.state, representativeZip),
        });
      }
    }
  }

  if (nearbyZips.length === 0) {
    const nearest = await findNearestZipRecords(centre.latitude, centre.longitude, MAX_NEARBY + 1);
    const seenCities = new Set<string>([`${city.toLowerCase()}|${state}`]);
    for (const nearby of nearest) {
      if (nearby.zip === zip) continue;
      if (nearbyZips.length < MAX_NEARBY) {
        nearbyZips.push({
          zip: nearby.zip,
          city: nearby.city,
          state: nearby.state,
          distanceMiles: nearby.distanceMiles,
        });
      }
      const key = `${nearby.city.toLowerCase()}|${nearby.state}`;
      if (!seenCities.has(key) && nearbyCities.length < MAX_NEARBY) {
        seenCities.add(key);
        nearbyCities.push({
          city: nearby.city,
          state: nearby.state,
          zip: nearby.zip,
          distanceMiles: nearby.distanceMiles,
          href: cityHref(nearby.city, nearby.state, nearby.zip),
        });
      }
    }
  }

  const lowestPrice = facilities
    .flatMap((facility) => facility.units.map((unit) => priceNumber(unit.price)))
    .filter((value) => Number.isFinite(value) && value > 0)
    .reduce((lowest, value) => Math.min(lowest, value), Number.POSITIVE_INFINITY);

  return {
    zip,
    city,
    state,
    stateName: US_STATE_NAMES[state] ?? state,
    latitude: centre.latitude,
    longitude: centre.longitude,
    radiusMiles,
    facilities,
    nearbyZips,
    nearbyCities,
    lowestPrice: Number.isFinite(lowestPrice) ? lowestPrice : null,
    hasLocalData: zipRows.length > 0,
  };
}
