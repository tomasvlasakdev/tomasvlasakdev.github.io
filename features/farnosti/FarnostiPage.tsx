import Link from "next/link";
import type { CSSProperties } from "react";
import { farnosti as f } from "@/content/cs/farnosti";
import { setupPrices, carePrices, type PriceItem } from "@/content/cs/farnosti-prices";
import { formatCzk } from "@/lib/typography";
import { siteConfig } from "@/site.config";
import { CopyEmail } from "@/components/CopyEmail";
import { lookStyles, seasonDots } from "./looks";
import s from "./farnosti.module.css";

// /farnosti is self-contained: it reads only its own content files, the site config and
// generic UI pieces, so it can move to its own domain later without a rewrite.

const demoUrl = siteConfig.parish.demoUrl;
const email = siteConfig.contact.email;
const mailto = `mailto:${email}?subject=${encodeURIComponent(f.contact.emailSubject)}`;

export function FarnostiPage() {
  return (
    <div className={s.page}>
      <Hero />
      <Features />
      <Looks />
      <Process />
      <Roles />
      <Ownership />
      {siteConfig.showPrices ? <PriceList /> : <PriceOnRequest />}
      <Faq />
      <Builder />
      <Contact />
      <div className={s.sticky}>
        <a className="button" href={mailto}>
          {f.contact.stickyButton}
        </a>
      </div>
    </div>
  );
}

function Hero() {
  const { hero } = f;
  return (
    <section className={s.hero}>
      <div className="wrap">
        <p className="kicker">{hero.kicker}</p>
        <h1>{hero.heading}</h1>
        <p className={s.lead}>{hero.lead}</p>
        <div className="actions">
          {demoUrl && (
            <a className="button" href={demoUrl}>
              {hero.demoButton}
            </a>
          )}
          <a className={demoUrl ? "button button--secondary" : "button"} href={mailto}>
            {hero.contactButton}
          </a>
        </div>
        <p className={s.note}>
          {hero.note.before}
          <a href={hero.note.href}>{hero.note.linkText}</a>
          {hero.note.after}
        </p>
      </div>
    </section>
  );
}

function Features() {
  const { features } = f;
  return (
    <section className="section section--warm" aria-labelledby="co-web-umi">
      <div className="wrap">
        <h2 id="co-web-umi">{features.heading}</h2>
        <ul className={s.features}>
          {features.items.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong> {item.text}
            </li>
          ))}
        </ul>
        <p>{features.closing}</p>
      </div>
    </section>
  );
}

