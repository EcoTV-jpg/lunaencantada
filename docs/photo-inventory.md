# Luna Encantada A2: photo inventory

Source: the Luna Encantada A2 listing on Latitud 20
<https://lat20.com/vacation-rental/luna-encantada-a2-playa-del-carmen-vacation-rentals/>
(inspected 2026-10-19).

The page's gallery holds **33 photos** whose filenames start with `Luna-A2-…`. The same page also shows thumbnails of other units (Luna Encantada **C1**, **D3** and **G2**). Those are excluded and must never be used here.

## Status

The 29 selected photos are in `public/images/` as WebP (quality 88, original resolution, not upscaled; ~2.9 MB in total). `next/image` serves resized AVIF/WebP to each device.

- **Rights:** the Latitud 20 site is marked "All rights reserved © Latitud 20". The photos were added at the owner's request; keep written permission from Latitud 20 or the photographer on file.
- **Resolution:** the web copies are ~1,180 px wide (the bathroom photos ~520 px). For sharper results on large/retina screens, replace them with the photographer's originals, using the same filenames.

Every source URL is in the `source` field of `src/data/images.ts`.

## Inventory

`#` is the order in the Latitud 20 gallery. All target files are `public/images/luna-encantada-a2-<name>.webp`.

| # | What the photo shows | Size (px) | Decision | Target `<name>` | Used in |
| --- | --- | --- | --- | --- | --- |
| 11 | Infinity pool between palms and buildings, opening onto the sea | 1143×762 | **Use (hero)** | `hero` | Hero |
| 14 | Infinity-pool edge, loungers, palms, sea beyond | 1146×763 | Use | `infinity-pool` | Beach & Pool (wide) |
| 10 | Pool in the courtyard, loungers, terracotta buildings | 1164×772 | Use | `pool-courtyard` | Gallery |
| 02 | Sun loungers and umbrellas on a white-sand beach with palms and buildings (two guests in frame) | 1540×1021 | Use | `beach` | Beach & Pool |
| 13 | Building with the "Luna Encantada" sign, garden fountain, sea on the left | 1163×773 | Use | `building` | Location |
| 12 | Garden fountain between buildings, infinity pool and sea behind | 1141×765 | Use | `garden-fountain` | Final call to action |
| 03 | Open-plan living / dining / kitchen | 1175×779 | Use | `open-plan-living` | The Condo |
| 01 | Navy sectional sofa and coffee table beside sliding doors to the terrace | 1165×778 | Use | `living-room` | Gallery |
| 30 | Navy sectional sofa under a sea-turtle painting | 1178×787 | Use | `living-room-sofa` | Gallery |
| 23 | Sitting area with wall TV, white armchair, blue-and-gold art | 1181×789 | Use | `sitting-area` | Gallery |
| 07 | Round glass dining table, bedroom visible through doorway | 1128×750 | Use | `dining-area` | Gallery |
| 20 | Dining table in front of kitchen and breakfast bar | 1179×787 | Use | `dining-kitchen` | Gallery |
| 08 | Console with stools, view across living/dining to terrace | 1155×772 | Use | `entry-living` | Gallery |
| 27 | Front door with stained-glass panel, console, mirror | 1179×784 | Use | `entry` | Gallery |
| 05 | Kitchen: white cabinets, blue mosaic backsplash, cooktop, oven | 1144×762 | Use | `kitchen` | The Condo (inset) |
| 21 | Kitchen island with stools beside the front door | 1184×791 | Use | `kitchen-island` | Gallery |
| 33 | Teal kitchen island, refrigerator, coffee maker | 1181×785 | Use | `kitchen-island-teal` | Amenities |
| 09 | Bedroom: large dark-wood bed, two lamps, tree painting | 1160×768 | Use | `bedroom-king` | Bedroom 1 |
| 26 | Same bedroom: dark-wood bed, A/C unit, closet doors | 1179×787 | Use | `bedroom-king-closet` | Gallery |
| 24 | Same bedroom as 09, straight-on | 1180×784 | Skip: near-duplicate of 09 | — | — |
| 22 | Bedroom with TV console, armchairs, sliding doors to a terrace | 1180×784 | Use | `bedroom-terrace-door` | Gallery |
| 04 | Bedroom: mint wall, flower painting, woven bench | 1135×757 | Use | `bedroom-queen` | Bedroom 2 |
| 25 | Same bedroom, with cushioned window seat | 1180×784 | Use | `bedroom-queen-window-seat` | Gallery |
| 19 | Same bedroom as 04, straight-on | 1188×791 | Skip: near-duplicate of 04 | — | — |
| 31 | Bed with blue cover, wooden wardrobe, hallway door | 1187×783 | Use | `bedroom-queen-wardrobe` | Gallery |
| 15 | Bedroom: light-blue wall, red tree painting, two nightstands | 1156×768 | Use | `bedroom-queen-2` | Bedroom 3 |
| 16 | Same bedroom as 15, straight-on | 1145×760 | Skip: near-duplicate of 15 | — | — |
| 17 | Same bedroom as 15, wardrobe with luggage on top | 1180×787 | Skip: clutter in frame | — | — |
| 06 | Bathroom: long wooden vanity, mirror, glass shower (portrait) | 515×782 | Use (low-res) | `bathroom` | Bathrooms |
| 28 | Bathroom vanity with stone top and mirror (portrait) | 519×789 | Use (low-res) | `bathroom-2` | Bathrooms |
| 18 | Covered terrace with dining table, overlooking pool and courtyard | 1184×788 | Use | `terrace` | Gallery |
| 29 | Terrace with lounger and chair, overlooking courtyard buildings | 1182×787 | Use | `terrace-lounger` | Gallery |
| 32 | Terrace table and chairs beside the sliding doors | 1183×788 | Use | `terrace-table` | Gallery |

**29 photos used, 4 skipped.** No photo appears twice on the page: 13 are placed in sections, and the gallery holds the other 16 (it shows 7 first, then "Show all 16 photos").

### Why the hero is #11

Of the 33 photos, #11 shows the sea most clearly: the infinity pool, palms and the open horizon. No photo shows the ocean from inside the unit or from its terrace, so the hero uses the shared pool. Its alt text and caption call it the shared pool, so it doesn't suggest a private view.

## Things the photos show that need confirming

These aren't changed on the site; they're for the owner to confirm:

- **Ocean view from the terrace.** The registry says "private terrace with ocean view", and the copy uses that wording. None of the three terrace photos (#18, #29, #32) shows the sea; they look over the courtyard and pool. Terrace captions and alt text therefore say only "terrace". The Latitud 20 page also says **"Garden View"** in its summary while listing a "Private Ocean-View Terrace". Please confirm which is accurate.
- **Which bedroom is the King room.** Bedroom 1 (King) is assigned to the dark-wood bed room (#09, #26), which looks like the largest bed. Bedrooms 2 and 3 (Queen) are the mint-wall room (#04, #25) and the red-tree room (#15). Please confirm. #22 and #31 are captioned only "Bedroom" because the room isn't certain.
- **Facts on the Latitud 20 page that are not in the approved registry** (not used on the site): master bedroom with walk-in closet, connecting bathroom and direct terrace access; 10-foot ceilings; pass-coded gates on the street and beach sides; underground parking; in-room safe; "No smoking, vaping or e-cigarettes in the condo or common areas". If confirmed, add them to `src/data/property.ts` (the smoking rule would then appear in House Rules automatically).
- **People in the beach photo (#02).** Two guests are recognisable. Confirm a model release covers this, or ask the photographer for a version without people.
