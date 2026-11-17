"use client";

import { useEffect, useRef } from "react";
import { describeOffset, namesMatch, rankBand, type ScoredPoint } from "@/lib/geoGrid";

type Props = {
  center: { lat: number; lng: number };
  radius: number;
  points: ScoredPoint[];
  business: string;
};

export default function GeoGridMap({ center, radius, points, business }: Props) {
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

      const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
      const latLngs = points.map((p) => [p.lat, p.lng] as [number, number]);
      const bounds = L.latLngBounds(latLngs);

      // Faint outline of the scanned area.
      L.rectangle(bounds, { color: "#0284C7", weight: 1.5, dashArray: "6 6", fill: false, interactive: false }).addTo(map);

      points.forEach((p) => {
        const band = rankBand(p.rank);
        const isCenter = p.row === 2 && p.col === 2;
        const label = p.rank ? `Rank ${p.rank}` : "Not found";
        const marker = L.marker([p.lat, p.lng], {
          icon: L.divIcon({
            className: "gg-pin-wrap",
            html: `<span class="gg-pin gg-pin-${band}${isCenter ? " gg-pin-center" : ""}">${p.rank ?? "–"}</span>`,
            iconSize: [36, 36],
            iconAnchor: [18, 18],
          }),
          title: `${label} (row ${p.row + 1}, column ${p.col + 1})`,
          keyboard: true,
        }).addTo(map!);

        const top = (p.top ?? [])
          .map((name, i) => {
            const you = namesMatch(name, business);
            return `<li${you ? ' class="gg-popup-you"' : ""}><i>${i + 1}</i>${esc(name)}</li>`;
          })
          .join("");
        marker.bindPopup(
          `<div class="gg-popup">` +
            `<span class="gg-popup-rank gg-popup-${band}">${p.rank ? `#${p.rank}` : "Not found"}</span>` +
            `<strong>${esc(business)}</strong>` +
            `<span>${p.rank ? "Your Google Maps position here" : "Not in the top 20 here"}</span>` +
            `<small>${describeOffset(p.row, p.col, radius)}</small>` +
            (top ? `<div class="gg-popup-top"><em>Top results here</em><ol>${top}</ol></div>` : "") +
          `</div>`,
          { closeButton: false, offset: [0, -12], minWidth: 210 },
        );
      });

      map.fitBounds(bounds, { padding: [36, 36] });
    }

    init();
    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [center, radius, points, business]);

  return <div ref={containerRef} className="gg-map" role="region" aria-label={`Ranking map for ${business}`} />;
}
