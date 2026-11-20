import { typeset } from "@/lib/typography";

export const caseCelakovice = typeset({
  meta: {
    title: "Web farnosti Čelákovice | Tomáš Vlasák",
    description:
      "Případová studie: farní web s bohoslužbami, ohlášky, kalendářem a formulářem na mešní úmysly. Jediný vývojář, Next.js, testováno s farníky.",
  },
  heading: "Web farnosti Čelákovice",
  facts: [
    { label: "Role", value: "jediný vývojář" },
    { label: "Stack", value: "Next.js, TypeScript, Tailwind CSS, Sveltia CMS" },
    { label: "Odkaz", value: "farnostcelakovice.net", href: "https://farnostcelakovice.net" },
  ],
  sections: [
    {
      heading: "Cíl",
      paragraphs: [
        "Web, na kterém návštěvník do pár vteřin najde, kdy je mše, a který zvládne upravovat i člověk bez znalosti programování.",
      ],
    },
    {
      heading: "Co web umí",
      list: [
        "Bohoslužby podle kostelů, včetně výjimek.",
        "Kalendář akcí propojený s Google Kalendářem.",
        "Ohlášky s archivem.",
        "Formulář na mešní úmysly, který posílá zprávu do farní kanceláře.",
        "Liturgický kalendář počítaný přímo v prohlížeči.",
        "Úpravy obsahu v prohlížeči, i z telefonu.",
      ],
    },
    {
      heading: "Jak jsem ho ověřoval",
      paragraphs: [
        "Uživatelské testování probíhalo s třemi farníky a knězem. Jejich připomínky jsem opravil před spuštěním.",
      ],
    },
    {
      heading: "Moje role",
      paragraphs: [
        "Jsem jediný vývojář: návrh, programování, obsah i nasazení. Na webu jsem strávil přes 100 hodin a vytvořil jsem ho pro farnost zdarma.",
      ],
    },
    {
      heading: "Co dál",
      paragraphs: [
        "Teď z webu dělám stavebnici pro další farnosti: jeden základ, čtyři vzhledy a nastavení v jednom souboru.",
      ],
      link: { label: "Weby pro farnosti", href: "/farnosti/" },
    },
  ],
  screenshots: {
    heading: "Ukázky",
    // Taken from farnostcelakovice.net on 20. 11. 2026. Sources in assets/images/, run `npm run images` to rebuild.
    items: [
      {
        src: "/images/celakovice-desktop",
        width: 1600,
        height: 1000,
        alt: "Úvodní stránka webu farnosti Čelákovice na počítači: fotografie kostela a nejbližší bohoslužby",
      },
      {
        src: "/images/celakovice-phone",
        width: 780,
        height: 1688,
        alt: "Úvodní stránka webu farnosti Čelákovice na mobilu",
      },
    ] as { src: string; width: number; height: number; alt: string }[],
  },
});
