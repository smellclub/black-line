import { ImageResponse } from "next/og";
import { business } from "@/config/business";

// La imagen que aparece al compartir el link por WhatsApp, Instagram, etc.
// Se genera sola en el build a partir de business.ts.
export const alt = `${business.name} · ${business.slogan}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 80,
          background: "#0a0a0a",
          color: "#f5f3ef",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 10, color: business.colors.accent, textTransform: "uppercase" }}>
          {`Barbería · ${business.address.city}`}
        </div>
        <div style={{ fontSize: 150, fontWeight: 700, textTransform: "uppercase", lineHeight: 1, marginTop: 20 }}>
          {business.name}
        </div>
        <div style={{ width: 120, height: 4, background: business.colors.accent, marginTop: 36 }} />
        <div style={{ fontSize: 40, marginTop: 36, color: "#a3a3a3" }}>{business.slogan}</div>
      </div>
    ),
    size,
  );
}
