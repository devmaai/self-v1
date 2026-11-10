import { US_STATE_NAMES } from "@/lib/usStates";
import { getStorageRows } from "@/lib/liveStorageData";
import { normalizeZip, extractZipFromQuery } from "@/lib/zipCodes";
import { findNearestZipRecord, lookupZipRecord, searchCityRecords, searchZipRecords, type CityRecord, type ZipRecord } from "@/lib/zipDirectory";
import { cityPageHref } from "@/lib/storageSearchLookup";
import type { LocationSuggestion } from "@/lib/locationSuggestion";

type IndexedZip = {
  zip: string;
  city: string;
  state: string;
  stateName: string;
  facilityCount: number;
  latitude: number;
  longitude: number;
  href: string;
};

type IndexedCity = {
  city: string;
  state: string;
  stateName: string;
  facilityCount: number;
  zip: string;
  latitude: number;
  longitude: number;
  href: string;
};

type LocationIndex = {
  zips: Map<string, IndexedZip>;
  cities: IndexedCity[];
  expiresAt: number;
};

const INDEX_TTL_MS = 10 * 60 * 1000;
let indexCache: LocationIndex | null = null;
let indexRequest: Promise<LocationIndex> | null = null;

function cityKey(city: string, state: string) {
  return `${city.trim().toLowerCase()}|${state.trim().toUpperCase()}`;
}

function dominantKey(votes: Map<string, number>): string | undefined {
  let bestKey: string | undefined;
  let bestVotes = -1;
  for (const [key, count] of votes) {
    if (count > bestVotes) {
      bestKey = key;
      bestVotes = count;
    }
  }
  return bestKey;
}

function dominantCity(
  votes: Map<string, { count: number; city: string; state: string }>,
): { city: string; state: string } | undefined {
  let best: { city: string; state: string } | undefined;
  let bestVotes = -1;
  for (const vote of votes.values()) {
    if (vote.count > bestVotes) {
      best = { city: vote.city, state: vote.state };
      bestVotes = vote.count;
    }
  }
  return best;
}

async function buildIndex(): Promise<LocationIndex> {
  const rows = await getStorageRows();

  const zipFacilities = new Map<string, Set<string>>();
  const zipCityVotes = new Map<string, Map<string, { count: number; city: string; state: string }>>();
  const zipCentres = new Map<string, { latitude: number; longitude: number; count: number }>();
  const cityFacilities = new Map<string, Set<string>>();
  const cityZipVotes = new Map<string, Map<string, number>>();
  const cityDetails = new Map<string, { city: string; state: string; latitude: number; longitude: number; count: number }>();

  for (const row of rows) {
    const zip = normalizeZip(row.zip);
    const latitude = Number(row.latitude);
    const longitude = Number(row.longitude);
    const city = row.city.trim();
    const state = row.state.trim().toUpperCase();
    if (!zip || !city || !state) continue;
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) continue;

    let facilities = zipFacilities.get(zip);
    if (!facilities) {
      facilities = new Set();
      zipFacilities.set(zip, facilities);
      zipCityVotes.set(zip, new Map());
      zipCentres.set(zip, { latitude: 0, longitude: 0, count: 0 });
    }
    facilities.add(row.facility_id);

    const votes = zipCityVotes.get(zip)!;
    const key = cityKey(city, state);
    const vote = votes.get(key);
    votes.set(key, { count: (vote?.count ?? 0) + 1, city, state });

    const centre = zipCentres.get(zip)!;
    centre.latitude += latitude;
    centre.longitude += longitude;
    centre.count += 1;

    const keyForCity = cityKey(city, state);
    let cityFacilitySet = cityFacilities.get(keyForCity);
    if (!cityFacilitySet) {
      cityFacilitySet = new Set();
      cityFacilities.set(keyForCity, cityFacilitySet);
      cityZipVotes.set(keyForCity, new Map());
      cityDetails.set(keyForCity, { city, state, latitude: 0, longitude: 0, count: 0 });
    }
    cityFacilitySet.add(row.facility_id);

    const zipVotes = cityZipVotes.get(keyForCity)!;
    zipVotes.set(zip, (zipVotes.get(zip) ?? 0) + 1);

    const details = cityDetails.get(keyForCity)!;
    details.latitude += latitude;
    details.longitude += longitude;
    details.count += 1;
  }

  const zips = new Map<string, IndexedZip>();
  for (const [zip, facilities] of zipFacilities) {
    const votes = zipCityVotes.get(zip);
    const dominant = votes ? dominantCity(votes) : undefined;
    if (!dominant || !dominant.city || !dominant.state) continue;
    const centre = zipCentres.get(zip);
    if (!centre || !centre.count) continue;
    zips.set(zip, {
      zip,
      city: dominant.city,
      state: dominant.state,
      stateName: US_STATE_NAMES[dominant.state] ?? dominant.state,
      facilityCount: facilities.size,
      latitude: centre.latitude / centre.count,
      longitude: centre.longitude / centre.count,
      href: `/storage-search/zip/${zip}`,
    });
  }

  const cities: IndexedCity[] = [];
  for (const [key, facilities] of cityFacilities) {
    const details = cityDetails.get(key);
    if (!details || !details.count) continue;
    const zipVotes = cityZipVotes.get(key);
    const zip = zipVotes ? dominantKey(zipVotes) : undefined;
    if (!zip) continue;
    cities.push({
      city: details.city,
      state: details.state,
      stateName: US_STATE_NAMES[details.state] ?? details.state,
      facilityCount: facilities.size,
      zip,
      latitude: details.latitude / details.count,
      longitude: details.longitude / details.count,
      href: cityPageHref(details.city, details.state) ?? `/storage-search/zip/${zip}`,
    });
  }

  return { zips, cities, expiresAt: Date.now() + INDEX_TTL_MS };
}

