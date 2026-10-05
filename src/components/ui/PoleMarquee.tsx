import { business } from "@/config/business";

/**
 * Cinta tipo poste de barbería con los servicios pasando.
 * La lista se duplica para que el loop no tenga corte (la animación mueve -50%).
 * `rotate` la tuerce un poco para romper la grilla.
 */
export function PoleMarquee({ rotate = "-rotate-2" }: { rotate?: string }) {
  const items = [...business.services.map((s) => s.name), "Sin apuro", business.address.city];
  return (
    <div aria-hidden className={`relative z-10 -my-6 ${rotate}`}>
      <div className="barber-pole h-2" />
      <div className="overflow-hidden bg-accent py-3 text-ink">
        <div className="marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0">
              {items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-6 whitespace-nowrap px-6 font-display text-2xl font-bold uppercase tracking-wide md:text-3xl"
                >
                  {item}
                  <span className="inline-block h-0.5 w-10 bg-ink" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div className="barber-pole h-2" />
    </div>
  );
}
