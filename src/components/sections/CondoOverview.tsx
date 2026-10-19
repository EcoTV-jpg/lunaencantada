import { property } from "@/data/property";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { numberWord } from "@/lib/format";
import { resolveImage } from "@/lib/images";

export function CondoOverview() {
  const living = resolveImage("living-room");
  const kitchen = resolveImage("kitchen");
  const { capacity, address } = property;

  return (
    <section id="condo" aria-labelledby="condo-title" className="bg-shell py-24 sm:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:col-span-7">
          <div className="reveal relative aspect-[4/3] lg:aspect-[6/5]">
            <Photo image={living} sizes="(min-width: 1024px) 55vw, 100vw" />
          </div>
          <div className="reveal relative mt-4 ml-auto aspect-[4/5] w-1/2 sm:w-2/5 lg:absolute lg:-bottom-20 lg:-right-10 lg:mt-0 lg:w-[38%] lg:border-8 lg:border-shell">
            <Photo image={kitchen} sizes="(min-width: 1024px) 22vw, 50vw" compact />
          </div>
        </div>

        <div className="lg:col-span-5 lg:pt-6">
          <SectionHeading id="condo-title" eyebrow="The Condo" title={`Inside ${property.name}`} />

          <div className="mt-8 space-y-5 text-[1.0625rem] leading-relaxed text-charcoal">
            <p className="font-serif text-[1.5rem] leading-snug text-ink">
              Your beachfront base in {address.city}.
            </p>
            <p>
              {property.name} is a {numberWord(capacity.bedrooms)}-bedroom beachfront condominium in {address.area},{" "}
              {address.city}, {address.country}. It accommodates up to {numberWord(capacity.maxGuests)} guests and
              includes one King bed and two Queen beds, with {numberWord(capacity.bathrooms)} bathrooms.
            </p>
            <p>
              The private terrace looks out to the ocean. Inside, there is a fully equipped kitchen, a washer and
              dryer, Wi-Fi and air conditioning.
            </p>
            <p>
              Step out to the beach directly from the condominium, or spend the afternoon at the shared infinity
              pool. Fifth Avenue is about a minute away on foot.
            </p>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-line pt-8 text-sm">
            <div>
              <dt className="text-stone">Check-in</dt>
              <dd className="mt-1 font-medium text-ink">{property.stay.checkIn}</dd>
            </div>
            <div>
              <dt className="text-stone">Check-out</dt>
              <dd className="mt-1 font-medium text-ink">{property.stay.checkOut}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
