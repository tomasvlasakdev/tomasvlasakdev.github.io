import type { Metadata, Viewport } from "next";
import "./globals.css";
import { zilla, sourceSans } from "@/lib/fonts";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { common } from "@/content/cs/common";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url + "/"),
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#faf8f4",
  colorScheme: "light",
};

// Marks the page as script-enabled before first paint, so the mobile menu can start closed
// without hiding it from visitors who have JavaScript turned off.
const jsFlag = "document.documentElement.classList.add('js')";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={`${zilla.variable} ${sourceSans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body>
        <a className="skip-link" href="#obsah">
          {common.ui.skipLink}
        </a>
        <Header />
        <main id="obsah" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
