import type { Metadata } from "next";
import { business } from "@/config/business";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Política de privacidad",
  alternates: { canonical: "/privacidad" },
};

export default function PrivacidadPage() {
  const { legal, contact } = business;
  return (
    <LegalPage title="Política de privacidad">
      <p>
        En {business.name} cuidamos tus datos personales de acuerdo con la Ley N.º 18.331 de
        Protección de Datos Personales de Uruguay y su decreto reglamentario.
      </p>

      <h2>Quién es responsable</h2>
      <p>
        El responsable de la base de datos es {legal.dataControllerName}, con domicilio en{" "}
        {business.address.street}, {business.address.city}. Contacto:{" "}
        <a href={`mailto:${legal.dataControllerEmail}`} className="text-accent underline">
          {legal.dataControllerEmail}
        </a>
        .
      </p>

      <h2>Qué datos recolectamos</h2>
      <ul>
        <li>Nombre y teléfono celular (obligatorios para reservar).</li>
        <li>Email (opcional).</li>
        <li>El servicio, barbero, día y hora que elegiste.</li>
        <li>
          Una versión cifrada (hash) de tu dirección IP, que no permite identificarte y usamos solo
          para evitar reservas abusivas.
        </li>
        <li>La fecha y hora en que aceptaste esta política.</li>
      </ul>

      <h2>Para qué los usamos</h2>
      <p>
        Únicamente para gestionar tu turno: confirmarlo, avisarte si hay cambios y evitar reservas
        falsas. No los vendemos, no los cedemos a terceros con fines comerciales y no te mandamos
        publicidad.
      </p>

      <h2>Cuánto tiempo los guardamos</h2>
      <p>
        Borramos los datos de cada reserva a los {legal.bookingRetentionDays} días de la fecha del
        turno.
      </p>

      <h2>Dónde se guardan</h2>
      <p>
        Los datos se almacenan en servidores de proveedores de infraestructura (Supabase y Vercel)
        que pueden estar fuera de Uruguay. Estos proveedores aplican medidas de seguridad acordes
        a la normativa.
      </p>

      <h2>Cookies</h2>
      <p>
        Este sitio no usa cookies de seguimiento ni de publicidad. Solo puede usar las cookies
        técnicas estrictamente necesarias para que funcione.
      </p>

      <h2>Tus derechos</h2>
      <p>
        Tenés derecho a <strong>acceder</strong> a tus datos, <strong>rectificarlos</strong>,{" "}
        <strong>actualizarlos</strong>, pedir su <strong>supresión</strong> y oponerte a su
        tratamiento. Para ejercerlos, escribinos a {legal.dataControllerEmail} o al WhatsApp{" "}
        {contact.phoneDisplay}, indicando tu nombre y el teléfono con el que reservaste. Te
        respondemos dentro de los plazos que marca la ley (5 días hábiles para el acceso).
      </p>
      <p>
        Si considerás que no respetamos tus derechos, podés presentar una denuncia ante la Unidad
        Reguladora y de Control de Datos Personales (URCDP), en{" "}
        <a
          href="https://www.gub.uy/unidad-reguladora-control-datos-personales/"
          className="text-accent underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          gub.uy/urcdp
        </a>
        .
      </p>
    </LegalPage>
  );
}
