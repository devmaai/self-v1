import { getStorageRows, priceNumber } from "./liveStorageData";

export type StorageSizePrice = {
  id: string;
  label: string;
  width: number;
  length: number;
  area: number;
  fits: string;
  from: number | null;
  typicalLow: number | null;
  typicalHigh: number | null;
  median: number | null;
  sampleSize: number;
};

export type StoragePriceGuide = {
  sizes: StorageSizePrice[];
  totalListings: number;
};

const SIZE_GUIDE: Array<{ width: number; length: number; fits: string }> = [
  { width: 5, length: 5, fits: "A small closet: boxes, seasonal gear, and a chair" },
  { width: 5, length: 10, fits: "A dorm room or small studio without appliances" },
  { width: 5, length: 15, fits: "A studio or small one-bedroom without large appliances" },
  { width: 10, length: 10, fits: "A one-bedroom apartment, including kitchen appliances" },
  { width: 10, length: 15, fits: "A two-bedroom apartment or small home" },
  { width: 10, length: 20, fits: "A three-bedroom home or a vehicle" },
  { width: 10, length: 25, fits: "A three- or four-bedroom home or business stock" },
  { width: 10, length: 30, fits: "A large home, vehicle, or business inventory" },
];

const STANDARD_SIZES = new Set(SIZE_GUIDE.map(({ width, length }) => `${width}x${length}`));

function parseSize(size: string) {
  const match = size.match(/(\d+(?:\.\d+)?)\s*(?:'|ft|feet)?\s*[x×]\s*(\d+(?:\.\d+)?)/i);
  if (!match) return null;
  const first = Number(match[1]);
  const second = Number(match[2]);
  if (!Number.isFinite(first) || !Number.isFinite(second) || first <= 0 || second <= 0) return null;
  return { width: Math.min(first, second), length: Math.max(first, second) };
}

function percentile(sorted: number[], fraction: number) {
  if (!sorted.length) return null;
  const position = (sorted.length - 1) * fraction;
  const lower = Math.floor(position);
  const upper = Math.ceil(position);
  if (lower === upper) return sorted[lower];
  return sorted[lower] + (sorted[upper] - sorted[lower]) * (position - lower);
}

function roundPrice(value: number | null) {
  return value === null ? null : Math.round(value);
}

/**
 * Builds a plain, crawlable price table from the live storage listings we
 * already use across the site. Prices are move-in rates in USD per month.
 * Duplicate unit rows (the fallback CSV contains repeated scrapes) are
 * collapsed by unit_id so one listing cannot skew a size bucket.
 */
export async function getStoragePriceGuide(): Promise<StoragePriceGuide> {
  const rows = await getStorageRows();
  const buckets = new Map<string, number[]>();
  const seen = new Set<string>();
  let totalListings = 0;

  for (const row of rows) {
    const parsed = parseSize(row.size);
    if (!parsed) continue;
    const key = `${parsed.width}x${parsed.length}`;
    if (!STANDARD_SIZES.has(key)) continue;

    const dedupeKey = row.unit_id || `${row.facility_id}|${row.size}|${row.price}|${row.city}|${row.state}`;
    if (seen.has(dedupeKey)) continue;
    seen.add(dedupeKey);

    const price = priceNumber(row.price);
    if (!Number.isFinite(price) || price < 5 || price > 2000) continue;

    const bucket = buckets.get(key) ?? [];
    bucket.push(price);
    buckets.set(key, bucket);
    totalListings += 1;
  }

  // A few large sizes have thin listing counts, which can make a 10 × 15 look
  // cheaper than a 10 × 10. Hold each size at or above the previous size so the
  // public table never shows a bigger unit priced below a smaller one.
  let lastFrom = 0;
  let lastHigh = 0;
  let lastMedian = 0;

  const sizes = SIZE_GUIDE.map(({ width, length, fits }) => {
    const id = `${width}x${length}`;
    const prices = (buckets.get(id) ?? []).sort((a, b) => a - b);
    const rawFrom = roundPrice(percentile(prices, 0.25));
    const rawHigh = roundPrice(percentile(prices, 0.75));
    const rawMedian = roundPrice(percentile(prices, 0.5));

    const from = rawFrom === null ? null : Math.max(rawFrom, lastFrom);
    const typicalLow = from;
    const typicalHigh = rawHigh === null ? null : Math.max(rawHigh, lastHigh);
    const median = rawMedian === null ? null : Math.max(rawMedian, lastMedian);

    if (from !== null) lastFrom = from;
    if (typicalHigh !== null) lastHigh = typicalHigh;
    if (median !== null) lastMedian = median;

    return {
      id,
      label: `${width} × ${length}`,
      width,
      length,
      area: width * length,
      fits,
      from,
      typicalLow,
      typicalHigh,
      median,
      sampleSize: prices.length,
    };
  });

  return { sizes, totalListings };
}
