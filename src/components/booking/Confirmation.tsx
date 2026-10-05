import { business } from "@/config/business";
import { formatLongDate } from "@/lib/slots";
import { whatsappConfirmationUrl, type BookingSummary } from "@/lib/whatsapp";

export function Confirmation({ booking }: { booking: BookingSummary }) {
  return (
    <div role="status" className="border border-accent/60 bg-accent/5 p-8 md:p-12">
      <p className="text-xs uppercase tracking-[0.3em] text-accent">Reserva confirmada</p>
      <h3 className="mt-3 font-display text-5xl font-extrabold uppercase md:text-6xl">¡Listo, {booking.customerName}!</h3>
      <dl className="mt-8 grid gap-4 text-sm sm:grid-cols-2">
        <Item label="Servicio" value={booking.serviceName} />
        <Item label="Barbero" value={booking.barberName} />
        <Item label="Día" value={formatLongDate(booking.date)} />
        <Item label="Hora" value={booking.time} />
        <Item label="Dónde" value={`${business.address.street}, ${business.address.city}`} />
      </dl>
      <a
        href={whatsappConfirmationUrl(booking)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-flex min-h-12 items-center justify-center bg-accent px-8 text-sm font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-accent-hover"
      >
        Confirmar por WhatsApp
      </a>
      <p className="mt-4 text-xs text-muted">
        Se abre WhatsApp con el mensaje listo. Si necesitás cambiar el turno, avisanos por ahí.
      </p>
      {booking.simulated && (
        <p className="mt-6 border-t border-line pt-4 text-xs text-muted">
          Modo demo: este turno no se guardó en ningún lado. En la web real queda registrado y el horario
          deja de aparecer para los demás.
        </p>
      )}
    </div>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.2em] text-muted">{label}</dt>
      <dd className="mt-1 text-base first-letter:uppercase">{value}</dd>
    </div>
  );
}
