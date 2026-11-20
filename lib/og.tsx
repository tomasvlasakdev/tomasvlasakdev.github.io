import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { common } from "@/content/cs/common";

// Build-time Open Graph images: text on a flat colour, using the site's own fonts.

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const fontDir = path.join(process.cwd(), "assets", "og-fonts");

export async function renderOg({ kicker, title }: { kicker?: string; title: string }) {
  const [head, body] = await Promise.all([
    readFile(path.join(fontDir, "zilla-slab-700.woff")),
    readFile(path.join(fontDir, "source-sans-3-400.woff")),
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
          padding: "72px 80px",
          background: "#1f3557",
          color: "#ffffff",
          fontFamily: "Source Sans 3",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, letterSpacing: 2, textTransform: "uppercase", color: "#e9d3b8" }}>
          {kicker}
        </div>
        <div style={{ display: "flex", fontFamily: "Zilla Slab", fontSize: title.length > 40 ? 68 : 84, lineHeight: 1.1, maxWidth: 1000 }}>
          {title}
        </div>
        <div style={{ display: "flex", alignItems: "center", fontSize: 30, color: "#d7deea" }}>
          <div style={{ width: 48, height: 4, background: "#e9d3b8", marginRight: 20 }} />
          {common.siteTitle}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Zilla Slab", data: head, weight: 700, style: "normal" },
        { name: "Source Sans 3", data: body, weight: 400, style: "normal" },
      ],
    },
  );
}
