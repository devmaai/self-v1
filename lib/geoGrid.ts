// Pure helpers for the Google Maps geo-grid rank tracker (no I/O).

export const GRID_SIZE = 5; // fixed 5 x 5 = 25 points
export const MILES_PER_DEGREE_LAT = 69;

export type GridPoint = {
  row: number; // 0 = north
  col: number; // 0 = west
  lat: number;
  lng: number;
};

export type ScoredPoint = GridPoint & {
  rank: number | null; // null = business not found
  top?: string[]; // names of the top results at this point (up to 3)
};

export type GridStats = {
  totalPoints: number;
  foundPoints: number;
  top3Pct: number;
  top10Pct: number;
  avgRank: number | null;
};

const round6 = (n: number) => Math.round(n * 1e6) / 1e6;

/**
 * Builds a 5 x 5 grid centred on (lat, lng). `radiusMiles` is the distance
 * from the centre to the outer edge, so points are radius / 2 miles apart.
 */
export function generateGrid(lat: number, lng: number, radiusMiles: number): GridPoint[] {
  const half = (GRID_SIZE - 1) / 2;
  const stepMiles = radiusMiles / half;
  const dLat = stepMiles / MILES_PER_DEGREE_LAT;
  const dLng = stepMiles / (MILES_PER_DEGREE_LAT * Math.cos((lat * Math.PI) / 180));

  const points: GridPoint[] = [];
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      points.push({
        row,
        col,
        lat: round6(lat + (half - row) * dLat),
        lng: round6(lng + (col - half) * dLng),
      });
    }
  }
  return points;
}

/** Google Maps zoom level to send to DataForSEO, based on grid spacing. */
export function zoomForRadius(radiusMiles: number): number {
  const spacing = radiusMiles / ((GRID_SIZE - 1) / 2);
  if (spacing <= 1) return 15;
  if (spacing <= 3) return 14;
  if (spacing <= 8) return 13;
  return 12;
}

export function normalizeName(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** True when a listing title and the searched business name refer to the same business. */
export function namesMatch(title: string, business: string): boolean {
  const a = normalizeName(title);
  const b = normalizeName(business);
  if (a.length < 3 || b.length < 3) return false;
  return a === b || a.includes(b) || b.includes(a);
}

export function computeStats(points: ScoredPoint[]): GridStats {
  const total = points.length;
  const ranked = points.filter((p): p is ScoredPoint & { rank: number } => p.rank !== null);
  const pct = (n: number) => (total ? Math.round((n / total) * 1000) / 10 : 0);
  return {
    totalPoints: total,
    foundPoints: ranked.length,
    top3Pct: pct(ranked.filter((p) => p.rank <= 3).length),
    top10Pct: pct(ranked.filter((p) => p.rank <= 10).length),
    avgRank: ranked.length
      ? Math.round((ranked.reduce((sum, p) => sum + p.rank, 0) / ranked.length) * 10) / 10
      : null,
  };
}

export type RankBand = "green" | "yellow" | "red" | "grey";

export function rankBand(rank: number | null): RankBand {
  if (rank === null) return "grey";
  if (rank <= 3) return "green";
  if (rank <= 10) return "yellow";
  return "red";
}

const COMPASS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

/** Human-readable position of a grid point, e.g. "3.5 mi NE of your location". */
export function describeOffset(row: number, col: number, radiusMiles: number): string {
  const half = (GRID_SIZE - 1) / 2;
  const step = radiusMiles / half;
  const dx = (col - half) * step;
  const dy = (half - row) * step; // north is positive
  if (dx === 0 && dy === 0) return "Your location";
  const miles = Math.hypot(dx, dy);
  const bearing = ((Math.atan2(dx, dy) * 180) / Math.PI + 360) % 360;
  const dir = COMPASS[Math.round(bearing / 45) % 8];
  return `${miles.toFixed(1)} mi ${dir} of your location`;
}
