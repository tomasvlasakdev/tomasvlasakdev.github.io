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
        {o.sections.map((s) => (
          <div key={s.id}>
            <h2
              id={s.id}
              style={{
                fontSize: "var(--step-1)",
                marginTop: "var(--space-4)",
                scrollMarginTop: "calc(var(--header-h) + var(--space-2))",
              }}
            >
              {s.heading}
            </h2>
            {s.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        ))}
        <LegalLine legal={siteConfig.legal} />
      </div>
    </section>
  );
}
