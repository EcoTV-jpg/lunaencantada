/** Typographic wordmark in the accent colour. No pictogram by design. */
export function Wordmark({ tone = "teal", className = "" }: { tone?: "teal" | "ink"; className?: string }) {
  return (
    <span
      className={`inline-flex items-baseline gap-1.5 text-[1.125rem] font-bold leading-none tracking-[-0.02em] sm:text-[1.25rem] ${
        tone === "teal" ? "text-teal" : "text-ink"
      } ${className}`}
    >
      <span>luna encantada</span>
      <span className="font-medium">A2</span>
    </span>
  );
}
