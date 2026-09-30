import { business } from "@/config/business";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { formatDuration, formatPrice } from "@/lib/format";

export function Services() {
  return (
    <section aria-labelledby="servicios-title" id="servicios" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <SectionTitle
          id="servicios-title"
          eyebrow="Servicios"
          title="Lo que hacemos"
          intro="Precios finales en pesos uruguayos. Pagás en el local."
        />
        <ul className="divide-y divide-line border-y border-line">
          {business.services.map((s) => (
            <li key={s.id} data-reveal className="flex items-start justify-between gap-6 py-6">
              <div>
                <h3 className="font-display text-2xl font-medium uppercase tracking-wide md:text-3xl">
                  {s.name}
                </h3>
                <p className="mt-1 text-sm text-muted">{s.description}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-display text-2xl text-accent md:text-3xl">{formatPrice(s.priceUYU)}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">
                  {formatDuration(s.durationMinutes)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
