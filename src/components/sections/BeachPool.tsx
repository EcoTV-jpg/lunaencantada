import { Icon, type IconName } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { resolveImage } from "@/lib/images";

const points: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "beach",
    title: "Direct beach access",
    text: "The condominium is beachfront. Walk from the property straight onto the sand.",
  },
  {
    icon: "pool",
    title: "Shared infinity pool",
    text: "The condominium’s infinity pool is shared — a second place to swim when you’d rather skip the sand.",
  },
  {
    icon: "terrace",
    title: "Private ocean-view terrace",
    text: "Your own terrace, looking out to the ocean, for morning coffee or the end of the day.",
  },
];

export function BeachPool() {
  const pool = resolveImage("infinity-pool");
  const beach = resolveImage("beach");

  return (
    <section id="beach" aria-labelledby="beach-title" className="border-t border-line py-10 md:py-12">
      <SectionHeading id="beach-title" title="Beachfront Living">
        <p>Direct access to the beach, a shared infinity pool, and the ocean in view from your own terrace.</p>
      </SectionHeading>

      <div className="mt-6 grid grid-cols-2 gap-2">
        <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-md">
          <Photo image={pool} sizes="(min-width: 1024px) 58vw, 100vw" />
        </div>
      </div>

      <div className="mt-8 grid gap-8 sm:grid-cols-[1fr_14rem] sm:items-start">
        <ul className="space-y-6">
          {points.map((p) => (
            <li key={p.title} className="flex gap-5">
              <Icon name={p.icon} className="mt-0.5 size-7" />
              <div>
                <h3 className="text-base tracking-normal">{p.title}</h3>
                <p className="mt-0.5 text-[0.9375rem] text-muted">{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
        <figure>
          <div className="relative aspect-[4/5] overflow-hidden rounded-md">
            <Photo image={beach} sizes="(min-width: 640px) 14rem, 100vw" compact />
          </div>
          <figcaption className="mt-2 text-sm text-muted">{beach.caption}</figcaption>
        </figure>
      </div>

      <p className="mt-8 rounded-md bg-faint p-4 text-sm text-muted">
        Neither the beach nor the pool is private. Sea and beach conditions on the Caribbean coast change with the
        season and the weather.
      </p>
    </section>
  );
}
