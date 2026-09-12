"use client";

import { Children, useEffect, useRef, useState } from "react";

export default function CardSlider({
  children,
  trackClassName,
}: {
  children: React.ReactNode;
  trackClassName: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = Children.count(children);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const items = Array.from(track.children) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            const index = items.indexOf(entry.target as HTMLElement);
            if (index !== -1) setActive(index);
          }
        });
      },
      { root: track, threshold: [0.6] }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [count]);

  function goTo(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const item = track.children[index] as HTMLElement | undefined;
    item?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  }

  return (
    <div className="card-slider">
      <div className={trackClassName} ref={trackRef}>
        {children}
      </div>
      <div className="card-slider-dots" role="tablist" aria-label="Slides">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-label={`Go to slide ${index + 1}`}
            aria-selected={index === active}
            className={index === active ? "is-active" : ""}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
