import { common } from "@/content/cs/common";
import { czTypo } from "@/lib/typography";

type Legal = { ico: string; registerNote: string };

/** IČO and trade-register sentence. Renders nothing until they are filled in site.config.ts. */
export function LegalLine({ legal, as: Tag = "p" }: { legal: Legal; as?: "p" | "span" }) {
  const parts = [legal.ico && `${common.legal.icoLabel}: ${legal.ico}.`, legal.registerNote && czTypo(legal.registerNote)].filter(Boolean);
  if (parts.length === 0) return null;
  return <Tag>{parts.join(" ")}</Tag>;
}
