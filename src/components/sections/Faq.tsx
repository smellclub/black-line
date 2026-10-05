import { business } from "@/config/business";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function Faq() {
  return (
    <section aria-labelledby="faq-title">
      <div className="mx-auto max-w-3xl px-5 py-24 md:px-8 md:py-32">
        <SectionTitle id="faq-title" eyebrow="Preguntas frecuentes" title="Antes de venir" />
        {/* <details> es accesible y funciona sin JavaScript. */}
        <div className="divide-y divide-line border-y border-line">
          {business.faq.map((item) => (
            <details key={item.q} className="group py-5" data-reveal>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden
                  className="text-2xl text-accent transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