function Looks() {
  const { looks } = f;
  return (
    <section className="section" aria-labelledby="ctyri-vzhledy">
      <div className="wrap">
        <h2 id="ctyri-vzhledy">{looks.heading}</h2>
        <p className={s.sectionLead}>{looks.lead}</p>
        <ul className={s.looks}>
          {looks.items.map((look) => {
            const st = lookStyles[look.id];
            const vars = {
              "--sw-bg": st.bg,
              "--sw-ink": st.ink,
              "--sw-accent": st.accent,
              "--sw-font": st.font,
              "--sw-weight": st.weight,
            } as CSSProperties;
            return (
              <li key={look.id}>
                <article className={s.look}>
                  {/* TODO(owner): real screenshot of this look from the demo site goes here. */}
                  <div className={s.swatch} style={vars} aria-hidden="true">
                    <span className={s.swatchBar} />
                    <span className={s.swatchSample}>{looks.swatchSample}</span>
                    <span className={s.swatchDots}>
                      {st.dots.map((c) => (
                        <span key={c} style={{ background: c }} />
                      ))}
                    </span>
                  </div>
                  <div className={s.lookBody}>
                    <h3>{look.name}</h3>
                    <p className={s.feel}>{look.feel}</p>
                    <p>{look.description}</p>
                    <p className={s.suits}>{look.suits}</p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
        <div className={s.after}>
          <p>
            <span className={s.seasons} aria-hidden="true">
              {seasonDots.map((c) => (
                <span key={c} style={{ background: c }} />
              ))}
            </span>
            {looks.liturgicalColours}
          </p>
          <p>{looks.custom}</p>
          {demoUrl && (
            <a className="text-link" href={demoUrl}>
              {looks.demoLink}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const { process } = f;
  return (
    <section className="section section--warm" aria-labelledby="jak-to-probiha">
      <div className="wrap">
        <h2 id="jak-to-probiha">{process.heading}</h2>
        <ol className={s.steps}>
          {process.steps.map((step) => (
            <li key={step.title}>
              <p>
                <strong>{step.title}</strong> {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Roles() {
  const { roles } = f;
  const c = roles.columns;
  return (
    <section className="section" aria-labelledby="kdo-co-dela">
      <div className="wrap">
        <h2 id="kdo-co-dela">{roles.heading}</h2>
        <table className={s.table}>
          <thead>
            <tr>
              <th scope="col">{c.task}</th>
              <th scope="col">{c.who}</th>
              <th scope="col">{c.when}</th>
              <th scope="col">{c.how}</th>
            </tr>
          </thead>
          <tbody>
            {roles.rows.map((r) => (
              <tr key={r.task}>
                <th scope="row">{r.task}</th>
                <td data-label={c.who}>{r.who}</td>
                <td data-label={c.when}>{r.when}</td>
                <td data-label={c.how}>{r.how}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={s.callout}>
          <h3>{roles.editorsHeading}</h3>
          <p>{roles.editorsText}</p>
        </div>
      </div>
    </section>
  );
}

function Ownership() {
  const { ownership } = f;
  return (
    <section className="section section--warm" aria-labelledby="web-patri-farnosti">
      <div className="wrap">
        <h2 id="web-patri-farnosti">{ownership.heading}</h2>
        {ownership.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </section>
  );
}

function PriceTable({ caption, items }: { caption: string; items: PriceItem[] }) {
  const c = f.pricing.columns;
  return (
    <table className={s.table}>
      <caption className="visually-hidden">{caption}</caption>
      <thead>
        <tr>
          <th scope="col">{c.name}</th>
          <th scope="col">{c.price}</th>
          <th scope="col">{c.includes}</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <th scope="row">{item.name}</th>
            <td data-label={c.price} className={s.price}>
              {formatCzk(item.amount)}
              {item.unit && <span className={s.unit}>{item.unit}</span>}
            </td>
            <td data-label={c.includes}>{item.includes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Block A – "Ceník", shown when siteConfig.showPrices is true. */
function PriceList() {
  const { pricing } = f;
  return (
    <section className="section" aria-labelledby="cenik">
      <div className="wrap">
        <h2 id="cenik">{pricing.heading}</h2>
        <p className={s.sectionLead}>{pricing.lead}</p>

        <h3>{pricing.setupHeading}</h3>
        <PriceTable caption={pricing.setupHeading} items={setupPrices} />

        <h3 className={s.subheading}>{pricing.careHeading}</h3>
        <PriceTable caption={pricing.careHeading} items={carePrices} />

        <ul className={s.notes}>
          {pricing.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>

        {siteConfig.foundingOffer && (
          <div className={s.callout}>
            <p>{pricing.foundingOffer}</p>
          </div>
        )}
      </div>
    </section>
  );
}

/** Block B – "Cena", shown when siteConfig.showPrices is false. */
function PriceOnRequest() {
  const { price } = f;
  return (
    <section className="section" aria-labelledby="cena">
      <div className="wrap">
        <h2 id="cena">{price.heading}</h2>
        <p className={s.sectionLead}>{price.text}</p>
      </div>
    </section>
  );
}

function Faq() {
  const { faq } = f;
  return (
    <section className="section section--warm" aria-labelledby="caste-otazky">
      <div className="wrap">
        <h2 id="caste-otazky">{faq.heading}</h2>
        <div className={s.faq}>
          {faq.items.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Builder() {
  const { builder } = f;
  return (
    <section className="section" aria-labelledby="kdo-web-stavi">
      <div className="wrap">
        <h2 id="kdo-web-stavi">{builder.heading}</h2>
        <p>{builder.text}</p>
        <Link className="text-link" href={builder.link.href}>
          {builder.link.label}
        </Link>
      </div>
    </section>
  );
}

function Contact() {
  const { contact } = f;
  return (
    <section id="napiste-mi" className={`section section--warm ${s.contact}`} aria-labelledby="napiste-mi-nadpis">
      <div className="wrap">
        <h2 id="napiste-mi-nadpis">{contact.heading}</h2>
        <p className={s.sectionLead}>{contact.text}</p>
        <p>{contact.meetings}</p>
        <CopyEmail email={email} subject={contact.emailSubject} labels={contact.buttons} />
      </div>
    </section>
  );
}
