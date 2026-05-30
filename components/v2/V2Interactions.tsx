"use client";
import { useEffect } from "react";

export default function V2Interactions() {
  useEffect(() => {
    const root = document.querySelector(".v2-home");
    if (!root) return;

    const burger = root.querySelector<HTMLButtonElement>("[data-mobile-toggle]");
    const panel = root.querySelector<HTMLElement>("[data-mobile-panel]");
    const closeMenu = () => {
      root.classList.remove("mobile-menu-open");
      burger?.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };
    const openMenu = () => {
      root.classList.add("mobile-menu-open");
      burger?.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    };

    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement;

      if (target.closest("[data-mobile-toggle]")) {
        e.preventDefault();
        if (root.classList.contains("mobile-menu-open")) closeMenu();
        else openMenu();
        return;
      }
      if (target.closest("[data-mobile-close]")) {
        closeMenu();
      }

      const q = target.closest(".faq-q");
      if (!q) return;
      const item = q.parentElement;
      if (!item) return;
      const wasOpen = item.classList.contains("open");
      root.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("open"));
      if (!wasOpen) item.classList.add("open");
    };
    root.addEventListener("click", handleClick);

    const handleResize = () => {
      if (window.innerWidth >= 1024) closeMenu();
    };
    window.addEventListener("resize", handleResize);

    void panel;

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
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "";
      observer.disconnect();
    };
  }, []);

  return null;
}
