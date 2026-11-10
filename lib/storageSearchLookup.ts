import { CITY_STATES, isCityPublished } from "./cityStates";
import { US_STATE_NAMES } from "./usStates";
import { extractZipFromQuery } from "./zipCodes";

// Two-letter state code -> the folder slug for that state's published landing
// page. To restore a drafted state, add its entry here and to
// components/sections/StorageStateLinks.tsx.
export const STATE_PAGE_SLUGS: Record<string, string> = {
  UT: "utah",
  CA: "california",
  NY: "new-york",
  MO: "missouri",
};

// Lets a visitor type either a state's full name or its abbreviation and
// land on the matching state page, e.g. "texas" or "tx" -> /storage-search/texas.
export const STATE_NAME_TO_SLUG: Record<string, string> = Object.entries(STATE_PAGE_SLUGS).reduce(
  (map, [abbreviation, slug]) => {
    map[abbreviation.toLowerCase()] = slug;
    const fullName = US_STATE_NAMES[abbreviation];
    if (fullName) map[fullName.toLowerCase()] = slug;
    return map;
  },
  {} as Record<string, string>,
);

export function slugifyCity(value: string): string {
  return value
    .split("/")[0]
    .toLowerCase()
    .trim()
    .replace(/'/g, "")
    .replace(/\./g, "")
    .replace(/[()]/g, "")
    .replace(/\s+/g, "-");
}

/**
 * City slug used by the live city pages. The catalog contains state-specific
 * suffixes for duplicate names (Kansas City, KS; Brandon, SD), so try the
 * state-suffixed slug before the plain one.
 */
export function cityPageHref(city: string, state: string): string | null {
  const base = slugifyCity(city);
  const stateCode = state.toLowerCase();
  const candidates = [`${base}-${stateCode}`, base];
  if (base === "new-york") candidates.unshift("new-york-city");

  for (const slug of candidates) {
    if (CITY_STATES[slug] !== state || !isCityPublished(slug)) continue;
    const stateSlug = STATE_PAGE_SLUGS[state];
    if (stateSlug) return `/storage-search/${stateSlug}/${slug}`;
  }

  return null;
}

export { extractZipFromQuery };

const STATE_NAME_TO_CODE = Object.entries(US_STATE_NAMES).reduce(
  (map, [code, name]) => {
    map[name.toLowerCase()] = code;
    return map;
  },
  {} as Record<string, string>,
);

/** Resolves "City, ST" and "City, State" to a live city page when one exists. */
function cityStateHref(value: string): string | null {
  const comma = value.lastIndexOf(",");
  if (comma < 1) return null;

  const city = value.slice(0, comma).trim();
  const rawState = value.slice(comma + 1).trim().toLowerCase();
  const state = rawState.length === 2
    ? rawState.toUpperCase()
    : STATE_NAME_TO_CODE[rawState];
  if (!city || !state) return null;

  return cityPageHref(city, state);
}

/**
 * Resolves what a visitor typed into a storage search box to the most useful
 * real destination: a ZIP results page, a state page if they typed a state, a
 * live city page if we recognize the city, or the general search as a last
 * resort.
 */
export function resolveStorageSearchHref(rawQuery: string): string {
  const query = rawQuery.trim();
  if (!query) return "/storage-state-usa";

  const zip = extractZipFromQuery(query);
  if (zip) return `/storage-search/zip/${zip}`;

  const normalized = query.toLowerCase();
  const stateSlug = STATE_NAME_TO_SLUG[normalized];
  if (stateSlug) return `/storage-search/${stateSlug}`;

  const cityHref = cityStateHref(query);
  if (cityHref) return cityHref;

  const citySlug = slugifyCity(query);
  const cityState = CITY_STATES[citySlug];
  const cityStateSlug = cityState && isCityPublished(citySlug) ? STATE_PAGE_SLUGS[cityState] : undefined;
  if (cityStateSlug) return `/storage-search/${cityStateSlug}/${citySlug}`;

  return `/storage-search?location=${encodeURIComponent(query)}`;
}

export function resolveStorageSearchSubmitHref(rawQuery: string): string {
  const href = resolveStorageSearchHref(rawQuery);
  if (!href.startsWith("/storage-search?location=")) return href;
  return `/?location=${encodeURIComponent(rawQuery.trim())}`;
}

/**
 * Async version of resolveStorageSearchSubmitHref for browser submits. Static
 * matches (state, published city, ZIP) resolve instantly. Anything else is
 * checked against /api/location-search so a plain "Austin" or an unknown ZIP
 * lands on a real results page, or on the "no facilities" page, instead of
 * bouncing to the homepage.
 */
export async function resolveStorageSearchDestination(rawQuery: string): Promise<string> {
  const query = rawQuery.trim();
  const staticHref = resolveStorageSearchHref(query);
  if (!query) return staticHref;

  const unavailable = `/storage-search/unavailable?zip=${encodeURIComponent(query)}`;
  const zip = extractZipFromQuery(query);

  try {
    if (zip) {
      const response = await fetch(`/api/location-search?exact=true&q=${encodeURIComponent(zip)}`);
      if (!response.ok) return staticHref;
      const result = (await response.json()) as { location?: unknown };
      return result.location ? staticHref : unavailable;
    }

    if (!staticHref.startsWith("/storage-search?location=")) return staticHref;

    const response = await fetch(`/api/location-search?q=${encodeURIComponent(query)}`);
    if (!response.ok) return resolveStorageSearchSubmitHref(query);
    const result = (await response.json()) as { suggestions?: { href: string }[] };
    return result.suggestions?.[0]?.href ?? unavailable;
  } catch {
    return resolveStorageSearchSubmitHref(query);
  }
}
