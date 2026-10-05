"use client";

import type { ReactNode } from "react";

/** Nombre del evento que escucha el formulario de reservas. */
export const SELECT_SERVICE_EVENT = "blackline:select-service";

/**
 * Link a #reservar que además deja el servicio ya elegido en el formulario.
 * Sin JavaScript sigue funcionando como un link común (solo baja a la reserva).
 */
export function BookServiceLink({
  serviceId,
  className,
  children,
}: {
  serviceId: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href="#reservar"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(SELECT_SERVICE_EVENT, { detail: serviceId }))}
    >
      {children}
    </a>
  );
}
