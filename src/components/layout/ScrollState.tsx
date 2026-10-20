"use client";

import { useEffect } from "react";

/** Flags `<html data-scrolled>` once the page leaves the top, for header styling. */
export function ScrollState() {
  useEffect(() => {
    const root = document.documentElement;
    const update = () => root.toggleAttribute("data-scrolled", window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return null;
}
