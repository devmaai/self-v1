"use client";

import { useEffect, useRef } from "react";
import { rankBand, type ScoredPoint } from "@/lib/geoGrid";

type Props = {
  center: { lat: number; lng: number };
  points: ScoredPoint[];
  business: string;
};

export default function GeoGridMap({ center, points, business }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let map: import("leaflet").Map | undefined;

    async function init() {
      const L = (await import("leaflet")).default;
      const container = containerRef.current;
      if (cancelled || !container) return;

      map = L.map(container, { scrollWheelZoom: false });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      const esc = (s: string) => s.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);

      points.forEach((p) => {
        const band = rankBand(p.rank);
        const marker = L.marker([p.lat, p.lng], {
          icon: L.divIcon({
            className: "",
            html: `<span class="geogrid-pin geogrid-pin-${band}">${p.rank ?? "–"}</span>`,
            iconSize: [34, 34],
            iconAnchor: [17, 17],
          }),
          title: p.rank ? `Rank ${p.rank}` : "Not found",
        }).addTo(map!);

        marker.bindPopup(
          `<strong>${p.rank ? `Rank #${p.rank}` : "Not found in top 20"}</strong><br>` +
            `${esc(business)}<br>` +
            `<small>${p.lat.toFixed(5)}, ${p.lng.toFixed(5)}</small>`,
        );
      });

      map.fitBounds(L.latLngBounds(points.map((p) => [p.lat, p.lng] as [number, number])), { padding: [40, 40] });
    }

    init();
    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [center, points, business]);

  return <div ref={containerRef} className="geogrid-map" aria-label={`Ranking map for ${business}`} />;
}
