/** Íconos dibujados en SVG, trazo de 2px. Mejor que emojis: se ven igual en todos los celulares. */
const paths = {
  "arrow-right": "M5 12h14M13 6l6 6-6 6",
  "arrow-down": "M12 5v14M6 13l6 6 6-6",
  "arrow-up": "M12 19V5M6 11l6-6 6 6",
  "arrow-up-right": "M7 17 17 7M8 7h9v9",
  pin: "M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  check: "M5 12.5 10 17l9-10",
} as const;

export type IconName = keyof typeof paths | "whatsapp" | "instagram";

export function Icon({ name, className = "size-5" }: { name: IconName; className?: string }) {
  const svg = (children: React.ReactNode) => (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
  if (name === "whatsapp")
    return svg(
      <>
        <path d="M4 20l1.2-3.6A8 8 0 1 1 8 19.1z" />
        <path d="M9.5 9.2c0 2.8 2.3 5.3 5.3 5.3l1-1.2-1.8-.9-.8.8a4 4 0 0 1-2.4-2.4l.8-.8-.9-1.8z" strokeWidth={1.4} />
      </>,
    );
  if (name === "instagram")
    return svg(
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
      </>,
    );
  return svg(<path d={paths[name]} />);
}
