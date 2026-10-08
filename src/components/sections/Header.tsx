import { business } from "@/config/business";
import { Logo } from "@/components/ui/Logo";

const links = [
  { href: "#precios", label: "Precios" },
  { href: "#horario", label: "Horario" },
];

/** Arriba de todo, el cartel de demo. Debajo, la barra que queda pegada al hacer scroll. */
export function Header() {
  return (
    <>
      {business.notice && (
        <p className="bg-ink px-4 py-2 text-center text-xs font-semibold text-bone sm:text-sm">
          {business.notice}
        </p>
      )}
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-bone/90 backdrop-blur">
        <nav aria-label="Principal" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
          <a href="#inicio" aria-label={`${business.name}, volver al inicio`}>
            <Logo className="text-2xl" />
          </a>
          <div className="flex items-center gap-6">
            <ul className="hidden items-center gap-6 sm:flex">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="tag text-ink/70 transition-colors hover:text-ink">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <a href="#reservar" className="btn btn-barbicide px-4 py-2 text-sm">
              Reservá
            </a>
          </div>
        </nav>
      </header>
    </>
  );
}
