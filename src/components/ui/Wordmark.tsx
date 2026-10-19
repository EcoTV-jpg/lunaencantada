interface WordmarkProps {
  tone?: "ink" | "paper";
  withPlace?: boolean;
  className?: string;
}

/** Typographic wordmark. No pictogram by design. */
export function Wordmark({ tone = "ink", withPlace = false, className = "" }: WordmarkProps) {
  const color = tone === "ink" ? "text-ink" : "text-paper";
  const sub = tone === "ink" ? "text-teal" : "text-sand";
  return (
    <span className={`inline-flex items-baseline gap-2.5 leading-none ${color} ${className}`}>
      <span className="font-serif text-[0.98rem] font-medium tracking-[0.1em] sm:text-[1.3rem] sm:tracking-[0.14em] uppercase">Luna Encantada</span>
      <span className={`font-serif text-[0.98rem] italic sm:text-[1.3rem] ${sub}`}>A2</span>
      {withPlace && (
        <span className={`eyebrow ml-1 hidden self-center sm:inline ${tone === "ink" ? "text-stone" : "text-foam"}`}>
          Playa del Carmen
        </span>
      )}
    </span>
  );
}
