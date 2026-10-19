import "server-only";

import type {
  AvailabilityRange,
  AvailabilityResult,
  BookingInquiry,
  GuestCount,
  InquiryResult,
  PricingQuote,
} from "./types";

/**
 * Contract every booking backend implements. The availability UI talks
 * only to this interface (through a server action), so swapping the
 * inquiry-only provider for iCal, a PMS, a channel manager or a direct
 * booking engine does not require changes to the page.
 */
export interface BookingProvider {
  readonly id: string;
  readonly capabilities: {
    /** Can answer availability from a real calendar. */
    liveAvailability: boolean;
    /** Can return a priced quote. */
    quotes: boolean;
    /** Can confirm a reservation without the host. */
    instantBooking: boolean;
  };
  checkAvailability(range: AvailabilityRange, guests: GuestCount): Promise<AvailabilityResult>;
  quote?(range: AvailabilityRange, guests: GuestCount): Promise<PricingQuote | null>;
  submitInquiry(inquiry: BookingInquiry): Promise<InquiryResult>;
}

/**
 * Default provider: no calendar integration yet. Availability is always
 * `unknown` (never fabricated) and inquiries are forwarded to a webhook
 * (e.g. an email service, CRM or automation tool).
 */
export const inquiryOnlyProvider: BookingProvider = {
  id: "inquiry",
  capabilities: { liveAvailability: false, quotes: false, instantBooking: false },

  async checkAvailability(range) {
    return {
      range,
      status: "unknown",
      blocked: [],
      source: "inquiry",
      checkedAt: new Date().toISOString(),
    };
  },

  async submitInquiry(inquiry) {
    const url = process.env.INQUIRY_WEBHOOK_URL;

    if (!url) {
      if (process.env.NODE_ENV !== "production") {
        console.info("[inquiry] INQUIRY_WEBHOOK_URL not set; logging instead:", inquiry);
        return { ok: true, reference: "dev" };
      }
      console.error("[inquiry] INQUIRY_WEBHOOK_URL is not configured.");
      return { ok: false, reason: "not_configured" };
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.INQUIRY_WEBHOOK_SECRET
            ? { "X-Inquiry-Secret": process.env.INQUIRY_WEBHOOK_SECRET }
            : {}),
        },
        body: JSON.stringify(inquiry),
        cache: "no-store",
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) {
        console.error("[inquiry] webhook responded", res.status);
        return { ok: false, reason: "delivery_failed" };
      }
      return { ok: true };
    } catch (error) {
      console.error("[inquiry] webhook failed", error);
      return { ok: false, reason: "delivery_failed" };
    }
  },
};

/**
 * Select the active provider. Register future integrations here, e.g.
 *   case "ical": return createIcalProvider(process.env.ICAL_URL!);
 */
export function getBookingProvider(): BookingProvider {
  switch (process.env.BOOKING_PROVIDER) {
    default:
      return inquiryOnlyProvider;
  }
}
