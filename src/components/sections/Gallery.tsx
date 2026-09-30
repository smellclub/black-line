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
              className={`group relative aspect-square overflow-hidden border border-transparent bg-ink-soft transition-colors duration-500 hover:border-accent ${i === 0 ? "col-span-2 row-span-2" : ""}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes={i === 0 ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 50vw"}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
