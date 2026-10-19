"use client";

import { useEffect } from "react";
import { type AnalyticsEvent, track } from "@/lib/analytics";

/**
 * Lets server-rendered links report events without becoming client
 * components: add `data-track="contact_click"` (and optional
 * `data-track-*` params) to any element.
 */
export function AnalyticsListener() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      const params: Record<string, string> = {};
      for (const [key, value] of Object.entries(el.dataset)) {
        if (key.startsWith("track") && key !== "track" && value) {
          params[key.slice(5).toLowerCase()] = value;
        }
      }
      track(el.dataset.track as AnalyticsEvent, params);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
