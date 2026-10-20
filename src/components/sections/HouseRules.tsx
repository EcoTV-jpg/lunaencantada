import { property } from "@/data/property";
import { Icon, type IconName } from "@/components/ui/Icon";
import {
  formatLongDate,
  formatSeasonRange,
  formatUsd,
  ratesOnRequestFrom,
  taxLabel,
  upcomingSeasons,
} from "@/lib/pricing";

/** "Things to know": seasonal rates, house rules and cleaning. Unconfirmed rules are omitted. */
export function HouseRules() {
  const { capacity, stay, cleaning, pricing } = property;
  const seasons = upcomingSeasons();

  const rules: { icon: IconName; label: string; value: string; note?: string }[] = [
    {
      icon: "guests",
      label: "Maximum guests",
      value: String(capacity.maxGuests),
      note: `Including children under 12 and babies.`,
    },
    { icon: "child", label: "Children", value: capacity.childrenAllowed ? "Allowed" : "Not allowed" },
    { icon: "noPets", label: "Pets", value: stay.petsAllowed ? "Allowed" : "Not allowed" },
    ...(stay.smokingAllowed === null
      ? []
      : [
          {
            icon: "noSmoking" as IconName,
            label: "Smoking",
            value: stay.smokingAllowed ? "Allowed" : "Not allowed",
            note: stay.smokingNote,
          },
        ]),
    ...(stay.eventsAllowed === null
      ? []
      : [{ icon: "noParty" as IconName, label: "Parties & events", value: stay.eventsAllowed ? "Allowed" : "Not allowed" }]),
    { icon: "moon", label: "Quiet hours", value: stay.quietHours },
    { icon: "calendar", label: "Long-term stays", value: stay.longTermStays ? "Allowed" : "Not allowed" },
    { icon: "clock", label: "Check-in", value: stay.checkIn },
    { icon: "clock", label: "Check-out", value: stay.checkOut },
  ];

  const cell = "max-sm:flex max-sm:justify-between max-sm:gap-4 max-sm:py-0.5 sm:py-3 sm:pr-4";
  const label = "text-muted sm:hidden";

  return (
    <div className="border-t border-line py-12 md:py-16">
      <div className="container-page">
        <section aria-labelledby="rates-title" id="rates">
          <h2 id="rates-title" className="title-section">
            Rates
          </h2>
          <p className="mt-2 text-base text-muted">
            Seasonal rates per night and per week, in {pricing.currency}.
          </p>

          <table className="mt-6 w-full text-left text-[0.9375rem] lg:max-w-[56rem]">
            <thead className="max-sm:sr-only">
              <tr className="border-b border-ink/80 text-sm">
                <th scope="col" className="py-2 pr-4 font-semibold">
                  Dates
                </th>
                <th scope="col" className="py-2 pr-4 font-semibold">
                  Nightly
                </th>
                <th scope="col" className="py-2 pr-4 font-semibold">
                  Weekly
                </th>
                <th scope="col" className="py-2 font-semibold">
                  Minimum stay
                </th>
              </tr>
            </thead>
            <tbody>
              {seasons.map((s) => (
                <tr key={s.start} className="border-b border-line max-sm:block max-sm:py-3">
                  <th scope="row" className="font-semibold max-sm:block max-sm:pb-1 sm:py-3 sm:pr-4">
                    {formatSeasonRange(s)}
                  </th>
                  <td className={cell}>
                    <span className={label}>Nightly</span>
                    {formatUsd(s.nightly)} / night
                  </td>
                  <td className={cell}>
                    <span className={label}>Weekly</span>
                    {s.weekly === null ? <span className="text-muted">—</span> : `${formatUsd(s.weekly)} / week`}
                  </td>
                  <td className={`${cell} sm:pr-0`}>
                    <span className={label}>Minimum stay</span>
                    {s.minNights} nights
                  </td>
                </tr>
              ))}
              <tr className="border-b border-line max-sm:block max-sm:py-3">
                <th scope="row" className="font-semibold max-sm:block max-sm:pb-1 sm:py-3 sm:pr-4">
                  From {formatLongDate(ratesOnRequestFrom())}
                </th>
                <td colSpan={3} className="text-muted sm:py-3">
                  Rates on request
                </td>
              </tr>
            </tbody>
          </table>

          <ul className="mt-4 space-y-1 text-sm text-muted">
            <li>
              All rates in {pricing.currency} and subject to {taxLabel()}.
            </li>
            <li>
              Cleaning fee: {formatUsd(cleaning.fee.amount)} {cleaning.fee.currency} per stay.
            </li>
            <li>{pricing.securityDeposit.note}</li>
          </ul>
        </section>

        <div className="mt-12 grid gap-12 border-t border-line pt-12 md:mt-16 md:grid-cols-2 md:pt-16 lg:gap-16">
          <section aria-labelledby="rules-title" id="house-rules">
            <h2 id="rules-title" className="title-section">
              House Rules
            </h2>
            <dl className="mt-6 space-y-4">
              {rules.map((rule) => (
                <div key={rule.label} className="flex gap-4">
                  <Icon name={rule.icon} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-4">
                      <dt className="text-[0.9375rem]">{rule.label}</dt>
                      <dd className="ml-auto text-right text-[0.9375rem] font-semibold">{rule.value}</dd>
                    </div>
                    {rule.note && <p className="mt-0.5 text-sm text-muted">{rule.note}</p>}
                  </div>
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
          </section>
        </div>
      </div>
    </div>
  );
}
