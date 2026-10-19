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
          background: "#16343a",
          color: "#fbfaf7",
          padding: "72px 80px",
          fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 6, color: "#e7d7bf", fontFamily: "sans-serif" }}>
          PLAYA DEL CARMEN · MEXICO
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, letterSpacing: 8 }}>LUNA ENCANTADA</div>
          <div style={{ fontSize: 72, fontStyle: "italic", color: "#e7d7bf", marginTop: 8 }}>A2</div>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#b9cfcb", fontFamily: "sans-serif" }}>
          Beachfront condominium · {property.capacity.bedrooms} bedrooms · Up to {property.capacity.maxGuests} guests
        </div>
      </div>
    ),
    size,
  );
}
