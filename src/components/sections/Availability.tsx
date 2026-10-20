import { property } from "@/data/property";
import { formatUsd, fromNightlyRate, taxLabel } from "@/lib/pricing";
import { AvailabilityForm } from "./AvailabilityForm";

/** Booking card: sticky beside the listing on desktop, in-flow on mobile. */
export function Availability() {
  const { pricing, stay } = property;
  const fromRate = fromNightlyRate();

  return (
    <section id="availability" aria-labelledby="availability-title" className="lg:sticky lg:top-28">
      <div className="rounded-lg border border-deco bg-white p-6 shadow-[var(--shadow-card)]">
        <h2 id="availability-title" className="text-sm font-semibold tracking-normal text-muted">
          Check Availability
        </h2>
        {fromRate === null ? (
          <p className="mt-1 text-[1.375rem] font-semibold tracking-tight">Rates on request</p>
        ) : (
          <p className="mt-1 flex items-baseline gap-1.5">
            <span className="text-[0.9375rem]">From</span>
            <span className="text-[1.375rem] font-semibold tracking-tight">{formatUsd(fromRate)}</span>
            <span className="text-[0.9375rem]">{pricing.currency} / night</span>
          </p>
        )}

        <div className="mt-5">
          <AvailabilityForm maxGuests={property.capacity.maxGuests} />
        </div>
      </div>

      <div className="mt-4 space-y-1 px-2 text-sm text-muted">
        <p>
          Availability and the rate for your dates are confirmed personally, by reply. Rates vary by season and are
          subject to {taxLabel()}; minimum stays apply (see{" "}
          <a href="#rates" className="link-underline">
            rates
          </a>{" "}
          and{" "}
          <a href="#cleaning" className="link-underline">
            cleaning
          </a>
          ).
        </p>
        <p>
          Check-in {stay.checkIn} · Check-out {stay.checkOut}
        </p>
      </div>
    </section>
  );
}
