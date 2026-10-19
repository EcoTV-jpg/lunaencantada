import { property } from "@/data/property";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function GettingHere() {
  const { location } = property;
  return (
    <section aria-labelledby="getting-here-title" className="border-t border-line bg-paper py-24 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <SectionHeading id="getting-here-title" eyebrow="Arriving" title="Getting Here" className="lg:col-span-4" />
        <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8">
          <div>
            <h3 className="text-[1.5rem] leading-tight">By air</h3>
            <p className="mt-3 text-stone">
              {location.airport.name} is {location.airport.distance.charAt(0).toLowerCase()}
              {location.airport.distance.slice(1)}.
            </p>
          </div>
          <div>
            <h3 className="text-[1.5rem] leading-tight">By bus or car</h3>
            <p className="mt-3 text-stone">
              The nearest bus terminal is {location.busTerminal}. If you arrive by car, there is secure parking inside
              the property.
            </p>
          </div>
          <p className="text-sm text-stone sm:col-span-2">
            Questions about your arrival? Include them in your availability inquiry.
          </p>
        </div>
      </div>
    </section>
  );
}
