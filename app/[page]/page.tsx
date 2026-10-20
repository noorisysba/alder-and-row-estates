import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import {
  Breadcrumbs,
  Photo,
  EnquiryForm,
  ContactDetails,
  ValuationCTA,
  Map,
} from "@/components/ui";
import { ListingExplorer } from "@/components/search";
import { agency, services } from "@/data/settings";
import sources from "@/data/image-sources.json";
const titles: Record<string, string> = {
  buy: "Find a home to call your own.",
  rent: "Make yourself at home.",
  commercial: "Space for your next ambition.",
  shortlist: "Your collection of possibilities.",
  services: "Here for every chapter.",
  about: "London, personally.",
  contact: "Let’s start a conversation.",
  valuation: "Your home. A fresh perspective.",
  privacy: "Your privacy, clearly explained.",
  cookies: "A thoughtful approach to cookies.",
  credits: "Photography & prototype notes.",
};
export function generateStaticParams() {
  return Object.keys(titles).map((page) => ({ page }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  return { title: titles[page] || "Page not found" };
}
export default async function Page({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  if (!titles[page]) notFound();
  const title = titles[page];
  const listing = ["buy", "rent", "commercial", "shortlist"].includes(page);
  return (
    <>
      <div className="container">
        <Breadcrumbs
          items={[
            {
              label:
                page === "buy"
                  ? "Buy"
                  : page === "rent"
                    ? "Rent"
                    : page === "commercial"
                      ? "Commercial"
                      : page === "shortlist"
                        ? "Shortlist"
                        : page === "services"
                          ? "Our services"
                          : page === "about"
                            ? "About us"
                            : page === "valuation"
                              ? "Book a valuation"
                              : page[0].toUpperCase() + page.slice(1),
            },
          ]}
        />
      </div>
      {listing ? (
        <>
          <section className="container page-heading">
            <span className="eyebrow">
              {page === "buy"
                ? "LONDON PROPERTY FOR SALE"
                : page === "rent"
                  ? "LONDON PROPERTY TO RENT"
                  : page === "commercial"
                    ? "LONDON COMMERCIAL PROPERTY"
                    : "SAVED FOR A SECOND LOOK"}
            </span>
            <h1>{title}</h1>
            <p>
              {page === "buy"
                ? "From a first flat to a family home, discover a considered collection of London properties."
                : page === "rent"
                  ? "A place that fits your life. Explore welcoming rental homes across London."
                  : page === "commercial"
                    ? "Discover offices, creative studios, retail premises and investment opportunities. Lease prices are annual; sale prices are purchase prices."
                    : "Keep the places you love together. Your shortlist is saved on this device."}
            </p>
          </section>
          <section className="container listings-section">
            <Suspense
              fallback={
                <div className="loading-state">
                  Finding your kind of London…
                </div>
              }
            >
              <ListingExplorer
                category={
                  page === "shortlist"
                    ? undefined
                    : (page as "buy" | "rent" | "commercial")
                }
                shortlist={page === "shortlist"}
              />
            </Suspense>
          </section>
          <ValuationCTA />
        </>
      ) : page === "services" ? (
        <>
          <section className="container page-heading">
            <span className="eyebrow">
              CONSIDERED ADVICE. PERSONAL SERVICE.
            </span>
            <h1>{title}</h1>
            <p>
              Whatever your property plans, we bring a thoughtful approach and a
              clear way forward.
            </p>
          </section>
          <section className="container service-list">
            {services.map((s, i) => (
              <article
                id={s.slug}
                className={`service-row ${i % 2 ? "reverse" : ""}`}
                key={s.slug}
              >
                <Photo
                  name={s.image}
                  alt={`Illustrative ${s.title.toLowerCase()} photography`}
                />
                <div>
                  <span className="eyebrow">0{i + 1} / OUR EXPERTISE</span>
                  <h2>{s.title}</h2>
                  <p>{s.text}</p>
                  <Link className="button outline" href={s.href}>
                    {s.action}
                    <ArrowUpRight size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </section>
        </>
      ) : page === "about" ? (
        <>
          <section className="container page-heading narrow">
            <span className="eyebrow">
              INDEPENDENT IN SPIRIT. LONDON AT HEART.
            </span>
            <h1>
              A little more considered.
              <br />
              <em>A lot more personal.</em>
            </h1>
            <p>
              We believe the best property advice begins with understanding
              people.
            </p>
          </section>
          <div className="container about-image">
            <Photo
              name="office-1"
              priority
              alt="Illustrative light-filled agency workspace"
            />
            <span>Illustrative office photography · fictional agency</span>
          </div>
          <section className="container editorial-grid section">
            <div>
              <span className="eyebrow">MEET ALDER & ROW</span>
              <h2>
                Your plans.
                <br />
                Our personal attention.
              </h2>
            </div>
            <div>
              <p className="lead">
                London is a city of neighbourhoods, each with its own rhythm.
                Finding your place takes more than a property search.
              </p>
              <p>
                Alder & Row is a fictional independent London estate agency,
                created to demonstrate a more considered property experience.
                Our approach is simple: listen carefully, communicate clearly
                and take care of the details.
              </p>
              <p>
                Whether you are making a first move, looking after an investment
                or finding space for your business, our vision is a relationship
                built around your needs.
              </p>
              <p className="note">
                This company presentation is illustrative. No trading history,
                awards, accreditations or professional memberships are claimed.
              </p>
              <Link className="text-link" href="/contact">
                Get in touch <ArrowUpRight size={18} />
              </Link>
            </div>
          </section>
          <section className="container values">
            <article>
              <span>01</span>
              <h3>Listen first</h3>
              <p>
                Good advice comes from understanding your priorities, your
                timescale and what matters most to you.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Care for the detail</h3>
              <p>
                From considered presentation to clear communication, the small
                things shape the whole experience.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Keep it personal</h3>
              <p>
                A familiar point of contact, straightforward conversations and a
                genuine interest in your next chapter.
              </p>
            </article>
          </section>
          <ValuationCTA />
        </>
      ) : page === "contact" || page === "valuation" ? (
        <>
          <section className="container page-heading">
            <span className="eyebrow">
              {page === "valuation"
                ? "COMPLIMENTARY PROPERTY VALUATION"
                : "GOOD THINGS START HERE"}
            </span>
            <h1>{title}</h1>
            <p>
              {page === "valuation"
                ? "Selling, letting or simply curious? Tell us a little about your property and let’s explore its potential."
                : "Tell us about your plans. We’ll help you explore what comes next."}
            </p>
          </section>
          <section className="container contact-grid page-contact">
            <div>
              <h2>
                {page === "valuation"
                  ? "A conversation, without the pressure."
                  : "Come and say hello."}
              </h2>
              <p>
                {page === "valuation"
                  ? "Choose a sales or lettings conversation, share the details below and see how a valuation request would work. This prototype does not generate a real valuation."
                  : "A personal approach to London property, from your very first enquiry."}
              </p>
              <ContactDetails />
              <h3>Opening hours</h3>
              <p>
                {agency.hours}
                <br />
                Sunday · By appointment
              </p>
              <p className="note">
                Demonstration details only. The office address is fictional and
                enquiries are not delivered.
              </p>
              {page === "contact" && (
                <div id="social" className="social-note">
                  <h3>Follow the neighbourhood</h3>
                  <p>Instagram · LinkedIn</p>
                  <p className="note">
                    Social profiles are illustrative; no live accounts are
                    associated with this fictional agency.
                  </p>
                </div>
              )}
            </div>
            <div className="form-panel">
              <h3>
                {page === "valuation"
                  ? "Tell us about your property"
                  : "Send us a message"}
              </h3>
              <EnquiryForm
                kind={page === "valuation" ? "valuation" : "contact"}
              />
            </div>
          </section>
          {page === "contact" && (
            <section className="container section">
              <h2>Our London neighbourhood</h2>
              <p>Marylebone context only. This is not a real office pin.</p>
              <Map lat={51.519} lng={-0.154} label="Marylebone neighbourhood" />
            </section>
          )}
        </>
      ) : (
        <section className="container prose-page">
          <span className="eyebrow">PRESENTATION PROTOTYPE</span>
          <h1>{title}</h1>
          {page === "privacy" ? (
            <>
              <h2>Demonstration forms</h2>
              <p>
                Form details stay in the current page only. Submitting a form
                shows a simulated confirmation. No enquiry is sent to an agent,
                written to a database or retained by this website. Please use
                fictional information.
              </p>
              <h2>Your shortlist</h2>
              <p>
                Saved property identifiers are stored in your browser’s local
                storage under “ar-shortlist”. Remove individual favourites using
                the heart button or clear your browser’s site data.
              </p>
              <h2>External services</h2>
              <p>
                Interactive maps are embedded from OpenStreetMap. Opening a map
                shares standard connection information with that service. No
                analytics or advertising services have been added. This page
                explains prototype behaviour and is not a production privacy
                policy.
              </p>
            </>
          ) : page === "cookies" ? (
            <>
              <h2>Only the essentials</h2>
              <p>
                This prototype does not set marketing or analytics cookies. Your
                property shortlist uses local storage so that saved homes remain
                available when you revisit on the same device.
              </p>
              <h2>Your choice</h2>
              <p>
                You can use every browsing feature without saving properties.
                Clear saved items with the heart controls or your browser’s
                site-data settings. OpenStreetMap embeds are external content
                and follow their own service policies.
              </p>
            </>
          ) : (
            <>
              <p>
                All properties, prices, addresses, availability, company details
                and testimonials are fictional illustrative content. Stock
                photographs do not depict the listed properties. Interiors are
                grouped by style for demonstration and may show different real
                spaces.
              </p>
              <h2>Stock photography</h2>
              <p>
                Selected photographs are stored locally for a reliable
                presentation. Most are sourced from Unsplash under the{" "}
                <a
                  href="https://unsplash.com/license"
                  target="_blank"
                  rel="noreferrer"
                >
                  Unsplash Licence
                </a>
                . Area images are illustrative; see each guide for image
                context.
              </p>
              <p>
                Belgravia photograph:{" "}
                <a
                  href="https://commons.wikimedia.org/wiki/File:11a_Belgrave_Square,_Belgravia,_October_2022_02.jpg"
                  target="_blank"
                  rel="noreferrer"
                >
                  11a Belgrave Square by No Swan So Fine
                </a>
                , licensed under{" "}
                <a
                  href="https://creativecommons.org/licenses/by-sa/4.0/"
                  target="_blank"
                  rel="noreferrer"
                >
                  CC BY-SA 4.0
                </a>
                . Resized, compressed and displayed with responsive cropping.
                These image adaptations remain under the same licence.
              </p>
              <div className="credits-list">
                {Object.entries(sources).map(([name, s]) => (
                  <a key={name} href={s.url} target="_blank" rel="noreferrer">
                    {name.replaceAll("-", " ")} ↗
                  </a>
                ))}
              </div>
              <h2>Maps and property information</h2>
              <p>
                Maps require an internet connection and show approximate
                neighbourhood positions. Floor areas, EPC ratings, council tax
                bands and tenures are invented demonstration data. No real
                transaction should rely on them.
              </p>
            </>
          )}
        </section>
      )}
    </>
  );
}
