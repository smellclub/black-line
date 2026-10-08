"use client";

import { business } from "@/config/business";
import { formatDuration, formatPrice } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";

/** Avisa al formulario de reserva qué servicio se eligió desde la pizarra. */
export function pickService(id: string) {
  window.dispatchEvent(new CustomEvent("booking:service", { detail: id }));
}

/**
 * La pizarra de precios: la de letras blancas encastradas que hay en todas las barberías.
 * Tocar un servicio te lleva a reservar con ese servicio ya elegido.
 */
export function Prices() {
  return (
    <section id="precios" aria-labelledby="precios-title" className="bg-bone-deep">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="precios-title" className="display text-[clamp(3.5rem,13vw,8rem)]">
            La pizarra
          </h2>
          <p className="max-w-xs font-serif text-2xl italic leading-tight">Precios en pesos. Pagás en el local.</p>
        </div>

        <div className="letterboard mt-10 -rotate-1 rounded-lg p-3 shadow-[0_30px_60px_-30px_rgb(20_19_18/0.8)] ring-8 ring-[#3a2a1c] md:p-6">
          <ul className="divide-y divide-white/10">
            {business.services.map((s) => (
              <li key={s.id}>
                <a
                  href="#reservar"
                  onClick={() => pickService(s.id)}
                  className="group grid grid-cols-[1fr_auto] items-baseline gap-x-4 rounded px-3 py-4 transition-colors hover:bg-white/5 md:px-5 md:py-5"
                >
                  <span className="letter display text-3xl tracking-[0.04em] md:text-5xl">{s.name}</span>
                  <span className="letter display text-3xl tabular-nums md:text-5xl">{formatPrice(s.priceUYU)}</span>
                  <span className="mt-1.5 text-sm text-bone/60 md:text-base">
                    {s.description} · {formatDuration(s.durationMinutes)}
                  </span>
                  <span className="tag mt-1.5 inline-flex items-center gap-1 justify-self-end text-barbicide-glow opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                    Reservar
                    <Icon name="arrow-right" className="size-4" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
