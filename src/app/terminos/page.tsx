import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/config/business";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  alternates: { canonical: "/terminos" },
};

export default function TerminosPage() {
  return (
    <LegalPage title="Términos y condiciones">
      <p>
        Al reservar un turno en este sitio aceptás estas condiciones. Si no estás de acuerdo, no
        uses el sistema de reservas.
      </p>

      <h2>Reservas</h2>
      <ul>
        <li>La reserva queda confirmada cuando ves la pantalla de confirmación.</li>
        <li>Te pedimos datos reales: con datos falsos podemos cancelar el turno.</li>
        <li>Cada persona puede hacer hasta 5 reservas por hora desde el sitio.</li>
      </ul>

      <h2>Cancelaciones y atrasos</h2>
      <ul>
        <li>Para cancelar o cambiar el turno, avisanos con al menos 2 horas de anticipación.</li>
        <li>Si llegás más de 15 minutos tarde, puede que tengamos que reprogramarte.</li>
      </ul>

      <h2>Precios y pagos</h2>
      <p>
        Los precios publicados están en pesos uruguayos e incluyen impuestos. El pago se hace en
        el local. {business.name} puede actualizar los precios; se respeta el precio vigente al
        momento de reservar.
      </p>

      <h2>Datos personales</h2>
      <p>
        Tratamos tus datos según nuestra{" "}
        <Link href="/privacidad" className="text-accent underline">
          política de privacidad
        </Link>
        .
      </p>

      <h2>Ley aplicable</h2>
      <p>
        Estos términos se rigen por las leyes de la República Oriental del Uruguay, incluida la
        Ley N.º 17.250 de Relaciones de Consumo.
      </p>
    </LegalPage>
  );
}
