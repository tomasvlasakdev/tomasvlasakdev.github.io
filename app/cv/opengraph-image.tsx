import { renderOg, ogSize, ogContentType } from "@/lib/og";
import { cv } from "@/content/cs/cv";

export const dynamic = "force-static";
export const alt = cv.name;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ kicker: cv.role, title: cv.name });
}
