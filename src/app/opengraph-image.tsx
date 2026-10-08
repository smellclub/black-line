import { ImageResponse } from "next/og";
import { business } from "@/config/business";

// La imagen que aparece al compartir el link por WhatsApp o Instagram. Se genera en el build.
export const alt = `${business.name} · ${business.slogan}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#efe8dc", color: "#141312" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, flex: 1 }}>
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 5, textTransform: "uppercase", color: "#6b645a" }}>
            {`Barbería · ${business.address.barrio}, ${business.address.city}`}
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 170, fontWeight: 900, lineHeight: 0.86, textTransform: "uppercase", letterSpacing: -4 }}>
            {business.name.split(" ").map((w, i) => (
              <span key={w} style={{ color: i ? "#087d7a" : "#141312" }}>
                {w}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 38, fontStyle: "italic" }}>{business.slogan}</div>
        </div>
        <div
          style={{
            display: "flex",
            width: 120,
            margin: "60px 70px 60px 0",
            borderRadius: 18,
            backgroundImage: "repeating-linear-gradient(-45deg, #d0342c 0 22px, #efe8dc 22px 44px, #087d7a 44px 66px, #efe8dc 66px 88px)",
            border: "14px solid #141312",
          }}
        />
      </div>
    ),
    size,
  );
}
