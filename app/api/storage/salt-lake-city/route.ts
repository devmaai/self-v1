import { NextResponse } from "next/server";

const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1ZU1TRtVeYWstC7QUJUY6s8F5GNxzDLLyROW3STwKwjk/export?format=csv&gid=870162583";

type UnitRow = {
  facility_id: string;
  facility_name: string;
  city: string;
  state: string;
  size: string;
  price: string;
  regular_price: string;
  quantity_available: string;
  special: string;
  amenities: string;
};

type UnitOption = Pick<UnitRow, "size" | "price" | "regular_price" | "quantity_available" | "special" | "amenities">;

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

export async function GET() {
  const response = await fetch(SHEET_CSV_URL, { next: { revalidate: 3600 } });
  if (!response.ok) return NextResponse.json({ error: "Storage data request failed" }, { status: 502 });

  const rows = parseCsv(await response.text()) as unknown as UnitRow[];
  const grouped = new Map<string, { name: string; units: UnitOption[] }>();

  for (const row of rows) {
    if (row.city !== "Salt Lake City" || row.state !== "UT" || !row.facility_id || !row.size || !row.price) continue;
    const facility = grouped.get(row.facility_id) ?? { name: row.facility_name, units: [] };
    facility.units.push({
      size: row.size,
      price: row.price,
      regular_price: row.regular_price,
      quantity_available: row.quantity_available,
      special: row.special,
      amenities: row.amenities,
    });
    grouped.set(row.facility_id, facility);
  }

  return NextResponse.json([...grouped.entries()].map(([facilityId, facility]) => ({ facilityId, ...facility })));
}