import { property } from "@/data/property";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { numberWord } from "@/lib/format";
import { resolveImage } from "@/lib/images";

export function Bedrooms() {
  const [first, ...rest] = property.bedrooms;
  const bathroom = resolveImage("bathroom");
  const { capacity } = property;

  return (
    <section id="bedrooms" aria-labelledby="bedrooms-title" className="py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id="bedrooms-title" eyebrow="Bedrooms & Bathrooms" title="Where You’ll Sleep">
          <p>
            {numberWord(capacity.bedrooms).replace(/^./, (c) => c.toUpperCase())} bedrooms with one bed each — a King
            and two Queens — for up to {numberWord(capacity.maxGuests)} guests.
          </p>
        </SectionHeading>

        <div className="mt-16 grid gap-x-6 gap-y-12 md:grid-cols-12">
          <article className="reveal md:col-span-7" aria-labelledby="bedroom-1">
            <div className="relative aspect-[4/3] md:aspect-[7/6]">
              <Photo image={resolveImage(first.imageId)} sizes="(min-width: 768px) 58vw, 100vw" />
            </div>
            <BedroomCaption id="bedroom-1" name={first.name} bed={first.bed} />
          </article>

          <div className="grid gap-y-12 sm:grid-cols-2 sm:gap-x-6 md:col-span-5 md:grid-cols-1">
            {rest.map((room, i) => (
              <article key={room.name} className="reveal" aria-labelledby={`bedroom-${i + 2}`}>
                <div className="relative aspect-[4/3] md:aspect-[16/10]">
                  <Photo image={resolveImage(room.imageId)} sizes="(min-width: 768px) 40vw, (min-width: 640px) 50vw, 100vw" />
                </div>
                <BedroomCaption id={`bedroom-${i + 2}`} name={room.name} bed={room.bed} />
              </article>
            ))}
          </div>
        </div>

        <div className="mt-20 grid items-end gap-8 border-t border-line pt-12 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-5">
            <h3 className="text-[2rem] leading-tight">Bathrooms</h3>
            <p className="mt-3 max-w-[26rem] text-stone">
              {property.name} has {numberWord(capacity.bathrooms)} bathrooms.
            </p>
          </div>
          <div className="relative aspect-[16/9] md:col-span-7">
            <Photo image={bathroom} sizes="(min-width: 768px) 58vw, 100vw" />
          </div>
        </div>
      </div>
    </section>
  );
}

function BedroomCaption({ id, name, bed }: { id: string; name: string; bed: string }) {
  return (
    <div className="mt-5 flex items-baseline justify-between gap-4 border-b border-line pb-4">
      <h3 id={id} className="text-[1.75rem] leading-none">
        {name}
      </h3>
      <p className="eyebrow text-stone">{bed}</p>
    </div>
  );
}
