import { property } from "@/data/property";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function GettingHere() {
  const { location } = property;
  return (
    <section aria-labelledby="getting-here-title" className="border-t border-line py-12 md:py-16">
      <div className="container-page">
        <SectionHeading id="getting-here-title" title="Getting Here">
          <p>Questions about your arrival? Include them in your availability inquiry.</p>
        </SectionHeading>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:max-w-[56rem]">
          <div className="flex gap-4">
            <Icon name="plane" />
            <div>
              <h3 className="text-base tracking-normal">By air</h3>
              <p className="text-[0.9375rem] text-muted">
                {location.airport.name} is {location.airport.distance.charAt(0).toLowerCase()}
                {location.airport.distance.slice(1)}.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Icon name="car" />
            <div>
              <h3 className="text-base tracking-normal">By bus or car</h3>
              <p className="text-[0.9375rem] text-muted">
                The nearest bus terminal is {location.busTerminal}. If you arrive by car, there is secure parking inside
                the property.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
