import { property } from "@/data/property";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Icons for the confirmed amenities, keyed by their label in the registry. */
const icons: Record<string, IconName> = {
  "Wi-Fi": "wifi",
  "Air conditioning": "snowflake",
  Washer: "washer",
  Dryer: "dryer",
  "Fully equipped kitchen": "kitchen",
  "Direct beach access": "beach",
  "Private ocean-view terrace": "terrace",
  "Shared infinity pool": "pool",
  Elevator: "elevator",
  "Secure on-property parking": "car",
  "24-hour security": "shield",
};

export function Amenities() {
  return (
    <section id="amenities" aria-labelledby="amenities-title" className="border-t border-line py-10 md:py-12">
      <SectionHeading id="amenities-title" title="Amenities" />

      <div className="mt-6 grid gap-x-8 gap-y-8 sm:grid-cols-2">
        {property.amenityGroups.map((group) => (
          <div key={group.title}>
            <h3 className="text-sm font-semibold tracking-normal text-muted">{group.title}</h3>
            <ul className="mt-3 space-y-4">
              {group.items.map((item) => (
                <li key={item.label} className="flex gap-4">
                  <Icon name={icons[item.label] ?? "home"} />
                  <div>
                    <span className="text-base">{item.label}</span>
                    {item.note && <p className="mt-0.5 text-sm text-muted">{item.note}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
