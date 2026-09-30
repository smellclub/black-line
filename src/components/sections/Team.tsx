import { business } from "@/config/business";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function Team() {
  return (
    <section aria-labelledby="equipo-title" id="equipo" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <SectionTitle id="equipo-title" eyebrow="Equipo" title="Tu barbero" />
        <ul className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {business.barbers.map((b) => (
            <li key={b.id} data-reveal className="bg-ink">
              {/* Monograma en lugar de foto: reemplazable por la foto real del barbero. */}
              <div
                aria-hidden
                className="flex aspect-[4/3] items-center justify-center bg-[linear-gradient(160deg,var(--color-ink-soft),var(--color-ink))]"
              >
                <span className="font-display text-8xl font-bold uppercase text-accent/80">
                  {b.name.charAt(0)}
                </span>
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.25em] text-accent">{b.role}</p>
                <h3 className="mt-2 font-display text-3xl font-medium uppercase">{b.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{b.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
