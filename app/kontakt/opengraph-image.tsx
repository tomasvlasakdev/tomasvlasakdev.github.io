import { renderOg, ogSize, ogContentType } from "@/lib/og";
import { kontakt } from "@/content/cs/kontakt";
import { common } from "@/content/cs/common";

export const dynamic = "force-static";
export const alt = kontakt.heading;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ kicker: common.siteTitle, title: kontakt.heading });
}
