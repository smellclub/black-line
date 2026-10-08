"use client";

import { useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { business } from "@/config/business";
import { formatDuration, formatPrice } from "@/lib/format";
import { formatDateParts, formatLongDate, openDatesFrom, requestableSlots, todayInBusinessTz } from "@/lib/slots";
import { bookingMessage, whatsappUrl } from "@/lib/whatsapp";
import { gsap, prefersReducedMotion } from "@/components/motion/gsap";
import { Icon } from "@/components/ui/Icon";

// "Hoy" se calcula en el navegador (la página es estática y se genera en el build).
// useSyncExternalStore evita diferencias entre el HTML del servidor y el del navegador.
const noopSubscribe = () => () => {};
function useToday(): string | null {
  return useSyncExternalStore(noopSubscribe, () => todayInBusinessTz(), () => null);
}

const shortest = Math.min(...business.services.map((s) => s.durationMinutes));

/** Número de ticket "de mentira" pero estable: sale del día y la hora elegidos. */
function ticketNumber(date: string, time: string) {
  const n = [...`${date}${time}`].reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) % 997, 7);
  return String(n).padStart(3, "0");
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-4 flex items-center gap-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink font-display text-sm font-bold text-bone">{n}</span>
        <span className="display text-3xl md:text-4xl">{title}</span>
      </legend>
      {children}
    </fieldset>
  );
}

/**
 * Pedí tu turno: elegís servicio, barbero, día y hora, y a la derecha se va armando el ticket.
 * El botón abre WhatsApp con todo escrito; el barbero confirma desde su celular.
 * No hay base de datos: nada que mantener, nada que se pueda caer.
 */
