import { typeset } from "@/lib/typography";

// All copy for /farnosti. Prices are in ./farnosti-prices.ts, not here.
// This file must not import other page content, so the page can move to its own domain later.

export const farnosti = typeset({
  meta: {
    title: "Weby pro farnosti | Tomáš Vlasák",
    description:
      "Moderní farní web na vlastní doméně: bohoslužby, ohlášky, kalendář a formulář na mešní úmysly. Jednoduchý editor, hosting a zabezpečení zajišťuji já. Web i doména patří farnosti.",
  },

  hero: {
    kicker: "Weby pro farnosti",
    heading: "Farní web, o který se postaráte i bez programátora",
    lead: "Moderní a přehledný web na vlastní doméně vaší farnosti. Bohoslužby, ohlášky, kalendář i formulář na mešní úmysly jsou připravené, stačí je naplnit obsahem. Úpravy zvládnete v jednoduchém editoru z počítače i z telefonu. Hosting, zabezpečení a zálohy mám na starosti já.",
    demoButton: "Prohlédnout ukázkový web",
    contactButton: "Napsat mi",
    highlights: [
      { title: "Moderní vzhled", text: "Čtyři hotové vzhledy, vaše barva, logo a fotky." },
      { title: "Vlastní doména", text: "Web běží na adrese vaší farnosti." },
      { title: "Na mobilu i tabletu", text: "Stránky se přizpůsobí každé obrazovce." },
      { title: "Jednoduchý editor", text: "Ohlášky nahrajete za pár minut, i z telefonu." },
    ],
    note: {
      before: "Web farnosti Čelákovice, který jsem vytvořil, najdete na ",
      linkText: "farnostcelakovice.net",
      href: "https://farnostcelakovice.net",
      after: ".",
    },
  },

  motivation: {
    heading: "Proč stavím weby pro farnosti",
    paragraphs: [
      "V naší farnosti v Čelákovicích jsem dobrovolně převzal úkol udělat nový web. Jsem farník, takže farní život znám zevnitř: vím, kdy lidé hledají čas mše, s čím chodí do farní kanceláře a co všechno musí pan farář zvládnout vedle duchovní služby.",
      "Celý vývoj mě bavil, protože jsem stavěl něco, co lidé opravdu každý týden používají. Web jsem vyzkoušel s farníky a s panem farářem, opravil jsem, co nefungovalo, a farnost ho dnes používá. Ta práce mě začala naplňovat natolik, že jsem se rozhodl stavět weby i pro další farnosti v Česku.",
    ],
    belief:
      "Věřím, že přehledný web, kde farníci najdou všechno na jednom místě, jim usnadní orientaci ve farním životě a přispěje k dobré atmosféře ve farnosti. Web je také první, co o farnosti uvidí člověk zvenku. Dobře udělané stránky ji důstojně reprezentují, mohou přivést do kostela i ty, kdo farnost zatím neznají, a slouží jako tichý prostředek evangelizace.",
    link: { label: "Jak vznikal web farnosti Čelákovice", href: "/projekty/web-farnosti-celakovice/" },
  },

  features: {
    heading: "Co web umí",
    items: [
      { title: "Bohoslužby.", text: "Pravidelný pořad pro každý kostel, výjimky i svátky." },
      { title: "Kalendář akcí.", text: "Propojený s Google Kalendářem. Akce zadaná v telefonu je hned na webu." },
      { title: "Ohlášky.", text: "Každý týden nové, s archivem a PDF ke stažení." },
      { title: "Aktuality.", text: "S fotkami, psané v prohlížeči." },
      { title: "Kostely a kaple.", text: "Stránka s fotkami, mapou a časy bohoslužeb pro každý z nich." },
      {
        title: "Chci si domluvit.",
        text: "Srozumitelné postupy ke křtu, svatbě, pohřbu, prvnímu svatému přijímání, biřmování, pomazání nemocných a požehnání.",
      },
      {
        title: "Mše na úmysl.",
        text: "Formulář pošle zprávu e-mailem do farní kanceláře. Bez plateb online a bez ukládání údajů na webu.",
      },
      { title: "Dary.", text: "Číslo účtu a QR platba." },
      { title: "Kontakty.", text: "Úřední hodiny, IČO a datová schránka." },
      { title: "Společenství.", text: "Pravidelné aktivity a setkání." },
    ],
    closing:
      "Web je rychlý, zabezpečený a dobře vypadá na mobilu, tabletu i počítači. Farář, který spravuje více farností, je může mít na jednom webu.",
  },

  editor: {
    heading: "Jednoduchý editor obsahu",
    lead: "Obsah webu upravujete v editoru, který běží v prohlížeči. Nemusíte nic instalovat ani umět programovat a zvládnete to z počítače i z telefonu.",
    items: [
      "Nedělní ohlášky nahrajete jako PDF za pár minut.",
      "Aktualitu napíšete přímo v editoru a přidáte k ní fotky.",
      "Pořad bohoslužeb, výjimky a kontakty upravíte v přehledném formuláři.",
      "Akce stačí zapsat do Google Kalendáře, web se aktualizuje sám.",
    ],
    closing: "Po spuštění vás editorem provedu a dostanete krátký návod na jednu stránku.",
  },

  care: {
    heading: "O techniku se postarám já",
    lead: "Nemusíte řešit nic technického. Web běží spolehlivě a bezpečně, a když se něco pokazí, opravím to.",
    items: [
      "Hosting webu",
      "Doména farnosti",
      "Farní e-mail",
      "SSL certifikát",
      "Zabezpečení",
      "Pravidelné zálohy",
      "Aktualizace a opravy",
      "Přístup pro správce farnosti",
    ],
  },

  ownership: {
    heading: "Web patří farnosti",
    paragraphs: [
      "Web, doména i účet u poskytovatele hostingu jsou vedené na farnost. Ke všemu máte přístup a dostanete i zdrojový kód webu.",
      "Pokud se rozhodnete moje služby dál nevyužívat, web zůstane a poběží dál na účtu farnosti. Přijdete jen o aktualizace a pomoc. Slibuji to ve smlouvě.",
      "K webu dostanete předávací list s adresami, přístupy a postupem, co dělat při poruše.",
    ],
  },

  looks: {
    heading: "Čtyři vzhledy",
    lead: "Vzhled si vyberete ze čtyř hotových. K tomu přidáte vlastní barvu, logo a fotky, takže dvě farnosti se stejným vzhledem nevypadají stejně.",
    items: [
      {
        id: "tradice",
        name: "Tradice",
        feel: "důstojný, historický",
        description: "Patkové písmo, krémová, vínová a zlatá. Úvodní stránka s velkou fotografií kostela.",
        suits: "Hodí se pro městskou farnost s významným kostelem.",
      },
      {
        id: "svetlo",
        name: "Světlo",
        feel: "čistý a otevřený",
        description: "Moderní bezpatkové písmo, bílá a jedna barva. Krátký uvítací text vedle fotografie.",
        suits: "Hodí se pro městskou farnost s mladými rodinami.",
      },
      {
        id: "krajina",
        name: "Krajina",
        feel: "vřelý a přátelský",
        description: "Zaoblené písmo, zeleň a okr. Úvodní stránka s kartami kostelů.",
        suits: "Hodí se pro venkovskou farnost s mnoha kostely.",
      },
      {
        id: "liturgie",
        name: "Liturgie",
        feel: "klidný a střídmý",
        description: "Úvodní stránka začíná dnešním liturgickým dnem a nejbližší mší.",
        suits: "Hodí se pro kněze, kterým záleží na liturgii.",
      },
    ],
    liturgicalColours:
      "Barvu podle liturgické doby lze zapnout u kteréhokoli vzhledu: fialová v adventu a postní době, bílá o Vánocích a Velikonocích, zelená v mezidobí.",
    custom: "Návrh na míru není součástí standardní nabídky. Připravím ho za hodinovou sazbu.",
    demoLink: "Vyzkoušet vzhledy na ukázkovém webu",
    swatchSample: "Aa",
  },

  process: {
    heading: "Jak to probíhá",
    steps: [
      {
        title: "Náhled.",
        text: "Ještě před první schůzkou připravím web s názvem vaší farnosti, kostely a časy bohoslužeb. Vidíte tak vlastní farnost, ne cizí ukázku.",
      },
      {
        title: "Schůzka.",
        text: "Za hodinu až hodinu a půl projdeme vzhledy, vyberete barvu, domluvíme, kdo bude web upravovat, a podepíšeme dohodu.",
      },
      {
        title: "Spuštění.",
        text: "Web nastavím na doméně farnosti a propojím kalendář a farní e-mail. Obsah doplníte vy, nebo ho za vás přenesu ze starého webu.",
      },
      {
        title: "Zaškolení.",
        text: "Za 45 minut s vámi nahrajeme první skutečné ohlášky. Dostanete tahák na jednu stránku a krátká videa k jednotlivým úkolům.",
      },
      { title: "Po měsíci.", text: "Ozvu se, jak web funguje, a opravím, co se ukázalo." },
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
    text: "Cenu připravím podle toho, kolik má farnost kostelů a co potřebuje. Skládá se z jednorázového nastavení a ročního poplatku za provoz. Napište mi a sepíšu vám ji do nabídky.",
  },

  faq: {
    heading: "Časté otázky",
    items: [
      {
        q: "Kdo bude web upravovat?",
        a: "Kdokoli, koho farnost určí: pan farář, někdo z farní kanceláře nebo farník, který má chuť pomoct. Editor zvládne i člověk bez technických znalostí.",
      },
      {
        q: "Co když web nikdo z farnosti upravovat nebude?",
        a: "Obsah mohu doplňovat za vás: každý týden nahrát ohlášky a přidávat aktuality. Je to placená služba.",
      },
      {
        q: "Musí mít farnost vlastní doménu?",
        a: "Ne. Pokud ji farnost nemá, zaregistruji ji na její jméno. Pokud ji má, připojím k ní nový web.",
      },
      {
        q: "Co se starým webem?",
        a: "Zůstane v provozu, dokud nový web nespustíme. Obsah z něj mohu přenést, rozsah domluvíme na schůzce.",
      },
      {
        q: "Kam se ukládají údaje z formuláře na mešní úmysly?",
        a: "Formulář pošle zprávu e-mailem do farní kanceláře. Web údaje neukládá a nepřijímá platby.",
      },
      {
        q: "Dá se web přizpůsobit víc než barvou, logem a fotkami?",
        a: "Ano, jako práce navíc. Nové stránky nebo úpravy vzhledu připravím za hodinovou sazbu. Pokud se úprava hodí i dalším farnostem, přidám ji do webu pro všechny.",
      },
      {
        q: "Pro které diecéze web je?",
        // TODO(owner): confirm the liturgical calendar coverage
        a: "Liturgický kalendář je zatím připravený pro diecéze v Čechách. Pro moravské diecéze ho doplním podle potřeby.",
      },
      {
        q: "Co když web přestanete spravovat?",
        a: "Web běží na účtu farnosti a farnost má zdrojový kód. Nový správce ho může převzít bez mé pomoci.",
      },
    ],
  },

  contact: {
    heading: "Napište mi",
    text: "Stačí název farnosti a počet kostelů. Připravím náhled s vaším názvem a časy bohoslužeb, ještě než se sejdeme.",
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
