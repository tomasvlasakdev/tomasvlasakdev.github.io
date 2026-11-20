import { typeset } from "@/lib/typography";

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
});
