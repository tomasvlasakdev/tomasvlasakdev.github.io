import { home } from "@/content/cs/home";
import { farnosti } from "@/content/cs/farnosti";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/site.config";

// JSON-LD per page path. Served at build time by app/structured-data.json/route.ts;
// scripts/postbuild.mjs moves each entry into the <head> of its page and deletes the JSON file.
// (The App Router cannot put an inline script into <head> per page, and moving one out of
// <body> after the build would break hydration. Extra tags in <head> are fine for React.)

const ids = {
  person: absoluteUrl("/#person"),
  website: absoluteUrl("/#website"),
  service: absoluteUrl("/farnosti/#service"),
};

const person = {
  "@type": "Person",
  "@id": ids.person,
  name: siteConfig.name,
  url: absoluteUrl("/"),
  jobTitle: siteConfig.person.jobTitle,
  description: home.meta.description,
  email: `mailto:${siteConfig.contact.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Čelákovice", addressCountry: "CZ" },
  ...(siteConfig.person.photoUrl ? { image: siteConfig.person.photoUrl } : {}),
  sameAs: [...siteConfig.profiles],
};

const website = {
  "@type": "WebSite",
  "@id": ids.website,
  name: siteConfig.name,
  url: absoluteUrl("/"),
  inLanguage: "cs",
  publisher: { "@id": ids.person },
};

export const structuredData: Record<string, object> = {
  "/": {
    "@context": "https://schema.org",
    "@graph": [
      person,
      website,
      {
        "@type": "ProfilePage",
        "@id": absoluteUrl("/"),
        url: absoluteUrl("/"),
        name: home.meta.title,
        inLanguage: "cs",
        isPartOf: { "@id": ids.website },
        mainEntity: { "@id": ids.person },
      },
    ],
  },
  "/farnosti/": {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": ids.service,
    name: farnosti.schema.name,
    serviceType: farnosti.schema.serviceType,
    description: farnosti.meta.description,
    url: absoluteUrl("/farnosti/"),
    areaServed: { "@type": "Country", name: farnosti.schema.areaServed },
    provider: { "@type": "Person", "@id": ids.person, name: siteConfig.name, url: absoluteUrl("/") },
  },
};
