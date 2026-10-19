import { property } from "@/data/property";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** House rules and cleaning, side by side. Unconfirmed rules are omitted. */
export function HouseRules() {
  const { capacity, stay, cleaning } = property;

  const rules = [
    { label: "Maximum guests", value: String(capacity.maxGuests) },
    { label: "Children", value: capacity.childrenAllowed ? "Allowed" : "Not allowed" },
    { label: "Pets", value: stay.petsAllowed ? "Allowed" : "Not allowed" },
    { label: "Check-in", value: stay.checkIn },
    { label: "Check-out", value: stay.checkOut },
    ...(stay.smokingAllowed === null
      ? []
      : [{ label: "Smoking", value: stay.smokingAllowed ? "Allowed" : "Not allowed" }]),
    ...(stay.eventsAllowed === null
      ? []
      : [{ label: "Parties & events", value: stay.eventsAllowed ? "Allowed" : "Not allowed" }]),
  ];

  return (
    <div className="border-t border-line bg-paper py-24 sm:py-32">
      <div className="container-page grid gap-20 lg:grid-cols-2 lg:gap-24">
        <section aria-labelledby="rules-title" id="house-rules">
          <SectionHeading id="rules-title" eyebrow="Good to know" title="House Rules" />
          <dl className="mt-10 border-t border-ink">
            {rules.map((rule) => (
              <div key={rule.label} className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                <dt className="text-stone">{rule.label}</dt>
                <dd className="font-serif text-[1.375rem] text-ink">{rule.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="cleaning-title" id="cleaning">
          <SectionHeading id="cleaning-title" eyebrow="Housekeeping" title="Cleaning" />
          <dl className="mt-10 border-t border-ink">
            {cleaning.rules.map((rule) => (
              <div key={rule.label} className="border-b border-line py-5">
                <dt className="eyebrow text-teal">{rule.label}</dt>
                <dd className="mt-2 font-serif text-[1.375rem] leading-snug text-ink">{rule.description}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 max-w-[30rem] text-sm text-stone">
            Cleaning for your exact dates is confirmed in the reply to your inquiry.
          </p>
        </section>
      </div>
    </div>
  );
}
