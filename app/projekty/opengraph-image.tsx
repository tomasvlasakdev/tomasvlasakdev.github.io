import { renderOg, ogSize, ogContentType } from "@/lib/og";
import { projektyPage } from "@/content/cs/projekty";
import { common } from "@/content/cs/common";

export const dynamic = "force-static";
export const alt = projektyPage.heading;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ kicker: common.siteTitle, title: projektyPage.heading });
}
