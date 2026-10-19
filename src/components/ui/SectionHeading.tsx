import type { ReactNode } from "react";

interface SectionHeadingProps {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeading({ id, eyebrow, title, children, tone = "light", className = "" }: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={className}>
      {eyebrow && <p className={`eyebrow mb-5 ${dark ? "text-sand" : "text-teal"}`}>{eyebrow}</p>}
      <h2
        id={id}
        className={`text-[2.25rem] leading-[1.05] sm:text-[2.75rem] lg:text-[3.25rem] ${dark ? "!text-paper" : ""}`}
      >
        {title}
      </h2>
      {children && (
        <div className={`mt-6 max-w-[38rem] text-[1.0625rem] leading-relaxed ${dark ? "text-foam" : "text-stone"}`}>
          {children}
        </div>
      )}
    </div>
  );
}
