import { property } from "@/data/property";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { numberWord } from "@/lib/format";
import { resolveImage } from "@/lib/images";

export function Bedrooms() {
  const bathrooms = [resolveImage("bathroom"), resolveImage("bathroom-2")];
  const { capacity } = property;

  return (
    <section id="bedrooms" aria-labelledby="bedrooms-title" className="border-t border-line py-10 md:py-12">
      <SectionHeading id="bedrooms-title" title="Where You’ll Sleep" />

      <ul className="mt-6 grid gap-x-4 gap-y-8 sm:grid-cols-3">
        {property.bedrooms.map((room) => (
          <li key={room.name}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-md">
              <Photo image={resolveImage(room.imageId)} sizes="(min-width: 1024px) 19vw, (min-width: 640px) 31vw, 100vw" compact />
            </div>
            <h3 className="mt-3 text-base tracking-normal">{room.name}</h3>
            <p className="text-[0.9375rem] text-muted">
              1 {room.bed.toLowerCase()} · {room.sleeps} guests
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-10 grid gap-x-4 gap-y-4 sm:grid-cols-3">
        <div className="sm:pt-1">
          <h3 className="text-base tracking-normal">Bathrooms</h3>
          <p className="text-[0.9375rem] text-muted">
            {property.name} has {numberWord(capacity.bathrooms)} bathrooms.
          </p>
        </div>
        {/* Portrait source photos (~520px wide), kept at a modest size. */}
        {bathrooms.map((bath) => (
          <div key={bath.id} className="relative aspect-[3/4] overflow-hidden rounded-md max-sm:hidden">
            <Photo image={bath} sizes="(min-width: 1024px) 19vw, 31vw" compact />
          </div>
        ))}
        <div className="grid grid-cols-2 gap-2 sm:hidden">
          {bathrooms.map((bath) => (
            <div key={bath.id} className="relative aspect-[3/4] overflow-hidden rounded-md">
              <Photo image={bath} sizes="50vw" compact />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
