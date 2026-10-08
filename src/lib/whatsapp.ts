import { business } from "@/config/business";
import { formatLongDate } from "@/lib/slots";

export type BookingRequest = {
  serviceName: string;
  /** Vacío = "el que esté libre". */
  barberName: string;
  date: string;
  time: string;
  customerName: string;
};

/** El mensaje que le llega al barbero, ya escrito. */
export function bookingMessage(b: BookingRequest): string {
  return [
    `¡Hola ${business.name}! Quiero reservar un turno:`,
    `• ${b.serviceName}${b.barberName ? ` con ${b.barberName}` : ""}`,
    `• ${formatLongDate(b.date)} a las ${b.time}`,
    b.customerName ? `A nombre de ${b.customerName}.` : "",
    "¿Me lo confirman?",
  ]
    .filter(Boolean)
    .join("\n");
}

/** Link a WhatsApp del local, con un mensaje opcional ya escrito. */
export function whatsappUrl(text?: string): string {
  return `https://wa.me/${business.contact.phoneE164}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}
