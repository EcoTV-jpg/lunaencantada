"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { fullAddress } from "@/data/property";
import { navigation } from "@/data/site";
import { buttonStyles } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const close = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 64rem)").matches) close();
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.documentElement.style.overflow = "";
    };
  }, [open, close]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-11 items-center justify-center rounded-full bg-faint text-ink transition-colors hover:bg-line"
      >
        <Icon name={open ? "close" : "menu"} className="size-5" />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-white md:top-20"
      >
        <nav aria-label="Mobile" className="container-page flex min-h-full flex-col py-6">
          <ul className="divide-y divide-line">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => close()}
                  className="flex min-h-14 items-center justify-between text-lg font-medium text-ink"
                >
                  {item.label}
                  <Icon name="chevronRight" className="size-4 text-muted" />
                </a>
              </li>
            ))}
          </ul>
          <a href="#availability" onClick={() => close()} className={`${buttonStyles.primary} mt-8 w-full`}>
            Check availability
          </a>
          <p className="mt-auto pt-10 text-sm text-muted">{fullAddress}</p>
        </nav>
      </div>
    </div>
  );
}
