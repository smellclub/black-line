/**
 * Todo el contenido del negocio vive acá.
 * Para rebrandear la web a otra barbería alcanza con editar este archivo:
 * nombre, colores, precios, horarios, barberos, WhatsApp y foto.
 *
 * IMPORTANTE: "Black Line" es un negocio FICTICIO para usar como demo.
 * Nombre, dirección y teléfono son inventados.
 */

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = domingo

export type Service = {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  priceUYU: number;
};

export type Barber = {
  id: string;
  name: string;
  /** Lo que mejor hace, en pocas palabras. */
  specialty: string;
};

export const business = {
  name: "Black Line",
  slogan: "Cortes con precisión. Sin apuro.",
  description:
    "Barbería en el Centro de Montevideo. Corte, fade, barba y afeitado con navaja. Reservá tu turno en un minuto y te llega la confirmación por WhatsApp.",
  /** URL pública donde va a vivir la web (para SEO y Open Graph). */
  siteUrl: "https://black-line-smellclub.vercel.app",

  /**
   * Cartel visible arriba de todo. En una demo de negocio inventado es obligatorio.
   * Para una propuesta a un negocio real: "Propuesta de diseño para X · no es el sitio oficial".
   * Con un cliente que ya compró la web: dejarlo vacío ("") y el cartel desaparece.
   */
  notice: "Demo · negocio inventado",
  /** Si es una demo o propuesta, que Google no la indexe. */
  noindex: true,
  author: "Emanuel Yordi",

  /** Foto de la portada. Foto de stock para la demo: reemplazar por una foto real del local. */
  heroImage: {
    src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1",
    alt: "Sillones de barbería clásicos frente al espejo",
  },

  contact: {
    phoneDisplay: "099 123 456",
    /** Solo números, con código de país, para links tel: y wa.me */
    phoneE164: "59899123456",
  },

  address: {
    street: "Av. 18 de Julio 1234",
    barrio: "Centro",
    city: "Montevideo",
    region: "Montevideo",
    postalCode: "11100",
    country: "UY",
    /** Texto que se usa para el mapa embebido de Google Maps. */
    mapsQuery: "Av. 18 de Julio 1234, Montevideo, Uruguay",
    geo: { lat: -34.9056, lng: -56.1851 },
  },

  social: {
    instagram: "blackline.demo",
  },

  /** Zona horaria del local. Uruguay no tiene horario de verano desde 2015. */
  timezone: "America/Montevideo",
  utcOffset: "-03:00",

  /** Horario de atención por día. `null` = cerrado. Formato 24 h "HH:MM". */
  openingHours: {
    0: null,
    1: null,
    2: { open: "10:00", close: "20:00" },
    3: { open: "10:00", close: "20:00" },
    4: { open: "10:00", close: "20:00" },
    5: { open: "10:00", close: "21:00" },
    6: { open: "09:00", close: "18:00" },
  } satisfies Record<Weekday, { open: string; close: string } | null>,

  booking: {
    /** Cada cuántos minutos puede empezar un turno. */
    slotStepMinutes: 30,
    /** Hasta cuántos días para adelante se puede reservar. */
    maxDaysAhead: 14,
    /** Anticipación mínima para reservar (evita turnos "para ya"). */
    minNoticeMinutes: 60,
  },

  services: [
    { id: "corte", name: "Corte", description: "Tijera o máquina, lavado y peinado.", durationMinutes: 30, priceUYU: 650 },
    { id: "fade", name: "Fade", description: "Degradé prolijo con terminación a navaja.", durationMinutes: 45, priceUYU: 750 },
    { id: "barba", name: "Barba", description: "Perfilado, toalla caliente y aceite.", durationMinutes: 30, priceUYU: 450 },
    { id: "corte-barba", name: "Corte + barba", description: "El combo para salir impecable.", durationMinutes: 60, priceUYU: 1000 },
    { id: "afeitado", name: "Afeitado clásico", description: "Navaja y ritual de toallas calientes.", durationMinutes: 30, priceUYU: 550 },
  ] satisfies Service[],

  barbers: [
    { id: "martin", name: "Martín", specialty: "Clásicos y tijera" },
    { id: "nico", name: "Nico", specialty: "Fades y diseños" },
    { id: "santi", name: "Santi", specialty: "Barba y navaja" },
  ] satisfies Barber[],
};

export type BusinessConfig = typeof business;