async function getIndex(): Promise<LocationIndex> {
  if (indexCache && indexCache.expiresAt > Date.now()) return indexCache;
  if (indexRequest) return indexRequest;

  indexRequest = buildIndex()
    .then((index) => {
      indexCache = index;
      return index;
    })
    .finally(() => {
      indexRequest = null;
    });

  return indexRequest;
}

function suggestionFromZip(zip: IndexedZip): LocationSuggestion {
  return {
    type: "zip",
    label: `${zip.zip} — ${zip.city}, ${zip.state}`,
    secondary: zip.facilityCount
      ? `${zip.facilityCount} storage ${zip.facilityCount === 1 ? "facility" : "facilities"} nearby`
      : "Search this ZIP code",
    city: zip.city,
    state: zip.state,
    stateName: zip.stateName,
    zip: zip.zip,
    facilityCount: zip.facilityCount,
    href: zip.href,
    latitude: zip.latitude,
    longitude: zip.longitude,
  };
}

function suggestionFromCity(city: IndexedCity): LocationSuggestion {
  return {
    type: "city",
    label: `${city.city}, ${city.state}`,
    secondary: `${city.facilityCount} storage ${city.facilityCount === 1 ? "facility" : "facilities"} nearby`,
    city: city.city,
    state: city.state,
    stateName: city.stateName,
    zip: city.zip,
    facilityCount: city.facilityCount,
    href: city.href,
    latitude: city.latitude,
    longitude: city.longitude,
  };
}

function suggestionFromRecord(record: ZipRecord, facilityCount = 0): LocationSuggestion {
  return {
    type: "zip",
    label: `${record.zip} — ${record.city}, ${record.state}`,
    secondary: facilityCount
      ? `${facilityCount} storage ${facilityCount === 1 ? "facility" : "facilities"} nearby`
      : "Search this ZIP code",
    city: record.city,
    state: record.state,
    stateName: US_STATE_NAMES[record.state] ?? record.state,
    zip: record.zip,
    facilityCount,
    href: `/storage-search/zip/${record.zip}`,
    latitude: record.latitude,
    longitude: record.longitude,
  };
}

function suggestionFromCityRecord(record: CityRecord): LocationSuggestion {
  return {
    type: "city",
    label: `${record.city}, ${record.state}`,
    secondary: record.zipCount > 1
      ? `${record.zipCount} ZIP codes in this area`
      : "Search this area",
    city: record.city,
    state: record.state,
    stateName: US_STATE_NAMES[record.state] ?? record.state,
    zip: record.zip,
    facilityCount: 0,
    href: cityPageHref(record.city, record.state) ?? `/storage-search/zip/${record.zip}`,
    latitude: record.latitude,
    longitude: record.longitude,
  };
}

