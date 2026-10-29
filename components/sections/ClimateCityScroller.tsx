"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ClimateCity } from "@/lib/climateStorage";

export default function ClimateCityScroller({ cities, images }: { cities: ClimateCity[]; images: Record<string, string> }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const scrollCities = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const target = el.scrollLeft + direction * Math.max(el.clientWidth * 0.8, 280);
    el.scrollTo({ left: target, behavior: "smooth" });
    const start = el.scrollLeft;
    window.setTimeout(() => { if (Math.abs(el.scrollLeft - start) < 2) el.scrollLeft = target; }, 350);
  };

  return (
    <div className="city-scroller-wrap">
      <button type="button" className="city-scroll-arrow city-scroll-prev" onClick={() => scrollCities(-1)} aria-label="Previous cities">←</button>
      <button type="button" className="city-scroll-arrow city-scroll-next" onClick={() => scrollCities(1)} aria-label="More cities">→</button>
      <div className="city-scroller" role="list" ref={scrollerRef}>
        {cities.map((city) => {
          const photo = images[city.slug];
          return (
            <Link className="city-photo-card climate-city-photo-card" href={city.href} key={city.slug} role="listitem">
              {photo ? <Image src={`${photo}?auto=format&fit=crop&w=640&q=70`} alt="" fill sizes="(max-width: 700px) 75vw, 300px" quality={90} unoptimized /> : null}
              <span className="city-photo-name">
                {city.city}, {city.state}
                <small>
                  {city.facilityCount} {city.facilityCount === 1 ? "facility" : "facilities"}
                  {city.fromPrice !== null ? ` · From $${city.fromPrice}/mo` : ""} →
                </small>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
