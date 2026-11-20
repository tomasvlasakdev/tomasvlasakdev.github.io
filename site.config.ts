// The one place for settings that change without touching the pages.

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://tomasvlasakdev.github.io").replace(/\/$/, "");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const siteConfig = {
  name: "Tomáš Vlasák",
  /** Absolute origin + base path, no trailing slash. */
  url: siteUrl + basePath,
  basePath,
  locale: "cs_CZ",
  copyrightYear: 2026,

  contact: {
    // TODO(owner): final e-mail address
    email: "vlasaktomas.cz@gmail.com",
  },

  links: {
    github: "https://github.com/tomasvlasakdev",
    linkedin: "https://www.linkedin.com/in/tomas-vlasak",
    parishSite: "https://farnostcelakovice.net",
  },

  /** false → "Cena" (block B); true → "Ceník" (block A). Numbers live in content/cs/farnosti-prices.ts. */
  showPrices: false,
  /** Only has an effect when showPrices is true. */
  foundingOffer: false,

  parish: {
    // TODO(owner): set to "https://demo.tomasvlasak.dev" once the domain is bought and the demo is live.
    // While empty, every demo button and link is hidden.
    demoUrl: "",
  },

  // TODO(owner): fill in after registering the trade (živnost). Empty → nothing is rendered.
  legal: {
    ico: "",
    registerNote: "",
  },

  cv: {
    /** Path under public/. The download button appears only if this file exists at build time. */
    pdf: "/cv/Tomas-Vlasak-CV-dev-cs.pdf",
  },
} as const;

export type SiteConfig = typeof siteConfig;
