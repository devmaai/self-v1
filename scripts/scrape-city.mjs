// Scrape one selfstorage.com city page into the two CSVs used by the site.
// Usage: node scripts/scrape-city.mjs <state-slug> <city-slug> [out-dir]
// Example: node scripts/scrape-city.mjs florida lake-city ./data/scraped/lake-city-fl

import fs from "node:fs/promises";
import path from "node:path";

const [stateSlug, citySlug, outDir = "data/scraped"] = process.argv.slice(2);
if (!stateSlug || !citySlug) {
  console.error("Usage: node scripts/scrape-city.mjs <state-slug> <city-slug> [out-dir]");
  process.exit(1);
}

const BASE = "https://www.selfstorage.com";
const IMAGE_BASE = "https://images.selfstorage.com/medium-compress";
const pageUrl = `${BASE}/self-storage/${stateSlug}/${citySlug}/`;

const response = await fetch(pageUrl, {
  headers: { "User-Agent": "Mozilla/5.0 (compatible; selfstorage.help data import)" },
});
if (!response.ok) throw new Error(`Failed to fetch ${pageUrl}: ${response.status}`);
const html = await response.text();

const match = html.match(/window\.__PRELOADED_STATE__\s*=\s*"([^"]+)"/);
if (!match) throw new Error(`No __PRELOADED_STATE__ found on ${pageUrl}`);

const payload = JSON.parse(Buffer.from(match[1], "base64").toString("utf8"));
const facilityIds = payload.search?.facilities ?? [];
const facilitiesById = payload.facilities?.byId ?? {};
const unitsById = payload.units?.byId ?? {};

const str = (value) => (value === null || value === undefined ? "" : String(value));
const bool = (value) => (value ? "TRUE" : "FALSE");
const round2 = (value) => (Number.isFinite(Number(value)) ? Number(value).toFixed(2) : "");

const now = new Date();
const scrapedAt = [
  now.getUTCFullYear(),
  String(now.getUTCMonth() + 1).padStart(2, "0"),
  String(now.getUTCDate()).padStart(2, "0"),
].join("-") + " " + [
  String(now.getUTCHours()).padStart(2, "0"),
  String(now.getUTCMinutes()).padStart(2, "0"),
  String(now.getUTCSeconds()).padStart(2, "0"),
].join(":");

const absolute = (url) => (!url ? "" : url.startsWith("http") ? url : `${BASE}${url}`);

const DAY_ABBREV = { sunday: "Sun", monday: "Mon", tuesday: "Tue", wednesday: "Wed", thursday: "Thu", friday: "Fri", saturday: "Sat" };
function officeHours(hours) {
  const office = hours?.office;
  if (!office) return "";
  const time = (value) => {
    const raw = str(value);
    if (!raw || raw === "-") return raw;
    return raw.slice(0, 5);
  };
  return Object.keys(DAY_ABBREV)
    .map((day) => {
      const entry = office[day];
      if (!entry) return "";
      if (entry.appointmentOnly) return `${DAY_ABBREV[day]} Appointment`;
      const open = time(entry.open);
      const close = time(entry.closed);
      if (open === "-" || close === "-") return `${DAY_ABBREV[day]} Closed`;
      return open && close ? `${DAY_ABBREV[day]} ${open}-${close}` : "";
    })
    .filter(Boolean)
    .join("; ");
}

// Units are keyed by unit id globally. Group them per facility so we can
// derive facility-level unit counts and climate-controlled flags.
const unitsByFacility = new Map();
for (const unit of Object.values(unitsById)) {
  const facilityId = str(unit.facilityId);
  if (!facilityId) continue;
  if (!unitsByFacility.has(facilityId)) unitsByFacility.set(facilityId, []);
  unitsByFacility.get(facilityId).push(unit);
}

const facilityColumns = [
  "facility_id", "name", "phone", "facility_type", "street_address", "street_address_2",
  "city", "state", "full_state", "zip", "latitude", "longitude", "facility_url",
  "city_url", "state_url", "lowest_price", "units_available", "admin_fee", "lock_fee",
  "total_fees", "rating", "review_count", "google_rating", "google_review_count",
  "special_offer", "military_discount_pct", "student_discount_pct", "senior_discount_pct",
  "aaa_discount", "has_climate_controlled_units", "hour_24_access", "elevator",
  "surveillance", "fenced_lighted", "egate_access", "truck_access", "truck_rental",
  "free_truck_rental", "handcarts", "online_move_in", "contactless_move_in",
  "is_open_now", "in_network", "corporation_id", "search_rank", "distance_mi",
  "image_count", "first_image_url", "office_hours", "description", "source_page",
  "scraped_at",
];

const unitColumns = [
  "unit_id", "facility_id", "facility_name", "city", "state", "size", "width_ft",
  "length_ft", "square_footage", "unit_type", "price", "regular_price",
  "discount_amount", "discount_pct", "special", "amenities", "quantity_available",
  "vehicle_accommodation", "reserve_url", "scraped_at",
];

const facilityRows = [];
const unitRows = [];

