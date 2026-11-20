import type { MetadataRoute } from "next";
import { execFileSync } from "node:child_process";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

// Every indexable page and the files its content comes from. lastmod is the date of the
// last commit that touched them (CI checks out the full history for this).
// /cv is noindex and therefore left out.
const routes: Record<string, string[]> = {
  "/": ["app/page.tsx", "content/cs/home.ts", "content/cs/projects.ts"],
  "/farnosti/": ["app/farnosti", "features/farnosti", "content/cs/farnosti.ts", "content/cs/farnosti-prices.ts"],
  "/projekty/": ["app/projekty/page.tsx", "content/cs/projekty.ts", "content/cs/projects.ts"],
  "/projekty/web-farnosti-celakovice/": ["app/projekty/web-farnosti-celakovice", "content/cs/case-celakovice.ts", "public/images"],
  "/o-mne/": ["app/o-mne", "content/cs/o-mne.ts"],
  "/kontakt/": ["app/kontakt", "content/cs/kontakt.ts"],
  "/ochrana-soukromi/": ["app/ochrana-soukromi", "content/cs/ochrana-soukromi.ts"],
};

function lastCommitDate(files: string[]): Date {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...files], { encoding: "utf8" }).trim();
    if (out) return new Date(out);
  } catch {
    // no git (e.g. a tarball build): fall back to the build date
  }
  return new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.entries(routes).map(([path, files]) => ({
    url: absoluteUrl(path),
    lastModified: lastCommitDate(files),
    changeFrequency: "monthly",
    priority: path === "/" || path === "/farnosti/" ? 1 : 0.6,
  }));
}
