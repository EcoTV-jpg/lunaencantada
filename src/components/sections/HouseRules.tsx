import { property } from "@/data/property";
import { Icon, type IconName } from "@/components/ui/Icon";

/** "Things to know": house rules and cleaning. Unconfirmed rules are omitted. */
export function HouseRules() {
  const { capacity, stay, cleaning } = property;

  const rules: { icon: IconName; label: string; value: string }[] = [
    { icon: "guests", label: "Maximum guests", value: String(capacity.maxGuests) },
    { icon: "child", label: "Children", value: capacity.childrenAllowed ? "Allowed" : "Not allowed" },
    { icon: "noPets", label: "Pets", value: stay.petsAllowed ? "Allowed" : "Not allowed" },
    { icon: "clock", label: "Check-in", value: stay.checkIn },
    { icon: "clock", label: "Check-out", value: stay.checkOut },
    ...(stay.smokingAllowed === null
      ? []
      : [{ icon: "home" as IconName, label: "Smoking", value: stay.smokingAllowed ? "Allowed" : "Not allowed" }]),
    ...(stay.eventsAllowed === null
      ? []
      : [{ icon: "home" as IconName, label: "Parties & events", value: stay.eventsAllowed ? "Allowed" : "Not allowed" }]),
  ];

  return (
    <div className="border-t border-line py-12 md:py-16">
      <div className="container-page grid gap-12 md:grid-cols-2 lg:gap-16">
        <section aria-labelledby="rules-title" id="house-rules">
          <h2 id="rules-title" className="title-section">
            House Rules
          </h2>
          <dl className="mt-6 space-y-4">
            {rules.map((rule) => (
              <div key={rule.label} className="flex items-center gap-4">
                <Icon name={rule.icon} />
                <dt className="text-[0.9375rem]">{rule.label}</dt>
                <dd className="ml-auto text-[0.9375rem] font-semibold">{rule.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="cleaning-title" id="cleaning">
          <h2 id="cleaning-title" className="title-section">
            Cleaning
          </h2>
          <dl className="mt-6 space-y-4">
            {cleaning.rules.map((rule) => (
              <div key={rule.label} className="flex gap-4">
                <Icon name="sparkle" />
                <div>
                  <dt className="text-[0.9375rem] font-semibold">{rule.label}</dt>
                  <dd className="text-[0.9375rem] text-muted">{rule.description}</dd>
                </div>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm text-muted">Cleaning for your exact dates is confirmed in the reply to your inquiry.</p>
        </section>
      </div>
    </div>
  );
}