function cityMatchScore(city: IndexedCity, query: string): number {
  const [rawCity, rawState] = query.split(",").map((part) => part.trim());
  const name = city.city.toLowerCase();
  const cityQuery = rawCity || query;

  if (rawState) {
    const stateMatches =
      city.state.toLowerCase() === rawState || city.stateName.toLowerCase() === rawState;
    if (!stateMatches) return -1;
  }

  if (name === cityQuery || name.startsWith(cityQuery)) return 0;
  if (name.split(/\s+/).some((word) => word.startsWith(cityQuery))) return 1;
  if (name.includes(cityQuery)) return 2;
  if (`${name}, ${city.state.toLowerCase()}`.includes(cityQuery)) return 3;
  return -1;
}

/** Typeahead suggestions for the shared search boxes. */
export async function searchLocationSuggestions(rawQuery: string, limit = 8): Promise<LocationSuggestion[]> {
  const query = rawQuery.trim().toLowerCase();
  if (query.length < 2) return [];

  const index = await getIndex();
  const suggestions: LocationSuggestion[] = [];
  const seen = new Set<string>();

  const add = (suggestion: LocationSuggestion) => {
    if (seen.has(suggestion.href)) return;
    seen.add(suggestion.href);
    suggestions.push(suggestion);
  };

  const zipPrefix = query.match(/^(\d{2,5})/)?.[1];
  if (zipPrefix) {
    const records = await searchZipRecords(zipPrefix, Math.max(limit, 8));
    for (const record of records) {
      const indexed = index.zips.get(record.zip);
      add(indexed ? suggestionFromZip(indexed) : suggestionFromRecord(record));
    }

    // Facility-backed ZIPs can include codes outside the plain numeric prefix
    // order, so add any that the dataset pick missed.
    const indexedMatches = [...index.zips.values()]
      .filter((zip) => zip.zip.startsWith(zipPrefix))
      .sort((first, second) => first.zip.localeCompare(second.zip));
    indexedMatches.forEach((zip) => add(suggestionFromZip(zip)));
  }

  const cityMatches = index.cities
    .map((city) => ({ city, score: cityMatchScore(city, query) }))
    .filter((entry) => entry.score >= 0)
    .sort((first, second) => (
      first.score - second.score ||
      second.city.facilityCount - first.city.facilityCount ||
      first.city.city.localeCompare(second.city.city)
    ));

  const seenCityKeys = new Set<string>();
  for (const { city } of cityMatches) {
    seenCityKeys.add(`${city.city.toLowerCase()}|${city.state}`);
    add(suggestionFromCity(city));
  }

  const directoryCities = await searchCityRecords(query, limit);
  for (const record of directoryCities) {
    const key = `${record.city.toLowerCase()}|${record.state}`;
    if (seenCityKeys.has(key)) continue;
    seenCityKeys.add(key);
    add(suggestionFromCityRecord(record));
  }

  return suggestions.slice(0, limit);
}

/** Exact availability check used by legacy callers. */
export async function getZipAvailability(rawZip: string) {
  const zip = normalizeZip(rawZip) ?? extractZipFromQuery(rawZip);
  if (!zip) return { available: false, location: null };

  const index = await getIndex();
  const indexed = index.zips.get(zip);
  if (indexed) {
    return {
      available: indexed.facilityCount > 0,
      location: {
        zip: indexed.zip,
        city: indexed.city,
        state: indexed.state,
        stateName: indexed.stateName,
        latitude: indexed.latitude,
        longitude: indexed.longitude,
        facilityCount: indexed.facilityCount,
      },
    };
  }

  const record = await lookupZipRecord(zip);
  if (!record) return { available: false, location: null };

  return {
    available: false,
    location: {
      zip: record.zip,
      city: record.city,
      state: record.state,
      stateName: US_STATE_NAMES[record.state] ?? record.state,
      latitude: record.latitude,
      longitude: record.longitude,
      facilityCount: 0,
    },
  };
}

/** Nearest search area for "Use my current location". */
export async function getNearestZipSuggestion(latitude: number, longitude: number): Promise<LocationSuggestion | null> {
  const record = await findNearestZipRecord(latitude, longitude);
  if (!record) return null;

  const index = await getIndex();
  const indexed = index.zips.get(record.zip);
  const suggestion = indexed
    ? suggestionFromZip(indexed)
    : suggestionFromRecord(record);

  return suggestion.facilityCount > 0
    ? suggestion
    : { ...suggestion, secondary: "Closest ZIP to your location" };
}
