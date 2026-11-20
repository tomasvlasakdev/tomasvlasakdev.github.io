import { renderOg, ogSize, ogContentType } from "@/lib/og";
import { caseCelakovice as c } from "@/content/cs/case-celakovice";

export const dynamic = "force-static";
export const alt = c.heading;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ title: c.heading });
}
