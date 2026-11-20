import { typeset } from "@/lib/typography";

export const home = typeset({
  meta: {
    title: "Tomáš Vlasák – weby pro farnosti a vývoj webů",
    description:
      "Stavím weby pro farnosti: bohoslužby, ohlášky, kalendář i formulář na mešní úmysly. Student a vývojář z Čelákovic.",
  },
  hero: {
    heading: "Tomáš Vlasák",
    tagline: "Programuji weby, které lidem ušetří práci.",
    text: "Jsem student a vývojář z Čelákovic. Pro farnosti stavím weby, které zvládnou spravovat sami farníci.",
    buttons: [
      { label: "Weby pro farnosti", href: "/farnosti/" },
      { label: "Moje projekty", href: "/projekty/" },
    ],
  },
  parish: {
    heading: "Weby pro farnosti",
    text: "Bohoslužby, ohlášky, kalendář a formulář na mešní úmysly v jednom webu. Vyberete si ze čtyř vzhledů, úpravy zvládnete z telefonu a o provoz se starám já.",
    link: { label: "Zjistit víc", href: "/farnosti/" },
  },
  projects: {
    heading: "Projekty",
  },
  about: {
    heading: "O mně",
    text: "Jsem student střední průmyslové školy na Proseku. Programování mě baví hlavně tam, kde pomáhá lidem v běžné práci.",
    link: { label: "Víc o mně", href: "/o-mne/" },
  },
  contact: {
    heading: "Napište mi",
    text: "Pro farnosti: napište název farnosti a počet kostelů. Pro ostatní stačí stručně popsat, o co jde.",
  },
});
