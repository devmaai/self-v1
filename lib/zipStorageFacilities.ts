import type { CityStorageFacility } from "@/components/sections/CityStorageResults";
import { getStorageRows, priceNumber, type SheetRow } from "@/lib/liveStorageData";
import { normalizeZip } from "@/lib/zipCodes";

function unitFeatures(size: string, amenities: string, vehicle: string): string[] {
  const list = amenities.toLowerCase();
  const features: string[] = [];
  if (list.includes("climate controlled") || list.includes("heated") || list.includes("air cooled")) features.push("climate");
  if (list.includes("drive up") || list.includes("outdoor access")) features.push("drive-up");
  if (list.includes("interior")) features.push("indoor");
  if (list.includes("1st floor") || list.includes("drive up")) features.push("ground-floor");
  const dimensions = (size.match(/\d+(\.\d+)?/g) ?? []).map(Number);
  if (vehicle || list.includes("vehicle") || list.includes("pull-through") || (dimensions[0] >= 10 && dimensions[1] >= 20)) features.push("vehicle");
  return features;
}

/**
 * Groups flat sheet rows into one card-ready facility per facility_id. Distance
 * and "nearby" are left at their zero defaults so callers can set them against
 * whichever search centre they are using.
 */
export function buildCityStorageFacilities(rows: SheetRow[]): CityStorageFacility[] {
  const grouped = new Map<string, CityStorageFacility>();

  for (const row of rows) {
    const latitude = Number(row.latitude);
    const longitude = Number(row.longitude);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) continue;

    let facility = grouped.get(row.facility_id);
    if (!facility) {
      facility = {
        name: row.facility_name,
        address: [row.street_address, row.city, row.state, row.zip].filter(Boolean).join(", "),
        units: [],
        href: row.facility_url || "#",
        city: row.city,
        state: row.state,
        distanceMiles: 0,
        isNearby: false,
        latitude,
        longitude,
      };
      grouped.set(row.facility_id, facility);
    }

    facility.units.push({
      size: row.size,
      price: `$${row.price}`,
      regularPrice: row.regular_price ? `$${row.regular_price}` : "",
      quantity: row.quantity_available,
      features: unitFeatures(row.size, row.amenities ?? "", row.vehicle_accommodation ?? ""),
    });
  }

  return [...grouped.values()]
    .map((facility) => ({
      ...facility,
      units: [...facility.units].sort((first, second) => priceNumber(first.price) - priceNumber(second.price)),
    }))
    .sort((first, second) => first.name.localeCompare(second.name));
}

export async function getZipStorageFacilities(zip: string): Promise<CityStorageFacility[]> {
  const normalized = normalizeZip(zip);
  if (!normalized) return [];
  const rows = (await getStorageRows()).filter((row) => normalizeZip(row.zip) === normalized);
  return buildCityStorageFacilities(rows);
}
