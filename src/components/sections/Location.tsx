import { business, type Weekday } from "@/config/business";
import { SectionTitle } from "@/components/ui/SectionTitle";

const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
// Mostramos la semana empezando el lunes, como se lee en Uruguay.
const weekOrder: Weekday[] = [1, 2, 3, 4, 5, 6, 0];

export function Location() {
  const { address, contact } = business;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(address.mapsQuery)}&output=embed`;

  return (
    <section aria-labelledby="ubicacion-title" id="ubicacion" className="bg-ink-soft">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 md:grid-cols-2 md:px-8 md:py-32">
        <div>
          <SectionTitle id="ubicacion-title" eyebrow="Dónde estamos" title="Horarios y ubicación" />
          <dl className="divide-y divide-line border-y border-line" data-reveal>
            {weekOrder.map((d) => {
              const h = business.openingHours[d];
              return (
                <div key={d} className="flex justify-between py-3 text-sm">
                  <dt className="text-muted">{dayNames[d]}</dt>
                  <dd className={h ? "" : "text-muted"}>{h ? `${h.open} a ${h.close}` : "Cerrado"}</dd>
                </div>
              );
            })}
          </dl>
          <address className="mt-8 not-italic leading-relaxed" data-reveal>
            {address.street}
            <br />
            {address.city}
            <br />
            {/* En la demo el número es inventado: se muestra pero no se puede llamar. */}
            {business.isDemo ? (
              <span className="text-accent">{contact.phoneDisplay}</span>
            ) : (
              <a href={`tel:+${contact.phoneE164}`} className="text-accent hover:text-accent-hover">
                {contact.phoneDisplay}
              </a>
            )}
          </address>
        </div>
        <div className="min-h-80 overflow-hidden border border-line" data-reveal>
          <iframe
            title={`Mapa: ${address.mapsQuery}`}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-80 w-full grayscale invert-[0.9] contrast-[0.9]"
          />
        </div>
      </div>
    </section>
  );
}
