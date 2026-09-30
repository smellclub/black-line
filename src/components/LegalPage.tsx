import Link from "next/link";
import type { ReactNode } from "react";
import { business } from "@/config/business";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main id="contenido" className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
      <Link href="/" className="text-sm text-accent hover:text-accent-hover">
        ← Volver a {business.name}
      </Link>
      <p role="note" className="mt-8 border border-accent/50 bg-accent/10 px-4 py-3 text-sm">
        Texto modelo: debe ser revisado por un profesional antes de usarse con un negocio real.
      </p>
      <h1 className="mt-10 font-display text-5xl font-semibold uppercase">{title}</h1>
      <p className="mt-3 text-sm text-muted">Última actualización: {business.legal.lastUpdated}</p>
      <div className="mt-10 space-y-6 leading-relaxed text-paper/90 [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:uppercase [&_h2]:text-paper [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
        {children}
      </div>
    </main>
  );
}
