import { property } from "@/data/property";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Photo } from "@/components/ui/Photo";
import { formatUsd, fromNightlyRate } from "@/lib/pricing";
import { resolveImage } from "@/lib/images";

export function FinalCta() {
  const image = resolveImage("garden-fountain");
  const fromRate = fromNightlyRate();
  return (
    <section aria-labelledby="final-cta-title" className="bg-faint py-12 md:py-16">
      <div className="container-page">
        <div className="grid overflow-hidden rounded-lg bg-white md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[24rem]">
            <Photo image={image} sizes="(min-width: 768px) 40vw, 100vw" />
          </div>
          <div className="flex flex-col justify-center p-8 md:p-12">
            <h2 id="final-cta-title" className="text-[1.625rem] leading-tight md:text-[2rem]">
              Ready to Stay at {property.name}?
            </h2>
            <p className="mt-3 text-base text-muted">Check your dates and send an availability inquiry.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ButtonLink href="#availability">Check availability</ButtonLink>
              <p className="text-sm text-muted">
                {fromRate === null ? (
                  <span className="font-semibold text-ink">Rates on request</span>
                ) : (
                  <>
                    From <span className="font-semibold text-ink">{formatUsd(fromRate)}</span> {property.pricing.currency}{" "}
                    / night
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
