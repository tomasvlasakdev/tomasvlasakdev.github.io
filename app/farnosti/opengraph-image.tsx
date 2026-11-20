import { renderOg, ogSize, ogContentType } from "@/lib/og";
import { farnosti } from "@/content/cs/farnosti";

export const dynamic = "force-static";
export const alt = farnosti.hero.heading;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ title: farnosti.hero.heading });
}
