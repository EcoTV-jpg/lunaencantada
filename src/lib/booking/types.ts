/**
 * Booking domain model.
 *
 * These types describe the shape of data that a future booking engine,
 * PMS, channel manager, iCal feed or direct booking API will exchange with
 * the site. Nothing here hard-codes taxes, deposits, discounts or
 * cancellation fees — those values must come from a confirmed source.
 */

export type CurrencyCode = "USD" | "MXN";

export interface Money {
  amount: number;
  currency: CurrencyCode;
}

/** ISO calendar date, `YYYY-MM-DD`, interpreted in the property's local time zone. */
export type IsoDate = string;

export interface GuestCount {
  /** Total guests, including children. Must not exceed `Property.capacity.maxGuests`. */
  total: number;
  adults?: number;
  children?: number;
}

/** A stay or blocked period. `end` is the check-out date (exclusive night). */
export interface AvailabilityRange {
  start: IsoDate;
  end: IsoDate;
}

/**
 * `unknown` is the only status the inquiry-only provider returns: the site
 * never fabricates availability. Live providers may return the others.
 */
export type AvailabilityStatus = "available" | "unavailable" | "unknown";

export interface AvailabilityResult {
  range: AvailabilityRange;
  status: AvailabilityStatus;
  /** Blocked ranges from a live calendar (iCal / PMS). Empty when unknown. */
  blocked: AvailabilityRange[];
  /** Source of truth for this answer, e.g. "inquiry", "ical", "pms". */
  source: string;
  checkedAt: string;
}

export interface CleaningFee {
  fee: Money | null;
  /** True when included at no charge (e.g. mid-stay cleaning on longer stays). */
  complimentary: boolean;
  description: string;
}

export interface Tax {
  name: string;
  /** Either a rate (0.16 = 16%) or a flat amount — never both. */
  rate?: number;
  flat?: Money;
  includedInRate: boolean;
}

export interface SecurityDeposit {
  amount: Money;
  refundable: boolean;
  description?: string;
}

export interface PricingLineItem {
  label: string;
  amount: Money;
}

export interface PricingQuote {
  range: AvailabilityRange;
  guests: GuestCount;
  nights: number;
  nightly: Money[];
  cleaning: CleaningFee | null;
  /** `null` = not yet confirmed. Never default to an empty array to imply "no taxes". */
  taxes: Tax[] | null;
  securityDeposit: SecurityDeposit | null;
  lineItems: PricingLineItem[];
  total: Money | null;
  /** Quotes are indicative until confirmed by the host or booking engine. */
  binding: boolean;
  expiresAt?: string;
}

export interface GuestContact {
  name: string;
  email: string;
  phone?: string;
}

export interface BookingInquiry {
  propertyId: string;
  range: AvailabilityRange;
  guests: GuestCount;
  contact: GuestContact;
  message?: string;
  /** Page context for attribution, e.g. UTM parameters. */
  source?: Record<string, string>;
  createdAt: string;
}

export type InquiryResult =
  | { ok: true; reference?: string }
  | { ok: false; reason: "not_configured" | "delivery_failed" | "invalid" };
