import { business } from "@/config/business";
import { formatLongDate } from "@/lib/slots";

export type BookingSummary = {
  serviceName: string;
  barberName: string;
  date: string;
  time: string;
  customerName: string;
  /** true = modo demo sin base: la reserva se mostró pero no se guardó. */
  simulated?: boolean;
};

/**
 * En la demo el teléfono es inventado y podría ser de una persona real,
 * así que los links de WhatsApp abren la app sin destinatario.
 */
const waBase = business.isDemo ? "https://wa.me/" : `https://wa.me/${business.contact.phoneE164}`;

/** Link a WhatsApp del local con el mensaje de confirmación ya escrito. */
export function whatsappConfirmationUrl(booking: BookingSummary): string {
  const text =
    `¡Hola ${business.name}! Reservé un turno:\n` +
    `• ${booking.serviceName} con ${booking.barberName}\n` +
    `• ${formatLongDate(booking.date)} a las ${booking.time}\n` +
    `A nombre de ${booking.customerName}.`;
  return `${waBase}?text=${encodeURIComponent(text)}`;
}

export function whatsappUrl(): string {
  return waBase;
}
