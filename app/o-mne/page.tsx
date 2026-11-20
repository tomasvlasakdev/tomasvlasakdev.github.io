import Link from "next/link";
import { oMne } from "@/content/cs/o-mne";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

export const metadata = pageMetadata({ ...oMne.meta, path: "/o-mne/" });

export default function OMnePage() {
  const photo = oMne.photo;
  return (
    <section className="hero">
      <div className="wrap split">
        <div>
          {photo ? (
            <picture>
              <source srcSet={`${siteConfig.basePath}${photo.src}.avif`} type="image/avif" />
              <img
                src={`${siteConfig.basePath}${photo.src}.webp`}
                width={photo.width}
                height={photo.height}
                alt={photo.alt}
                style={{ borderRadius: "var(--radius)", marginBottom: "var(--space-4)" }}
              />
            </picture>
          ) : (
            // TODO(owner): replace with a photo by setting oMne.photo in content/cs/o-mne.ts
            <div className="monogram" aria-hidden="true">
              {oMne.monogram}
            </div>
          )}
        </div>
        <div className="prose">
          <h1>{oMne.heading}</h1>
          {oMne.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <h2 className="visually-hidden">{oMne.factsLabel}</h2>
          <dl className="facts" style={{ marginBlock: "var(--space-4)" }}>
            {oMne.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          <Link className="button button--secondary" href={oMne.link.href}>
            {oMne.link.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
