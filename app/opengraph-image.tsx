import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "AJIONE — Creator partnerships that drive growth";

async function loadGoogleFont(
  family: string,
  weight: number,
  italic = false,
): Promise<ArrayBuffer> {
  const axis = italic ? "ital,wght@1," : "wght@";
  const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:${axis}${weight}`;
  const css = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
  }).then((r) => r.text());
  const match = css.match(/src:\s*url\((.+?)\)\s*format/);
  if (!match) {
    throw new Error(
      `Could not resolve Google Font URL for ${family} ${weight}${italic ? " italic" : ""}`,
    );
  }
  return await fetch(match[1]).then((r) => r.arrayBuffer());
}

export default async function OpenGraphImage() {
  const logoBuffer = readFileSync(
    join(process.cwd(), "public/ajione-logo.png"),
  );
  const logoDataUri = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  const [geistMedium, instrumentItalic] = await Promise.all([
    loadGoogleFont("Geist", 500),
    loadGoogleFont("Instrument Serif", 400, true),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "88px 96px",
          background: "#f6f1e8",
          fontFamily: "Geist",
          color: "#0f0d0a",
        }}
      >
        <div style={{ display: "flex" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoDataUri} width={360} height={76} alt="AJIONE" />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "32px",
          }}
        >
          <span
            style={{
              fontSize: 92,
              fontWeight: 500,
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
            }}
          >
            Creator partnerships.
          </span>
          <span
            style={{
              fontSize: 92,
              fontWeight: 400,
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              fontFamily: "Instrument Serif",
              fontStyle: "italic",
            }}
          >
            that drive growth.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#c14a2a",
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: 28, opacity: 0.78 }}>
            No retainers. Paid on outcomes.
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: geistMedium, weight: 500, style: "normal" },
        {
          name: "Instrument Serif",
          data: instrumentItalic,
          weight: 400,
          style: "italic",
        },
      ],
    },
  );
}
