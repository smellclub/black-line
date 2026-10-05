"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { business } from "@/config/business";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import {
  bookableDates,
  freeSlots,
  toInstant,
  type BusyInterval,
} from "@/lib/slots";
import { bookingSchema, slotQuerySchema } from "@/lib/validation";
import type { BookingSummary } from "@/lib/whatsapp";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

// Mensajes genéricos: nunca mostramos errores internos ni de la base.
const GENERIC_ERROR = "No pudimos confirmar la reserva. Probá de nuevo en un rato o escribinos por WhatsApp.";
const SLOT_TAKEN = "Ese horario se acaba de ocupar. Elegí otro, por favor.";

export type SlotsResult = { ok: true; slots: string[] } | { ok: false };

export type BookingState =
  | { status: "idle" }
  | { status: "error"; message: string; fieldErrors?: Record<string, string> }
  | { status: "success"; booking: BookingSummary };

/** Reservas de un barbero que caen en un día (en hora del local). */
async function busyIntervals(barberId: string, date: string): Promise<BusyInterval[] | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const dayStart = toInstant(date, "00:00");
  const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);

  // Solo pedimos las columnas de horario: el navegador nunca ve datos de otros clientes.
  const { data, error } = await supabase
    .from("bookings")
    .select("starts_at, ends_at")
    .eq("barber_id", barberId)
    .lt("starts_at", dayEnd.toISOString())
    .gt("ends_at", dayStart.toISOString());

  if (error) {
    console.error("[bookings] error leyendo horarios", error.message);
    return null;
  }
  return data.map((row) => ({ start: new Date(row.starts_at), end: new Date(row.ends_at) }));
}

export async function getAvailableSlots(input: {
  serviceId: string;
  barberId: string;
  date: string;
}): Promise<SlotsResult> {
  const parsed = slotQuerySchema.safeParse(input);
  if (!parsed.success) return { ok: false };
  const { serviceId, barberId, date } = parsed.data;

  const service = business.services.find((s) => s.id === serviceId)!;
  const barber = business.barbers.find((b) => b.id === barberId)!;
  if (!barber.serviceIds.includes(serviceId)) return { ok: false };
  if (!bookableDates().includes(date)) return { ok: false };

  // Demo sin base de datos: mostramos todos los horarios del día como libres.
  if (business.isDemo && !getSupabaseAdmin()) {
    return { ok: true, slots: freeSlots(date, service.durationMinutes, []) };
  }

  const busy = await busyIntervals(barberId, date);
  if (!busy) {
    if (!getSupabaseAdmin()) {
      console.warn("[bookings] Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local");
    }
    return { ok: false };
  }
  return { ok: true, slots: freeSlots(date, service.durationMinutes, busy) };
}

/** IP del visitante, hasheada. Nunca guardamos la IP en texto plano. */
async function hashedClientIp(): Promise<string> {
  const h = await headers();
  // En Vercel, x-forwarded-for lo pone la plataforma: el primer valor es la IP real.
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  const salt = process.env.IP_HASH_SALT ?? "";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export async function createBooking(
  _prev: BookingState,
  formData: FormData,
): Promise<BookingState> {
  // 1. Honeypot: un campo oculto que una persona nunca completa.
  //    Si viene con algo, es un bot. Le respondemos "ok" sin guardar nada
  //    para no darle pistas de que lo detectamos.
  if (String(formData.get("website") ?? "") !== "") {
    return { status: "idle" };
  }

  // 2. Validación en el servidor. La del navegador es solo para comodidad.
  const parsed = bookingSchema.safeParse({
    serviceId: formData.get("serviceId"),
    barberId: formData.get("barberId"),
    date: formData.get("date"),
    time: formData.get("time"),
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email") ?? "",
    privacy: formData.get("privacy"),
  });
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      fieldErrors[key] ??= issue.message;
    }
    return { status: "error", message: "Revisá los datos marcados.", fieldErrors };
  }
  const data = parsed.data;

  // 3. Reglas del negocio: el barbero hace ese servicio, el día abre,
  //    el horario existe y no es pasado.
  const service = business.services.find((s) => s.id === data.serviceId)!;
  const barber = business.barbers.find((b) => b.id === data.barberId)!;
  if (!barber.serviceIds.includes(service.id)) {
    return { status: "error", message: `${barber.name} no hace ${service.name}. Elegí otro barbero.` };
  }
  // freeSlots sin reservas = horarios dentro del horario de apertura y no pasados.
  const validDay = bookableDates().includes(data.date);
  const validTime = freeSlots(data.date, service.durationMinutes, []).includes(data.time);
  if (!validDay || !validTime) {
    return { status: "error", message: "Ese horario no está disponible. Elegí otro." };
  }

  const supabase = getSupabaseAdmin();
  // Demo sin base de datos: la reserva se "confirma" pero no se guarda nada.
  // Así la demo se puede mostrar aunque Supabase no esté configurado (o esté pausado).
  if (!supabase && business.isDemo) {
    return {
      status: "success",
      booking: {
        serviceName: service.name,
        barberName: barber.name,
        date: data.date,
        time: data.time,
        customerName: data.name,
        simulated: true,
      },
    };
  }
  if (!supabase) {
    console.warn("[bookings] Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local");
    return { status: "error", message: GENERIC_ERROR };
  }

  // 4. Rate limit: máximo 5 reservas por hora desde la misma IP.
  //    Lo contamos en la base porque en Vercel cada pedido puede caer
  //    en un servidor distinto y un contador en memoria no serviría.
  const ipHash = await hashedClientIp();
  const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
  const { count, error: countError } = await supabase
    .from("bookings")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", since);
  if (countError) {
    console.error("[bookings] error en rate limit", countError.message);
    return { status: "error", message: GENERIC_ERROR };
  }
  if ((count ?? 0) >= RATE_LIMIT_MAX) {
    return {
      status: "error",
      message: "Hiciste muchas reservas seguidas. Si necesitás más turnos, escribinos por WhatsApp.",
    };
  }

  // 5. Guardar. Si otro cliente reservó ese horario al mismo tiempo,
  //    la restricción de la base (bookings_no_overlap) lo rechaza.
  const startsAt = toInstant(data.date, data.time);
  const endsAt = new Date(startsAt.getTime() + service.durationMinutes * 60_000);
  const { error } = await supabase.from("bookings").insert({
    service_id: service.id,
    barber_id: barber.id,
    starts_at: startsAt.toISOString(),
    ends_at: endsAt.toISOString(),
    customer_name: data.name,
    customer_phone: data.phone,
    customer_email: data.email,
    ip_hash: ipHash,
    privacy_accepted_at: new Date().toISOString(),
  });

  if (error) {
    // 23P01 = violación de la restricción de exclusión (turno superpuesto).
    if (error.code === "23P01") return { status: "error", message: SLOT_TAKEN };
    console.error("[bookings] error guardando", error.code, error.message);
    return { status: "error", message: GENERIC_ERROR };
  }

  return {
    status: "success",
    booking: {
      serviceName: service.name,
      barberName: barber.name,
      date: data.date,
      time: data.time,
      customerName: data.name,
    },
  };
}
