import { imageCategories } from "@/data/images";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { resolveGalleryImages } from "@/lib/images";
import { GalleryBrowser } from "./GalleryBrowser";

export function Gallery() {
  const images = resolveGalleryImages();
  const categories = imageCategories.filter((c) => images.some((img) => img.category === c.id));

  return (
    <section id="photos" aria-labelledby="photos-title" className="border-t border-line py-12 md:py-16">
      <div className="container-page">
        <SectionHeading id="photos-title" title="The Condo in Photos">
          <p>More of the living spaces, bedrooms, kitchen and balcony.</p>
        </SectionHeading>
        <GalleryBrowser images={images} categories={categories} />
      </div>
    </section>
  );
}
