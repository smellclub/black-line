"use client";

import Image from "next/image";
import { useRef } from "react";
import { business } from "@/config/business";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/motion/gsap";
import { Magnetic } from "@/components/motion/Magnetic";
import { BarberPole } from "@/components/ui/BarberPole";
import { Icon } from "@/components/ui/Icon";
import { OpenNow } from "@/components/ui/OpenNow";

// El corte: una diagonal apenas inclinada que atraviesa cada palabra (en % del alto de la palabra).
const CUT_LEFT = 58;
const CUT_RIGHT = 44;

/** Una palabra con una pasada de navaja: una línea fina del color de la pared que la cruza en diagonal. */
function CutWord({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`relative block w-fit ${className}`}>
      {text}
      <svg className="pointer-events-none absolute inset-0 size-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line
          data-razor
          x1="-2"
          y1={CUT_LEFT}
          x2="102"
          y2={CUT_RIGHT}
          pathLength={1}
          strokeDasharray="1"
          stroke="var(--color-bone)"
          strokeWidth="5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}

/**
 * Portada: el nombre en letra de cartel. Al entrar, una navaja cruza cada palabra
 * en diagonal y deja la marca del corte. Al lado, el poste girando.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const [first, ...rest] = business.name.split(" ");

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      if (prefersReducedMotion()) return;
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from(q("[data-name]"), { yPercent: 40, autoAlpha: 0, duration: 1 })
        .from(q("[data-pole]"), { yPercent: 30, autoAlpha: 0, duration: 1 }, 0.1)
        .from(q("[data-photo]"), { rotate: 8, y: 60, autoAlpha: 0, duration: 1.1 }, 0.2)
        // La navaja: la marca del corte se dibuja de izquierda a derecha, una palabra después de la otra.
        .fromTo(q("[data-razor]"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.45, ease: "power2.in", stagger: 0.25 }, 0.75)
        .from(q("[data-rise]"), { y: 20, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, 0.9);
    },
    { scope: root },
  );

  return (
    <section ref={root} id="inicio" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-10 md:grid-cols-[1.25fr_1fr] md:items-center md:px-8 md:pb-24 md:pt-16">
        <div>
          <p data-rise className="tag inline-flex items-center gap-2 rounded-full border-2 border-ink px-3 py-1.5">
            <OpenNow />
          </p>

          <h1 id="hero-title" className="mt-8">
            <span className="sr-only">{business.name}, barbería en {business.address.barrio}, {business.address.city}</span>
            <span data-name aria-hidden className="display block text-[clamp(5.5rem,30vw,15rem)]">
              <CutWord text={first} />
              {rest.length > 0 && <CutWord text={rest.join(" ")} className="text-barbicide" />}
            </span>
          </h1>

          <p data-rise className="mt-6 max-w-md font-serif text-3xl italic leading-tight md:text-4xl">
            {business.slogan}
          </p>
          <div data-rise className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Magnetic>
              <a href="#reservar" className="btn btn-barbicide px-7 py-4 text-lg">
                Reservá tu turno
                <Icon name="arrow-down" className="size-5" />
              </a>
            </Magnetic>
            <p className="inline-flex items-center gap-1.5 text-sm text-muted">
              <Icon name="pin" className="size-4" />
              {business.address.street}, {business.address.barrio}
            </p>
          </div>
        </div>

        {/* La foto pegada en la pared, con el poste adelante. */}
        <div className="relative mx-auto w-full max-w-sm md:max-w-none">
          <div data-photo className="relative ml-[18%] aspect-[4/5] rotate-3 bg-bone-deep p-3 pb-12 shadow-[0_30px_50px_-25px_rgb(20_19_18/0.6)]">
            <div className="relative size-full overflow-hidden bg-ink/10">
              <Image src={business.heroImage.src} alt={business.heroImage.alt} fill priority sizes="(min-width: 768px) 40vw, 80vw" className="object-cover grayscale-[0.3]" />
            </div>
            <p className="absolute bottom-3 left-4 font-serif text-xl italic">{business.address.barrio}, {business.address.city}</p>
            <span aria-hidden className="absolute -top-3 left-1/2 block h-7 w-28 -translate-x-1/2 -rotate-2 bg-[rgb(240_226_180/0.85)] shadow-sm" />
          </div>
          <div data-pole className="absolute -left-1 bottom-[-6%] h-[88%] w-[22%] drop-shadow-[8px_14px_10px_rgb(20_19_18/0.35)]">
            <BarberPole className="size-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
