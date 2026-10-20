"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Map as MapboxMap } from "mapbox-gl";
import { Icon } from "@/components/ui/Icon";
import { track } from "@/lib/analytics";

interface LocationMapProps {
  lat: number;
  lng: number;
  name: string;
  /** Postal address, one line per entry. */
  addressLines: string[];
  googleMapsUrl: string;
  directionsUrl: string;
}

type Status = "idle" | "loading" | "ready" | "error";

const STYLE = "mapbox://styles/mapbox/light-v11";
const ZOOM = 15;
/** Site accent (--color-teal). Kept literal: the pin is built outside React. */
const TEAL = "#2e7777";
/** Give up and show the fallback if the map hasn't rendered by then. */
const LOAD_TIMEOUT_MS = 15_000;

/**
 * Interactive Mapbox map with a single pin on the property.
 *
 * Mapbox GL (JS + CSS) is only downloaded when the map approaches the
 * viewport. Touch devices pan with two fingers (cooperative gestures), so
 * the map never traps page scrolling. Any failure — missing token, no
 * WebGL, network or style error — falls back to the address and links.
 */
export function LocationMap({ lat, lng, name, addressLines, googleMapsUrl, directionsUrl }: LocationMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  // Separate from `status`, so status updates never re-run (and tear down) the loader.
  const [nearViewport, setNearViewport] = useState(false);
  const hintId = useId();
  const addressText = addressLines.join(", ");

  // Start loading when the map is within ~400px of the viewport.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!nearViewport) return;
    const container = containerRef.current;
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!container || !token) {
      if (!token) console.warn("[map] NEXT_PUBLIC_MAPBOX_TOKEN is not set; showing the address fallback.");
      setStatus("error");
      return;
    }

    let map: MapboxMap | undefined;
    let cancelled = false;
    let loaded = false;
    const fail = (reason: unknown) => {
      if (cancelled || loaded) return;
      console.warn("[map] falling back to address:", reason);
      map?.remove();
      map = undefined;
      setStatus("error");
    };
    const timeout = window.setTimeout(() => fail("timeout"), LOAD_TIMEOUT_MS);
    setStatus("loading");

    (async () => {
      try {
        const [{ default: mapboxgl }] = await Promise.all([
          import("mapbox-gl"),
          import("mapbox-gl/dist/mapbox-gl.css"),
        ]);
        if (cancelled) return;

        map = new mapboxgl.Map({
          container,
          accessToken: token,
          style: STYLE,
          center: [lng, lat],
          zoom: ZOOM,
          cooperativeGestures: true,
          // Added below with compact: false so the credit text is always visible.
          attributionControl: false,
          pitchWithRotate: false,
          dragRotate: false,
        });
        map.touchZoomRotate.disableRotation();

        map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");
        map.addControl(new mapboxgl.FullscreenControl(), "top-right");
        // Required Mapbox / OpenStreetMap credit, never collapsed to an icon.
        map.addControl(new mapboxgl.AttributionControl({ compact: false }), "bottom-right");

        map.on("error", (e) => fail(e.error));
        map.once("load", () => {
          if (cancelled) return;
          loaded = true;
          window.clearTimeout(timeout);
          setStatus("ready");
        });

        // The pin is a real button: focusable, and Enter/Space toggle the popup.
        const pin = document.createElement("button");
        pin.type = "button";
        pin.className = "map-pin";
        pin.setAttribute("aria-label", `${name} — show address`);
        pin.innerHTML = `<svg viewBox="0 0 32 42" width="32" height="42" aria-hidden="true" focusable="false"><path d="M16 1C7.7 1 1 7.6 1 15.8 1 26.9 16 41 16 41s15-14.1 15-25.2C31 7.6 24.3 1 16 1Z" fill="${TEAL}" stroke="#fff" stroke-width="2"/><circle cx="16" cy="15.5" r="5.5" fill="#fff"/></svg>`;

        const popupContent = document.createElement("div");
        const title = document.createElement("p");
        title.className = "map-popup-title";
        title.textContent = name;
        const address = document.createElement("p");
        address.className = "map-popup-address";
        address.textContent = addressText;
        popupContent.append(title, address);

        const popup = new mapboxgl.Popup({ offset: [0, -38], closeButton: true, maxWidth: "260px", focusAfterOpen: false })
          .setDOMContent(popupContent)
          .on("open", () => pin.setAttribute("aria-expanded", "true"))
          .on("close", () => pin.setAttribute("aria-expanded", "false"));
        pin.setAttribute("aria-expanded", "false");

        new mapboxgl.Marker({ element: pin, anchor: "bottom" }).setLngLat([lng, lat]).setPopup(popup).addTo(map);
      } catch (error) {
        fail(error);
      }
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      map?.remove();
    };
  }, [nearViewport, lat, lng, name, addressText]);

  const showFallback = status === "error";

  return (
    <div>
      <div
        role="region"
        aria-label={`Map of ${name}`}
        aria-describedby={showFallback ? undefined : hintId}
        className="relative h-[300px] overflow-hidden rounded-md bg-faint md:h-[400px]"
      >
        {/* Mapbox renders into the inner element and sets it to position: relative,
            so the absolute wrapper provides the size. Empty in the fallback. */}
        <div className={`absolute inset-0 ${showFallback ? "hidden" : ""}`}>
          <div ref={containerRef} className="h-full w-full" />
        </div>

        {status !== "ready" && (
          <div className="pointer-events-none absolute inset-0 flex items-end p-5">
            {showFallback ? (
              <div className="pointer-events-auto">
                <p className="flex items-center gap-2 text-base font-semibold">
                  <Icon name="pin" className="size-5 text-teal" />
                  {name}
                </p>
                <p className="mt-1 text-[0.9375rem] text-muted">
                  {addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("open_location", { provider: "google_maps", from: "map_fallback" })}
                  className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-semibold text-ink underline underline-offset-2"
                >
                  View on Google Maps <Icon name="arrowUpRight" className="size-4" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            ) : (
              <p className="text-sm text-muted" aria-live="polite">
                {status === "loading" ? "Loading map…" : "Map"}
              </p>
            )}
          </div>
        )}
      </div>

      {!showFallback && (
        <p id={hintId} className="sr-only">
          Tab to the map to pan with the arrow keys and zoom with the plus and minus keys. The pin button shows the
          address. On touch screens, use two fingers to move the map.
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("open_location", { provider: "google_maps" })}
          className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-ink px-4 text-[0.9375rem] font-semibold text-ink transition-colors hover:bg-faint"
        >
          <Icon name="pin" className="size-4" />
          Open in Google Maps
          <span className="sr-only">(opens in a new tab)</span>
        </a>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("open_location", { provider: "google_maps_directions" })}
          className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-ink px-4 text-[0.9375rem] font-semibold text-ink transition-colors hover:bg-faint"
        >
          <Icon name="arrowUpRight" className="size-4" />
          Get directions
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </div>
  );
}
