/**
 * Image manifest — built from the real Luna Encantada A2 photo set
 * published on the Latitud 20 listing (see docs/photo-inventory.md).
 *
 * Each entry names the original asset (`source`) and the optimized file
 * in `public/images/`. If a file is missing, a labelled placeholder holds
 * the slot.
 *
 * TODO(owner): keep written permission for the Latitud 20 photography on
 * file, and replace with the photographer's originals (≥2400px) if possible.
 *
 * Alt text describes only what is visible in each photo. No stock or
 * AI-generated imagery, and no photos of other Luna Encantada units.
 */

export type ImageCategory =
  | "terrace"
  | "living"
  | "kitchen"
  | "bedrooms"
  | "bathrooms"
  | "pool"
  | "beach"
  | "building";

/** Placeholder palette, chosen to suggest the subject while no photo exists. */
export type PlaceholderTone = "horizon" | "interior" | "water" | "sand";

export interface PropertyImage {
  id: string;
  src: string;
  alt: string;
  category: ImageCategory;
  tone: PlaceholderTone;
  /** Short caption shown in the gallery lightbox. */
  caption: string;
  /** Original asset this file is produced from. */
  source: string;
  /** Pixel size of the original — used to flag low-resolution sources. */
  sourceSize: [number, number];
  /** Focal point for `object-position` when the frame crops the photo. */
  focus?: string;
}

export const imageCategories: { id: ImageCategory; label: string }[] = [
  { id: "pool", label: "Pool" },
  { id: "beach", label: "Beach" },
  { id: "terrace", label: "Terrace" },
  { id: "living", label: "Living & dining" },
  { id: "kitchen", label: "Kitchen" },
  { id: "bedrooms", label: "Bedrooms" },
  { id: "bathrooms", label: "Bathrooms" },
  { id: "building", label: "Building" },
];

const LAT20 =
  "https://lat20.com/wp-content/uploads/2026/06/Luna-A2-playa-carmen-rivieramaya-riviera-maya-lat20-latitud20-luxury-pool-beach-family-condo-rent-rental-king-ocean-beach";

const img = (name: string) => `/images/luna-encantada-a2-${name}.webp`;

