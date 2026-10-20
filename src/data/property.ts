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
    bedrooms: 3,
    bathrooms: 2,
    beds: 3,
    childrenAllowed: true,
  },

  bedrooms: [
    { name: "Bedroom 1", bed: "King bed", imageId: "bedroom-king" },
    { name: "Bedroom 2", bed: "Queen bed", imageId: "bedroom-queen" },
    { name: "Bedroom 3", bed: "Queen bed", imageId: "bedroom-queen-2" },
  ] satisfies readonly Bedroom[],

  features: {
    beachfront: true,
    directBeachAccess: true,
    oceanView: true,
    pool: { type: "Infinity pool", shared: true, private: false },
    terrace: "Private terrace with ocean view",
  },

  amenityGroups: [
    {
      title: "Essentials",
      items: [
        { label: "Wi-Fi" },
        { label: "Air conditioning" },
        { label: "Washer" },
        { label: "Dryer" },
      ],
    },
    {
      title: "Kitchen",
      // TODO(owner): list individual appliances only once confirmed.
      items: [{ label: "Fully equipped kitchen" }],
    },
    {
      title: "Outdoor",
      items: [
        { label: "Direct beach access" },
        { label: "Private ocean-view terrace" },
        { label: "Shared infinity pool" },
      ],
    },
    {
      title: "Building",
      items: [
        {
          label: "Elevator",
          note: "The elevator may occasionally be unavailable during maintenance.",
        },
        { label: "Secure on-property parking" },
        { label: "24-hour security" },
      ],
    },
  ] satisfies readonly AmenityGroup[],

  stay: {
    checkIn: "3:00 PM",
    checkOut: "11:00 AM",
    // Same times in 24h ISO form, for structured data.
    checkInTime: "15:00",
    checkOutTime: "11:00",
    // Minimum stay: none.
    minimumNights: null as number | null,
    petsAllowed: false,
    // TODO(owner): confirm smoking policy.
    smokingAllowed: null as boolean | null,
    // TODO(owner): confirm parties/events policy.
    eventsAllowed: null as boolean | null,
  },

  pricing: {
    // Base rate shown as "From …". Dynamic pricing may replace it later,
    // so never present it as a fixed or guaranteed price.
    baseNightlyRate: { amount: 250, currency: "USD" as CurrencyCode },
    // TODO(owner): confirm taxes (and whether they are included).
    taxes: null,
    // TODO(owner): confirm security deposit.
    securityDeposit: null,
    // TODO(owner): confirm cancellation and refund policies.
    cancellationPolicy: null,
    refundPolicy: null,
    // TODO(owner): confirm accepted payment methods.
    paymentMethods: null,
  },

  cleaning: {
    rules: [
      {
        label: "6-day stays",
        description: "Complimentary cleaning on day 4.",
        fee: null,
        complimentary: true,
      },
      {
        label: "Stays under 5 days",
        description: "A cleaning charge of MXN $600 applies.",
        fee: { amount: 600, currency: "MXN" },
        complimentary: false,
      },
    ] satisfies readonly CleaningRule[],
    // TODO(owner): confirm the cleaning policy for exactly 5-day stays,
    // stays longer than 6 days, and whether the MXN $600 charge is optional.
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
