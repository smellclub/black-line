"use client";

import { useSyncExternalStore } from "react";
import { business, type Weekday } from "@/config/business";
import { whatsappUrl } from "@/lib/whatsapp";
import { Icon } from "@/components/ui/Icon";
import { localNow } from "@/components/ui/OpenNow";

const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
// La semana empieza el lunes, como se lee en Uruguay.
const weekOrder: Weekday[] = [1, 2, 3, 4, 5, 6, 0];

/** Horario (con el día de hoy marcado), dirección, mapa y los dos contactos. */
export function Location() {
  const { address, contact, social } = business;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(address.mapsQuery)}&output=embed`;
  // En el servidor no sabemos qué día es para quien mira (null); en el navegador, sí.
  const today = useSyncExternalStore(
    () => () => {},
    () => localNow().day,
    () => null,
  );

  return (
    <section id="horario" aria-labelledby="horario-title">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-2 md:px-8 md:py-28">
        <div>
          <h2 id="horario-title" className="display text-[clamp(3.5rem,13vw,7rem)]">
            Dónde y cuándo
          </h2>
          <dl className="mt-8 divide-y divide-line border-y border-line">
            {weekOrder.map((d) => {
              const h = business.openingHours[d];
              const isToday = today === d;
              return (
                <div key={d} className={`flex items-center justify-between py-3 ${isToday ? "font-bold" : ""}`}>
                  <dt className="flex items-center gap-2">
                    {dayNames[d]}
                    {isToday && <span className="tag rounded-full bg-ink px-2 py-0.5 text-[0.65rem] text-bone">Hoy</span>}
                  </dt>
                  <dd className={`tabular-nums ${h ? "" : "text-muted"}`}>{h ? `${h.open} a ${h.close}` : "Cerrado"}</dd>
                </div>
              );
            })}
          </dl>
          <p className="mt-8 font-serif text-2xl italic">
            {address.street}, {address.barrio}
          </p>
          <ul className="mt-6 flex flex-wrap gap-3">
            <li>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.mapsQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ink px-5 py-3"
              >
                <Icon name="pin" className="size-5" />
                Cómo llegar
              </a>
            </li>
            <li>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn border-2 border-ink px-5 py-2.5 hover:bg-ink hover:text-bone">
                <Icon name="whatsapp" className="size-5" />
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`https://www.instagram.com/${social.instagram}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn border-2 border-ink px-5 py-2.5 hover:bg-ink hover:text-bone"
              >
                <Icon name="instagram" className="size-5" />@{social.instagram}
              </a>
            </li>
          </ul>
        </div>
        <div className="relative min-h-80 overflow-hidden rounded-lg border-2 border-ink md:min-h-0">
          <iframe
            title={`Mapa: ${address.mapsQuery}`}
            src={mapSrc}
            loading="lazy"
            className="absolute inset-0 size-full grayscale-[0.8] sepia-[0.15]"
          />
        </div>
      </div>
    </section>
  );
}
