// Checks every internal link and asset reference in out/*.html resolves to a file.
// External links are listed but not fetched (CI should not depend on other sites).
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out");
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(p);
    else if (entry.name.endsWith(".html")) yield p;
  }
}

async function exists(urlPath) {
  let rel = decodeURIComponent(urlPath.split(/[?#]/)[0]);
  if (base && rel.startsWith(base)) rel = rel.slice(base.length) || "/";
  const file = path.join(root, rel);
  try {
    const s = await stat(file);
    if (s.isDirectory()) await stat(path.join(file, "index.html"));
    return true;
  } catch {
    return false;
  }
}

const broken = [];
const external = new Set();
let checked = 0;

for await (const file of htmlFiles(root)) {
  const html = await readFile(file, "utf8");
  const pageUrl = "/" + path.relative(root, file).replace(/index\.html$/, "").replace(/\\/g, "/");
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  for (const m of html.matchAll(/\s(?:href|src|srcSet|srcset)="([^"]+)"/g)) {
    const raw = m[1].replace(/&amp;/g, "&");
    for (const ref of raw.split(",").map((s) => s.trim().split(/\s+/)[0])) {
      if (!ref || ref.startsWith("data:")) continue;
      if (/^(mailto|tel):/.test(ref)) continue;
      if (/^https?:\/\//.test(ref)) {
        external.add(ref);
        continue;
      }
      checked++;
      if (ref.startsWith("#")) {
        if (ref.length > 1 && !ids.has(ref.slice(1))) broken.push(`${pageUrl}: missing anchor ${ref}`);
        continue;
      }
      const target = ref.startsWith("/") ? ref : path.posix.join(pageUrl, ref);
      if (!(await exists(target))) broken.push(`${pageUrl}: ${ref}`);
    }
  }
}

console.log(`Checked ${checked} internal references. External links (not fetched):`);
for (const e of [...external].sort()) console.log("  " + e);
if (broken.length) {
  console.error(`\n${broken.length} broken:\n` + broken.map((b) => "  " + b).join("\n"));
  process.exit(1);
}
console.log("No broken internal links.");
