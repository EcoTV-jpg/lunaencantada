import { property } from "./property";

/**
 * Site-level configuration.
 *
 * TODO(owner): set NEXT_PUBLIC_SITE_URL to the final domain before launch.
 * The placeholder below keeps canonical/OG URLs well-formed until then.
 */
const PLACEHOLDER_URL = "https://FINAL-DOMAIN.com";

export const siteConfig = {
  url: (process.env.NEXT_PUBLIC_SITE_URL || PLACEHOLDER_URL).replace(/\/$/, ""),
  isPlaceholderUrl: !process.env.NEXT_PUBLIC_SITE_URL,
  locale: "en_US",
  language: "en",
  title: `${property.name} | Beachfront Condo in Playa del Carmen`,
  description:
    "Stay at Luna Encantada A2, a three-bedroom beachfront condo in Playa del Carmen for up to six guests. Explore the property, amenities, location and availability.",
} as const;

export const navigation = [
  { label: "The Condo", href: "#condo" },
  { label: "Photos", href: "#photos" },
  { label: "Amenities", href: "#amenities" },
  { label: "Location", href: "#location" },
  { label: "FAQ", href: "#faq" },
] as const;

export const footerNavigation = [
  { label: "The Condo", href: "#condo" },
  { label: "Photos", href: "#photos" },
  { label: "Amenities", href: "#amenities" },
  { label: "Location", href: "#location" },
  { label: "Availability", href: "#availability" },
  { label: "FAQ", href: "#faq" },
] as const;

/**
 * Legal pages. `path` stays null until the owner supplies the text; the
 * footer shows the title without a link, and the sitemap leaves it out.
 */
export const legalPages: { label: string; path: string | null }[] = [
  { label: "Rental Terms", path: null }, // TODO: /rental-terms
  { label: "Cancellation Policy", path: null }, // TODO: /cancellation-policy
  { label: "Privacy Policy", path: null }, // TODO: /privacy-policy
];
