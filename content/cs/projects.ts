import { typeset } from "@/lib/typography";

// Project cards, shared by the home page and /projekty.
export type Project = {
  id: string;
  title: string;
  text: string;
  tags: string[];
  link?: { label: string; href: string };
};

export const projects: Project[] = typeset([
  {
    id: "web-farnosti-celakovice",
    title: "Web farnosti Čelákovice",
    text: "Kompletní farní web: bohoslužby, ohlášky, kalendář propojený s Google Kalendářem, formulář na mešní úmysly a liturgický kalendář. Vytvořil jsem ho sám a farnost ho používá.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Sveltia CMS"],
    link: { label: "Přečíst případovou studii", href: "/projekty/web-farnosti-celakovice/" },
  },
  {
    id: "toptrans-eu",
    title: "TopTrans EU",
    text: "Školní odborná praxe v týmu pěti vývojářů, celkem šest týdnů. Vytvořili jsme dvě webové aplikace, které firmě šetří čas a automatizují práci, kterou dřív zaměstnanci dělali ručně.",
    tags: [],
  },
  {
    id: "teamy",
    title: "Teamy",
    text: "Školní projekt, který jsem vedl: webová aplikace, v níž organizace sdílí úkoly mezi členy. Tým o třech lidech, zhruba 50 hodin práce.",
    tags: ["PHP", "JavaScript", "HTML", "CSS"],
  },
]);
