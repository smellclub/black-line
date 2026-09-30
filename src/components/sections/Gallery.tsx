import Image from "next/image";
import { business } from "@/config/business";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function Gallery() {
  return (
    <section aria-labelledby="trabajos-title" id="trabajos" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <SectionTitle id="trabajos-title" eyebrow="Trabajos" title="Recién salidos" />
        <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
          {business.gallery.map((img, i) => (
            <li
              key={img.src}
              data-reveal
              className={`group relative overflow-hidden bg-ink-soft ${i === 0 ? "col-span-2 row-span-2 md:col-span-2" : ""}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={800}
                height={800}
                sizes={i === 0 ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 50vw"}
                className="aspect-square h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-4 text-xs uppercase tracking-[0.2em] text-paper/90">
                {img.alt}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
