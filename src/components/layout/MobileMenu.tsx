"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { fullAddress } from "@/data/property";
import { navigation } from "@/data/site";
import { buttonStyles } from "@/components/ui/ButtonLink";

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
        onClick={() => setOpen((v) => !v)}
        className="-mr-2 inline-flex min-h-11 min-w-11 items-center justify-center gap-2.5 px-2 text-sm font-medium text-ink"
      >
        <span>{open ? "Close" : "Menu"}</span>
        <span aria-hidden="true" className="relative block h-3 w-5">
          <span
            className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0.5"}`}
          />
          <span
            className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-2.5"}`}
          />
        </span>
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-paper"
      >
        <nav aria-label="Mobile" className="container-page flex min-h-full flex-col py-8">
          <ul className="divide-y divide-line border-y border-line">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => close()}
                  className="flex min-h-14 items-center font-serif text-[1.75rem] text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#availability" onClick={() => close()} className={`${buttonStyles.primary} mt-8 w-full`}>
            Check Availability
          </a>
          <p className="mt-auto pt-10 text-sm text-stone">{fullAddress}</p>
        </nav>
      </div>
    </div>
  );
}
