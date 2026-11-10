/** A single rich suggestion returned by /api/location-search. */
export type LocationSuggestion = {
  type: "zip" | "city";
  /** Primary line, e.g. "90210 — Beverly Hills, CA" or "Austin, TX". */
  label: string;
  /** Secondary line, e.g. "24 storage facilities nearby". */
  secondary: string;
  city: string;
  state: string;
  stateName: string;
  /** Representative ZIP for the suggestion (always present). */
  zip: string;
  facilityCount: number;
  href: string;
  latitude: number;
  longitude: number;
};
