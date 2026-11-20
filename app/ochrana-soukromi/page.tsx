import { ochranaSoukromi as o } from "@/content/cs/ochrana-soukromi";
import { LegalLine } from "@/components/LegalLine";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

export const metadata = pageMetadata({ ...o.meta, path: "/ochrana-soukromi/" });

export default function PrivacyPage() {
  return (
    <section className="hero">
      <div className="wrap prose">
        <h1>{o.heading}</h1>
        {o.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <LegalLine legal={siteConfig.legal} />
      </div>
    </section>
  );
}
