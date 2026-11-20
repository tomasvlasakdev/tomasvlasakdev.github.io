import { renderOg, ogSize, ogContentType } from "@/lib/og";
import { ochranaSoukromi as o } from "@/content/cs/ochrana-soukromi";
import { common } from "@/content/cs/common";

export const dynamic = "force-static";
export const alt = o.heading;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ kicker: common.siteTitle, title: o.heading });
}
