# Black Line · demo de barbería

Demo de una barbería **inventada** para mostrarle a barberías reales cómo podría quedar su web.

Stack: Next.js 16 + Tailwind 4 + GSAP (animaciones) + Lenis (scroll suave) + Vercel.
No usa base de datos: las reservas se piden por WhatsApp con el mensaje ya escrito, y el barbero confirma desde su celular.

## Concepto

El mostrador de una barbería de barrio: el turquesa del frasco donde se desinfectan los peines, el poste rayado que gira,
la pizarra de letras blancas con los precios y el ticket del turno que te llevás.

## Qué tiene

Página corta, con un solo botón: "Reservá tu turno".

- Portada: el nombre con la marca de una pasada de navaja, el poste girando y "abierto ahora".
- La pizarra: precios y duración. Tocar un servicio te lleva a reservar con ese servicio ya elegido.
- Pedí tu turno: servicio, barbero, día y hora; el ticket se arma solo y el botón abre WhatsApp con todo escrito.
- Dónde y cuándo: horario con el día de hoy marcado, mapa, WhatsApp e Instagram.

## Adaptarla a otra barbería

Todo está en `src/config/business.ts`: nombre, precios, horarios, barberos, WhatsApp, Instagram, foto y el cartel de arriba.
Los colores están en `src/app/globals.css` (variables al principio).

- Demo de negocio inventado: `notice: "Demo · negocio inventado"`.
- Propuesta para un negocio real: `notice: "Propuesta de diseño para X · no es el sitio oficial"`.
- Cliente que ya compró la web: `notice: ""` y `noindex: false`.

## Correr en tu compu

```bash
npm install
npm run dev
```
