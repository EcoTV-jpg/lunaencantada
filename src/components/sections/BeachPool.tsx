import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { resolveImage } from "@/lib/images";

const points = [
  {
    title: "Direct beach access",
    text: "The condominium is beachfront. Walk from the property straight onto the sand.",
  },
  {
    title: "Shared infinity pool",
    text: "The condominium’s infinity pool is shared — a second place to swim when you’d rather skip the sand.",
  },
  {
    title: "Private ocean-view terrace",
    text: "Your own terrace, looking out to the ocean, for morning coffee or the end of the day.",
  },
];

export function BeachPool() {
  const pool = resolveImage("infinity-pool");
  const beach = resolveImage("beach");

  return (
    <section id="beach" aria-labelledby="beach-title" className="on-dark bg-ink py-24 text-paper sm:py-32">
      <div className="container-page">
        <SectionHeading id="beach-title" eyebrow="Beach & Pool" title="Beachfront Living" tone="dark">
          <p>Direct access to the beach, a shared infinity pool, and the ocean in view from your own terrace.</p>
        </SectionHeading>

        <figure className="reveal mt-14">
          <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]">
            <Photo image={pool} sizes="(min-width: 1344px) 1232px, 100vw" />
          </div>
          <figcaption className="mt-3 text-sm text-foam">{pool.caption}</figcaption>
        </figure>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <ol className="divide-y divide-line-dark border-y border-line-dark lg:col-span-7 lg:self-center">
            {points.map((point, i) => (
              <li key={point.title} className="grid gap-2 py-7 sm:grid-cols-[4rem_1fr] sm:py-9">
                <span aria-hidden="true" className="font-serif text-lg italic text-sand">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-[1.75rem] leading-tight !text-paper">{point.title}</h3>
                  <p className="mt-2 max-w-[32rem] text-foam">{point.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <figure className="reveal lg:col-span-5">
            <div className="relative aspect-[4/5]">
              <Photo image={beach} sizes="(min-width: 1024px) 40vw, 100vw" />
            </div>
            <figcaption className="mt-3 text-sm text-foam">{beach.caption}</figcaption>
          </figure>
        </div>

        <p className="mt-12 max-w-[40rem] text-sm text-foam">
          Neither the beach nor the pool is private. Sea and beach conditions on the Caribbean coast change with the
          season and the weather.
        </p>
      </div>
    </section>
  );
}
