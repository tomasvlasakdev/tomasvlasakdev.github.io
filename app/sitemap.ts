import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

// /cv is noindex and therefore left out.
const routes = ["/", "/farnosti/", "/projekty/", "/projekty/web-farnosti-celakovice/", "/o-mne/", "/kontakt/", "/ochrana-soukromi/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly",
    priority: path === "/" || path === "/farnosti/" ? 1 : 0.6,
  }));
}
