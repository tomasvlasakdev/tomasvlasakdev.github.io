import { typeset } from "@/lib/typography";

// All copy for /farnosti. Prices are in ./farnosti-prices.ts, not here.
// This file must not import other page content, so the page can move to its own domain later.

export const farnosti = typeset({
  meta: {
    title: "Weby pro farnosti | Tomáš Vlasák",
    description:
      "Farní web s bohoslužbami, ohlášky, kalendářem a formulářem na mešní úmysly. Čtyři vzhledy, úpravy z telefonu, provoz a zálohy zajišťuji já. Web i doména patří farnosti.",
  },

  hero: {
    kicker: "Weby pro farnosti",
    heading: "Farní web, o který se postaráte i bez programátora",
    lead: "Bohoslužby, ohlášky, kalendář i formulář na mešní úmysly jsou hotové. Stačí je naplnit obsahem vaší farnosti. Úpravy zvládnete v prohlížeči i z telefonu. Techniku, zálohy a opravy mám na starosti já.",
    demoButton: "Prohlédnout ukázkový web",
    contactButton: "Napsat mi",
    note: {
      before: "Web farnosti Čelákovice, který jsem vytvořil, najdete na ",
      linkText: "farnostcelakovice.net",
      href: "https://farnostcelakovice.net",
      after: ".",
    },
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
      "Web je rychlý, zabezpečený a dobře vypadá i na mobilu. Farář, který spravuje více farností, je může mít na jednom webu.",
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
        text: "Za hodinu až hodinu a půl projdeme čtyři vzhledy, vyberete barvu, podepíšeme dohodu a určíte dva lidi, kteří budou web upravovat.",
      },
      {
        title: "Spuštění.",
        text: "Web nastavím a propojím kalendář a farní e-mail. Obsah doplníte vy, nebo ho za vás přenesu ze starého webu.",
      },
      {
        title: "Zaškolení.",
        text: "Za 45 minut správci nahrají první skutečné ohlášky, zatímco se jim dívám přes rameno. Dostanou tahák na jednu stránku a krátká videa k jednotlivým úkolům.",
      },
      { title: "Po měsíci.", text: "Ozvu se, jak web funguje, a opravím, co se ukázalo." },
    ],
  },

  roles: {
    heading: "Kdo co dělá",
    columns: { task: "Úkol", who: "Kdo", when: "Jak často", how: "Jak" },
    rows: [
      {
        task: "Ohlášky",
        who: "správce z farnosti",
        when: "každý týden",
        how: "nahrání PDF v prohlížeči, asi 5 minut",
      },
      {
        task: "Akce",
        who: "kdokoli, kdo už používá farní kalendář",
        when: "podle potřeby",
        how: "Google Kalendář v telefonu, web se aktualizuje sám",
      },
      { task: "Aktuality", who: "správce z farnosti", when: "několikrát měsíčně", how: "v prohlížeči" },
      {
        task: "Bohoslužby a kontakty",
        who: "správce z farnosti, nebo já",
        when: "několikrát ročně",
        how: "v prohlížeči",
      },
      {
        task: "Hosting, zálohy, aktualizace, doména, opravy",
        who: "já",
        when: "průběžně",
        how: "součást péče o web",
      },
      { task: "Nové funkce a změny vzhledu", who: "já", when: "na požádání", how: "hodinově" },
    ],
    editorsHeading: "Dva správci obsahu",
    editorsText:
      "Před spuštěním potřebuji od farnosti jména dvou lidí, kteří budou web upravovat. Nejlépe je osloví osobně pan farář. Já mu řeknu, koho a o co. Úkol je malý: v pátek nahrát nedělní ohlášky, zabere to asi 5 minut. Zkusit to můžete na tři měsíce a pak se rozhodnete. Kdyby se nikdo nenašel, mohu obsah doplňovat za vás.",
  },

  ownership: {
    heading: "Web patří farnosti",
    paragraphs: [
      "Web i doména patří farnosti. Účet u poskytovatele hostingu zakládáme na e-mail farnosti a já k němu mám přístup jako správce. Farnost má také k dispozici zdrojový kód svého webu.",
      "Pokud farnost přestane za péči platit, web běží dál na jejím vlastním účtu. Přijde jen o aktualizace a pomoc. Slibuji to ve smlouvě.",
      "K webu dostanete předávací list s adresami, přístupy a postupem, co dělat při poruše.",
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

  builder: {
    heading: "Kdo web staví",
    text: "Jsem Tomáš Vlasák, farník z Čelákovic a student střední průmyslové školy. Web farnosti Čelákovice jsem vytvořil sám. Zkoušeli ho tři farníci a pan farář a jejich připomínky jsem opravil. Teď z něj dělám stavebnici, aby ho mohly mít i další farnosti.",
    link: { label: "Přečíst případovou studii", href: "/projekty/web-farnosti-celakovice/" },
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
