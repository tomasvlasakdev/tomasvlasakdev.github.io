import { kontakt } from "@/content/cs/kontakt";
import { common } from "@/content/cs/common";
import { ContactEmail } from "@/components/ContactEmail";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ ...kontakt.meta, path: "/kontakt/" });

export default function KontaktPage() {
  const elsewhere = common.footer.links.filter((l) => !l.href.startsWith("/"));
  return (
    <section className="hero">
      <div className="wrap prose">
        <h1>{kontakt.heading}</h1>
        <p className="lead">{kontakt.text}</p>
        <h2 className="visually-hidden">{kontakt.emailLabel}</h2>
        <ContactEmail />
        <h2 style={{ fontSize: "var(--step-1)", marginTop: "var(--space-4)" }}>{kontakt.elsewhereLabel}</h2>
        <ul className="bullets">
          {elsewhere.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
