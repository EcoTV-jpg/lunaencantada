import { property } from "@/data/property";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Amenities() {
  return (
    <section id="amenities" aria-labelledby="amenities-title" className="border-t border-line py-24 sm:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-12">
        <SectionHeading id="amenities-title" eyebrow="Amenities" title="Amenities" className="lg:col-span-4">
          <p>The essentials, grouped. If there’s something specific you need, mention it in your inquiry.</p>
        </SectionHeading>

        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-8">
          {property.amenityGroups.map((group) => (
            <div key={group.title}>
              <h3 className="eyebrow border-b border-ink pb-3 !font-sans !text-teal">{group.title}</h3>
              <ul className="divide-y divide-line">
                {group.items.map((item) => (
                  <li key={item.label} className="py-3.5">
                    <span className="font-serif text-[1.375rem] leading-snug text-ink">{item.label}</span>
                    {item.note && <p className="mt-1 text-sm text-stone">{item.note}</p>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
