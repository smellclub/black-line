import { business } from "@/config/business";

// La lista se repite: la cinta se corre exactamente la mitad y vuelve a empezar sin corte.
const names = business.services.map((s) => s.name);
const items = [...names, ...names, ...names, ...names];

/** Una cinta negra con los servicios, separada por pedacitos de poste. Puro CSS. */
export function PoleBand() {
  return (
    <section aria-label="Servicios" className="overflow-hidden bg-ink py-4 text-bone md:py-5">
      <ul className="marquee-track flex w-max items-center gap-6 pr-6" style={{ ["--marquee-speed" as string]: "40s" }}>
        {items.map((name, i) => (
          <li key={i} aria-hidden={i >= names.length} className="flex items-center gap-6">
            <span className="display text-4xl md:text-6xl">{name}</span>
            <span className="pole-stripes block h-8 w-5 rounded-full md:h-11 md:w-6" />
          </li>
        ))}
      </ul>
    </section>
  );
}
