import "server-only";

import { existsSync } from "node:fs";
import path from "node:path";
import { getImage, propertyImages, sectionImageIds, type PropertyImage } from "@/data/images";

export interface ResolvedImage extends PropertyImage {
  /** True when the photograph exists in /public. Otherwise a placeholder renders. */
  available: boolean;
}

/** Checks /public at build time, so dropping a file in is all it takes. */
function resolve(image: PropertyImage): ResolvedImage {
  const file = path.join(process.cwd(), "public", image.src);
  return { ...image, available: existsSync(file) };
}

export function resolveImage(id: string): ResolvedImage {
  return resolve(getImage(id));
}

export function resolveGalleryImages(): ResolvedImage[] {
  return propertyImages.filter((img) => !sectionImageIds.has(img.id)).map(resolve);
}

