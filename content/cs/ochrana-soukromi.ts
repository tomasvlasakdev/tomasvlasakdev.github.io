import { typeset } from "@/lib/typography";
import { siteConfig } from "@/site.config";

const first =
  "Tento web nepoužívá cookies, analytiku ani reklamní skripty a nenačítá nic z cizích serverů.";

export const ochranaSoukromi = typeset({
  meta: {
    title: "Ochrana soukromí | Tomáš Vlasák",
    description: first,
  },
  heading: "Ochrana soukromí",
  paragraphs: [
    `${first} Neukládá žádné údaje o návštěvnících. Pokud mi napíšete e-mail, použiji vaši adresu a zprávu jen k odpovědi. Správcem údajů je Tomáš Vlasák.`,
    "Web běží na GitHub Pages. GitHub jako poskytovatel hostingu může kvůli zabezpečení zaznamenávat IP adresy návštěvníků.",
  ],
  // Linked from the footer of e-mails to parishes (#oslovovani-farnosti). Keep the id stable.
  sections: [
    {
      id: "oslovovani-farnosti",
      heading: "Oslovování farností",
      paragraphs: [
        "Farnostem, pro které by mohl být web užitečný, píšu e-maily a občas volám. Je to obchodní sdělení a vždy je tak označené.",
        "Používám jméno kněze, název farnosti, e-mailovou adresu a telefon. Beru je z veřejných katalogů diecézí a z webů farností. Údaje používám jen k nabídce webu pro farnost, na základě oprávněného zájmu.",
        "Pokud neodpovíte, ozvu se nejvýš jedním dalším e-mailem a jedním telefonátem. Pak vás přestanu kontaktovat. Pokud odpovíte, že chcete další informace, pošlu je.",
        `Odmítnutí stačí napsat v odpovědi na e-mail nebo na adresu ${siteConfig.contact.email}. Pak vám už nic nepošlu. Abych vás omylem znovu neoslovil, ponechám si adresu s poznámkou, že si zprávy nepřejete.`,
        "Údaje nikomu nepředávám. Zpracovávám je v e-mailové schránce a v tabulce u poskytovatelů cloudových služeb, kteří pro mě fungují jako zpracovatelé, a uchovávám je jen po dobu komunikace.",
        "Můžete mě požádat o informaci, jaké údaje o vás mám, o jejich opravu nebo smazání, nebo proti zpracování vznést námitku. Stížnost můžete podat u Úřadu pro ochranu osobních údajů.",
      ],
    },
  ],
});
