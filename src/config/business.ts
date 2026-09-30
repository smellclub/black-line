/**
 * Todo el contenido del negocio vive acá.
 * Para rebrandear la web a otra barbería alcanza con editar este archivo
 * (y reemplazar las fotos de /public/images si el cliente tiene las suyas).
 *
 * IMPORTANTE: "Black Line" es un negocio FICTICIO para usar como demo.
 * Nombres, dirección, teléfono y reseñas son inventados.
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
  role: string;
  bio: string;
  /** Servicios que hace este barbero (ids de `services`). */
  serviceIds: string[];
};

export const business = {
  name: "Black Line",
  slogan: "Cortes con precisión. Sin apuro.",
  description:
    "Barbería en Montevideo. Cortes clásicos y modernos, fade, barba y afeitado con navaja. Reservá tu turno online en un minuto.",
  /** URL pública donde va a vivir la web (para SEO y Open Graph). */
  siteUrl: "https://black-line-demo.vercel.app",

  /** Colores de marca. El resto de la paleta (negro y blanco) es fija. */
  colors: {
    accent: "#C2A56B", // dorado apagado
    accentHover: "#D4BB86",
  },

  contact: {
    phoneDisplay: "099 123 456",
    /** Solo números, con código de país, para links tel: y wa.me */
    phoneE164: "59899123456",
    email: "hola@blackline.example",
  },

  address: {
    street: "Av. 18 de Julio 1234",
    city: "Montevideo",
    region: "Montevideo",
    postalCode: "11100",
    country: "UY",
    /** Texto que se usa para el mapa embebido de Google Maps. */
    mapsQuery: "Av. 18 de Julio 1234, Montevideo, Uruguay",
    geo: { lat: -34.9056, lng: -56.1851 },
  },

  social: {
    instagram: "https://instagram.com/blackline.demo",
    tiktok: "https://tiktok.com/@blackline.demo",
  },

  /**
   * Zona horaria del local. Uruguay no tiene horario de verano desde 2015,
   * así que el offset es fijo. Si el cliente está en otro país, cambiá ambos.
   */
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
    maxDaysAhead: 30,
    /** Anticipación mínima para reservar (evita turnos "para ya"). */
    minNoticeMinutes: 60,
  },

  services: [
    {
      id: "corte",
      name: "Corte",
      description: "Corte a tijera o máquina, lavado y peinado.",
      durationMinutes: 30,
      priceUYU: 650,
    },
    {
      id: "fade",
      name: "Fade",
      description: "Degradé prolijo con terminación a navaja.",
      durationMinutes: 45,
      priceUYU: 750,
    },
    {
      id: "barba",
      name: "Barba",
      description: "Perfilado, toalla caliente y aceite.",
      durationMinutes: 30,
      priceUYU: 450,
    },
    {
      id: "corte-barba",
      name: "Corte + barba",
      description: "El combo completo para salir impecable.",
      durationMinutes: 60,
      priceUYU: 1000,
    },
    {
      id: "afeitado",
      name: "Afeitado clásico",
      description: "Afeitado con navaja y ritual de toallas.",
      durationMinutes: 30,
      priceUYU: 550,
    },
  ] satisfies Service[],

  barbers: [
    {
      id: "martin",
      name: "Martín",
      role: "Fundador",
      bio: "Más de diez años con la tijera. Especialista en cortes clásicos.",
      serviceIds: ["corte", "fade", "barba", "corte-barba", "afeitado"],
    },
    {
      id: "nico",
      name: "Nico",
      role: "Barbero",
      bio: "Fades y diseños. Si lo viste en TikTok, lo hace.",
      serviceIds: ["corte", "fade", "corte-barba"],
    },
    {
      id: "santi",
      name: "Santi",
      role: "Barbero",
      bio: "Barbas y afeitado a navaja. Paciencia de relojero.",
      serviceIds: ["corte", "barba", "corte-barba", "afeitado"],
    },
  ] satisfies Barber[],

  /**
   * Galería de trabajos. Las imágenes van en /public/images.
   * Las que vienen con la demo son ilustraciones placeholder:
   * reemplazalas por fotos reales del cliente.
   */
  gallery: [
    { src: "/images/gallery-1.svg", alt: "Fade con terminación a navaja" },
    { src: "/images/gallery-2.svg", alt: "Barba perfilada" },
    { src: "/images/gallery-3.svg", alt: "Corte clásico con raya al costado" },
    { src: "/images/gallery-4.svg", alt: "Afeitado clásico" },
    { src: "/images/gallery-5.svg", alt: "Corte texturizado" },
    { src: "/images/gallery-6.svg", alt: "Interior del local" },
  ],

  /**
   * RESEÑAS DE EJEMPLO. Son inventadas para la demo.
   * Con un cliente real, usá solo reseñas reales (por ejemplo, de su Google Maps).
   */
  reviews: [
    {
      author: "Cliente de ejemplo 1",
      rating: 5,
      text: "Reservé desde el celular en un minuto y me atendieron en hora. El fade quedó perfecto.",
    },
    {
      author: "Cliente de ejemplo 2",
      rating: 5,
      text: "Buen ambiente, buena música y la barba como nunca. Ya tengo mi barbero.",
    },
    {
      author: "Cliente de ejemplo 3",
      rating: 4,
      text: "Muy prolijos. Un sábado a la mañana hay que reservar con tiempo.",
    },
  ],

  faq: [
    {
      q: "¿Puedo ir sin reserva?",
      a: "Sí, si hay un barbero libre te atendemos. Con reserva te asegurás el horario.",
    },
    {
      q: "¿Cómo cancelo o cambio mi turno?",
      a: "Escribinos por WhatsApp con al menos 2 horas de anticipación y lo movemos.",
    },
    {
      q: "¿Qué medios de pago aceptan?",
      a: "Efectivo, débito, crédito y transferencia. El pago es en el local.",
    },
    {
      q: "¿Cuánto antes tengo que llegar?",
      a: "Con 5 minutos alcanza. Si llegás más de 15 minutos tarde, puede que tengamos que reprogramar.",
    },
  ],

  legal: {
    /** Quién es responsable de los datos personales (Ley 18.331). */
    dataControllerName: "Black Line (negocio ficticio de demostración)",
    dataControllerEmail: "privacidad@blackline.example",
    /** Días que se guardan las reservas antes de borrarlas. */
    bookingRetentionDays: 180,
    lastUpdated: "30 de setiembre de 2026",
  },
};

export type BusinessConfig = typeof business;
