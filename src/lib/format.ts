import type { Money } from "@/lib/booking/types";

const words = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

/** Spell out small numbers for prose ("three bedrooms"). */
export function numberWord(n: number): string {
  return words[n] ?? String(n);
}

/** "$250" — currency code is shown separately where it matters. */
export function formatMoney({ amount, currency }: Money): string {
  const formatted = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(amount);
  return `${currency} $${formatted}`;
}

export function formatAmount({ amount }: Money): string {
  return `$${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(amount)}`;
}
