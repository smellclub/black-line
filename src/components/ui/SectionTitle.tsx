type Props = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
};

export function SectionTitle({ id, eyebrow, title, intro }: Props) {
  return (
    <header className="mb-12 max-w-2xl md:mb-16" data-reveal>
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
      <h2
        id={id}
        className="font-display text-4xl font-semibold uppercase leading-none tracking-tight md:text-6xl"
      >
        {title}
      </h2>
      {intro && <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">{intro}</p>}
    </header>
  );
}
