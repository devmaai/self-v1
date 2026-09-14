import { CITY_STATES } from "./cityStates";
import { US_STATE_NAMES } from "./usStates";

// Two-letter state code -> the folder slug for that state's bespoke landing
// page. Kept in sync with components/sections/StorageStateLinks.tsx.
export const STATE_PAGE_SLUGS: Record<string, string> = {
  UT: "utah",
  CA: "california",
  NY: "new-york",
  MO: "missouri",
  FL: "florida",
  NJ: "new-jersey",
  OK: "oklahoma",
  KS: "kansas",
  TX: "texas",
  SD: "south-dakota",
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

function slugifyCity(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/'/g, "")
    .replace(/\./g, "")
    .replace(/\s+/g, "-");
}

/**
 * Resolves what a visitor typed into a storage search box to the most useful
 * real destination: a state page if they typed a state, a live city page if
 * we recognize the city, or the general search results as a last resort.
 */
export function resolveStorageSearchHref(rawQuery: string): string {
  const query = rawQuery.trim();
  if (!query) return "/storage-search";

  const normalized = query.toLowerCase();
  const stateSlug = STATE_NAME_TO_SLUG[normalized];
  if (stateSlug) return `/storage-search/${stateSlug}`;

  const citySlug = slugifyCity(query);
  if (CITY_STATES[citySlug]) return `/storage-search/${citySlug}`;

  return `/storage-search?location=${encodeURIComponent(query)}`;
}
