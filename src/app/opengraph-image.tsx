import { ImageResponse } from "next/og";
import { property } from "@/data/property";

export const alt = "Luna Encantada A2 — Beachfront Condo in Playa del Carmen";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Typographic share image. TODO: once real photography is available,
 * replace with the hero photo (add `public/og.jpg` and point metadata at it).
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          color: "#222222",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 26, color: "#6a6a6a" }}>Playa del Carmen · Quintana Roo · Mexico</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -3, color: "#2e7777" }}>luna encantada A2</div>
          <div style={{ fontSize: 44, fontWeight: 600, letterSpacing: -1, marginTop: 12 }}>Beachfront Condo in Playa del Carmen</div>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#6a6a6a" }}>
          Beachfront condominium · {property.capacity.bedrooms} bedrooms · Up to {property.capacity.maxGuests} guests
        </div>
      </div>
    ),
    size,
  );
}
