import { readFile } from "node:fs/promises";
import path from "node:path";

export const STORAGE_DATA_REVALIDATE = 604800;

const SPREADSHEET_ID = "1ZU1TRtVeYWstC7QUJUY6s8F5GNxzDLLyROW3STwKwjk";
const FACILITIES_CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=Facilities`;
const UNITS_CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=Units`;

export type SheetRow = {
  facility_id: string;
  facility_name: string;
  state: string;
  city: string;
  size: string;
  quantity_available: string;
  price: string;
  regular_price: string;
  street_address: string;
  zip: string;
  facility_url: string;
  distance_mi: string;
  latitude: string;
  longitude: string;
};

/**
 * Full-text CSV parser: tracks quote state across the whole document rather
 * than splitting on newlines first, so quoted fields containing embedded
 * line breaks (e.g. facility descriptions) don't shift subsequent columns.
 */
function parseCsv(csv: string): Record<string, string>[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < csv.length; index += 1) {
    const character = csv[index];
    const nextCharacter = csv[index + 1];

    if (character === '"' && nextCharacter === '"') {
      value += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      row.push(value);
      value = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && nextCharacter === "\n") index += 1;
      row.push(value);
      rows.push(row);
      row = [];
      value = "";
    } else {
      value += character;
    }
  }

  if (value || row.length) {
    row.push(value);
    rows.push(row);
  }

  const headers = rows[0] ?? [];
  return rows.slice(1).map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""])));
}

let storageRowsCache: { expiresAt: number; rows: SheetRow[] } | null = null;
let storageRowsRequest: Promise<SheetRow[]> | null = null;

async function fetchLiveRows(): Promise<SheetRow[]> {
  const [facilitiesResponse, unitsResponse] = await Promise.all([
    fetch(FACILITIES_CSV_URL, { next: { revalidate: STORAGE_DATA_REVALIDATE }, signal: AbortSignal.timeout(10000) }),
    fetch(UNITS_CSV_URL, { next: { revalidate: STORAGE_DATA_REVALIDATE }, signal: AbortSignal.timeout(10000) }),
  ]);
  if (!facilitiesResponse.ok) throw new Error(`Facilities sheet request failed: ${facilitiesResponse.status}`);
  if (!unitsResponse.ok) throw new Error(`Units sheet request failed: ${unitsResponse.status}`);

  const facilityRows = parseCsv(await facilitiesResponse.text());
  const unitRows = parseCsv(await unitsResponse.text());
  const facilityById = new Map(facilityRows.map((row) => [row.facility_id, row]));

  return unitRows
    .map((unit): SheetRow => {
      const facility = facilityById.get(unit.facility_id);
      return {
        facility_id: unit.facility_id ?? "",
        facility_name: unit.facility_name || facility?.name || "",
        state: facility?.state || unit.state || "",
        city: facility?.city || unit.city || "",
        size: unit.size ?? "",
        quantity_available: unit.quantity_available ?? "",
        price: unit.price ?? "",
        regular_price: unit.regular_price ?? "",
        street_address: facility?.street_address ?? "",
        zip: facility?.zip ?? "",
        facility_url: facility?.facility_url ?? "",
        distance_mi: facility?.distance_mi ?? "",
        latitude: facility?.latitude ?? "",
        longitude: facility?.longitude ?? "",
      };
    })
    .filter((row) => row.facility_id && row.size && row.price && row.latitude && row.longitude);
}

async function fetchFallbackRows(): Promise<SheetRow[]> {
  const localCsv = await readFile(path.join(process.cwd(), "sheet_870162583.csv"), "utf8");
  return parseCsv(localCsv).filter((row) => row.facility_id && row.size && row.price && row.latitude && row.longitude) as unknown as SheetRow[];
}

export async function getStorageRows(): Promise<SheetRow[]> {
  if (storageRowsCache && storageRowsCache.expiresAt > Date.now()) return storageRowsCache.rows;
  if (storageRowsRequest) return storageRowsRequest;

  storageRowsRequest = fetchLiveRows()
    .catch(async () => {
      try {
        return await fetchFallbackRows();
      } catch {
        return [];
      }
    })
    .then((rows) => {
      storageRowsCache = { expiresAt: Date.now() + STORAGE_DATA_REVALIDATE * 1000, rows };
      return rows;
    })
    .finally(() => {
      storageRowsRequest = null;
    });

  return storageRowsRequest;
}

export function priceNumber(price: string): number {
  const value = Number(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(value) ? value : Number.POSITIVE_INFINITY;
}
