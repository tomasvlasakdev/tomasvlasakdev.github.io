import localFont from "next/font/local";

// Self-hosted, subset to Latin + Latin Extended-A (all Czech letters). See assets/fonts/.
export const zilla = localFont({
  src: [
    { path: "../assets/fonts/zilla-slab-600.woff2", weight: "600", style: "normal" },
    { path: "../assets/fonts/zilla-slab-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-zilla",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});

export const sourceSans = localFont({
  src: [{ path: "../assets/fonts/source-sans-3-var.woff2", weight: "200 900", style: "normal" }],
  variable: "--font-source-sans",
  display: "swap",
  fallback: ["system-ui", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});
