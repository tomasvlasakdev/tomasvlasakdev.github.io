import { FarnostiPage } from "@/features/farnosti/FarnostiPage";
import { farnosti } from "@/content/cs/farnosti";
import { pageMetadata } from "@/lib/seo";

// Structured data for this page: lib/structured-data.ts.
export const metadata = pageMetadata({ ...farnosti.meta, path: "/farnosti/" });

export default function Page() {
  return <FarnostiPage />;
}
