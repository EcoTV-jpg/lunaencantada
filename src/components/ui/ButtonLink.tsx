import type { ComponentProps } from "react";

type Variant = "primary" | "outline" | "inverse";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-sm px-6 text-base font-semibold transition-colors duration-200";

export const buttonStyles: Record<Variant, string> = {
  // The single accent colour: one primary action per surface.
  primary: `${base} bg-teal text-white hover:bg-teal-deep`,
  outline: `${base} border border-ink text-ink hover:bg-faint`,
  inverse: `${base} bg-ink text-white hover:bg-black`,
};

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"a"> & { variant?: Variant }) {
  return <a className={`${buttonStyles[variant]} ${className}`} {...props} />;
}
