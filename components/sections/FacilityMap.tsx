"use client";

import { useEffect, useRef } from "react";

type MappedFacility = {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

export default function FacilityMap({ city, facilities }: { city: string; facilities: MappedFacility[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let map: import("leaflet").Map | undefined;

    async function initialiseMap() {
      const L = (await import("leaflet")).default;
      const container = containerRef.current;
      if (cancelled || !container) return;

      const mappedFacilities = facilities.filter((facility) => (
        Number.isFinite(facility.latitude) && Number.isFinite(facility.longitude)
      ));
      if (!mappedFacilities.length) return;

      map = L.map(container, { scrollWheelZoom: false, zoomControl: true });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      const bounds = L.latLngBounds(mappedFacilities.map((facility) => [facility.latitude, facility.longitude] as [number, number]));
      if (mappedFacilities.length === 1) {
        map.setView(bounds.getCenter(), 13);
      } else {
        map.fitBounds(bounds, { padding: [34, 34], maxZoom: 13 });
      }

      mappedFacilities.forEach((facility, index) => {
        const marker = L.marker([facility.latitude, facility.longitude], {
          icon: L.divIcon({
            className: "facility-map-marker",
            html: `<span><i>${index + 1}</i></span>`,
            iconSize: [30, 30],
            iconAnchor: [15, 30],
          }),
          title: `${index + 1}. ${facility.name}`,
        }).addTo(map!);

        marker.bindTooltip(`${index + 1}. ${facility.name}<br>${facility.address}`, {
          direction: "top",
          offset: [0, -28],
          opacity: 0.95,
        });
      });
    }

    initialiseMap();
    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [facilities]);

  return <div ref={containerRef} className="city-storage-map-canvas" aria-label={`Map of the listed storage facilities in ${city}`} />;
}
