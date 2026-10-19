import { property } from "@/data/property";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { formatAmount } from "@/lib/format";

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-title" className="bg-mist py-24 sm:py-32">
      <div className="container-page flex flex-col items-start gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 id="final-cta-title" className="max-w-[44rem] text-[2.5rem] leading-[1.02] sm:text-[3.5rem] lg:text-[4rem]">
            Ready to Stay at {property.name}?
          </h2>
          <p className="mt-6 max-w-[30rem] text-lg text-ink/80">
            Check your dates and send an availability inquiry.
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 md:items-end">
          <ButtonLink href="#availability">Check Availability</ButtonLink>
          <p className="text-sm text-ink/75">
            From {formatAmount(property.pricing.baseNightlyRate)} {property.pricing.baseNightlyRate.currency} / night
          </p>
        </div>
      </div>
    </section>
  );
}
