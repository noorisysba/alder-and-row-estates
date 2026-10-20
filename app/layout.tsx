import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header, Footer, Providers } from "@/components/ui";
import { agency } from "@/data/settings";
import { assetPath } from "@/lib/paths";

const sans = localFont({
  src: [
    { path: "../public/fonts/font-0.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/font-1.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/font-2.ttf", weight: "600", style: "normal" },
  ],
  variable: "--font-dm-sans",
  display: "swap",
});
const serif = localFont({
  src: [
    { path: "../public/fonts/font-3.ttf", weight: "400", style: "italic" },
    { path: "../public/fonts/font-4.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/font-5.ttf", weight: "500", style: "normal" },
  ],
  variable: "--font-playfair",
  display: "swap",
});
export const metadata: Metadata = {
  icons: { icon: assetPath("/icon.svg") },
  title: {
    default: `${agency.fullName} | London, personally.`,
    template: `%s | ${agency.fullName}`,
  },
  description:
    "A considered collection of London homes. Explore residential sales, lettings, commercial spaces and neighbourhood guides with Alder & Row Estates. Fictional presentation prototype.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-GB"
      data-scroll-behavior="smooth"
      className={`${sans.variable} ${serif.variable}`}
    >
      <body>
        <Providers>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
