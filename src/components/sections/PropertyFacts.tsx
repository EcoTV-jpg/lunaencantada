import { property } from "@/data/property";
import { Icon, type IconName } from "@/components/ui/Icon";
import { minimumStayRange } from "@/lib/pricing";

const { capacity, address, stay } = property;
const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

const highlights: { icon: IconName; title: string; text: string }[] = [
  { icon: "beach", title: "Beachfront", text: "Direct beach access from the condominium." },
  { icon: "pool", title: "Shared infinity pool", text: "Shared by the condominium — the pool is not private." },
  { icon: "terrace", title: "Private balcony and oceanfront views", text: "A private balcony, in a condominium with oceanfront views." },
  { icon: "walk", title: "About 1 minute to Fifth Avenue", text: "Approximately a minute on foot." },
];

/** Overview: the at-a-glance facts, stated in text (not icons alone). */
export function PropertyFacts() {
  return (
    <section aria-labelledby="overview-title" className="pb-8">
      <h2 id="overview-title" className="title-section">
        Beachfront condominium in {address.area}, {address.city}
      </h2>
      <p className="mt-1.5 text-base text-ink">
        {plural(capacity.maxGuests, "guest")} · {plural(capacity.bedrooms, "bedroom")} ·{" "}
        {plural(capacity.beds, "bed")} · {plural(capacity.bathrooms, "bath")}
      </p>

      <ul className="mt-8 space-y-6 border-t border-line pt-8">
        {highlights.map((h) => (
          <li key={h.title} className="flex gap-6">
            <Icon name={h.icon} className="mt-0.5 size-7" />
            <div>
              <p className="font-semibold">{h.title}</p>
              <p className="text-[0.9375rem] text-muted">{h.text}</p>
            </div>
          </li>
        ))}
        <li className="flex gap-6">
          <Icon name="clock" className="mt-0.5 size-7" />
          <div>
            <p className="font-semibold">
              Check-in {stay.checkIn} · Check-out {stay.checkOut}
            </p>
            <p className="text-[0.9375rem] text-muted">
              {minimumStayRange() ? `Minimum stay ${minimumStayRange()}, depending on the season. ` : ""}
              Long-term stays welcome.
            </p>
          </div>
        </li>
      </ul>
    </section>
  );
}
