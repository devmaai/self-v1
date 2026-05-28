"use client";
import { useEffect } from "react";

export default function V2Interactions() {
  useEffect(() => {
    const root = document.querySelector(".v2-home");
    if (!root) return;

    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const q = target.closest(".faq-q");
      if (!q) return;
      const item = q.parentElement;
      if (!item) return;
      const wasOpen = item.classList.contains("open");
      root.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("open"));
      if (!wasOpen) item.classList.add("open");
    };
    root.addEventListener("click", handleClick);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("in"), i * 70);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    root.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => {
      root.removeEventListener("click", handleClick);
      observer.disconnect();
    };
  }, []);

  return null;
}
