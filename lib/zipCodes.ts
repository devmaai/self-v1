/**
 * Small, dependency-free ZIP helpers shared by client search boxes and the
 * server-side zip directory. US ZIP codes are always five digits, optionally
 * followed by a four-digit delivery route (ZIP+4) that we treat as cosmetic.
 */
export function normalizeZip(value: string): string | null {
  const match = value.trim().match(/^(\d{5})(?:-\d{4})?$/);
  return match?.[1] ?? null;
}

/**
 * Pulls a ZIP code out of free text that starts with one, e.g. the old
 * datalist format "90210, Beverly Hills, California".
 */
export function extractZipFromQuery(value: string): string | null {
  const match = value.trim().match(/^(\d{5})(?:-\d{4})?(?=\s*(?:,|$|[-–—]))/);
  return match?.[1] ?? null;
}
