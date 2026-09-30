import { business } from "@/config/business";

const dayCodes = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Datos estructurados "BarberShop" para que Google entienda el negocio. */
export function JsonLd() {
  const { address, contact } = business;
  const data = {
    "@context": "https://schema.org",
    "@type": "BarberShop",
    name: business.name,
    description: business.description,
    url: business.siteUrl,
    telephone: `+${contact.phoneE164}`,
    email: contact.email,
    priceRange: "$$",
    currenciesAccepted: "UYU",
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: address.geo.lat, longitude: address.geo.lng },
    openingHoursSpecification: Object.entries(business.openingHours)
      .filter(([, h]) => h)
      .map(([day, h]) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: dayCodes[Number(day)],
        opens: h!.open,
        closes: h!.close,
      })),
    sameAs: Object.values(business.social),
    makesOffer: business.services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name, description: s.description },
      price: s.priceUYU,
      priceCurrency: "UYU",
    })),
  };

  return (
    <script
      type="application/ld+json"
      // Reemplazamos "<" para que ningún texto del config pueda cerrar el <script> (XSS).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
