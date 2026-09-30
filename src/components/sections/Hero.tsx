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
      {/* Fondo: resplandor dorado muy sutil + líneas diagonales tipo "barber pole". */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_20%,color-mix(in_srgb,var(--brand-accent)_18%,transparent),transparent_60%)]"
      />
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 -z-10 w-1/2 opacity-[0.07] [background:repeating-linear-gradient(135deg,var(--brand-accent)_0_2px,transparent_2px_28px)] [mask-image:linear-gradient(to_left,black,transparent)]"
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
        <p className="mt-8 max-w-md text-lg leading-relaxed text-muted md:text-xl">{business.slogan}</p>
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
