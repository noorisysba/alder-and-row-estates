import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer, Providers } from "@/components/ui";
import { agency } from "@/data/settings";
export const metadata: Metadata = {
  icons: { icon: "/icon.svg" },
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
    <html lang="en-GB" data-scroll-behavior="smooth">
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
