import { renderOg, ogSize, ogContentType } from "@/lib/og";
import { home } from "@/content/cs/home";

export const dynamic = "force-static";
export const alt = home.hero.heading;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ kicker: home.hero.tagline, title: home.hero.heading });
}
