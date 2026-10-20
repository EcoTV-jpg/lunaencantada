import { property } from "@/data/property";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { resolveImage } from "@/lib/images";

/**
 * Listing-style hero: title row above a five-photo grid. On small screens
 * the main photo leads edge to edge (visual order only — the H1 stays
 * first in the DOM).
 */
export function Hero() {
  const main = resolveImage("hero");
  const side = ["terrace", "living-room", "pool-courtyard", "bedroom-king-closet"].map(resolveImage);
  const { address } = property;

  return (
    <section aria-labelledby="hero-title" className="md:container-page md:pt-8">
      <div className="flex flex-col">
        <div className="container-page order-2 pt-6 md:order-none md:px-0 md:pt-0">
          <h1 id="hero-title" className="text-[1.625rem] leading-tight md:text-[2rem]">
            {property.name}
            <span className="sr-only"> — </span>
            <span className="block text-muted md:inline md:text-ink">
              <span aria-hidden="true" className="hidden md:inline"> — </span>Beachfront Condo in Playa del Carmen
            </span>
          </h1>
          <p className="mt-2 flex items-center gap-1.5 text-[0.9375rem] text-ink">
            <Icon name="pin" className="size-4" />
            <span>
              {address.area}, {address.city}, {address.state}, {address.country}
            </span>
          </p>
        </div>

        <div className="relative order-1 md:order-none md:mt-6">
          <div className="grid gap-2 md:h-[min(60vh,32rem)] md:grid-cols-4 md:grid-rows-2 md:overflow-hidden md:rounded-lg">
            <div className="relative aspect-[4/3] md:col-span-2 md:row-span-2 md:aspect-auto">
              <Photo image={main} sizes="(min-width: 768px) 50vw, 100vw" preload />
            </div>
            {side.map((img) => (
              <div key={img.id} className="relative hidden md:block">
                <Photo image={img} sizes="25vw" compact />
              </div>
            ))}
          </div>
          <a
            href="#photos"
            className="absolute right-4 bottom-4 inline-flex min-h-10 items-center gap-2 rounded-sm border border-ink bg-white px-4 text-sm font-semibold text-ink shadow-[var(--shadow-float)] transition-colors hover:bg-faint"
          >
            <Icon name="grid" className="size-4" />
            Show all photos
          </a>
        </div>
      </div>
    </section>
  );
}
