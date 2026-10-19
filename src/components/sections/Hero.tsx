import { property } from "@/data/property";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Photo } from "@/components/ui/Photo";
import { formatAmount, numberWord } from "@/lib/format";
import { resolveImage } from "@/lib/images";

export function Hero() {
  const image = resolveImage("hero");
  const { capacity, pricing } = property;

  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="lg:grid lg:min-h-[min(calc(100svh-5rem),56rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)]">
        <div className="container-page flex flex-col justify-center pt-12 pb-12 sm:pt-16 lg:mr-0 lg:max-w-none lg:py-20 lg:pr-16 lg:pl-[max(3.5rem,calc((100vw-84rem)/2+3.5rem))]">
          <p className="eyebrow text-teal">Playa del Carmen · Mexico</p>

          <h1 id="hero-title" className="mt-6 lg:mt-8">
            <span className="block text-[3rem] leading-[0.95] sm:text-[4.25rem] xl:text-[5.25rem]">
              {property.name}
            </span>
            <span className="sr-only"> — </span>
            <span className="mt-4 block font-serif text-[1.5rem] leading-tight italic text-teal sm:text-[1.875rem] xl:text-[2.125rem]">
              Beachfront Condo in Playa del Carmen
            </span>
          </h1>

          <p className="mt-8 max-w-[34rem] text-[1.0625rem] leading-relaxed text-stone sm:text-lg">
            A {numberWord(capacity.bedrooms)}-bedroom beachfront condominium for up to{" "}
            {numberWord(capacity.maxGuests)} guests, with a private ocean-view terrace, direct beach access and a
            shared infinity pool in {property.address.area}, {property.address.city}.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="#availability">Check Availability</ButtonLink>
            <ButtonLink href="#photos" variant="secondary">
              View Photos
            </ButtonLink>
          </div>

          <p className="mt-6 text-sm text-stone">
            From <span className="font-medium text-ink">{formatAmount(pricing.baseNightlyRate)}</span>{" "}
            {pricing.baseNightlyRate.currency} / night
          </p>
        </div>

        <div className="relative aspect-[4/5] sm:aspect-[3/2] lg:aspect-auto">
          <Photo image={image} sizes="(min-width: 1024px) 53vw, 100vw" preload />
        </div>
      </div>
    </section>
  );
}
