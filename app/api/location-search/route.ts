import { NextResponse } from "next/server";
import {
  getNearestZipSuggestion,
  getZipAvailability,
  searchLocationSuggestions,
} from "@/lib/storageLocationIndex";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;

  const latitudeParam = searchParams.get("lat");
  const longitudeParam = searchParams.get("lng") ?? searchParams.get("lon");
  const latitude = latitudeParam === null ? Number.NaN : Number(latitudeParam);
  const longitude = longitudeParam === null ? Number.NaN : Number(longitudeParam);
  if (
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    Math.abs(latitude) <= 90 &&
    Math.abs(longitude) <= 180
  ) {
    const suggestion = await getNearestZipSuggestion(latitude, longitude);
    return NextResponse.json({ suggestions: suggestion ? [suggestion] : [] });
  }

  const query = searchParams.get("q")?.trim() ?? "";
  if (searchParams.get("exact") === "true") {
    return NextResponse.json(await getZipAvailability(query));
  }

  if (query.length < 2) return NextResponse.json({ suggestions: [] });
  return NextResponse.json({ suggestions: await searchLocationSuggestions(query) });
}
