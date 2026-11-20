import { typeset } from "@/lib/typography";

export const oMne = typeset({
  meta: {
    title: "O mně | Tomáš Vlasák",
    description:
      "Student střední průmyslové školy na Proseku, vývojář webů z Čelákovic. Web farnosti, odborná praxe, týmový projekt.",
  },
  heading: "O mně",
  paragraphs: [
    "Jsem Tomáš Vlasák, student střední průmyslové školy na Proseku. Pocházím z Čelákovic a v tamní farnosti jsem vytvořil web, který farnost používá.",
    "Programování mě baví hlavně tam, kde pomáhá lidem v běžné práci. U farního webu mi pomáhali tři farníci a pan farář, kteří web zkoušeli a říkali, co nefunguje.",
    "Devět let jsem hrál na lesní roh. Anglicky mluvím na úrovni C2 (certifikát Cambridge), německy na úrovni A2.",
  ],
  facts: [
    { label: "Škola", value: "Střední průmyslová škola na Proseku, obor Vývoj aplikací, od roku 2023" },
    { label: "Dříve", value: "Gymnázium prof. Jana Patočky, 2019–2023" },
    { label: "Jazyky", value: "čeština, angličtina C2, němčina A2" },
  ],
  factsLabel: "Základní údaje",
  link: { label: "Zobrazit CV", href: "/cv/" },
  // TODO(owner): photo. While null, the page shows no picture at all.
  photo: null as null | { src: string; width: number; height: number; alt: string },
});
