import { property } from "@/data/property";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { resolveImage } from "@/lib/images";

export function Amenities() {
  const kitchen = resolveImage("kitchen-island-teal");
  return (
    <section id="amenities" aria-labelledby="amenities-title" className="border-t border-line py-24 sm:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading id="amenities-title" eyebrow="Amenities" title="Amenities">
            <p>The essentials, grouped. If there’s something specific you need, mention it in your inquiry.</p>
          </SectionHeading>
          <figure className="reveal mt-10">
            <div className="relative aspect-[4/3] lg:aspect-[5/6]">
              <Photo image={kitchen} sizes="(min-width: 1024px) 30vw, 100vw" />
            </div>
            <figcaption className="mt-3 text-sm text-stone">{kitchen.caption}</figcaption>
          </figure>
        </div>

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
