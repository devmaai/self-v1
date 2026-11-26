"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Renter-side routes where the size calculator is most useful.
const SHOW_ON = [
  "/",
  "/storage-search",
  "/car-storage",
  "/rv-storage",
  "/boat-storage",
  "/business-storage",
  "/student-storage",
  "/climate-controlled-storage",
  "/storage-size-guide",
  "/storage-state-usa",
  "/find-storage",
];

const DISMISS_KEY = "calc-fab-dismissed";

/** Floating shortcut to the size calculator. Appears after the visitor scrolls, can be dismissed. */
export default function CalculatorFab() {
  const pathname = usePathname() || "/";
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  const eligible = pathname !== "/storage-unit-size-calculator" && SHOW_ON.some((p) => (p === "/" ? pathname === "/" : pathname === p || pathname.startsWith(p + "/")));

  useEffect(() => {
    try { setDismissed(sessionStorage.getItem(DISMISS_KEY) === "1"); } catch { setDismissed(false); }
  }, []);

  useEffect(() => {
    if (!eligible) return;
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [eligible]);

  if (!eligible || dismissed) return null;

  return (
    <div className={`calc-fab${visible ? " calc-fab-show" : ""}`}>
      <Link href="/storage-unit-size-calculator" className="calc-fab-link" tabIndex={visible ? 0 : -1}>
        <span className="calc-fab-icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M8.5 7.5h7M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h.01" /></svg>
        </span>
        <span className="calc-fab-text">
          <strong>Not sure what size?</strong>
          <span>Try the free size calculator</span>
        </span>
      </Link>
      <button
        type="button"
        className="calc-fab-close"
        aria-label="Dismiss size calculator shortcut"
        tabIndex={visible ? 0 : -1}
        onClick={() => { setDismissed(true); try { sessionStorage.setItem(DISMISS_KEY, "1"); } catch {} }}
      >
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
      </button>
    </div>
  );
}
