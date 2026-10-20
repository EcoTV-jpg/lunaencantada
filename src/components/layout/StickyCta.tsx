"use client";

import { useEffect, useState } from "react";

/**
 * Mobile-only booking bar that keeps "Check dates" in reach. It steps
 * aside while the hero, the booking card or the final call to action is
 * on screen.
 */
export function StickyCta({ priceLabel, currency }: { priceLabel: string | null; currency: string }) {
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
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white pb-[env(safe-area-inset-bottom)] transition-transform duration-300 md:hidden ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
      inert={hidden}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
        <p className="text-sm text-muted">
          {priceLabel ? (
            <>
              <span className="text-base font-semibold text-ink">From {priceLabel}</span> {currency} / night
            </>
          ) : (
            <span className="text-base font-semibold text-ink">Rates on request</span>
          )}
        </p>
        <a
          href="#availability"
          className="inline-flex min-h-12 items-center justify-center rounded-sm bg-teal px-6 text-base font-semibold text-white"
        >
          Check dates
        </a>
      </div>
    </div>
  );
}