export function Booking() {
  const [serviceId, setServiceId] = useState("");
  const [barberId, setBarberId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const nameId = useId();
  const stamp = useRef<HTMLSpanElement>(null);

  // Si tocaste un servicio en la pizarra, llega ya elegido.
  useEffect(() => {
    const onPick = (e: Event) => {
      setServiceId((e as CustomEvent<string>).detail);
      setTime("");
    };
    window.addEventListener("booking:service", onPick);
    return () => window.removeEventListener("booking:service", onPick);
  }, []);

  const today = useToday();
  // Solo mostramos días en los que todavía queda algún horario.
  const dates = useMemo(
    () => (today ? openDatesFrom(today).filter((d) => requestableSlots(d, shortest).length > 0) : []),
    [today],
  );

  const service = business.services.find((s) => s.id === serviceId);
  const barber = business.barbers.find((b) => b.id === barberId);
  const slots = date && service ? requestableSlots(date, service.durationMinutes) : [];
  const ready = Boolean(service && date && time);

  // Cuando el ticket queda completo, cae el sello.
  useEffect(() => {
    if (!ready || !stamp.current || prefersReducedMotion()) return;
    gsap.fromTo(stamp.current, { scale: 2.4, rotate: -30, autoAlpha: 0 }, { scale: 1, rotate: -12, autoAlpha: 1, duration: 0.45, ease: "back.out(2.2)" });
  }, [ready]);

  const message = ready
    ? bookingMessage({ serviceName: service!.name, barberName: barber?.name ?? "", date, time, customerName: name.trim() })
    : "";

  const rows: [string, string][] = [
    ["Servicio", service?.name ?? "—"],
    ["Barbero", service ? (barber?.name ?? "El que esté libre") : "—"],
    ["Día", date ? formatLongDate(date) : "—"],
    ["Hora", time || "—"],
    ["A nombre de", name.trim() || "—"],
  ];

  return (
    <section id="reservar" aria-labelledby="reservar-title" className="bg-barbicide text-white">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <h2 id="reservar-title" className="display text-[clamp(3.5rem,13vw,8rem)] text-ink">
          Pedí tu turno
        </h2>
        <p className="mt-4 max-w-md font-serif text-2xl italic leading-tight">En un minuto, y te confirmamos por WhatsApp.</p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div className="min-w-0 space-y-10">
            <Step n={1} title="Qué te hacés">
              <div className="grid gap-2 sm:grid-cols-2">
                {business.services.map((s) => (
                  <label key={s.id} className="choice">
                    <input
                      type="radio"
                      name="service"
                      checked={serviceId === s.id}
                      onChange={() => {
                        setServiceId(s.id);
                        setTime("");
                      }}
                      className="sr-only"
                    />
                    <span className="flex items-baseline justify-between gap-3 font-semibold">
                      {s.name}
                      <span className="tabular-nums">{formatPrice(s.priceUYU)}</span>
                    </span>
                    <span className="mt-0.5 block text-sm opacity-75">{formatDuration(s.durationMinutes)}</span>
                  </label>
                ))}
              </div>
            </Step>

            <Step n={2} title="Con quién">
              <div className="flex flex-wrap gap-2">
                {[{ id: "", name: "El que esté libre", specialty: "Te toca el primero" }, ...business.barbers].map((b) => (
                  <label key={b.id || "cualquiera"} className="choice">
                    <input type="radio" name="barber" checked={barberId === b.id} onChange={() => setBarberId(b.id)} className="sr-only" />
                    <span className="block font-semibold">{b.name}</span>
                    <span className="block text-sm opacity-75">{b.specialty}</span>
                  </label>
                ))}
              </div>
            </Step>

            <Step n={3} title="Qué día">
              {dates.length === 0 ? (
                <p className="opacity-80">Cargando días…</p>
              ) : (
                <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0">
                  {dates.map((d) => {
                    const p = formatDateParts(d);
                    return (
                      <label key={d} className="choice w-[4.6rem] shrink-0 px-2 text-center">
                        <input
                          type="radio"
                          name="date"
                          checked={date === d}
                          onChange={() => {
                            setDate(d);
                            setTime("");
                          }}
                          aria-label={formatLongDate(d)}
                          className="sr-only"
                        />
                        <span className="block text-xs uppercase opacity-80">{p.weekday}</span>
                        <span className="display block text-3xl">{p.day}</span>
                        <span className="block text-xs uppercase opacity-80">{p.month}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </Step>

            <Step n={4} title="A qué hora">
              <div aria-live="polite">
                {!service || !date ? (
                  <p className="opacity-80">Elegí qué te hacés y qué día para ver los horarios.</p>
                ) : slots.length === 0 ? (
                  <p className="opacity-80">Ese día ya no quedan horarios. Probá con otro.</p>
                ) : (
                  <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                    {slots.map((t) => (
                      <label key={t} className="choice px-1 py-2.5 text-center">
                        <input type="radio" name="time" checked={time === t} onChange={() => setTime(t)} className="sr-only" />
                        <span className="font-semibold tabular-nums">{t}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </Step>

            <div>
              <label htmlFor={nameId} className="display text-3xl md:text-4xl">
                Tu nombre <span className="font-serif text-xl normal-case italic tracking-normal">(opcional)</span>
              </label>
              <input
                id={nameId}
                type="text"
                autoComplete="given-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={40}
                placeholder="Ej: Facundo"
                className="mt-4 block w-full rounded-md border-2 border-white/40 bg-white/10 px-4 py-3.5 text-lg text-white placeholder:text-white/55 focus:border-white focus:outline-none"
              />
            </div>
          </div>

          {/* El ticket: se arma a medida que elegís. En compu queda fijo mientras bajás. */}
          <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
            <div className="ticket relative px-6 py-9 shadow-[0_30px_50px_-25px_rgb(0_0_0/0.5)] md:px-8">
              <div className="flex items-center justify-between border-b-2 border-dashed border-ink/25 pb-4">
                <p className="display text-2xl">{business.name}</p>
                <p className="tag text-muted">Turno Nº {date && time ? ticketNumber(date, time) : "···"}</p>
              </div>
              <dl className="divide-y divide-ink/10">
                {rows.map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4 py-3">
                    <dt className="text-sm text-muted">{k}</dt>
                    <dd className={`text-right font-semibold ${v === "—" ? "text-ink/30" : ""}`}>{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex items-baseline justify-between border-t-2 border-dashed border-ink/25 pt-4">
                <p className="tag text-muted">Total en el local</p>
                <p className="display text-4xl tabular-nums">{service ? formatPrice(service.priceUYU) : "$ —"}</p>
              </div>
              <span
                ref={stamp}
                aria-hidden
                className={`display pointer-events-none absolute left-[34%] top-[57%] -rotate-12 rounded-md border-4 border-barbicide px-3 py-1 text-4xl text-barbicide opacity-90 mix-blend-multiply ${ready ? "" : "invisible"}`}
              >
                Listo
              </span>
            </div>

            {ready ? (
              <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" className="btn btn-ink mt-6 w-full px-6 py-4 text-lg">
                <Icon name="whatsapp" className="size-5" />
                Mandar por WhatsApp
              </a>
            ) : (
              <p className="mt-6 rounded-md border-2 border-dashed border-white/50 px-4 py-4 text-center font-semibold">
                Elegí servicio, día y hora para pedir el turno
              </p>
            )}
            <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-white/85">
              <Icon name="check" className="mt-0.5 size-4 shrink-0" />
              Te abre WhatsApp con el pedido escrito. El barbero te confirma el horario desde su celular.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
