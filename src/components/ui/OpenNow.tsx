"use client";

import { useEffect, useState } from "react";
import { business, type Weekday } from "@/config/business";

const days = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const toHours = (hm: string) => {
  const [h, m] = hm.split(":").map(Number);
  return h + m / 60;
};

/** Día de la semana (0 = domingo) y hora decimal en la zona del local, calculados en el navegador. */
export function localNow() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: business.timezone,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(new Date());
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(parts.find((p) => p.type === "weekday")!.value) as Weekday;
  const h = Number(parts.find((p) => p.type === "hour")!.value) % 24;
  const m = Number(parts.find((p) => p.type === "minute")!.value);
  return { day, hour: h + m / 60 };
}

function status() {
  const { day, hour } = localNow();
  const today = business.openingHours[day];
  if (today && hour >= toHours(today.open) && hour < toHours(today.close)) {
    return { open: true, text: `Abierto ahora · hasta las ${today.close}` };
  }
  for (let i = 0; i < 7; i++) {
    const d = ((day + i) % 7) as Weekday;
    const h = business.openingHours[d];
    if (!h || (i === 0 && hour >= toHours(h.open))) continue;
    const when = i === 0 ? "hoy" : i === 1 ? "mañana" : `el ${days[d]}`;
    return { open: false, text: `Cerrado · abrimos ${when} a las ${h.open}` };
  }
  return { open: false, text: "Cerrado ahora" };
}

/** "Abierto ahora" con el punto que late, con la hora real del local. */
export function OpenNow({ className = "" }: { className?: string }) {
  const [state, setState] = useState<{ open: boolean; text: string } | null>(null);

  useEffect(() => {
    const update = () => setState(status());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="relative flex size-2.5">
        {state?.open && <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-60 motion-reduce:hidden" />}
        <span className={`relative inline-flex size-2.5 rounded-full bg-current ${state?.open ? "" : "opacity-40"}`} />
      </span>
      {state?.text ?? "Martes a sábado"}
    </span>
  );
}
