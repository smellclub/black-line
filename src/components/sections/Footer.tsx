import { business } from "@/config/business";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { Magnetic } from "@/components/motion/Magnetic";

export function Footer() {
  return (
    <footer className="bg-ink text-bone">
      <div className="mx-auto max-w-6xl px-5 pb-10 pt-16 md:px-8">
        <div className="flex flex-col gap-8 border-b border-white/15 pb-14 md:flex-row md:items-end md:justify-between">
          <p className="display text-[clamp(3rem,11vw,6.5rem)]">
            Nos vemos
            <br />
            <span className="text-barbicide-glow">en el sillón.</span>
          </p>
          <Magnetic>
            <a href="#reservar" className="btn btn-barbicide px-7 py-4 text-lg">
              Reservá tu turno
              <Icon name="arrow-up" className="size-5" />
            </a>
          </Magnetic>
        </div>
        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Logo className="text-3xl" />
          <p className="text-sm text-bone/60">
            {business.address.street}, {business.address.barrio}, {business.address.city}
          </p>
        </div>
        <p className="mt-10 border-t border-white/15 pt-6 text-sm text-bone/55">
          {business.notice ? `${business.notice}. ` : ""}Diseño y desarrollo: {business.author}.
        </p>
      </div>
    </footer>
  );
}
