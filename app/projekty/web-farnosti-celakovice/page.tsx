import Link from "next/link";
import { caseCelakovice as c } from "@/content/cs/case-celakovice";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

export const metadata = pageMetadata({ ...c.meta, path: "/projekty/web-farnosti-celakovice/" });

export default function CaseStudyPage() {
  const base = siteConfig.basePath;
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="kicker">{c.kicker}</p>
          <h1>{c.heading}</h1>
          <dl className="facts" style={{ marginTop: "var(--space-4)" }}>
            {c.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{"href" in f && f.href ? <a href={f.href}>{f.value}</a> : f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="wrap prose stack" style={{ paddingBottom: "var(--space-6)" }}>
        {c.sections.map((s) => (
          <section key={s.heading}>
            <h2>{s.heading}</h2>
            {"paragraphs" in s && s.paragraphs?.map((p) => <p key={p}>{p}</p>)}
            {"list" in s && s.list && (
              <ul className="bullets">
                {s.list.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            )}
            {"link" in s && s.link && (
              <Link className="text-link" href={s.link.href}>
                {s.link.label}
              </Link>
            )}
          </section>
        ))}
      </div>

      {/* TODO(owner): screenshots slot, rendered once c.screenshots.items has entries. */}
      {c.screenshots.items.length > 0 && (
        <section className="section section--warm" aria-labelledby="ukazky">
          <div className="wrap">
            <h2 id="ukazky">{c.screenshots.heading}</h2>
            <div className="figure-grid">
              {c.screenshots.items.map((img) => (
                <figure key={img.src}>
                  <picture>
                    <source srcSet={`${base}${img.src}.avif`} type="image/avif" />
                    <source srcSet={`${base}${img.src}.webp`} type="image/webp" />
                    <img src={`${base}${img.src}.webp`} width={img.width} height={img.height} alt={img.alt} loading="lazy" decoding="async" />
                  </picture>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
