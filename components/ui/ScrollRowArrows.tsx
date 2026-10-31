"use client";

export default function ScrollRowArrows({ targetId }: { targetId: string }) {
  const scroll = (dir: number) => {
    const el = document.getElementById(targetId);
    if (el) el.scrollBy({ left: dir * Math.max(300, el.clientWidth * 0.8), behavior: "smooth" });
  };
  return (
    <div className="scroll-row-arrows">
      <button type="button" aria-label="Previous sizes" onClick={() => scroll(-1)}>←</button>
      <span>More sizes</span>
      <button type="button" aria-label="Next sizes" onClick={() => scroll(1)}>→</button>
    </div>
  );
}
