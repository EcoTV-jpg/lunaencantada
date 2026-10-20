/**
 * PROPERTY TRUTH REGISTRY
 *
 * The single approved source of facts for Luna Encantada A2. Every
 * user-facing value on the site is read from here so the page can never
 * contradict itself.
 *
 * Rules:
 * - Do not add a fact unless the owner has confirmed it.
 * - Unconfirmed facts are `null` with a TODO; the UI omits them.
 */

import type { CurrencyCode, Money } from "@/lib/booking/types";

export interface Bedroom {
  name: string;
  bed: string;
  /** Guests the room sleeps. */
  sleeps: number;
  imageId: string;
}

export interface AmenityGroup {
  title: string;
  items: readonly { label: string; note?: string }[];
}

export interface NearbyPlace {
  name: string;
  /** What the place is, in a few words. */
  kind: string;
  /** Only approved distances. `null` when no distance is confirmed. */
  distance: string | null;
}

/** A rate season. Dates are inclusive, `YYYY-MM-DD`. */
export interface RateSeason {
  start: string;
  end: string;
  nightly: number;
  /** `null` when no weekly rate is offered for the season. */
  weekly: number | null;
  minNights: number;
}

export interface CleaningRule {
  label: string;
  description: string;
  fee: Money | null;
  complimentary: boolean;
}

