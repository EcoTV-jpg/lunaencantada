import type { ReactNode } from "react";

interface SectionHeadingProps {
  id: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function SectionHeading({ id, title, children, className = "" }: SectionHeadingProps) {
  return (
    <div className={className}>
      <h2 id={id} className="title-section">
        {title}
      </h2>
      {children && <div className="mt-2 max-w-[40rem] text-base text-muted">{children}</div>}
    </div>
  );
}
