import Image from "next/image";
import { business } from "@/config/business";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function Hero() {
  const [first, ...rest] = business.name.split(" ");
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden border-b border-line"
    >
      {/* Foto de fondo: priority porque es lo primero que se ve (mejora el LCP). */}
      <Image
        src={business.heroImage.src}
        alt={business.heroImage.alt}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover grayscale"
      />
      {/* Overlay negro: garantiza contraste AA del texto sobre cualquier foto. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--color-ink)_8%,rgb(10_10_10/0.82)_45%,rgb(10_10_10/0.6))]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_20%,color-mix(in_srgb,var(--brand-accent)_16%,transparent),transparent_60%)]"
      />

      <div className="mx-auto flex min-h-[88svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-24 md:px-8 md:pb-24">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.35em] text-accent">
          Barbería · {business.address.city}
        </p>
        <h1
          id="hero-title"
          className="font-display text-[clamp(4rem,17vw,11rem)] font-bold uppercase leading-[0.85] tracking-tight"
        >
          {first}
          {rest.length > 0 && (
            <>
              <br />
              <span className="text-transparent [-webkit-text-stroke:1.5px_var(--color-paper)]">
                {rest.join(" ")}
              </span>
            </>
          )}
        </h1>
        <div className="mt-8 h-px w-24 bg-accent" />
        <p className="mt-8 max-w-md text-lg leading-relaxed text-paper/80 md:text-xl">{business.slogan}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#reservar">Reservar turno</ButtonLink>
          <ButtonLink href="#servicios" variant="outline">
            Ver servicios
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
