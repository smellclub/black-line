import type { ComponentProps } from "react";

type Props = ComponentProps<"a"> & { variant?: "solid" | "outline" };

export function ButtonLink({ variant = "solid", className = "", ...props }: Props) {
  const base =
    "inline-flex min-h-12 items-center justify-center px-7 text-sm font-semibold uppercase tracking-[0.2em] transition-colors";
  const styles =
    variant === "solid"
      ? "bg-accent text-ink hover:bg-accent-hover"
      : "border border-paper/30 text-paper hover:border-accent hover:text-accent";
  return <a className={`${base} ${styles} ${className}`} {...props} />;
}
