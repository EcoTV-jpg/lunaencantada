import { property } from "@/data/property";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Photo } from "@/components/ui/Photo";
import { formatAmount } from "@/lib/format";
import { resolveImage } from "@/lib/images";

export function FinalCta() {
  const image = resolveImage("garden-fountain");
  return (
    <section aria-labelledby="final-cta-title" className="bg-mist">
      <div className="grid lg:grid-cols-2">
        <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[36rem]">
          <Photo image={image} sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
        <div className="container-page flex flex-col justify-center py-20 sm:py-24 lg:mx-0 lg:max-w-[42rem] lg:px-16">
          <h2 id="final-cta-title" className="text-[2.5rem] leading-[1.02] sm:text-[3.25rem] lg:text-[3.5rem]">
            Ready to Stay at {property.name}?
          </h2>
          <p className="mt-6 max-w-[30rem] text-lg text-ink/80">Check your dates and send an availability inquiry.</p>
          <div className="mt-10 flex flex-col items-start gap-3">
            <ButtonLink href="#availability">Check Availability</ButtonLink>
            <p className="text-sm text-ink/75">
              From {formatAmount(property.pricing.baseNightlyRate)} {property.pricing.baseNightlyRate.currency} / night
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
