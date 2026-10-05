import { SectionTitle } from "@/components/ui/SectionTitle";
import { BookingForm } from "@/components/booking/BookingForm";

export function Booking() {
  return (
    <section aria-labelledby="reservar-title" id="reservar">
      <div className="mx-auto max-w-4xl px-5 py-24 md:px-8 md:py-32">
        <SectionTitle
          id="reservar-title"
          eyebrow="Reservá online"
          title="Reservar turno"
          intro="Elegí servicio, barbero y horario. Te lleva menos de un minuto."
        />
        <BookingForm />
      </div>
    </section>
  );
}
