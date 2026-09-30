import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content-Security-Policy: le dice al navegador de dónde puede cargar cosas.
 * Todo lo que no está en la lista se bloquea.
 * - Fuentes: next/font las sirve desde nuestro propio dominio ('self').
 * - Imágenes: next/image las sirve desde /_next/image ('self').
 * - Supabase NO está: el navegador nunca habla con la base, solo el servidor.
 * - Google Maps: solo como iframe (frame-src).
 * 'unsafe-inline' en scripts lo necesita Next.js sin nonces (páginas estáticas,
 * que cargan más rápido). 'unsafe-eval' solo en desarrollo.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-src https://www.google.com https://maps.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Obliga a usar HTTPS durante 2 años (incluye subdominios).
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Evita que el navegador "adivine" el tipo de archivo.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Al salir a otro sitio, solo mandamos el dominio, no la URL completa.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Apagamos permisos que la web no usa.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  // Para navegadores viejos que no entienden frame-ancestors.
  { key: "X-Frame-Options", value: "DENY" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    qualities: [75],
    // Dominios desde donde next/image puede traer fotos. Las optimiza en el
    // servidor y las sirve desde /_next/image, por eso la CSP no cambia.
    remotePatterns: [new URL("https://images.unsplash.com/**")],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
