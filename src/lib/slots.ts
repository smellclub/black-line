import { business, type Weekday } from "@/config/business";

/**
 * Lógica de horarios. Es código puro (sin base de datos) para poder usarlo
 * tanto en el servidor como en el navegador y que los dos calculen lo mismo.
 *
 * Fechas: siempre "YYYY-MM-DD" en la zona horaria del local.
 * Horas: siempre "HH:MM" en formato 24 h, también en hora local.
 */

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

export function isDateString(value: string): boolean {
  return DATE_RE.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}

export function isTimeString(value: string): boolean {
  return TIME_RE.test(value);
}

function toMinutes(hm: string): number {
  const [h, m] = hm.split(":").map(Number);
  return h * 60 + m;
}

function toHM(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Día de la semana (0 = domingo) de una fecha de calendario. */
export function weekdayOf(date: string): Weekday {
  return new Date(`${date}T12:00:00Z`).getUTCDay() as Weekday;
}

export function hoursFor(date: string) {
  return business.openingHours[weekdayOf(date)];
}

/** Convierte fecha + hora local del local a un instante real (Date). */
export function toInstant(date: string, time: string): Date {
  return new Date(`${date}T${time}:00${business.utcOffset}`);
}

/** Fecha de hoy en la zona horaria del local, como "YYYY-MM-DD". */
export function todayInBusinessTz(now: Date = new Date()): string {
  // en-CA formatea como YYYY-MM-DD
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: business.timezone,
  }).format(now);
}

function addDays(date: string, days: number): string {
  const d = new Date(`${date}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Días en los que el local abre, desde hoy hasta `maxDaysAhead`. */
export function bookableDates(now: Date = new Date()): string[] {
  return openDatesFrom(todayInBusinessTz(now));
}

/** Igual que bookableDates, pero a partir de una fecha "YYYY-MM-DD" dada. */
export function openDatesFrom(today: string): string[] {
  const dates: string[] = [];
  for (let i = 0; i <= business.booking.maxDaysAhead; i++) {
    const date = addDays(today, i);
    if (hoursFor(date)) dates.push(date);
  }
  return dates;
}

/**
 * Todos los horarios de inicio posibles para un servicio en un día,
 * sin mirar reservas: el turno tiene que terminar antes del cierre.
 */
export function candidateSlots(date: string, durationMinutes: number): string[] {
  const hours = hoursFor(date);
  if (!hours) return [];
  const open = toMinutes(hours.open);
  const close = toMinutes(hours.close);
  const step = business.booking.slotStepMinutes;
  const slots: string[] = [];
  for (let start = open; start + durationMinutes <= close; start += step) {
    slots.push(toHM(start));
  }
  return slots;
}

export type BusyInterval = { start: Date; end: Date };

/**
 * Horarios libres: los candidatos que no se pisan con ninguna reserva
 * y que respetan la anticipación mínima.
 */
export function freeSlots(
  date: string,
  durationMinutes: number,
  busy: BusyInterval[],
  now: Date = new Date(),
): string[] {
  const earliest = now.getTime() + business.booking.minNoticeMinutes * 60_000;
  return candidateSlots(date, durationMinutes).filter((time) => {
    const start = toInstant(date, time).getTime();
    const end = start + durationMinutes * 60_000;
    if (start < earliest) return false;
    // Dos intervalos [a, b) y [c, d) se pisan si a < d y c < b.
    return !busy.some((b) => start < b.end.getTime() && b.start.getTime() < end);
  });
}

/** "martes 7 de octubre" */
export function formatLongDate(date: string): string {
  return new Intl.DateTimeFormat("es-UY", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}

/** { weekday: "mar", day: "7", month: "oct" } para los botones de fecha. */
export function formatDateParts(date: string) {
  const d = new Date(`${date}T12:00:00Z`);
  const fmt = (opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("es-UY", { ...opts, timeZone: "UTC" })
      .format(d)
      .replace(".", "");
  return {
    weekday: fmt({ weekday: "short" }),
    day: fmt({ day: "numeric" }),
    month: fmt({ month: "short" }),
  };
}
