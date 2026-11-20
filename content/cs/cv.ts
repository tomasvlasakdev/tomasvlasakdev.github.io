import { typeset } from "@/lib/typography";
import { siteConfig } from "@/site.config";

// Developer CV, Czech. Only the facts from the brief. No phone, address or date of birth.
// The university variant is never published.

export const cv = typeset({
  meta: {
    title: "CV | Tomáš Vlasák",
    description: "Životopis vývojáře Tomáše Vlasáka: zkušenosti, vzdělání, jazyky a dovednosti.",
  },
  name: "Tomáš Vlasák",
  role: "Full-stack vývojář · Student oboru Vývoj aplikací",
  download: "Stáhnout PDF",
  contactHeading: "Kontakt",
  contact: [
    { label: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
    { label: "github.com/tomasvlasakdev", href: "https://github.com/tomasvlasakdev" },
    { label: "linkedin.com/in/tomas-vlasak", href: "https://www.linkedin.com/in/tomas-vlasak" },
    { label: "tomasvlasakdev.github.io", href: "https://tomasvlasakdev.github.io/" },
    { label: "Čelákovice, Česko" },
  ],
  profile: {
    heading: "Profil",
    lines: [
      "Student oboru Vývoj aplikací a full-stack vývojář.",
      "Stavím webové aplikace v TypeScriptu, Reactu a Next.js a pracuji v týmech.",
    ],
  },
  experience: {
    heading: "Zkušenosti",
    items: [
      {
        title: "TopTrans EU",
        meta: "Člen týmu pěti vývojářů · školní odborná praxe, červen a září 2026 (6 týdnů)",
        text: "Vytvořili jsme dvě kompletní webové aplikace, které firmě šetří čas a automatizují řadu úkolů, jež zaměstnanci dosud dělali ručně.",
      },
      {
        title: "Web farnosti Čelákovice",
        meta: "Autor a vývojář, dobrovolně · farnostcelakovice.net · přes 100 hodin práce",
        text: "Web pro farnost v rodném městě jsem jako jediný vývojář vytvořil zdarma ve frameworku Next.js. Uživatelské testování probíhalo s třemi farníky a knězem.",
      },
      {
        title: "Teamy",
        meta: "Vedoucí týmu, školní projekt · 3 lidé, zhruba 50 hodin",
        text: "Webová aplikace, v níž organizace sdílí úkoly mezi členy. PHP, JavaScript, HTML, CSS.",
      },
    ],
  },
  education: {
    heading: "Vzdělání",
    items: [
      { title: "Střední průmyslová škola na Proseku, Vývoj aplikací", meta: "2023 – současnost (4. ročník)" },
      { title: "Gymnázium prof. Jana Patočky", meta: "2019 – 2023" },
      { title: "Jazykové pobyty", meta: "Brighton, 2025 (3 týdny) · San Francisco, 2026 (1 měsíc)" },
    ],
  },
  languages: {
    heading: "Jazyky",
    items: [
      { name: "čeština", level: "rodilý mluvčí" },
      { name: "angličtina", level: "C2, Cambridge certifikát" },
      { name: "němčina", level: "A2" },
    ],
  },
  awards: {
    heading: "Ocenění a aktivity",
    items: [
      "Hra na lesní roh, 9 let (1. místo v celostátním kole komorní hry; 1. místo v kategorii orchestr; řada koncertů)",
      "Vítěz školního kola BEST IN ENGLISH (2025, 79 žáků školy)",
      "Program DofE, stříbrná úroveň (rozpracováno)",
    ],
  },
  skills: {
    heading: "Dovednosti",
    groups: [
      { label: "Jazyky", items: ["TypeScript", "JavaScript", "PHP", "Python", "HTML", "CSS"] },
      { label: "Frameworky", items: ["React", "Next.js", "Node.js", "Vite", "Tailwind CSS"] },
      { label: "Data a služby", items: ["MySQL", "Supabase", "Stripe", "Vercel", "Cloudflare"] },
      { label: "Nástroje", items: ["Git", "GitHub", "Docker", "npm"] },
    ],
  },
  softSkills: {
    heading: "Soft skills",
    items: [
      {
        title: "Vedení týmu",
        text: "Vedl jsem tříčlenný tým. Členy se snažím místo kritizování podporovat.",
      },
      {
        title: "Spolupráce",
        text: "Pracoval jsem v týmech o 3 až 5 lidech. Vím, jak to v týmu chodí, jak lidi motivovat a jak organizovat práci.",
      },
      {
        title: "Plánování času",
        text: "Vedle školy se věnuji programu DofE a vlastním projektům. Čas si rozvrhuji tak, aby škola i aktivity navíc dostaly dost prostoru a nic z toho nebylo odbyté.",
      },
      {
        title: "Vytrvalost",
        text: "Práci, kterou začnu, dotahuji do konce. Dlouhodobě se držím věcí, které mě baví.",
      },
    ],
  },
});
