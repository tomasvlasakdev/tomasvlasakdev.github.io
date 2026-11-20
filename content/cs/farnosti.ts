import { typeset } from "@/lib/typography";

// All copy for /farnosti. Prices are in ./farnosti-prices.ts, not here.
// This file must not import other page content, so the page can move to its own domain later.

export const farnosti = typeset({
  meta: {
    title: "Weby pro farnosti | Tomáš Vlasák",
    description:
      "Moderní farní web na vlastní doméně: bohoslužby, ohlášky, kalendář a formulář na mešní úmysly. Jednoduchý editor, o techniku se postarám já. Web i doména patří farnosti.",
  },

  hero: {
    kicker: "Weby pro farnosti",
    heading: "Farní web, o který se postaráte i bez programátora",
    lead: "Moderní web na vlastní doméně, který zvládnete spravovat sami. Bohoslužby, ohlášky, kalendář i formulář na mešní úmysly jsou připravené. O techniku se postarám já.",
    demoButton: "Prohlédnout ukázkový web",
    contactButton: "Napsat mi",
    highlights: [
      { id: "look", title: "Moderní vzhled", text: "Čtyři vzhledy, vaše barva a logo." },
      { id: "domain", title: "Vlastní doména", text: "Na adrese vaší farnosti." },
      { id: "mobile", title: "Mobil i tablet", text: "Přizpůsobí se každé obrazovce." },
      { id: "editor", title: "Jednoduchý editor", text: "Ohlášky nahrajete za pár minut." },
    ],
    note: {
      before: "Ukázka hotového webu: ",
      linkText: "farnostcelakovice.net",
      href: "https://farnostcelakovice.net",
      after: "",
    },
  },

  motivation: {
    kicker: "Proč to dělám",
    heading: "Jsem farník, ne agentura",
    text: "Když naše farnost v Čelákovicích potřebovala nový web, nabídl jsem se, že ho udělám. Bavilo mě stavět něco, co lidé každý týden opravdu používají. Proto teď stavím weby i pro další farnosti.",
    belief:
      "Věřím, že přehledný web farníkům usnadní orientaci, důstojně farnost reprezentuje a může do kostela přivést i ty, kdo ji zatím neznají. Svým způsobem tak slouží i k evangelizaci.",
    link: { label: "Jak vznikal web farnosti Čelákovice", href: "/projekty/web-farnosti-celakovice/" },
  },

  features: {
    kicker: "Co web umí",
    heading: "Všechno, co farnost potřebuje, na jednom místě",
    items: [
      { id: "mass", title: "Bohoslužby", text: "Pořad pro každý kostel i s výjimkami." },
      { id: "calendar", title: "Kalendář akcí", text: "Propojený s Google Kalendářem." },
      { id: "announcements", title: "Ohlášky", text: "Každý týden, s archivem a PDF." },
      { id: "news", title: "Aktuality", text: "S fotkami, psané v prohlížeči." },
      { id: "churches", title: "Kostely a kaple", text: "Fotky, mapa a časy bohoslužeb." },
      { id: "sacraments", title: "Chci si domluvit", text: "Křest, svatba, pohřeb a další svátosti." },
      { id: "intention", title: "Mše na úmysl", text: "Formulář pošle zprávu do kanceláře." },
      { id: "gifts", title: "Dary", text: "Číslo účtu a QR platba." },
      { id: "contacts", title: "Kontakty", text: "Úřední hodiny, IČO, datová schránka." },
      { id: "community", title: "Společenství", text: "Pravidelné aktivity a setkání." },
      { id: "gallery", title: "Galerie", text: "Fotky z farních akcí a poutí." },
      { id: "history", title: "Historie farářů", text: "Kněží, kteří ve farnosti působili." },
    ],
    closing: "Farář s více farnostmi je může mít na jednom webu.",
  },

  editor: {
    kicker: "Editor",
    heading: "Úpravy zvládne každý",
    lead: "Web upravujete v prohlížeči, z počítače i z telefonu. Bez instalace a bez programování.",
    items: [
      "Ohlášky nahrajete jako PDF za pár minut.",
      "Aktualitu s fotkami napíšete přímo v editoru.",
      "Akce stačí zapsat do Google Kalendáře.",
    ],
    closing: "Po spuštění vás editorem provedu.",
    // Decorative mock of the editor window (aria-hidden).
    mock: { title: "Nedělní ohlášky", field: "Název", file: "ohlasky.pdf", button: "Zveřejnit" },
  },

  care: {
    kicker: "Technika",
    heading: "O techniku se postarám já",
    lead: "Web běží spolehlivě a bezpečně, a když se něco pokazí, opravím to.",
    items: ["Hosting", "Doména", "Farní e-mail", "SSL certifikát", "Zálohy", "Aktualizace a opravy"],
  },

  ownership: {
    kicker: "Jistota",
    heading: "Web patří farnosti",
    items: [
      { title: "Na jméno farnosti", text: "Web, doména i hosting jsou vedené na farnost." },
      { title: "Přístup ke všemu", text: "Dostanete přístupy, zdrojový kód a předávací list." },
      { title: "Web poběží dál", text: "I když moje služby přestanete využívat. Slibuji to ve smlouvě." },
    ],
  },

  looks: {
    kicker: "Vzhled",
    heading: "Čtyři vzhledy",
    lead: "Vyberte si jeden a doplňte vlastní barvu, logo a fotky.",
    items: [
      { id: "tradice", name: "Tradice", feel: "důstojný, historický", suits: "Pro městskou farnost s významným kostelem." },
      { id: "svetlo", name: "Světlo", feel: "čistý a otevřený", suits: "Pro farnost s mladými rodinami." },
      { id: "krajina", name: "Krajina", feel: "vřelý a přátelský", suits: "Pro venkovskou farnost s mnoha kostely." },
      { id: "liturgie", name: "Liturgie", feel: "klidný a střídmý", suits: "Úvodní stránka začíná dnešním liturgickým dnem." },
    ],
    liturgicalColours: "U každého vzhledu lze zapnout barvu podle liturgické doby.",
    custom: "Návrh na míru připravím za hodinovou sazbu.",
    demoLink: "Vyzkoušet vzhledy na ukázkovém webu",
    swatchSample: "Aa",
  },

  process: {
    kicker: "Postup",
    heading: "Jak to probíhá",
    steps: [
      { title: "Náhled", text: "Před schůzkou připravím web s názvem a bohoslužbami vaší farnosti." },
      { title: "Schůzka", text: "Vyberete vzhled a barvu a podepíšeme dohodu." },
      { title: "Spuštění", text: "Web spustím na doméně farnosti a přenesu obsah ze starého webu." },
      { title: "Zaškolení", text: "Za 45 minut spolu nahrajeme první ohlášky." },
      { title: "Po měsíci", text: "Ozvu se a doladím, co je potřeba." },
    ],
  },

  // Block A, shown when siteConfig.showPrices is true. Amounts are in ./farnosti-prices.ts.
  pricing: {
    heading: "Ceník",
    lead: "Cena se skládá z jednorázového nastavení a ročního provozu. Nejsem plátce DPH, uvedené částky jsou konečné.",
    setupHeading: "Nastavení webu (jednorázově)",
    careHeading: "Péče o web",
    columns: { name: "Služba", price: "Cena", includes: "Co obsahuje" },
    notes: [
      "Nastavení se platí ze dvou polovin: první při podpisu, druhá při spuštění. Menší farnosti mohou platit až ve čtyřech splátkách.",
      "Péče o web se platí jednou za celý web, takže farář s více farnostmi platí jen jednou.",
    ],
    foundingOffer:
      "Prvních pět farností získá Komplet za cenu Základu. Za to poprosím o krátké doporučení a souhlas s popsáním spolupráce.",
  },

  // Block B, shown when siteConfig.showPrices is false.
  price: {
    heading: "Cena",
    text: "Cenu sestavím podle počtu kostelů a toho, co farnost potřebuje: jednorázové nastavení a roční provoz. Napište mi a pošlu vám nabídku.",
  },

  faq: {
    heading: "Časté otázky",
    items: [
      {
        q: "Kdo bude web upravovat?",
        a: "Kdokoli, koho farnost určí: pan farář, kancelář nebo farník. Když se nikdo nenajde, obsah mohu doplňovat za vás.",
      },
      {
        q: "Musí mít farnost vlastní doménu?",
        a: "Ne. Když ji nemá, zaregistruji ji na její jméno. Když ji má, připojím k ní nový web.",
      },
      {
        q: "Co se starým webem?",
        a: "Běží, dokud nespustíme nový. Obsah z něj přenesu.",
      },
      {
        q: "Kam se ukládají údaje z formuláře na mešní úmysly?",
        a: "Nikam. Formulář pošle e-mail do farní kanceláře a web nepřijímá platby.",
      },
      {
        q: "Dá se web přizpůsobit víc?",
        a: "Ano, nové stránky a úpravy vzhledu připravím za hodinovou sazbu.",
      },
      {
        q: "Pro které diecéze web je?",
        // TODO(owner): confirm the liturgical calendar coverage
        a: "Liturgický kalendář je zatím pro diecéze v Čechách. Pro Moravu ho doplním podle potřeby.",
      },
      {
        q: "Co když web přestanete spravovat?",
        a: "Web běží na účtu farnosti a farnost má zdrojový kód. Převezme ho kdokoli jiný.",
      },
    ],
  },

  contact: {
    heading: "Napište mi",
    text: "Stačí název farnosti a počet kostelů. Než se sejdeme, připravím vám náhled webu.",
    // TODO(owner): confirm in-person meetings in Prague and the Středočeský kraj
    meetings: "Schůzky vedu osobně v Praze a ve Středočeském kraji, jinde po domluvě.",
    stickyButton: "Napsat mi",
    emailSubject: "Web pro farnost",
    buttons: {
      write: "Napsat e-mail",
      copy: "Kopírovat adresu",
      copied: "Adresa je zkopírovaná",
      failed: "Kopírování se nepovedlo, adresu označte ručně",
    },
  },

  schema: {
    serviceType: "Tvorba a správa webů pro farnosti",
    areaServed: "Česko",
  },
});

export type FarnostiContent = typeof farnosti;
