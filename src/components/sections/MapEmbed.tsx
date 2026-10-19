"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

interface MapEmbedProps {
  coordinates: { lat: number; lng: number } | null;
  mapsUrl: string;
  label: string;
}

/**
 * Without verified coordinates this renders an address panel and an
 * outbound maps link — never an approximate pin. Once `property.coordinates`
 * is set, visitors can load an OpenStreetMap embed on demand, so no
 * third-party map code runs until requested.
 */
export function MapEmbed({ coordinates, mapsUrl, label }: MapEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  const link = (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("open_location", { provider: "google_maps" })}
      className="link-underline inline-flex min-h-11 items-center gap-2 text-sm font-medium text-teal"
    >
      Open in Google Maps <span aria-hidden="true">↗</span>
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );

  if (coordinates && loaded) {
    const d = 0.004;
    const bbox = [coordinates.lng - d, coordinates.lat - d, coordinates.lng + d, coordinates.lat + d].join(",");
    return (
      <div>
        <div className="relative aspect-[16/10] bg-mist">
          <iframe
            title={`Map showing ${label}`}
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${coordinates.lat},${coordinates.lng}`}
            className="absolute inset-0 size-full border-0"
            loading="lazy"
          />
        </div>
        <div className="mt-3">{link}</div>
      </div>
    );
  }

  return (
    <div className="relative flex aspect-[16/10] flex-col justify-between overflow-hidden bg-mist p-6 sm:p-10">
      {/* Abstract coastline — decorative, not a map. */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full text-ink/15"
        viewBox="0 0 400 250"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <path d="M250 -10 C 268 60, 300 120, 318 170 S 360 240, 380 270" stroke="currentColor" strokeWidth="1" />
        <path d="M262 -10 C 280 60, 312 120, 330 170 S 372 240, 392 270" stroke="currentColor" strokeWidth="0.5" />
      </svg>
      <p className="eyebrow relative text-teal">Centro · Playa del Carmen</p>
      <div className="relative">
        <p className="max-w-[22rem] font-serif text-[1.5rem] leading-snug text-ink">{label}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-6">
          {link}
          {coordinates && (
            <button
              type="button"
              onClick={() => {
                setLoaded(true);
                track("open_location", { provider: "embed" });
              }}
              className="link-underline min-h-11 text-sm font-medium text-ink"
            >
              Show map
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
