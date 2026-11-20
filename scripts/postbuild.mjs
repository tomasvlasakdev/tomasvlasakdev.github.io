// Runs after `next build`. Writes tiny redirect pages for the old multi-language URLs
// (/cs/, /cs/cv/, /de/, …) so links shared before the redesign keep working, fixes the
// OG image names and moves the JSON-LD into <head>.
import { mkdir, writeFile, access, readdir, readFile, rename, rm } from "node:fs/promises";
import path from "node:path";

const out = path.resolve("out");
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://tomasvlasak.dev").replace(/\/$/, "");
const legacyLangs = ["en", "cs", "sk", "de", "pl", "fr", "es"];

const page = (target) => `<!doctype html>
<html lang="cs">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=${target}">
<link rel="canonical" href="${siteUrl}${target}">
<title>Přesměrování</title>
</head>
<body><p><a href="${target}">${target}</a></p></body>
</html>
`;

for (const lang of legacyLangs) {
  for (const [from, to] of [
    [`${lang}/`, "/"],
    [`${lang}/cv/`, "/cv/"],
  ]) {
    const dir = path.join(out, from);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, "index.html"), page(base + to));
  }
}

// Open Graph images are exported without an extension, which GitHub Pages would serve as
// application/octet-stream. Give them a .png name and point the meta tags at it.
async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}
let ogCount = 0;
for await (const file of walk(out)) {
  if (path.basename(file) === "opengraph-image") {
    await rename(file, file + ".png");
    ogCount++;
  } else if (file.endsWith(".html")) {
    const html = await readFile(file, "utf8");
    const fixed = html.replace(/\/opengraph-image\?[0-9a-f]+/g, "/opengraph-image.png");
    if (fixed !== html) await writeFile(file, fixed);
  }
}

// JSON-LD into <head>: app/structured-data.json holds { "/path/": data } (see lib/structured-data.ts).
const ldFile = path.join(out, "structured-data.json");
const ld = JSON.parse(await readFile(ldFile, "utf8"));
for (const [route, data] of Object.entries(ld)) {
  const file = path.join(out, route, "index.html");
  const html = await readFile(file, "utf8");
  if (!html.includes("</head>")) throw new Error(`postbuild: no </head> in ${file}`);
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  await writeFile(file, html.replace("</head>", `<script type="application/ld+json">${json}</script></head>`));
}
await rm(ldFile);

await access(path.join(out, "404.html"));
// GitHub Pages must not run Jekyll over the export (it would drop _next/).
await writeFile(path.join(out, ".nojekyll"), "");
console.log(`postbuild: renamed ${ogCount} OG images, wrote redirects for ${legacyLangs.length} legacy language paths, JSON-LD in ${Object.keys(ld).length} pages`);
