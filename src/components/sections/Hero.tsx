import Image from "next/image";
import { business } from "@/config/business";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { formatPrice } from "@/lib/format";

export function Hero() {
  const [first, ...rest] = business.name.split(" ");
  const cheapest = Math.min(...business.services.map((s) => s.priceUYU));
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="cut-bottom relative isolate overflow-hidden bg-ink"
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
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--color-ink)_10%,rgb(10_10_10/0.85)_45%,rgb(10_10_10/0.55))]"
      />

      {/* El poste de barbería, vertical, pegado al borde derecho. */}
      <div aria-hidden className="barber-pole absolute right-10 top-0 -z-10 hidden h-full w-5 opacity-80 md:block" />

      <div className="mx-auto flex min-h-[90svh] max-w-6xl flex-col justify-end px-5 pb-[calc(4rem+4vw)] pt-20 md:px-8 md:pb-[calc(6rem+4vw)]">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.35em] text-accent">
          Barbería · {business.address.city}
        </p>
        <h1
          id="hero-title"
          className="font-display text-[clamp(5rem,24vw,15rem)] font-extrabold uppercase leading-[0.78] tracking-tight"
        >
          {first}
          {rest.length > 0 && (
            <>
              {/* La "línea" del nombre: la navaja pasa una vez al cargar la página. */}
              <span aria-hidden className="razor-line razor-line--hero my-3 md:my-5" />
              <span className="block text-transparent [-webkit-text-stroke:2px_var(--color-paper)]">
                {rest.join(" ")}
              </span>
            </>
          )}
        </h1>
        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-sm text-lg leading-relaxed text-paper/85 md:text-xl">
            {business.slogan} Turnos online desde{" "}
            <span className="whitespace-nowrap font-semibold text-paper">{formatPrice(cheapest)}</span>.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#reservar">Reservar turno</ButtonLink>
            <ButtonLink href="#servicios" variant="outline">
              Ver precios
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
