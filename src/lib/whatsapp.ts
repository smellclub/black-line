import { business } from "@/config/business";
import { formatLongDate } from "@/lib/slots";

export type BookingSummary = {
  serviceName: string;
  barberName: string;
  date: string;
  time: string;
  customerName: string;
};

/** Link a WhatsApp del local con el mensaje de confirmación ya escrito. */
export function whatsappConfirmationUrl(booking: BookingSummary): string {
  const text =
    `¡Hola ${business.name}! Reservé un turno:\n` +
    `• ${booking.serviceName} con ${booking.barberName}\n` +
    `• ${formatLongDate(booking.date)} a las ${booking.time}\n` +
    `A nombre de ${booking.customerName}.`;
  return `https://wa.me/${business.contact.phoneE164}?text=${encodeURIComponent(text)}`;
}

export function whatsappUrl(): string {
  return `https://wa.me/${business.contact.phoneE164}`;
}
