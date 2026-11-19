// Usage: node scripts/dedupe-city.mjs <scraped-dir> <live-facilities.csv> <live-units.csv>
// Writes *-deduped.csv files containing only IDs not already in the live sheet.
import fs from "node:fs/promises";
import path from "node:path";

const [dir, liveFacPath, liveUnitPath] = process.argv.slice(2);
if (!dir || !liveFacPath || !liveUnitPath) {
  console.error("Usage: node scripts/dedupe-city.mjs <scraped-dir> <live-facilities.csv> <live-units.csv>");
  process.exit(1);
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') { inQuotes = false; }
      else field += c;
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field); field = "";
    } else if (c === "\n") {
      row.push(field); rows.push(row); row = []; field = "";
    } else if (c !== "\r") {
      field += c;
    }
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows;
}

function toCsv(rows) {
  const quote = (v) => `"${String(v).replace(/"/g, '""')}"`;
  return [rows[0].join(","), ...rows.slice(1).map((r) => r.map(quote).join(","))].join("\n") + "\n";
}

function indexOf(header, name) {
  const i = header.indexOf(name);
  if (i < 0) throw new Error(`Missing column ${name}`);
  return i;
}

const liveFac = parseCsv(await fs.readFile(liveFacPath, "utf8"));
const liveUnit = parseCsv(await fs.readFile(liveUnitPath, "utf8"));
const liveFacIds = new Set(liveFac.slice(1).map((r) => r[indexOf(liveFac[0], "facility_id")]));
const liveUnitIds = new Set(liveUnit.slice(1).map((r) => r[indexOf(liveUnit[0], "unit_id")]));

const fac = parseCsv(await fs.readFile(path.join(dir, "facilities.csv"), "utf8"));
const unit = parseCsv(await fs.readFile(path.join(dir, "units.csv"), "utf8"));
const fb = parseCsv(await fs.readFile(path.join(dir, "local-fallback.csv"), "utf8"));

const facId = indexOf(fac[0], "facility_id");
const unitId = indexOf(unit[0], "unit_id");
const unitFacId = indexOf(unit[0], "facility_id");
const fbId = indexOf(fb[0], "unit_id");
const fbFacId = indexOf(fb[0], "facility_id");

const keptFacIds = new Set(fac.slice(1).filter((r) => !liveFacIds.has(r[facId])).map((r) => r[facId]));
const facOut = [fac[0], ...fac.slice(1).filter((r) => keptFacIds.has(r[facId]))];
const unitOut = [unit[0], ...unit.slice(1).filter((r) => !liveUnitIds.has(r[unitId]) && keptFacIds.has(r[unitFacId]))];
const fbOut = [fb[0], ...fb.slice(1).filter((r) => !liveUnitIds.has(r[fbId]) && keptFacIds.has(r[fbFacId]))];

await fs.writeFile(path.join(dir, "facilities-deduped.csv"), toCsv(facOut), "utf8");
await fs.writeFile(path.join(dir, "units-deduped.csv"), toCsv(unitOut), "utf8");
await fs.writeFile(path.join(dir, "local-fallback-deduped.csv"), toCsv(fbOut), "utf8");

console.log(JSON.stringify({
  facilities: { total: fac.length - 1, kept: facOut.length - 1 },
  units: { total: unit.length - 1, kept: unitOut.length - 1 },
  fallback: { total: fb.length - 1, kept: fbOut.length - 1 },
}));
