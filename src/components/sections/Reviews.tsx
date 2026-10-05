import { business } from "@/config/business";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function Reviews() {
  return (
    <section aria-labelledby="resenas-title" className="bg-accent text-ink">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <SectionTitle id="resenas-title" tone="light" eyebrow="Reseñas de ejemplo" title="Lo que dicen" />
        <ul className="grid gap-6 md:grid-cols-3">
          {business.reviews.map((r) => (
            <li key={r.author} data-reveal>
              <figure className="flex h-full flex-col border-t-2 border-ink pt-6">
                <p aria-label={`${r.rating} de 5 estrellas`}>
                  {"★".repeat(r.rating)}
                  <span className="text-ink/30">{"★".repeat(5 - r.rating)}</span>
                </p>
                <blockquote className="mt-5 flex-1 font-display text-3xl font-bold uppercase leading-[1.05]">
                  “{r.text}”
                </blockquote>
                <figcaption className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-ink/70">
                  {r.author}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
