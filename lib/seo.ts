import type { Metadata } from "next";
import { siteConfig } from "@/site.config";

/** Absolute URL for a site path like "/farnosti/". */
export function absoluteUrl(path: string): string {
  return siteConfig.url + path;
}

type PageMetaInput = {
  title: string;
  description: string;
  /** Route path with trailing slash, e.g. "/farnosti/". */
  path: string;
  noindex?: boolean;
};

/** Per-page metadata: title, description, canonical and Open Graph. OG images come from opengraph-image.tsx. */
export function pageMetadata({ title, description, path, noindex }: PageMetaInput): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title,
      description,
      url: absoluteUrl(path),
    },
    twitter: { card: "summary_large_image", title, description },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}
