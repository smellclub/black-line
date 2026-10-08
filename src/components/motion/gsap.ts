"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Registramos los plugins una sola vez para toda la web.
gsap.registerPlugin(ScrollTrigger, useGSAP);

/** true si la persona pidió "reducir movimiento" en su sistema (accesibilidad). */
export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, ScrollTrigger, useGSAP };
