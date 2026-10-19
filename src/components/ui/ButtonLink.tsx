import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "light";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xs px-6 text-[0.9375rem] font-medium tracking-[0.01em] transition-colors duration-200";

export const buttonStyles: Record<Variant, string> = {
  primary: `${base} bg-teal text-paper hover:bg-teal-deep`,
  secondary: `${base} border border-ink/25 text-ink hover:border-ink hover:bg-ink/[0.03]`,
  light: `${base} bg-paper text-ink hover:bg-shell`,
};

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"a"> & { variant?: Variant }) {
  return <a className={`${buttonStyles[variant]} ${className}`} {...props} />;
}
