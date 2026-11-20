// Runs axe-core on every page at phone and desktop width. Fails on any violation.
import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";
import { startServer } from "./serve.mjs";
import { pages } from "./pages.mjs";

const server = await startServer(0);
const origin = `http://localhost:${server.address().port}${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}`;
const browser = await chromium.launch();
let failures = 0;

for (const width of [375, 1280]) {
  // Reduced motion: scroll-reveal stays off, so every element is fully visible to the contrast checks.
  const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
  for (const p of pages) {
    const page = await context.newPage();
    await page.goto(origin + p, { waitUntil: "networkidle" });
    // Open every <details> so the FAQ answers are checked too.
    await page.evaluate(() => document.querySelectorAll("details").forEach((d) => (d.open = true)));
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
      .analyze();
    const v = result.violations;
    console.log(`${v.length ? "✗" : "✓"} ${width}px ${p}${v.length ? ` – ${v.length} violation(s)` : ""}`);
    for (const item of v) {
      failures++;
      console.log(`    [${item.impact}] ${item.id}: ${item.help}`);
      for (const n of item.nodes.slice(0, 3)) console.log(`        ${n.target.join(" ")}`);
    }
    await page.close();
  }
  await context.close();
}

await browser.close();
server.close();
if (failures) {
  console.error(`\naxe: ${failures} violation(s)`);
  process.exit(1);
}
console.log("\naxe: no violations");