/** Gallery order follows this list: strongest images first. */
export const propertyImages: PropertyImage[] = [
  {
    id: "hero",
    src: img("hero"),
    alt: "Infinity pool between palm trees and the condominium buildings, opening onto the sea",
    category: "pool",
    tone: "water",
    caption: "The shared infinity pool",
    source: `${LAT20}-mexico-.jpg`,
    sourceSize: [1143, 762],
    focus: "50% 55%",
  },
  {
    id: "open-plan-living",
    src: img("open-plan-living"),
    alt: "Open-plan living, dining and kitchen area with marble floors, a round dining table and a kitchen island",
    category: "living",
    tone: "interior",
    caption: "Living, dining and kitchen",
    source: `${LAT20}-2.jpg`,
    sourceSize: [1175, 779],
  },
  {
    id: "beach",
    src: img("beach"),
    alt: "Sun loungers and umbrellas on a white-sand beach lined with palm trees and low-rise buildings",
    category: "beach",
    tone: "sand",
    caption: "The beach",
    source: `${LAT20}-1.jpg`,
    sourceSize: [1540, 1021],
  },
  {
    id: "bedroom-king",
    src: img("bedroom-king"),
    alt: "Bedroom with a large dark-wood bed, two table lamps and a painting of trees above the headboard",
    category: "bedrooms",
    tone: "interior",
    caption: "Bedroom 1 · King bed",
    source: `${LAT20}-8.jpg`,
    sourceSize: [1160, 768],
  },
  {
    id: "infinity-pool",
    src: img("infinity-pool"),
    alt: "Edge of the infinity pool with sun loungers, palm trees and the sea beyond",
    category: "pool",
    tone: "water",
    caption: "Infinity pool",
    source: `${LAT20}-mexico-3.jpg`,
    sourceSize: [1146, 763],
  },
  {
    id: "terrace",
    src: img("terrace"),
    alt: "Covered terrace with a wooden dining table and cushioned chairs, overlooking the pool and courtyard",
    category: "terrace",
    tone: "sand",
    caption: "Private terrace",
    source: `${LAT20}-mexico-7.jpg`,
    sourceSize: [1184, 788],
  },
  {
    id: "living-room",
    src: img("living-room"),
    alt: "Living room with a navy sectional sofa and wooden coffee table beside sliding doors to the terrace",
    category: "living",
    tone: "interior",
    caption: "Living room",
    source: `${LAT20}-1-1.jpg`,
    sourceSize: [1165, 778],
  },
  {
    id: "kitchen",
    src: img("kitchen"),
    alt: "Kitchen with white cabinets, a blue mosaic backsplash, a cooktop and an oven",
    category: "kitchen",
    tone: "interior",
    caption: "Kitchen",
    source: `${LAT20}-4.jpg`,
    sourceSize: [1144, 762],
  },
  {
    id: "bedroom-queen",
    src: img("bedroom-queen"),
    alt: "Bedroom with an upholstered bed, a mint-green feature wall, a flower painting and a woven bench",
    category: "bedrooms",
    tone: "interior",
    caption: "Bedroom 2 · Queen bed",
    source: `${LAT20}-3.jpg`,
    sourceSize: [1135, 757],
  },
  {
    id: "building",
    src: img("building"),
    alt: "Luna Encantada building with its sign, a garden fountain in front and the sea to the left",
    category: "building",
    tone: "sand",
    caption: "Luna Encantada",
    source: `${LAT20}-mexico-2.jpg`,
    sourceSize: [1163, 773],
  },
  {
    id: "bedroom-queen-2",
    src: img("bedroom-queen-2"),
    alt: "Bedroom with an upholstered bed, light blue wall, wooden nightstands and a red tree painting",
    category: "bedrooms",
    tone: "interior",
    caption: "Bedroom 3 · Queen bed",
    source: `${LAT20}-mexico-4.jpg`,
    sourceSize: [1156, 768],
  },
  {
    id: "bathroom",
    src: img("bathroom"),
    alt: "Bathroom with a long wooden vanity, a large mirror and a glass-walled shower",
    category: "bathrooms",
    tone: "interior",
    caption: "Bathroom",
    source: `${LAT20}-5.jpg`,
    sourceSize: [515, 782],
  },
  {
    id: "pool-courtyard",
    src: img("pool-courtyard"),
    alt: "Pool in the condominium courtyard, surrounded by sun loungers and terracotta-coloured buildings",
    category: "pool",
    tone: "water",
    caption: "Pool and courtyard",
    source: `${LAT20}-9.jpg`,
    sourceSize: [1164, 772],
  },
  {
    id: "dining-area",
    src: img("dining-area"),
    alt: "Round glass dining table with wooden chairs, with a bedroom visible through the doorway",
    category: "living",
    tone: "interior",
    caption: "Dining area",
    source: `${LAT20}-6.jpg`,
    sourceSize: [1128, 750],
  },
  {
    id: "terrace-lounger",
    src: img("terrace-lounger"),
    alt: "Terrace with a cushioned lounger, a side table and a folding chair, overlooking the courtyard buildings",
    category: "terrace",
    tone: "sand",
    caption: "Terrace",
    source: `${LAT20}-mexico-luna-encantada-lunaencantada-2.jpg`,
    sourceSize: [1182, 787],
  },
  {
    id: "kitchen-island",
    src: img("kitchen-island"),
    alt: "Kitchen island with two stools, next to the front door with a stained-glass panel",
    category: "kitchen",
    tone: "interior",
    caption: "Kitchen island",
    source: `${LAT20}-mexico-luna-encantada-airbnb-vrbo-3.jpg`,
    sourceSize: [1184, 791],
  },
  {
    id: "bedroom-king-closet",
    src: img("bedroom-king-closet"),
    alt: "Bedroom with a dark-wood bed, air-conditioning unit and wooden closet doors",
    category: "bedrooms",
    tone: "interior",
    caption: "Bedroom 1 · King bed",
    source: `${LAT20}-mexico-luna-encantada-airbnb-vrbo-8.jpg`,
    sourceSize: [1179, 787],
  },
  {
    id: "living-room-sofa",
    src: img("living-room-sofa"),
    alt: "Navy sectional sofa with cushions under a sea-turtle painting",
    category: "living",
    tone: "interior",
    caption: "Living room",
    source: `${LAT20}-mexico-luna-encantada-lunaencantada-3.jpg`,
    sourceSize: [1178, 787],
  },
  {
    id: "garden-fountain",
    src: img("garden-fountain"),
    alt: "Garden with a stone fountain between the condominium buildings, with the infinity pool and the sea behind",
    category: "building",
    tone: "sand",
    caption: "Garden courtyard",
    source: `${LAT20}-mexico-1.jpg`,
    sourceSize: [1141, 765],
  },
  {
    id: "bedroom-queen-window-seat",
    src: img("bedroom-queen-window-seat"),
    alt: "Bedroom with a cushioned window seat and a woven bench at the foot of the bed",
    category: "bedrooms",
    tone: "interior",
    caption: "Bedroom 2 · Queen bed",
    source: `${LAT20}-mexico-luna-encantada-airbnb-vrbo-7.jpg`,
    sourceSize: [1180, 784],
  },
  {
    id: "dining-kitchen",
    src: img("dining-kitchen"),
    alt: "Dining table with wooden chairs in front of the kitchen and its breakfast bar",
    category: "living",
    tone: "interior",
    caption: "Dining and kitchen",
    source: `${LAT20}-mexico-luna-encantada-airbnb-vrbo-2.jpg`,
    sourceSize: [1179, 787],
  },
  {
    id: "bedroom-terrace-door",
    src: img("bedroom-terrace-door"),
    alt: "Bedroom with a TV on a wooden console, two armchairs and sliding doors to a terrace",
    category: "bedrooms",
    tone: "interior",
    caption: "Bedroom",
    source: `${LAT20}-mexico-luna-encantada-airbnb-vrbo-4.jpg`,
    sourceSize: [1180, 784],
  },
  {
    id: "kitchen-island-teal",
    src: img("kitchen-island-teal"),
    alt: "Kitchen with a teal island, white cabinets, a coffee maker and a stainless-steel refrigerator",
    category: "kitchen",
    tone: "interior",
    caption: "Kitchen",
    source: `${LAT20}-mexico-luna-encantada-lunaencantada-9.jpg`,
    sourceSize: [1181, 785],
  },
  {
    id: "sitting-area",
    src: img("sitting-area"),
    alt: "Sitting area with a wall-mounted TV, a white armchair and blue-and-gold artwork",
    category: "living",
    tone: "interior",
    caption: "Sitting area",
    source: `${LAT20}-mexico-luna-encantada-airbnb-vrbo-5.jpg`,
    sourceSize: [1181, 789],
  },
  {
    id: "terrace-table",
    src: img("terrace-table"),
    alt: "Terrace with a wooden table and blue-cushioned folding chairs beside the sliding doors",
    category: "terrace",
    tone: "sand",
    caption: "Terrace",
    source: `${LAT20}-mexico-luna-encantada-lunaencantada-5.jpg`,
    sourceSize: [1183, 788],
  },
  {
    id: "entry-living",
    src: img("entry-living"),
    alt: "Console table with two wooden stools, looking across the living and dining area to the terrace",
    category: "living",
    tone: "interior",
    caption: "Entrance and living area",
    source: `${LAT20}-7.jpg`,
    sourceSize: [1155, 772],
  },
  {
    id: "entry",
    src: img("entry"),
    alt: "Front door with a stained-glass sea-life panel, beside a console table, mirror and stools",
    category: "living",
    tone: "interior",
    caption: "Entrance",
    source: `${LAT20}-mexico-luna-encantada-airbnb-vrbo-9.jpg`,
    sourceSize: [1179, 784],
  },
  {
    id: "bedroom-wardrobe",
    src: img("bedroom-queen-wardrobe"),
    alt: "Bed with a light blue cover, a wooden wardrobe and a door to the hallway",
    category: "bedrooms",
    tone: "interior",
    caption: "Bedroom",
    source: `${LAT20}-mexico-luna-encantada-lunaencantada-4.jpg`,
    sourceSize: [1187, 783],
  },
  {
    id: "bathroom-2",
    src: img("bathroom-2"),
    alt: "Bathroom vanity with a stone countertop, a framed mirror and folded towels",
    category: "bathrooms",
    tone: "interior",
    caption: "Bathroom",
    source: `${LAT20}-mexico-luna-encantada-lunaencantada-1.jpg`,
    sourceSize: [519, 789],
  },
];

/**
 * Photos placed in a page section. The gallery shows only the rest, so no
 * photo appears twice on the page.
 */
export const sectionImageIds = new Set([
  "hero", // Hero grid, main photo
  "terrace", // Hero grid
  "living-room", // Hero grid
  "pool-courtyard", // Hero grid
  "bedroom-king-closet", // Hero grid
  "open-plan-living", // The Condo
  "kitchen", // The Condo
  "bedroom-king", // Bedroom 1
  "bedroom-queen", // Bedroom 2
  "bedroom-queen-2", // Bedroom 3
  "bathroom", // Bathrooms
  "bathroom-2", // Bathrooms
  "infinity-pool", // Beach & Pool
  "beach", // Beach & Pool
  "building", // Location
  "garden-fountain", // Final call to action
]);

export function getImage(id: string): PropertyImage {
  const image = propertyImages.find((i) => i.id === id);
  if (!image) throw new Error(`Unknown image id: ${id}`);
  return image;
}
