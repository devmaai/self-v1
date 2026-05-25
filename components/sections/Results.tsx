"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import RevealSection from "@/components/ui/RevealSection";

export interface ResultsProps {
  label?: string;
  headline?: React.ReactNode;
  intro?: string;
}

const SLIDES = [
  {
    src: "/images/google-reviews.png",
    alt: "Google Reviews — Average Rating 4.7/5 with 205 reviews",
    caption: "Google reviews · 4.7/5",
  },
  {
    src: "/images/visibility-metrics.png",
    alt: "Search and Maps impressions trending up across 12 months",
    caption: "Search & Maps impressions · 12-month window",
  },
  {
    src: "/images/technical landing page img 1.png",
    alt: "Map pack ranking dashboard moving to #1",
    caption: "Map pack ranking trend",
  },
];

const RATING = { score: 4.7, max: 5, count: 205 };
const AUTOPLAY_MS = 5500;

function Star({ filled }: { filled: number; }) {
  const id = `star-grad-${Math.round(filled * 100)}`;
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop offset={`${filled * 100}%`} stopColor="#d4a24c" />
          <stop offset={`${filled * 100}%`} stopColor="#d8cdb6" />
        </linearGradient>
      </defs>
      <path
        d="M12 2 L14.9 8.6 L22 9.3 L16.5 14 L18.2 21 L12 17.3 L5.8 21 L7.5 14 L2 9.3 L9.1 8.6 Z"
        fill={`url(#${id})`}
        stroke="#8a7a55"
        strokeWidth="0.5"
      />
    </svg>
  );
}

function RatingBadge() {
  const stars = Array.from({ length: RATING.max }, (_, i) => {
    const fill = Math.max(0, Math.min(1, RATING.score - i));
    return <Star key={i} filled={fill} />;
  });
  return (
    <div className="rating-badge" aria-label={`Rated ${RATING.score} out of ${RATING.max} from ${RATING.count} reviews`}>
      <div className="rating-score">
        <span className="rating-num">{RATING.score.toFixed(1)}</span>
        <span className="rating-max">/ {RATING.max}</span>
      </div>
      <div className="rating-stars">{stars}</div>
      <div className="rating-count">
        Based on <strong>{RATING.count}</strong> reviews
      </div>
    </div>
  );
}

function ReviewsSlider() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [drag, setDrag] = useState<{ startX: number; dx: number } | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (next: number) => setIdx((next + SLIDES.length) % SLIDES.length),
    []
  );

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(idx + 1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [idx, paused, go]);

  // Keyboard nav when the slider is focused
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(idx - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(idx + 1);
      }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [idx, go]);

  // Drag / swipe
  const onPointerDown = (e: React.PointerEvent) => {
    setPaused(true);
    setDrag({ startX: e.clientX, dx: 0 });
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag) return;
    setDrag({ startX: drag.startX, dx: e.clientX - drag.startX });
  };
  const onPointerUp = () => {
    if (!drag) return;
    const threshold = 60;
    if (drag.dx > threshold) go(idx - 1);
    else if (drag.dx < -threshold) go(idx + 1);
    setDrag(null);
    setPaused(false);
  };

  const trackStyle = {
    transform: drag
      ? `translate3d(calc(-${idx * 100}% + ${drag.dx}px), 0, 0)`
      : `translate3d(-${idx * 100}%, 0, 0)`,
    transition: drag ? "none" : "transform 0.8s cubic-bezier(.22, 1, .36, 1)",
  };

  return (
    <div
      ref={rootRef}
      className="reviews-slider"
      tabIndex={0}
      role="region"
      aria-label="Outcomes carousel"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="slider-viewport"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="slider-track" style={trackStyle}>
          {SLIDES.map((s, i) => (
            <div
              className={`slider-slide${i === idx ? " is-active" : ""}`}
              key={s.src}
              aria-hidden={i !== idx}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${SLIDES.length}`}
            >
              <Image
                src={s.src}
                alt={s.alt}
                width={1200}
                height={700}
                quality={90}
                priority={i === 0}
                draggable={false}
              />
              <div className="slider-caption">
                <span className="slider-caption-index">
                  {String(i + 1).padStart(2, "0")} <span aria-hidden="true">/</span> {String(SLIDES.length).padStart(2, "0")}
                </span>
                <span className="slider-caption-text">{s.caption}</span>
              </div>
            </div>
          ))}
        </div>

        <RatingBadge />

        <button
          type="button"
          className="slider-arrow prev"
          aria-label="Previous slide"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            go(idx - 1);
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M15 18 L9 12 L15 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          className="slider-arrow next"
          aria-label="Next slide"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            go(idx + 1);
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M9 6 L15 12 L9 18" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="slider-controls">
        <div className="slider-dots" role="tablist">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`slider-dot${i === idx ? " active" : ""}`}
              aria-label={`Go to slide ${i + 1}`}
              aria-selected={i === idx}
              role="tab"
              onClick={() => go(i)}
            >
              <span className="slider-dot-fill" style={i === idx && !paused ? { animationDuration: `${AUTOPLAY_MS}ms` } : {}} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Results({
  label = "Outcomes",
  headline = (
    <>
      Proof, not <em>promises</em>.
    </>
  ),
  intro = "These are real results from independent operators we have worked with. Full case studies available on request under NDA.",
}: ResultsProps) {
  return (
    <RevealSection className="results" id="results">
      <div className="container">
        <div className="section-label">{label}</div>
        <h2 className="section-title">{headline}</h2>
        <p className="section-intro">{intro}</p>

        <ReviewsSlider />
      </div>
    </RevealSection>
  );
}
