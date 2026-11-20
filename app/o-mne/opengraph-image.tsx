import { renderOg, ogSize, ogContentType } from "@/lib/og";
import { oMne } from "@/content/cs/o-mne";
import { common } from "@/content/cs/common";

export const dynamic = "force-static";
export const alt = oMne.heading;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ kicker: common.siteTitle, title: oMne.heading });
}
