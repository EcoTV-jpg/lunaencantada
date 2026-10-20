/**
 * Analytics event hooks.
 *
 * No analytics library is installed. `track` pushes to `window.dataLayer`
 * when a tag manager is present and always dispatches a DOM event, so any
 * provider (GA4, Plausible, Fathom…) can subscribe later without touching
 * components:
 *
 *   window.addEventListener("luna:analytics", (e) => send(e.detail));
 */

export type AnalyticsEvent =
  | "view_availability"
  | "select_check_in"
  | "select_check_out"
  | "select_guests"
  | "submit_availability"
  | "view_gallery"
  | "open_location"
  | "contact_click";

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: AnalyticsEvent, params: AnalyticsParams = {}): void {
  if (typeof window === "undefined") return;
  // Never include personal data (names, emails, messages) in params.
  window.dataLayer?.push({ event, ...params });
  window.dispatchEvent(new CustomEvent("luna:analytics", { detail: { event, ...params } }));
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event, params);
  }
}
