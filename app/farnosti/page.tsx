import { FarnostiPage } from "@/features/farnosti/FarnostiPage";
import { farnosti } from "@/content/cs/farnosti";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/site.config";

export const metadata = pageMetadata({ ...farnosti.meta, path: "/farnosti/" });

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: farnosti.schema.name,
          serviceType: farnosti.schema.serviceType,
          description: farnosti.meta.description,
          url: absoluteUrl("/farnosti/"),
          areaServed: { "@type": "Country", name: farnosti.schema.areaServed },
          provider: { "@type": "Person", name: siteConfig.name, url: absoluteUrl("/"), email: `mailto:${siteConfig.contact.email}` },
        }}
      />
      <FarnostiPage />
    </>
  );
}
