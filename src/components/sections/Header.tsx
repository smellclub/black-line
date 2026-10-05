import { business } from "@/config/business";

const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "#equipo", label: "Equipo" },
  { href: "#trabajos", label: "Trabajos" },
  { href: "#ubicacion", label: "Ubicación" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-ink/85 backdrop-blur">
      {business.isDemo && (
        <p className="bg-accent py-1 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-ink">
          Demo · negocio inventado
        </p>
      )}
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <a href="#inicio" className="font-display text-2xl font-extrabold uppercase tracking-[0.12em]">
          {business.name}
        </a>
        <nav aria-label="Principal" className="flex items-center gap-8">
          <ul className="hidden items-center gap-8 text-sm text-muted md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-paper">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#reservar"
            className="bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-accent-hover"
          >
            Reservar
          </a>
        </nav>
      </div>
    </header>
  );
}
