"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

interface MapEmbedProps {
  coordinates: { lat: number; lng: number } | null;
  mapsUrl: string;
  label: string;
}

/**
 * Without verified coordinates this renders only an outbound maps link
 * for the street address — never an approximate pin. Once `property.coordinates`
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

  if (!coordinates) return link;

  return (
    <div className="flex flex-wrap items-center gap-x-6">
      {link}
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
    </div>
  );
}
