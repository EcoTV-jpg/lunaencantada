# Luna Encantada A2

The official one-page website for **Luna Encantada A2**, a three-bedroom beachfront condominium in Centro, Playa del Carmen, Quintana Roo, Mexico.

Built with Next.js (App Router), TypeScript and Tailwind CSS. Pages are statically rendered; client JavaScript is limited to the mobile menu, gallery/lightbox, availability form, sticky mobile CTA and a small analytics listener.

## Design

The site uses a white-canvas, photograph-first listing style. Tokens live in `src/app/globals.css` (`@theme`):

- **Type:** DM Sans only (400–700), compact sizes; section titles 22–26px/600 with tight tracking.
- **Colour:** near-monochrome (`ink` #222, `muted` #6a6a6a, `line` #ebebeb, `faint` #f7f7f7). **Teal (#2E7777) is the single accent**, used for primary actions and the wordmark only.
- **Shape:** 12–16px rounded photos and cards, 8px buttons and inputs, pill filter chips. Shadows only on floating elements (booking card, "Show all photos").
- **Layout:** title and a five-photo grid, then a two-column body whose right column holds the booking card (sticky on desktop). Below that come full-width sections separated by hairlines. Outline icons are in `src/components/ui/Icon.tsx`.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
npm run typecheck
```

Copy `.env.example` to `.env.local` and fill in the values.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin (e.g. `https://example.com`). Used for canonical, Open Graph, sitemap, robots and JSON-LD. **Required before launch.** |
| `INQUIRY_WEBHOOK_URL` | Endpoint that receives availability inquiries as a JSON `POST`. Without it, inquiries are logged in development and **refused in production**. |
| `INQUIRY_WEBHOOK_SECRET` | Optional; sent as the `X-Inquiry-Secret` header. |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Mapbox public token (`pk.…`) for the Location map. It's inlined into the client bundle at build time, so set it in the hosting environment **before building**. Restrict it to the site's URLs in the Mapbox account. Without it, the map shows the address with a Google Maps link. |

## Where things live

```
src/
  data/
    property.ts   ← THE truth registry. Every fact on the site comes from here.
    images.ts     ← Image manifest (filenames, alt text, categories)
    faq.ts        ← FAQ, with answers derived from property.ts
    reviews.ts    ← Verified reviews only (empty → section hidden)
    site.ts       ← Site URL, navigation, legal pages
  lib/
    booking/
      types.ts       ← Booking domain model (PricingQuote, Tax, SecurityDeposit…)
      provider.ts    ← BookingProvider interface + inquiry-only implementation
      validation.ts  ← Shared client/server validation
    analytics.ts       ← track() event hooks (no library installed)
    structured-data.ts ← JSON-LD from verified, visible facts only
    images.ts          ← Detects which photos exist in /public at build time
  app/
    actions/inquiry.ts ← Server action behind the availability form
    layout.tsx, page.tsx, robots.ts, sitemap.ts, opengraph-image.tsx
  components/
    layout/   Header, MobileMenu, Footer, StickyCta, AnalyticsListener
    sections/ Hero, PropertyFacts, Gallery, CondoOverview, Bedrooms, Amenities,
              BeachPool, Location, Nearby, GettingHere, Availability, Reviews,
              Faq, HouseRules (incl. Cleaning), FinalCta
```

## Photographs

The image manifest (`src/data/images.ts`) is built from the 33 real Luna Encantada A2 photos on the Latitud 20 listing. **`docs/photo-inventory.md`** lists what each photo shows, which ones are used, their target filenames and where each appears.

The selected photos are in `public/images/`. Each section has its own photo and the gallery shows the rest, so no photo repeats. To replace a photo (for example with a higher-resolution original), overwrite the file with the same name and rebuild. A slot whose file is missing falls back to a labelled placeholder.

- Use real photos of this unit only. No stock, no AI-generated images, no other Luna Encantada units.
- Higher-resolution originals (≥2400px on the long edge) are preferred; the web copies are ~1,180px.
- `next/image` serves AVIF/WebP at the right sizes. Only the hero is preloaded.

## Connecting a booking system

The availability UI only talks to the `BookingProvider` interface in `src/lib/booking/provider.ts`. To add iCal, a PMS, a channel manager or a booking engine, implement that interface and return it from `getBookingProvider()` (selected by the `BOOKING_PROVIDER` env var). Nothing in the page has to change.

The default provider never fabricates availability: `checkAvailability` returns `status: "unknown"` and inquiries are forwarded to `INQUIRY_WEBHOOK_URL`.

## Analytics

`track()` in `src/lib/analytics.ts` pushes to `window.dataLayer` when a tag manager is present and dispatches a `luna:analytics` DOM event. Events: `view_availability`, `select_check_in`, `select_check_out`, `select_guests`, `submit_availability`, `view_gallery`, `open_location`, `contact_click`. Server-rendered links can fire events with `data-track="…"`.

## Open items to confirm with the owner

Rates, rules, fees and amenities follow the official property information (October 2026) in `src/data/property.ts`. Seasonal rates live in `pricing.seasons`. The page regenerates daily, so past seasons drop off and the "From" price updates on its own.

These are `TODO`s in the code. The public UI leaves out anything that isn't confirmed.

- Final domain (`NEXT_PUBLIC_SITE_URL`)
- Where inquiries go (`INQUIRY_WEBHOOK_URL`) and public contact details (`property.contact`)
- Exact coordinates. The map pin (`property.mapLocation`) comes from OpenStreetMap and needs confirming. Once confirmed, also set `property.coordinates`, which enables `VacationRental` structured data.
- Monthly rate for long-term stays (none shown); whether the $500 security deposit is refundable and when it is collected; cancellation/refund policy; payment methods
- Washer and dryer: not in the official amenity list, kept until confirmed
- Legal pages: Rental Terms, Cancellation Policy, Privacy Policy (`legalPages` in `site.ts`). The privacy policy matters because the form collects names and emails.
- Written permission for the Latitud 20 photography (or the photographer's high-resolution originals), plus the photo questions in `docs/photo-inventory.md`
- Verified guest reviews
