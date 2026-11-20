import Link from "next/link";
import { common } from "@/content/cs/common";
import { siteConfig } from "@/site.config";
import { LegalLine } from "./LegalLine";

export function Footer() {
  const { footer, ui } = common;
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="site-footer__line">
          <p>{footer.copyright}</p>
          <ul className="site-footer__links" aria-label={ui.footerNav}>
            {footer.links.map((l) => (
              <li key={l.href}>
                {l.href.startsWith("/") ? <Link href={l.href}>{l.label}</Link> : <a href={l.href}>{l.label}</a>}
              </li>
            ))}
          </ul>
        </div>
        <p>{footer.sentence}</p>
        <LegalLine legal={siteConfig.legal} />
      </div>
    </footer>
  );
}