export const property = {
  id: "luna-encantada-a2",
  name: "Luna Encantada A2",
  shortName: "Luna Encantada",
  unit: "A2",
  type: "Condominium",

  address: {
    street: "Calle 6 Norte",
    area: "Centro",
    postalCode: "77710",
    city: "Playa del Carmen",
    state: "Quintana Roo",
    country: "Mexico",
    countryCode: "MX",
  },

  // TODO(owner): confirm exact latitude/longitude before enabling the map
  // and VacationRental structured data. Never approximate.
  coordinates: null as { lat: number; lng: number } | null,

  // Pin for the Location map only — deliberately separate from the verified
  // `coordinates` above, so structured data is unaffected.
  // Source: OpenStreetMap node 920559343, "Luna Encantada", Calle 6 Norte,
  // Centro (OSM check_date 2026-08-21). OSM lists postcode 77720.
  // TODO(owner): confirm the pin; once confirmed, also set `coordinates`.
  mapLocation: { lat: 20.6245631, lng: -87.0729426 },

  capacity: {
    maxGuests: 6,
    // Maximum occupancy counts everyone.
    occupancyNote: "including children under 12 and babies",
    bedrooms: 3,
    bathrooms: 2,
    beds: 3,
    childrenAllowed: true,
  },

  bedrooms: [
    { name: "Master Room", bed: "King bed", sleeps: 2, imageId: "bedroom-king" },
    { name: "Guest Bedroom 1", bed: "Queen bed", sleeps: 2, imageId: "bedroom-queen" },
    { name: "Guest Bedroom 2", bed: "Queen bed", sleeps: 2, imageId: "bedroom-queen-2" },
  ] satisfies readonly Bedroom[],

  features: {
    beachfront: true,
    directBeachAccess: true,
    oceanView: true,
    pool: { type: "Infinity pool", shared: true, private: false },
    balcony: "Private balcony",
  },

  amenityGroups: [
    {
      title: "Essentials",
      items: [
        { label: "Wi-Fi" },
        { label: "Air conditioning" },
        { label: "Ceiling fan" },
        { label: "TV" },
        // TODO(owner): washer and dryer are not in the official amenity list — confirm keep or remove.
        { label: "Washer" },
        { label: "Dryer" },
        { label: "Safe" },
        { label: "Furnished" },
      ],
    },
    {
      title: "Bedroom & bathroom",
      items: [
        { label: "Linens" },
        { label: "Hangers" },
        { label: "Hair dryer" },
        { label: "Iron" },
        { label: "Ironing board" },
        { label: "Small toiletries to get you started" },
        { label: "Beach towels" },
      ],
    },
    {
      title: "Kitchen",
      items: [
        { label: "Fully equipped kitchen" },
        { label: "Refrigerator" },
        { label: "Oven" },
        { label: "Cooktop" },
        { label: "Microwave" },
        { label: "Coffee maker" },
        { label: "Hot water kettle" },
        { label: "Blender" },
        { label: "Toaster" },
        { label: "Bottled water" },
      ],
    },
    {
      title: "Outdoor",
      items: [
        { label: "Beachfront with direct beach access" },
        { label: "Oceanfront views" },
        { label: "Private balcony" },
        { label: "Shared infinity pool" },
        { label: "Garden" },
      ],
    },
    {
      title: "Building & parking",
      items: [
        { label: "24-hour building security" },
        {
          label: "Elevator in building",
          note: "The elevator may occasionally be unavailable during maintenance.",
        },
        { label: "Free parking garage on premises" },
        { label: "Paid parking nearby" },
        { label: "Luggage drop-off allowed" },
      ],
    },
  ] satisfies readonly AmenityGroup[],

  stay: {
    checkIn: "4:00 PM",
    checkOut: "11:00 AM",
    // Same times in 24h ISO form, for structured data.
    checkInTime: "16:00",
    checkOutTime: "11:00",
    // Minimum stay varies by season — see `pricing.seasons`.
    longTermStays: true,
    petsAllowed: false,
    smokingAllowed: false as boolean | null,
    smokingNote: "No smoking, vaping or e-cigarettes in the condo or common areas (avoid extra charges).",
    eventsAllowed: false as boolean | null,
    quietHours: "11:00 PM – 8:00 AM",
  },

  pricing: {
    currency: "USD" as CurrencyCode,
    // Seasonal rates (USD). Past seasons drop off the site automatically.
    seasons: [
      { start: "2026-08-06", end: "2026-10-31", nightly: 250, weekly: 1750, minNights: 2 },
      { start: "2026-11-01", end: "2026-12-18", nightly: 380, weekly: 2660, minNights: 3 },
      { start: "2026-12-19", end: "2027-01-03", nightly: 800, weekly: null, minNights: 7 },
      { start: "2027-01-04", end: "2027-05-31", nightly: 400, weekly: 2800, minNights: 3 },
    ] satisfies readonly RateSeason[],
    // After the last season the site shows "Rates on request".
    // TODO(owner): monthly rate for long-term stays — not provided; none shown.
    monthlyRate: null as number | null,
    // "All rates in USD and subject to 16% VAT."
    taxes: [{ name: "VAT", rate: 0.16, includedInRate: false }],
    // "A security deposit of $500 USD may apply."
    // TODO(owner): confirm whether it is refundable and when it is collected.
    securityDeposit: {
      amount: { amount: 500, currency: "USD" as CurrencyCode },
      note: "A security deposit of $500 USD may apply.",
      refundable: null as boolean | null,
    },
    // TODO(owner): confirm cancellation and refund policies.
    cancellationPolicy: null,
    refundPolicy: null,
    // TODO(owner): confirm accepted payment methods.
    paymentMethods: null,
  },

  cleaning: {
    fee: { amount: 150, currency: "USD" as CurrencyCode },
    rules: [
      {
        label: "Cleaning fee",
        description: "$150 USD per stay, including maid service every third day (excluding Sundays and holidays).",
        fee: { amount: 150, currency: "USD" },
        complimentary: false,
      },
      {
        label: "Stays of 7 days or longer",
        description: "Towels and linens are changed once per week at no extra cost.",
        fee: null,
        complimentary: true,
      },
      {
        label: "Extra cleaning",
        description: "Available on request for an additional fee.",
        fee: null,
        complimentary: false,
      },
    ] satisfies readonly CleaningRule[],
  },

  location: {
    beach: "Direct access",
    fifthAvenue: "Approximately 1 minute walking distance",
    supermarket: "Walmart",
    busTerminal: "ADO Turística",
    airport: {
      name: "Cancún International Airport",
      // Do not state a driving time until verified.
      distance: "Approximately 50 km from the Luna Encantada area",
    },
  },

  // Add further places only with verified details.
  nearby: [
    { name: "The beach", kind: "Beachfront, with direct access from the condominium", distance: null },
    { name: "Fifth Avenue", kind: "Playa del Carmen’s pedestrian street", distance: "~1 min walk" },
    { name: "Walmart", kind: "Nearest supermarket", distance: null },
    { name: "ADO Turística", kind: "Nearest bus terminal", distance: null },
  ] satisfies readonly NearbyPlace[],

  // TODO(owner): confirm public contact channels. The UI hides any that are null.
  contact: {
    email: null as string | null,
    phone: null as string | null,
    whatsapp: null as string | null,
  },
} as const;

export type Property = typeof property;

/** Postal address as a single line. */
export const fullAddress = [
  property.address.street,
  property.address.area,
  `${property.address.postalCode} ${property.address.city}`,
  property.address.state,
  property.address.country,
].join(", ");
