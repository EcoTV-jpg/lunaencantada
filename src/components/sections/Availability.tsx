import { property } from "@/data/property";
import { formatAmount } from "@/lib/format";
import { AvailabilityForm } from "./AvailabilityForm";

export function Availability() {
  const { pricing, stay, capacity } = property;

  const terms = [
    { label: "Check-in", value: stay.checkIn },
    { label: "Check-out", value: stay.checkOut },
    { label: "Guests", value: `Up to ${capacity.maxGuests}` },
    { label: "Minimum stay", value: stay.minimumNights ? `${stay.minimumNights} nights` : "None" },
  ];

  return (
    <section id="availability" aria-labelledby="availability-title" className="bg-shell py-24 sm:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow text-teal">Availability</p>
          <h2 id="availability-title" className="mt-5 text-[2.25rem] leading-[1.05] sm:text-[2.75rem] lg:text-[3.25rem]">
            Check Availability
          </h2>
          <p className="mt-6 max-w-[30rem] text-[1.0625rem] leading-relaxed text-stone">
            Send your dates and number of guests. Availability and the rate for your stay are confirmed personally,
            by reply to your inquiry.
          </p>

          <p className="mt-10 flex items-baseline gap-2 text-ink">
            <span className="text-sm text-stone">From</span>
            <span className="font-serif text-[3.25rem] leading-none">{formatAmount(pricing.baseNightlyRate)}</span>
            <span className="text-sm text-stone">{pricing.baseNightlyRate.currency} / night</span>
          </p>
          <p className="mt-3 max-w-[28rem] text-sm text-stone">
            Rates can vary by date. Your reply confirms the rate for your dates and any applicable fees. See{" "}
            <a href="#cleaning" className="link-underline text-ink">
              cleaning
            </a>
            .
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-x-8 border-t border-line">
            {terms.map((t) => (
              <div key={t.label} className="border-b border-line py-4">
                <dt className="text-sm text-stone">{t.label}</dt>
                <dd className="mt-0.5 text-ink">{t.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-7">
          <AvailabilityForm maxGuests={capacity.maxGuests} />
        </div>
      </div>
    </section>
  );
}
