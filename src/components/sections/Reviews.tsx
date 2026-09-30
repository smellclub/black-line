import { business } from "@/config/business";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function Reviews() {
  return (
    <section aria-labelledby="resenas-title" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <SectionTitle id="resenas-title" eyebrow="Reseñas" title="Lo que dicen" />
        <ul className="grid gap-6 md:grid-cols-3">
          {business.reviews.map((r) => (
            <li key={r.author} data-reveal>
              <figure className="flex h-full flex-col border border-line p-8">
                <p className="text-accent" aria-label={`${r.rating} de 5 estrellas`}>
                  {"★".repeat(r.rating)}
                  <span className="text-line">{"★".repeat(5 - r.rating)}</span>
                </p>
                <blockquote className="mt-5 flex-1 text-lg leading-relaxed">“{r.text}”</blockquote>
                <figcaption className="mt-6 text-xs uppercase tracking-[0.2em] text-muted">
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
