import { typeset } from "@/lib/typography";
import { siteConfig } from "@/site.config";

// Global copy: header, footer and the small UI labels shared by several pages.
export const common = typeset({
  siteTitle: "Tomáš Vlasák",
  nav: [
    { label: "Farnosti", href: "/farnosti/" },
    { label: "Projekty", href: "/projekty/" },
    { label: "O mně", href: "/o-mne/" },
    { label: "CV", href: "/cv/" },
    { label: "Kontakt", href: "/kontakt/" },
  ],
  footer: {
    copyright: `© ${siteConfig.copyrightYear} Tomáš Vlasák`,
    links: [
      { label: "GitHub", href: siteConfig.links.github },
      { label: "LinkedIn", href: siteConfig.links.linkedin },
      { label: "Ochrana soukromí", href: "/ochrana-soukromi/" },
    ],
    sentence: "Stavím také weby pro malé spolky a firmy. Napište mi stručně, o co jde.",
  },
  // UI labels not in the copy brief (short, functional).
  ui: {
    skipLink: "Přeskočit na obsah",
    menu: "Menu",
    mainNav: "Hlavní navigace",
    footerNav: "Odkazy v patičce",
    writeEmail: "Napsat e-mail",
    copyAddress: "Kopírovat adresu",
    copied: "Adresa je zkopírovaná",
    copyFailed: "Kopírování se nepovedlo, adresu označte ručně",
    tagsLabel: "Použité technologie",
  },
  legal: {
    icoLabel: "IČO",
  },
  notFound: {
    title: "Stránka nenalezena | Tomáš Vlasák",
    heading: "Tahle stránka tu není",
    text: "Adresa se mohla změnit. Zkuste úvodní stránku.",
    link: "Na úvodní stránku",
  },
});
