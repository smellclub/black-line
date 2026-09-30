import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import type { CSSProperties } from "react";
import { business } from "@/config/business";
import { RevealObserver } from "@/components/ui/RevealObserver";
import "./globals.css";

// next/font descarga las fuentes en el build y las sirve desde nuestro dominio:
// el navegador nunca le pide nada a Google (mejor privacidad y CSP más cerrada).
const oswald = Oswald({ variable: "--font-oswald", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

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
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const brandVars = {
    "--brand-accent": business.colors.accent,
    "--brand-accent-hover": business.colors.accentHover,
  } as CSSProperties;

  return (
    <html
      lang="es-UY"
      className={`${oswald.variable} ${inter.variable} antialiased`}
      style={brandVars}
    >
      <body className="min-h-screen font-sans">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-accent focus:px-4 focus:py-2 focus:text-ink"
        >
          Saltar al contenido
        </a>
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
