// Turns assets/images/*.{jpg,jpeg,png} into AVIF + WebP in public/images/.
// The static export doesn't optimise images, so this is done once, ahead of time.
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const src = path.resolve("assets/images");
const dest = path.resolve("public/images");
const MAX_WIDTH = 1600;

await mkdir(dest, { recursive: true });
const files = (await readdir(src)).filter((f) => /\.(jpe?g|png)$/i.test(f));
if (files.length === 0) console.log("No images in assets/images/.");

for (const file of files) {
  const name = file.replace(/\.[^.]+$/, "");
  const img = sharp(path.join(src, file)).rotate().resize({ width: MAX_WIDTH, withoutEnlargement: true });
  const { width, height } = await img.clone().toBuffer({ resolveWithObject: true }).then((r) => r.info);
  await img.clone().avif({ quality: 55 }).toFile(path.join(dest, `${name}.avif`));
  await img.clone().webp({ quality: 78 }).toFile(path.join(dest, `${name}.webp`));
  console.log(`${name}: { src: "/images/${name}", width: ${width}, height: ${height} }`);
}
