import Image from "next/image";
import { business } from "@/config/business";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function Team() {
  return (
    <section aria-labelledby="equipo-title" id="equipo" className="border-b border-line bg-ink-soft">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <SectionTitle id="equipo-title" eyebrow="Equipo" title="Tu barbero" />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {business.barbers.map((b) => (
            <li key={b.id} data-reveal className="group">
              <div className="relative aspect-[3/4] overflow-hidden border border-line transition-colors duration-500 group-hover:border-accent">
                <Image
                  src={b.image}
                  alt={`Retrato de ${b.name}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover grayscale transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/80 to-transparent"
                />
              </div>
              <div className="pt-5">
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
