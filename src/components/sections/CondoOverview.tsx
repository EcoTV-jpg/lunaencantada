import { property } from "@/data/property";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { numberWord } from "@/lib/format";
import { resolveImage } from "@/lib/images";

export function CondoOverview() {
  const living = resolveImage("open-plan-living");
  const kitchen = resolveImage("kitchen");
  const { capacity, address } = property;

  return (
    <section id="condo" aria-labelledby="condo-title" className="border-t border-line py-10 md:py-12">
      <SectionHeading id="condo-title" title={`Inside ${property.name}`} />

      <div className="mt-4 space-y-4 text-base leading-relaxed">
        <p>
          {property.name} is a {numberWord(capacity.bedrooms)}-bedroom beachfront condominium in {address.area},{" "}
          {address.city}, {address.country}. It accommodates up to {numberWord(capacity.maxGuests)} guests and includes
          one King bed and two Queen beds, with {numberWord(capacity.bathrooms)} bathrooms.
        </p>
        <p>
          The private terrace looks out to the ocean. Inside, there is a fully equipped kitchen, a washer and dryer,
          Wi-Fi and air conditioning. Step out to the beach directly from the condominium, or spend the afternoon at
          the shared infinity pool. Fifth Avenue is about a minute away on foot.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-2">
        <figure className="col-span-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-md">
            <Photo image={living} sizes="(min-width: 1024px) 38vw, 66vw" />
          </div>
          <figcaption className="mt-2 text-sm text-muted">{living.caption}</figcaption>
        </figure>
        <figure>
          <div className="relative aspect-[2/3] overflow-hidden rounded-md">
            <Photo image={kitchen} sizes="(min-width: 1024px) 19vw, 33vw" compact />
          </div>
          <figcaption className="mt-2 text-sm text-muted">{kitchen.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
