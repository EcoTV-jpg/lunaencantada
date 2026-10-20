import { property } from "@/data/property";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons: Record<string, IconName> = {
  "The beach": "beach",
  "Fifth Avenue": "walk",
  Walmart: "cart",
  "ADO Turística": "bus",
};

export function Nearby() {
  return (
    <section aria-labelledby="nearby-title" className="border-t border-line py-12 md:py-16">
      <div className="container-page">
        <SectionHeading id="nearby-title" title="What’s Nearby" />
        <ul className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {property.nearby.map((place) => (
            <li key={place.name} className="flex gap-4">
              <Icon name={icons[place.name] ?? "pin"} />
              <div>
                <h3 className="text-base tracking-normal">{place.name}</h3>
                <p className="text-[0.9375rem] text-muted">{place.kind}</p>
                {place.distance && <p className="mt-1 text-sm font-semibold text-ink">{place.distance}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
