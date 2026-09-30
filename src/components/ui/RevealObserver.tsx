"use client";

import { useEffect } from "react";

/**
 * Hace aparecer suave los elementos con `data-reveal` cuando entran en pantalla.
 * Un solo observer para toda la página (más liviano que uno por elemento).
 * El CSS de globals.css se encarga de respetar prefers-reduced-motion.
 */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
