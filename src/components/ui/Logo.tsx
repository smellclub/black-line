import { business } from "@/config/business";

/**
 * Logo de demo: el nombre en letra de cartel con una línea fina que lo "corta", como una pasada de navaja.
 * Con un cliente real, se reemplaza por su logo y el resto de la web no cambia.
 */
export function Logo({ className = "text-2xl" }: { className?: string }) {
  return (
    <span className={`display relative inline-block leading-none ${className}`}>
      {business.name}
      <span aria-hidden className="absolute inset-x-[-4%] top-[100%] block h-[0.08em] -rotate-2 bg-barbicide" />
    </span>
  );
}
