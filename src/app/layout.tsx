import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Serif } from "next/font/google";
import { business } from "@/config/business";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import "./globals.css";

// next/font descarga las fuentes en el build y las sirve desde nuestro dominio (más rápido y sin saltos).
// Bricolage Grotesque: tiene un eje de ancho; angosta y pesada da el cartel pintado de barbería.
// Instrument Serif en cursiva: el toque de "letra de vidriera" para frases cortas.
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], axes: ["wdth", "opsz"] });
const instrument = Instrument_Serif({ variable: "--font-instrument", subsets: ["latin"], weight: "400", style: ["normal", "italic"] });

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: `${business.name} · Barbería en ${business.address.city}`,
    template: `%s · ${business.name}`,
  },
  description: business.description,
  openGraph: {
    type: "website",
    locale: "es_UY",
    siteName: business.name,
    title: `${business.name} · ${business.slogan}`,
    description: business.description,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  // Una demo o una propuesta no tiene que aparecer en Google.
  robots: business.noindex ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#141312",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-UY" className={`${bricolage.variable} ${instrument.variable} antialiased`}>
      <body className="min-h-screen font-sans">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-bone"
        >
          Saltar al contenido
        </a>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
