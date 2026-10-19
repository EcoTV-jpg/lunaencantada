/**
 * Image manifest.
 *
 * To add a real photograph, export it as WebP (or AVIF/JPEG) at least
 * 2400px on the long edge and save it to `public/images/` using the
 * filename below. It replaces its placeholder automatically at build time.
 *
 * Alt text describes what the photo shows. When the real photograph
 * arrives, check the alt still matches it exactly — never add keywords.
 * Do not use stock photography: every image must be of this property.
 */

export type ImageCategory =
  | "ocean"
  | "living"
  | "kitchen"
  | "bedrooms"
  | "bathrooms"
  | "pool"
  | "beach"
  | "building";

/** Shape of the frame the image is cropped into. */
export type ImageShape = "landscape" | "portrait" | "wide" | "square";

/** Placeholder palette, chosen to suggest the subject while no photo exists. */
export type PlaceholderTone = "horizon" | "interior" | "water" | "sand";

export interface PropertyImage {
  id: string;
  src: string;
  alt: string;
  category: ImageCategory;
  shape: ImageShape;
  tone: PlaceholderTone;
  /** Short caption shown in the gallery lightbox. */
  caption: string;
  /** Include in the photo gallery. */
  gallery: boolean;
}

export const imageCategories: { id: ImageCategory; label: string }[] = [
  { id: "ocean", label: "Ocean & Terrace" },
  { id: "living", label: "Living" },
  { id: "kitchen", label: "Kitchen" },
  { id: "bedrooms", label: "Bedrooms" },
  { id: "bathrooms", label: "Bathrooms" },
  { id: "pool", label: "Pool" },
  { id: "beach", label: "Beach" },
  { id: "building", label: "Building" },
];

const dir = "/images";

export const propertyImages: PropertyImage[] = [
  {
    id: "hero",
    src: `${dir}/luna-encantada-a2-hero.webp`,
    alt: "Ocean view from the terrace of Luna Encantada A2",
    category: "ocean",
    shape: "portrait",
    tone: "horizon",
    caption: "The ocean from the terrace",
    gallery: false,
  },
  {
    id: "ocean-view",
    src: `${dir}/luna-encantada-a2-ocean-view.webp`,
    alt: "The Caribbean Sea seen from Luna Encantada A2",
    category: "ocean",
    shape: "wide",
    tone: "horizon",
    caption: "Ocean view",
    gallery: true,
  },
  {
    id: "terrace",
    src: `${dir}/luna-encantada-a2-terrace.webp`,
    alt: "Private terrace of Luna Encantada A2 looking out to the ocean",
    category: "ocean",
    shape: "portrait",
    tone: "horizon",
    caption: "Private ocean-view terrace",
    gallery: true,
  },
  {
    id: "living-room",
    src: `${dir}/luna-encantada-a2-living-room.webp`,
    alt: "Living area of Luna Encantada A2",
    category: "living",
    shape: "landscape",
    tone: "interior",
    caption: "Living area",
    gallery: true,
  },
  {
    id: "kitchen",
    src: `${dir}/luna-encantada-a2-kitchen.webp`,
    alt: "Fully equipped kitchen in Luna Encantada A2",
    category: "kitchen",
    shape: "portrait",
    tone: "interior",
    caption: "Kitchen",
    gallery: true,
  },
  {
    id: "primary-bedroom",
    src: `${dir}/luna-encantada-a2-primary-bedroom.webp`,
    alt: "Bedroom with a king bed at Luna Encantada A2",
    category: "bedrooms",
    shape: "landscape",
    tone: "sand",
    caption: "Bedroom 1 · King bed",
    gallery: true,
  },
  {
    id: "bedroom-2",
    src: `${dir}/luna-encantada-a2-bedroom-2.webp`,
    alt: "Second bedroom with a queen bed at Luna Encantada A2",
    category: "bedrooms",
    shape: "portrait",
    tone: "sand",
    caption: "Bedroom 2 · Queen bed",
    gallery: true,
  },
  {
    id: "bedroom-3",
    src: `${dir}/luna-encantada-a2-bedroom-3.webp`,
    alt: "Third bedroom with a queen bed at Luna Encantada A2",
    category: "bedrooms",
    shape: "portrait",
    tone: "sand",
    caption: "Bedroom 3 · Queen bed",
    gallery: true,
  },
  {
    id: "bathroom",
    src: `${dir}/luna-encantada-a2-bathroom.webp`,
    alt: "One of the two bathrooms at Luna Encantada A2",
    category: "bathrooms",
    shape: "portrait",
    tone: "interior",
    caption: "Bathroom",
    gallery: true,
  },
  {
    id: "pool",
    src: `${dir}/luna-encantada-a2-pool.webp`,
    alt: "The condominium’s shared infinity pool",
    category: "pool",
    shape: "wide",
    tone: "water",
    caption: "Shared infinity pool",
    gallery: true,
  },
  {
    id: "beach",
    src: `${dir}/luna-encantada-a2-beach.webp`,
    alt: "The beach in front of the Luna Encantada condominium",
    category: "beach",
    shape: "landscape",
    tone: "sand",
    caption: "Direct beach access",
    gallery: true,
  },
  {
    id: "building",
    src: `${dir}/luna-encantada-a2-building.webp`,
    alt: "Exterior of the Luna Encantada condominium building",
    category: "building",
    shape: "landscape",
    tone: "interior",
    caption: "The condominium",
    gallery: true,
  },
];

export function getImage(id: string): PropertyImage {
  const image = propertyImages.find((img) => img.id === id);
  if (!image) throw new Error(`Unknown image id: ${id}`);
  return image;
}
