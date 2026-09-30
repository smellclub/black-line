"use client";

import { useEffect, useState } from "react";

/**
 * Botón fijo "Reservar turno" abajo de la pantalla, solo en celular.
 * Se oculta mientras la sección #reservar está a la vista (ya no hace falta).
 */
export function MobileBookingBar() {
  const [bookingVisible, setBookingVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("reservar");
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => setBookingVisible(entry.isIntersecting), {
      threshold: 0.1,
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/90 p-3 backdrop-blur transition-transform duration-300 md:hidden ${
        bookingVisible ? "translate-y-full" : "translate-y-0"
      }`}
      // Cuando está escondido, que el lector de pantalla y el teclado lo ignoren.
      inert={bookingVisible}
    >
      <a
        href="#reservar"
        className="flex min-h-12 w-full items-center justify-center bg-accent text-sm font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-accent-hover"
      >
        Reservar turno
      </a>
    </div>
  );
}
