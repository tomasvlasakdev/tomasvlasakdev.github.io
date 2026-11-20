import { typeset } from "@/lib/typography";

// The only file with price numbers. Rendered on /farnosti only when siteConfig.showPrices is true.
// `amount` is in CZK; `unit` is the text after the amount ("" for a one-off price).

export type PriceItem = { id: string; name: string; amount: number; unit: string; includes: string };

export const setupPrices: PriceItem[] = typeset([
  {
    id: "zaklad",
    name: "Základ",
    amount: 8900,
    unit: "",
    includes:
      "Hotová šablona, výběr ze čtyř vzhledů, vlastní barva a logo, až 3 kostely, kalendář, formulář na mešní úmysly, QR platba, jedno zaškolení a první rok provozu.",
  },
  {
    id: "komplet",
    name: "Komplet",
    amount: 12900,
    unit: "",
    includes:
      "Vše ze Základu, až 6 kostelů, převod až 20 stránek ze starého webu, návody upravené podle zvyklostí farnosti a dvě zaškolení.",
  },
  {
    id: "dalsi-farnost",
    name: "Každá další farnost na stejném webu",
    amount: 2900,
    unit: "",
    includes: "Její kostely, časy bohoslužeb, účet a QR platba.",
  },
]);

export const carePrices: PriceItem[] = typeset([
  {
    id: "provoz",
    name: "Provoz",
    amount: 1990,
    unit: "ročně, od druhého roku",
    includes: "Hosting, zálohy, aktualizace, hlídání domény, opravy závad a pomoc e-mailem.",
  },
  {
    id: "pomoc",
    name: "Pomoc",
    amount: 4900,
    unit: "ročně",
    includes:
      "Provoz, pomoc po telefonu, úpravy webu až do 6 hodin ročně a zaškolení nového správce jednou za rok.",
  },
  {
    id: "obsah",
    name: "Obsah za vás",
    amount: 1190,
    unit: "měsíčně",
    includes: "Pomoc a navíc týdně nahrané ohlášky a až čtyři aktuality měsíčně.",
  },
  {
    id: "prace-navic",
    name: "Práce navíc",
    amount: 450,
    unit: "za hodinu",
    includes: "Nové funkce, změny vzhledu, tištěné materiály.",
  },
]);
