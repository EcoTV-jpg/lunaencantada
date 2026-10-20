import { property, type RateSeason } from "@/data/property";
import { todayIso } from "@/lib/booking/validation";

const { seasons } = property.pricing;

/** Seasons that haven't ended yet (property-local date). */
export function upcomingSeasons(today: string = todayIso()): RateSeason[] {
  return seasons.filter((s) => s.end >= today);
}

/** Lowest nightly rate among current and future seasons; `null` → "Rates on request". */
export function fromNightlyRate(today: string = todayIso()): number | null {
  const upcoming = upcomingSeasons(today);
  return upcoming.length ? Math.min(...upcoming.map((s) => s.nightly)) : null;
}

/** Day after the last published season, from which rates are on request. */
export function ratesOnRequestFrom(): string {
  const last = seasons[seasons.length - 1].end;
  const [y, m, d] = last.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + 1)).toISOString().slice(0, 10);
}

const dateFmt = (opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-US", { ...opts, timeZone: "UTC" });

function parse(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

/** "Aug 6 – Oct 31, 2026" or "Dec 19, 2026 – Jan 3, 2027". */
export function formatSeasonRange(season: Pick<RateSeason, "start" | "end">): string {
  const a = parse(season.start);
  const b = parse(season.end);
  const sameYear = a.getUTCFullYear() === b.getUTCFullYear();
  const start = dateFmt(sameYear ? { month: "short", day: "numeric" } : { month: "short", day: "numeric", year: "numeric" }).format(a);
  const end = dateFmt({ month: "short", day: "numeric", year: "numeric" }).format(b);
  return `${start} – ${end}`;
}

export function formatLongDate(iso: string): string {
  return dateFmt({ month: "long", day: "numeric", year: "numeric" }).format(parse(iso));
}

export function formatUsd(amount: number): string {
  return `$${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(amount)}`;
}

/** "2–7 nights" across the given seasons. */
export function minimumStayRange(list: RateSeason[] = upcomingSeasons()): string | null {
  if (!list.length) return null;
  const mins = list.map((s) => s.minNights);
  const lo = Math.min(...mins);
  const hi = Math.max(...mins);
  return lo === hi ? `${lo} nights` : `${lo}–${hi} nights`;
}

/** "16% VAT", from the registry. */
export function taxLabel(): string {
  return property.pricing.taxes.map((t) => `${Math.round(t.rate * 100)}% ${t.name}`).join(" + ");
}
