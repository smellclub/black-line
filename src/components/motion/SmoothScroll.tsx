"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

/**
 * Scroll suave con Lenis (el "deslizamiento" que tienen las webs premiadas).
 * Lo conectamos al reloj de GSAP para que las animaciones de scroll vayan sincronizadas.
 * Con "reducir movimiento" activado no hacemos nada: queda el scroll normal del navegador.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Los links internos (#socio, #horario…) bajan suave y frenan justo debajo de la barra de arriba.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      const id = a?.getAttribute("href")?.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      // Esperamos un cuadro: si el link estaba en el menú del celular, primero se cierra el menú.
      requestAnimationFrame(() => {
        const header = document.querySelector("header")?.offsetHeight ?? 0;
        const y = id === "inicio" ? 0 : target.getBoundingClientRect().top + window.scrollY - header;
        lenis.scrollTo(y, { duration: 1.1 });
      });
      history.replaceState(null, "", `#${id}`);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
