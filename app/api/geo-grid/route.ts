import { NextResponse } from "next/server";
import {
  computeStats,
  generateGrid,
  namesMatch,
  zoomForRadius,
  type GridPoint,
  type ScoredPoint,
} from "@/lib/geoGrid";

export const runtime = "nodejs";
export const maxDuration = 60;

const SCANS_PER_HOUR = 5; // per IP, best effort (in-memory per server instance)
const HOUR_MS = 60 * 60 * 1000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < HOUR_MS);
  if (recent.length >= SCANS_PER_HOUR) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= HOUR_MS)) hits.delete(k);
  }
  return false;
}

async function verifyCaptcha(token: string, ip: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // dev mode, same as /api/audit
  if (!token) return false;
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.append("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

async function geocode(address: string): Promise<{ lat: number; lng: number } | null> {
  const googleKey = process.env.GOOGLE_GEOCODING_API_KEY;
  if (googleKey) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${googleKey}`;
    const res = await fetch(url, { cache: "no-store" });
    const data = (await res.json()) as {
      status?: string;
      results?: { geometry: { location: { lat: number; lng: number } } }[];
    };
    const loc = data.results?.[0]?.geometry.location;
    return data.status === "OK" && loc ? { lat: loc.lat, lng: loc.lng } : null;
  }

  // Default: OpenStreetMap Nominatim (no key). Usage policy requires an identifying User-Agent.
  const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(address)}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "SelfStorageHelp-GeoGrid/1.0 (selfstorage.help)", Accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("geocoder_unavailable");
  const data = (await res.json()) as { lat: string; lon: string }[];
  if (!data.length) return null;
  const lat = parseFloat(data[0].lat);
  const lng = parseFloat(data[0].lon);
  return Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null;
}

// Demo mode (local development only): fake but plausible rankings, no paid API calls.
const DEMO = process.env.GEOGRID_DEMO === "true" && process.env.NODE_ENV !== "production";

function demoRanks(grid: GridPoint[], seedText: string): (number | null)[] {
  let h = 2166136261;
  for (const c of seedText) h = Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0;
  const rand = () => ((h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0) / 4294967296);

  // Per-business traits, so each name gets its own recognisable pattern.
  const strength = rand(); // 0 weak profile .. 1 strong profile
  const base = 1 + (1 - strength) * 3.5; // rank at the facility itself
  const slope = 1.2 + (1 - strength) * 2.6; // how fast rank worsens per grid step
  const angle = rand() * Math.PI * 2; // direction where competitors are densest
  const tilt = 1 + rand() * 2.5; // how much worse that side is
  const phaseX = rand() * 6.28;
  const phaseY = rand() * 6.28;

  return grid.map((p) => {
    const dx = p.col - 2;
    const dy = 2 - p.row; // north is positive
    const dist = Math.hypot(dx, dy);
    const side = (dx * Math.cos(angle) + dy * Math.sin(angle)) / 2; // -1 .. 1
    const wave = Math.sin(dx * 0.9 + phaseX) * 1.0 + Math.cos(dy * 0.9 + phaseY) * 1.0; // smooth, neighbours stay similar
    const noise = (rand() - 0.5) * 2; // small per-point jitter
    const rank = Math.round(base + slope * dist + tilt * side * dist + wave + noise);
    if (rank > 20) return null; // outside the top 20 means not found
    return Math.max(1, rank);
  });
}

const DEMO_COMPETITORS = [
  "SecureSpace Storage", "Lakeview Self Storage", "Main Street Storage", "Cornerstone Storage Center",
  "Oak Ridge Mini Storage", "Pioneer Storage", "Summit Storage Solutions", "Harbor Point Storage",
  "Eagle Self Storage", "Greenway Storage Units", "Crossroads Storage", "Heritage Storage Co.",
];

function demoTop(ranks: (number | null)[], business: string, seedText: string): string[][] {
  let h = 2166136261;
  for (const c of seedText + "|top") h = Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0;
  const rand = () => ((h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0) / 4294967296);
  return ranks.map((rank) => {
    const pool = [...DEMO_COMPETITORS];
    const list: string[] = [];
    while (list.length < 3) list.push(pool.splice(Math.floor(rand() * pool.length), 1)[0]);
    if (rank !== null && rank <= 3) list.splice(rank - 1, 0, business);
    return list.slice(0, 3);
  });
}

type MapsItem = { type?: string; title?: string; rank_group?: number };

async function rankAtPoint(
  point: GridPoint,
  keyword: string,
  business: string,
  zoom: number,
  auth: string,
): Promise<{ rank: number | null; top: string[] }> {
  const res = await fetch("https://api.dataforseo.com/v3/serp/google/maps/live/advanced", {
    method: "POST",
    headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
    body: JSON.stringify([
      {
        keyword,
        location_coordinate: `${point.lat},${point.lng},${zoom}z`,
        language_code: "en",
        device: "mobile",
        depth: 20,
      },
    ]),
    cache: "no-store",
  });
  if (res.status === 401) throw new Error("dataforseo_auth");
  if (!res.ok) throw new Error(`dataforseo_http_${res.status}`);
  const json = (await res.json()) as {
    status_code?: number;
    tasks?: { status_code?: number; status_message?: string; result?: { items?: MapsItem[] }[] }[];
  };
  const task = json.tasks?.[0];
  if (json.status_code !== 20000 || !task || task.status_code !== 20000) {
    const code = task?.status_code ?? json.status_code;
    throw new Error(code === 40100 ? "dataforseo_auth" : code === 40200 ? "dataforseo_funds" : `dataforseo_${code}`);
  }
  const items = task.result?.[0]?.items ?? [];
  const listings = items.filter((i) => i.type === "maps_search" && i.title);
  const hit = listings.find((i) => namesMatch(i.title as string, business));
  return {
    rank: hit?.rank_group ?? null,
    top: listings.slice(0, 3).map((i) => i.title as string),
  };
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 });
  }

  // Honeypot
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const business = str(body.business);
  const address = str(body.address);
  const keyword = str(body.keyword);
  const radius = 5; // fixed 5-mile radius for the MVP (client value is ignored)

  const fields: Record<string, string> = {};
  if (business.length < 2 || business.length > 100) fields.business = "Enter your business name.";
  if (address.length < 5 || address.length > 200) fields.address = "Enter a full address or city and state.";
  if (keyword.length < 2 || keyword.length > 100) fields.keyword = "Enter a search keyword.";
  if (!Number.isFinite(radius) || radius < 1 || radius > 25) fields.radius = "Radius must be between 1 and 25 miles.";
  if (Object.keys(fields).length) {
    return NextResponse.json({ ok: false, error: "validation", fields }, { status: 400 });
  }

  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;
  if (!DEMO && (!login || !password)) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || null;
  if (!(await verifyCaptcha(str(body.captchaToken), ip))) {
    return NextResponse.json({ ok: false, error: "captcha" }, { status: 400 });
  }
  if (rateLimited(ip ?? "unknown")) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let center: { lat: number; lng: number } | null;
  try {
    center = await geocode(address);
  } catch {
    return NextResponse.json({ ok: false, error: "geocode_failed" }, { status: 502 });
  }
  if (!center) {
    return NextResponse.json({ ok: false, error: "address_not_found" }, { status: 422 });
  }

  const grid = generateGrid(center.lat, center.lng, radius);
  const zoom = zoomForRadius(radius);

  if (DEMO) {
    const ranks = demoRanks(grid, `${business}|${keyword}`);
    const tops = demoTop(ranks, business, `${business}|${keyword}`);
    const demoPoints: ScoredPoint[] = grid.map((p, i) => ({ ...p, rank: ranks[i], top: tops[i] }));
    return NextResponse.json({
      ok: true, demo: true, center, radius, failedPoints: 0,
      points: demoPoints, stats: computeStats(demoPoints),
    });
  }

  const auth = Buffer.from(`${login}:${password}`).toString("base64");

  const settled = await Promise.allSettled(grid.map((p) => rankAtPoint(p, keyword, business, zoom, auth)));
  const failed = settled.filter((s) => s.status === "rejected").length;
  if (failed === grid.length) {
    const reason = (settled.find((s) => s.status === "rejected") as PromiseRejectedResult).reason;
    const msg = reason instanceof Error ? reason.message : String(reason);
    console.error("[geo-grid] all ranking calls failed:", msg);
    const error = msg === "dataforseo_auth" ? "service_auth" : msg === "dataforseo_funds" ? "service_funds" : "ranking_failed";
    return NextResponse.json({ ok: false, error }, { status: 502 });
  }

  // A failed point is reported as null (not found); the client is told how many failed.
  const points: ScoredPoint[] = grid.map((p, i) => {
    const s = settled[i];
    return s.status === "fulfilled" ? { ...p, rank: s.value.rank, top: s.value.top } : { ...p, rank: null, top: [] };
  });

  return NextResponse.json({
    ok: true,
    center,
    radius,
    failedPoints: failed,
    points,
    stats: computeStats(points),
  });
}