for (const id of facilityIds) {
  const facility = facilitiesById[str(id)];
  if (!facility) continue;

  const location = facility.location ?? {};
  const amenities = facility.amenities ?? {};
  const units = unitsByFacility.get(str(id)) ?? [];
  const images = Array.isArray(facility.images) ? facility.images : [];
  const hasClimate = units.some((unit) =>
    (unit.availableAmenities ?? []).some((amenity) => /climate/i.test(str(amenity))),
  );

  facilityRows.push({
    facility_id: str(id),
    name: str(facility.name),
    phone: str(facility.facilityPhone),
    facility_type: str(facility.facilityType),
    street_address: str(location.streetAddress1),
    street_address_2: str(location.streetAddress2),
    city: str(location.city),
    state: str(location.state),
    full_state: str(location.fullState),
    zip: str(location.zip),
    latitude: str(location.latitude),
    longitude: str(location.longitude),
    facility_url: absolute(facility.url),
    city_url: absolute(facility.cityUrl),
    state_url: absolute(facility.stateUrl),
    lowest_price: str(facility.lowestPrice),
    units_available: str(units.reduce((sum, unit) => sum + (Number(unit.quantity) || 1), 0)),
    admin_fee: str(facility.adminFee),
    lock_fee: str(facility.lockFee),
    total_fees: str(facility.totalFees),
    rating: str(facility.reviews?.average),
    review_count: str(facility.reviews?.number),
    google_rating: str(facility.googleReviews?.rating),
    google_review_count: str(facility.googleReviews?.userRatingsTotal),
    special_offer: facility.promo === false || facility.promo === "false" ? "" : str(facility.promo),
    military_discount_pct: "",
    student_discount_pct: "",
    senior_discount_pct: "",
    aaa_discount: bool(amenities.aaaActive),
    has_climate_controlled_units: bool(hasClimate),
    hour_24_access: bool(amenities["24HourAccess"]),
    elevator: bool(amenities.elevator),
    surveillance: bool(amenities.surveillance),
    fenced_lighted: bool(amenities.fencedLighted),
    egate_access: bool(amenities.egateAccess),
    truck_access: bool(amenities.truckAccess),
    truck_rental: bool(amenities.truckRental),
    free_truck_rental: bool(amenities.freeTruckRental),
    handcarts: bool(amenities.handcarts),
    online_move_in: bool(facility.hasOnlineMoveins),
    contactless_move_in: bool(facility.hasContactlessMoveIns),
    is_open_now: bool(facility.isOpen),
    in_network: bool(facility.inNetwork),
    corporation_id: str(facility.corporation?.id),
    search_rank: str(facility.searchRank),
    distance_mi: str(facility.distance),
    image_count: str(images.length),
    first_image_url: images[0] ? `${IMAGE_BASE}/${images[0]}` : "",
    office_hours: officeHours(facility.hours),
    description: str(facility.description).replace(/\s+/g, " ").trim(),
    source_page: pageUrl,
    scraped_at: scrapedAt,
  });

  for (const unit of units) {
    const price = Number(unit.price?.meta ?? unit.price?.sparefoot);
    const regular = Number(unit.price?.regular);
    const discount = Number.isFinite(price) && Number.isFinite(regular) ? Math.max(0, regular - price) : "";
    const discountPct = discount !== "" && regular > 0 ? Math.round((discount / regular) * 100) : "";

    unitRows.push({
      unit_id: str(unit.id),
      facility_id: str(id),
      facility_name: str(facility.name),
      city: str(location.city),
      state: str(location.state),
      size: str(unit.size),
      width_ft: str(unit.width),
      length_ft: str(unit.length),
      square_footage: str(unit.squareFootage),
      unit_type: str(unit.unitType),
      price: round2(price),
      regular_price: round2(regular),
      discount_amount: round2(discount),
      discount_pct: str(discountPct),
      special: str(unit.special),
      amenities: (unit.availableAmenities ?? []).map(str).filter(Boolean).join(", "),
      quantity_available: str(unit.quantity ?? 1),
      vehicle_accommodation: str(unit.vehicleAccommodation),
      reserve_url: absolute(unit.url),
      scraped_at: scrapedAt,
    });
  }
}

function toCsv(rows, columns) {
  const escape = (value) => `"${str(value).replace(/"/g, '""')}"`;
  return [columns.join(","), ...rows.map((row) => columns.map((column) => escape(row[column])).join(","))].join("\n");
}

// Combined denormalized schema used by the repo-root fallback CSV
// (sheet_870162583.csv) and lib/climateStorage.ts.
const facilityByUnitKey = new Map(facilityRows.map((row) => [row.facility_id, row]));
const combinedColumns = [...unitColumns, ...facilityColumns.slice(1)];
const combinedRows = unitRows.map((unit) => {
  const facility = facilityByUnitKey.get(unit.facility_id) ?? {};
  return Object.fromEntries([...Object.entries(unit), ...Object.entries(facility).filter(([key]) => key !== "facility_id")]);
});

await fs.mkdir(outDir, { recursive: true });
await fs.writeFile(path.join(outDir, "facilities.csv"), toCsv(facilityRows, facilityColumns), "utf8");
await fs.writeFile(path.join(outDir, "units.csv"), toCsv(unitRows, unitColumns), "utf8");
await fs.writeFile(path.join(outDir, "local-fallback.csv"), toCsv(combinedRows, combinedColumns), "utf8");
console.log(`Wrote ${facilityRows.length} facilities, ${unitRows.length} units, and ${combinedRows.length} fallback rows to ${outDir}`);
