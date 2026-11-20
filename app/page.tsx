import Link from "next/link";
import { home } from "@/content/cs/home";
import { projects } from "@/content/cs/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { ContactEmail } from "@/components/ContactEmail";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/site.config";

export const metadata = pageMetadata({ ...home.meta, path: "/" });

export default function HomePage() {
  const { hero, parish, about, contact } = home;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: siteConfig.name,
          url: absoluteUrl("/"),
          email: `mailto:${siteConfig.contact.email}`,
          jobTitle: "Full-stack vývojář",
          address: { "@type": "PostalAddress", addressLocality: "Čelákovice", addressCountry: "CZ" },
          sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
        }}
      />

      <section className="hero">
        <div className="wrap">
          <h1>{hero.heading}</h1>
          <p className="hero__tagline">{hero.tagline}</p>
          <p className="lead">{hero.text}</p>
          <div className="actions">
            <Link className="button" href={hero.buttons[0].href}>
              {hero.buttons[0].label}
            </Link>
            <Link className="button button--secondary" href={hero.buttons[1].href}>
              {hero.buttons[1].label}
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--warm" aria-labelledby="farnosti-nadpis">
        <div className="wrap">
          <div className="card card--feature">
            <h2 id="farnosti-nadpis">{parish.heading}</h2>
            <p>{parish.text}</p>
            <div className="card__footer">
              <Link className="text-link" href={parish.link.href}>
                {parish.link.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="projekty-nadpis">
        <div className="wrap">
          <h2 id="projekty-nadpis">{home.projects.heading}</h2>
          <ul className="card-grid">
            {projects.map((p) => (
              <li key={p.id}>
                <ProjectCard project={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="o-mne-nadpis">
        <div className="wrap prose">
          <h2 id="o-mne-nadpis">{about.heading}</h2>
          <p>{about.text}</p>
          <Link className="text-link" href={about.link.href}>
            {about.link.label}
          </Link>
        </div>
      </section>

      <section className="section section--warm" aria-labelledby="kontakt-nadpis">
        <div className="wrap prose">
          <h2 id="kontakt-nadpis">{contact.heading}</h2>
          <p>{contact.text}</p>
          <ContactEmail />
        </div>
      </section>
    </>
  );
}
