import Link from "next/link";
import { business } from "@/config/business";
import { whatsappUrl } from "@/lib/whatsapp";

export function Footer() {
  const { contact, social } = business;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-soft pb-20 md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-3 md:px-8">
        <div>
          <p className="font-display text-3xl font-semibold uppercase tracking-[0.1em]">{business.name}</p>
          <p className="mt-3 text-sm text-muted">{business.slogan}</p>
        </div>
        <div>
          <h2 className="text-xs uppercase tracking-[0.25em] text-accent">Contacto</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={whatsappUrl()} className="hover:text-accent" rel="noopener noreferrer" target="_blank">
                WhatsApp {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="hover:text-accent">
                {contact.email}
              </a>
            </li>
            <li className="text-muted">
              {business.address.street}, {business.address.city}
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xs uppercase tracking-[0.25em] text-accent">Redes</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={social.instagram} className="hover:text-accent" rel="noopener noreferrer" target="_blank">
                Instagram
              </a>
            </li>
            <li>
              <a href={social.tiktok} className="hover:text-accent" rel="noopener noreferrer" target="_blank">
                TikTok
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-xs text-muted md:flex-row md:justify-between md:px-8">
          <p>
            © {year} {business.name}. Sitio de demostración.
          </p>
          <nav aria-label="Legal" className="flex gap-6">
            <Link href="/privacidad" className="hover:text-paper">
              Política de privacidad
            </Link>
            <Link href="/terminos" className="hover:text-paper">
              Términos
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
