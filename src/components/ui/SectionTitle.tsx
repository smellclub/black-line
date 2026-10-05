type Props = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  /** Para secciones con fondo claro o de color. */
  tone?: "dark" | "light";
};

export function SectionTitle({ id, eyebrow, title, intro, tone = "dark" }: Props) {
  const light = tone === "light";
  return (
    <header className="mb-12 max-w-2xl md:mb-16" data-reveal>
      <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.3em] ${light ? "text-ink/70" : "text-accent"}`}>
        {eyebrow}
      </p>
      <h2
        id={id}
        className="font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-tight md:text-7xl"
      >
        {title}
      </h2>
      {/* La línea de la navaja: se dibuja cuando el título entra en pantalla. */}
      <span aria-hidden className={`razor-line mt-5 w-24 ${light ? "!bg-ink" : ""}`} />
      {intro && (
        <p className={`mt-5 text-base leading-relaxed md:text-lg ${light ? "text-ink/75" : "text-muted"}`}>{intro}</p>
      )}
    </header>
  );
}
