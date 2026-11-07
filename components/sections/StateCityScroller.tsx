"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { CITY_IMAGES } from "@/lib/cityImages";

type City = { name: string; slug: string; href: string };

/** Photo cards with arrows, matching the homepage Featured cities row. */
export default function StateCityScroller({ cities }: { cities: City[] }) {
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
          const photo = CITY_IMAGES[city.slug];
          return (
            <Link className="city-photo-card" href={city.href} key={city.slug} role="listitem">
              {photo ? <Image src={`${photo}?auto=format&fit=crop&w=640&q=70`} alt="" fill sizes="(max-width: 700px) 75vw, 300px" quality={90} unoptimized /> : null}
              <span className="city-photo-name">{city.name}<small>Storage units →</small></span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
