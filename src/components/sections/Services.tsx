import { business } from "@/config/business";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { BookServiceLink } from "@/components/ui/BookServiceLink";
import { formatDuration, formatPrice } from "@/lib/format";

/**
 * La lista de precios como la pizarra de la pared de una barbería:
 * fondo claro, renglones con puntos hasta el precio y un botón para reservar ese servicio.
 */
export function Services() {
  return (
    <section aria-labelledby="servicios-title" id="servicios" className="bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-28 md:px-8 md:pb-32 md:pt-36">
        <SectionTitle
          id="servicios-title"
          tone="light"
          eyebrow="Lista de precios"
          title="Lo que hacemos"
          intro="Precios finales en pesos uruguayos. Pagás en el local, con efectivo, débito o transferencia."
        />
        <ul className="border-t-2 border-ink">
          {business.services.map((s, i) => (
            <li key={s.id} data-reveal className="border-b border-ink/15">
              <BookServiceLink
                serviceId={s.id}
                className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-4 py-6 md:gap-x-8 md:py-7"
              >
                <span className="font-display text-lg font-bold tabular-nums text-ink/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex min-w-0 items-baseline gap-4">
                  <span className="font-display text-3xl font-extrabold uppercase leading-none md:text-5xl">
                    {s.name}
                  </span>
                  {/* Los puntitos de la pizarra, del nombre al precio. */}
                  <span aria-hidden className="hidden flex-1 border-b-2 border-dotted border-ink/30 md:block" />
                </span>
                <span className="text-right font-display text-3xl font-extrabold leading-none md:text-5xl">
                  {formatPrice(s.priceUYU)}
                </span>
                <span className="col-start-2 mt-2 text-sm text-ink/70">
                  {s.description} · {formatDuration(s.durationMinutes)}
                </span>
                <span className="col-start-3 mt-2 text-right text-xs font-semibold uppercase tracking-[0.2em] underline decoration-2 underline-offset-4 transition-colors group-hover:text-ink/60">
                  Reservar
                </span>
              </BookServiceLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
