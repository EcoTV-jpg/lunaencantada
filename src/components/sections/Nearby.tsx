import { property } from "@/data/property";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Nearby() {
  return (
    <section aria-labelledby="nearby-title" className="py-24 sm:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <SectionHeading id="nearby-title" eyebrow="Around the condo" title="What’s Nearby" className="lg:col-span-4" />

        <ol className="lg:col-span-8">
          {property.nearby.map((place) => (
            <li
              key={place.name}
              className="reveal grid gap-1 border-t border-line py-7 last:border-b sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8"
            >
              <div>
                <h3 className="text-[1.875rem] leading-tight sm:text-[2.25rem]">{place.name}</h3>
                <p className="mt-1 text-stone">{place.kind}</p>
              </div>
              {place.distance && <p className="eyebrow text-teal">{place.distance}</p>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
