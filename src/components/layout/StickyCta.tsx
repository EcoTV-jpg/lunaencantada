"use client";

import { useEffect, useState } from "react";

/**
 * Mobile-only bar that keeps "Check Dates" in reach. It steps aside
 * while the availability form or the final call to action is on screen.
 */
export function StickyCta({ priceLabel }: { priceLabel: string }) {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const targets = ["availability", "final-cta-title", "hero-title"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setHidden(visible.size > 0);
    });
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper pb-[env(safe-area-inset-bottom)] transition-transform duration-300 md:hidden ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
      inert={hidden}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <p className="text-sm text-stone">
          From <span className="font-serif text-[1.375rem] text-ink">{priceLabel}</span> / night
        </p>
        <a
          href="#availability"
          className="inline-flex min-h-11 items-center justify-center rounded-xs bg-teal px-5 text-sm font-medium text-paper"
        >
          Check Dates
        </a>
      </div>
    </div>
  );
}
