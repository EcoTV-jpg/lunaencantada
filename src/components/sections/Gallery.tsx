import { imageCategories } from "@/data/images";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { resolveGalleryImages } from "@/lib/images";
import { GalleryBrowser } from "./GalleryBrowser";

export function Gallery() {
  const images = resolveGalleryImages();
  const categories = imageCategories.filter((c) => images.some((img) => img.category === c.id));

  return (
    <section id="photos" aria-labelledby="photos-title" className="py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="photos-title" eyebrow="Photos" title="The Condo in Photos" />
          <p className="max-w-[24rem] text-stone">
            The ocean-view terrace, the living spaces, all three bedrooms, the shared infinity pool and the beach.
          </p>
        </div>
        <GalleryBrowser images={images} categories={categories} />
      </div>
    </section>
  );
}
