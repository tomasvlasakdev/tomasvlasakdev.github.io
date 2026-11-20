import { existsSync } from "node:fs";
import path from "node:path";
import { cv } from "@/content/cs/cv";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";
import styles from "./cv.module.css";

export const metadata = pageMetadata({ ...cv.meta, path: "/cv/", noindex: true });

// Build-time check: the download button exists only if the PDF is in public/.
const pdfExists = existsSync(path.join(process.cwd(), "public", siteConfig.cv.pdf));

export default function CvPage() {
  return (
    <div className={`wrap ${styles.cv}`}>
      <header className={styles.head}>
        <div>
          <h1>{cv.name}</h1>
          <p className={styles.role}>{cv.role}</p>
        </div>
        {pdfExists && (
          <a className="button" href={siteConfig.basePath + siteConfig.cv.pdf} download>
            {cv.download}
          </a>
        )}
      </header>

      <div className={styles.grid}>
        <aside className={styles.side}>
          <section aria-labelledby="cv-kontakt">
            <h2 id="cv-kontakt">{cv.contactHeading}</h2>
            <ul className={styles.plain}>
              {cv.contact.map((c) => (
                <li key={c.label}>{"href" in c && c.href ? <a href={c.href}>{c.label}</a> : c.label}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="cv-jazyky">
            <h2 id="cv-jazyky">{cv.languages.heading}</h2>
            <ul className={styles.plain}>
              {cv.languages.items.map((l) => (
                <li key={l.name}>
                  <strong>{l.name}</strong> – {l.level}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="cv-dovednosti">
            <h2 id="cv-dovednosti">{cv.skills.heading}</h2>
            <dl className={styles.skills}>
              {cv.skills.groups.map((g) => (
                <div key={g.label}>
                  <dt>{g.label}</dt>
                  <dd>{g.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </section>
        </aside>

        <div className={styles.main}>
          <section aria-labelledby="cv-profil">
            <h2 id="cv-profil">{cv.profile.heading}</h2>
            {cv.profile.lines.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </section>

          <section aria-labelledby="cv-zkusenosti">
            <h2 id="cv-zkusenosti">{cv.experience.heading}</h2>
            {cv.experience.items.map((e) => (
              <article key={e.title} className={styles.entry}>
                <h3>{e.title}</h3>
                <p className={styles.meta}>{e.meta}</p>
                <p>{e.text}</p>
              </article>
            ))}
          </section>

          <section aria-labelledby="cv-vzdelani">
            <h2 id="cv-vzdelani">{cv.education.heading}</h2>
            {cv.education.items.map((e) => (
              <div key={e.title} className={styles.entry}>
                <h3>{e.title}</h3>
                <p className={styles.meta}>{e.meta}</p>
              </div>
            ))}
          </section>

          <section aria-labelledby="cv-oceneni">
            <h2 id="cv-oceneni">{cv.awards.heading}</h2>
            <ul className="bullets">
              {cv.awards.items.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="cv-soft">
            <h2 id="cv-soft">{cv.softSkills.heading}</h2>
            <dl className={styles.soft}>
              {cv.softSkills.items.map((s) => (
                <div key={s.title}>
                  <dt>{s.title}</dt>
                  <dd>{s.text}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>
    </div>
  );
}
