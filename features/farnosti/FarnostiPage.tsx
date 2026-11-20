import Link from "next/link";
import type { CSSProperties } from "react";
import { farnosti as f } from "@/content/cs/farnosti";
import { setupPrices, carePrices, type PriceItem } from "@/content/cs/farnosti-prices";
import { formatCzk } from "@/lib/typography";
import { siteConfig } from "@/site.config";
import { CopyEmail } from "@/components/CopyEmail";
import { lookStyles, seasonDots } from "./looks";
import { Icon } from "./icons";
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
      <Motivation />
      <Features />
      <EditorAndCare />
      <Ownership />
      <Looks />
      <Process />
      {siteConfig.showPrices ? <PriceList /> : <PriceOnRequest />}
      <Faq />
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
    <section className={`hero ${s.hero}`}>
      <div className="wrap">
        <p className="kicker">{hero.kicker}</p>
        <h1>{hero.heading}</h1>
        <p className={s.lead}>{hero.lead}</p>
        <div className="actions">
          <a className="button" href={mailto}>
            {hero.contactButton}
            <span className="button__arrow" aria-hidden="true">
              →
            </span>
          </a>
          {demoUrl && (
            <a className="button button--secondary" href={demoUrl}>
              {hero.demoButton}
            </a>
          )}
        </div>
        <ul className={s.highlights}>
          {hero.highlights.map((h) => (
            <li key={h.id}>
              <span className={s.iconTile}>
                <Icon name={h.id} />
              </span>
              <span>
                <strong>{h.title}</strong>
                <span className={s.highlightText}>{h.text}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className={s.note}>
          {hero.note.before}
          <a href={hero.note.href}>{hero.note.linkText}</a>
          {hero.note.after}
        </p>
      </div>
    </section>
  );
}

function Motivation() {
  const { motivation } = f;
  return (
    <section className="section section--dark" aria-labelledby="proc">
      <div className={`wrap ${s.story}`}>
        <div>
          <p className="kicker">{motivation.kicker}</p>
          <h2 id="proc">{motivation.heading}</h2>
          <p className={s.storyText}>{motivation.text}</p>
          <Link className="text-link" href={motivation.link.href}>
            {motivation.link.label}
          </Link>
        </div>
        <blockquote className={s.belief}>
          <p>{motivation.belief}</p>
        </blockquote>
      </div>
    </section>
  );
}

function Features() {
  const { features } = f;
  return (
    <section className="section" aria-labelledby="co-web-umi">
      <div className="wrap">
        <p className="kicker">{features.kicker}</p>
        <h2 id="co-web-umi">{features.heading}</h2>
        <ul className={s.features}>
          {features.items.map((item) => (
            <li key={item.id}>
              <span className={s.iconTile}>
                <Icon name={item.id} />
              </span>
              <span>
                <strong>{item.title}</strong>
                <span className={s.featureText}>{item.text}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className={s.after}>{features.closing}</p>
      </div>
    </section>
  );
}

function EditorAndCare() {
  const { editor, care } = f;
  return (
    <section className="section section--warm" aria-label={`${editor.heading}, ${care.heading}`}>
      <div className={`wrap ${s.bento}`}>
        <article className={s.panel}>
          <div>
            <p className="kicker">{editor.kicker}</p>
            <h2>{editor.heading}</h2>
            <p>{editor.lead}</p>
            <ul className={s.checks}>
              {editor.items.map((item) => (
                <li key={item}>
                  <Icon name="check" size={18} />
                  {item}
                </li>
              ))}
            </ul>
            <p className={s.panelFoot}>{editor.closing}</p>
          </div>
          {/* Decorative sketch of the editor window. */}
          <div className={s.mock} aria-hidden="true">
            <div className={s.mockBar}>
              <span />
              <span />
              <span />
            </div>
            <div className={s.mockBody}>
              <span className={s.mockLabel}>{editor.mock.field}</span>
              <span className={s.mockField}>{editor.mock.title}</span>
              <span className={s.mockFile}>
                <Icon name="news" size={16} />
                {editor.mock.file}
              </span>
              <span className={s.mockButton}>{editor.mock.button}</span>
            </div>
          </div>
        </article>
        <article className={s.panel}>
          <div>
            <p className="kicker">{care.kicker}</p>
            <h2>{care.heading}</h2>
            <p>{care.lead}</p>
          </div>
          <ul className={s.chips}>
            {care.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

const ownershipIcons = ["shield", "key", "server"];

function Ownership() {
  const { ownership } = f;
  return (
    <section className="section" aria-labelledby="web-patri-farnosti">
      <div className="wrap">
        <p className="kicker">{ownership.kicker}</p>
        <h2 id="web-patri-farnosti">{ownership.heading}</h2>
        <ul className={s.guarantees}>
          {ownership.items.map((item, i) => (
            <li key={item.title}>
              <span className={s.iconTile}>
                <Icon name={ownershipIcons[i]} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Looks() {
  const { looks } = f;
  return (
    <section className="section section--warm" aria-labelledby="ctyri-vzhledy">
      <div className="wrap">
        <p className="kicker">{looks.kicker}</p>
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
            {looks.liturgicalColours} {looks.custom}
          </p>
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
    <section className="section" aria-labelledby="jak-to-probiha">
      <div className="wrap">
        <p className="kicker">{process.kicker}</p>
        <h2 id="jak-to-probiha">{process.heading}</h2>
        <ol className={s.steps}>
          {process.steps.map((step) => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
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
    <section className="section section--warm" aria-labelledby="cenik">
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
    <section className="section section--warm" aria-labelledby="cena">
      <div className="wrap">
        <div className={s.priceCard}>
          <h2 id="cena">{price.heading}</h2>
          <p>{price.text}</p>
          <a className="button" href={mailto}>
            {f.hero.contactButton}
            <span className="button__arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const { faq } = f;
  return (
    <section className="section" aria-labelledby="caste-otazky">
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

function Contact() {
  const { contact } = f;
  return (
    <section id="napiste-mi" className={`section section--dark ${s.contact}`} aria-labelledby="napiste-mi-nadpis">
      <div className="wrap">
        <h2 id="napiste-mi-nadpis">{contact.heading}</h2>
        <p className={s.contactText}>{contact.text}</p>
        <p className={s.contactMeta}>{contact.meetings}</p>
        <CopyEmail email={email} subject={contact.emailSubject} labels={contact.buttons} />
      </div>
    </section>
  );
}
