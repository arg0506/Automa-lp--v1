import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.title;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FAFAFA",
          position: "relative",
          fontFamily: "system-ui, sans-serif",
          padding: "60px 80px",
          textAlign: "center",
          border: "16px solid #FFFFFF",
        }}
      >
        {/* Subtle grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            border: "1px solid #E5E5E7",
            margin: "40px",
          }}
        />

        {/* Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            border: "1px solid #E5E5E7",
            backgroundColor: "#FFFFFF",
            padding: "8px 20px",
            borderRadius: "4px",
            marginBottom: "32px",
            color: "#71717A",
            fontSize: "14px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          {site.name} AI
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: "56px",
            lineHeight: 1.15,
            color: "#0A0A0A",
            maxWidth: "960px",
            marginBottom: "24px",
            letterSpacing: "-0.02em",
          }}
        >
          <span>{site.hero.headlineSans}</span>
          <span style={{ fontStyle: "italic", fontFamily: "Georgia, serif" }}>
            {site.hero.headlineSerif}
          </span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "20px",
            lineHeight: 1.5,
            color: "#71717A",
            maxWidth: "760px",
          }}
        >
          {site.hero.subtitle}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
