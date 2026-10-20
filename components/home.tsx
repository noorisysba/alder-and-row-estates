"use client";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  KeyRound,
  House,
  Building2,
  Handshake,
  Check,
} from "lucide-react";
import {
  Photo,
  PropertyCard,
  SectionHeading,
  ValuationCTA,
  ContactDetails,
  EnquiryForm,
} from "./ui";
import { HeroSearch } from "./search";
import { properties } from "@/data/properties";
import { areas } from "@/data/areas";
export default function Home() {
  const [index, setIndex] = useState(0);
  const featured = properties.slice(0, 6);
  const icons = [House, KeyRound, Building2, Handshake];
  return (
    <>
      <section className="home-hero">
        <Photo
          name="hero"
          priority
          alt="Colourful period townhouses on a leafy Notting Hill street"
        />
        <div className="hero-shade" />
        <div className="container hero-copy">
          <span className="eyebrow">LONDON HOMES. PERSONAL CONNECTIONS.</span>
          <h1>
            A place to live.
            <br />
            <em>A place to belong.</em>
          </h1>
          <p>
            Extraordinary homes. Local understanding.
            <br />
            Your next chapter in London starts with us.
          </p>
          <Link className="hero-discover" href="/buy">
            Find your place <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <div className="container search-wrap">
        <HeroSearch />
      </div>
      <div className="intro-strip container">
        <span>A fresh perspective on London property.</span>
        <p>
          From the first conversation to the moment you get the keys,
          <br className="desktop-only" /> we make every move feel personal.
        </p>
        <Link className="text-link" href="/about">
          Meet Alder & Row <ArrowUpRight size={18} />
        </Link>
      </div>
      <section className="section container">
        <SectionHeading
          eyebrow="A FEW PLACES TO FALL FOR"
          title="Homes with a little more character."
          text="A considered collection of London homes, chosen with you in mind."
          link="View all properties"
          href="/buy"
        />
        <div className="property-grid featured-grid">
          {[0, 1, 2].map((n) => (
            <PropertyCard
              key={n}
              property={featured[(index + n) % featured.length]}
            />
          ))}
        </div>
        <div className="carousel-footer">
          <span>
            0{index + 1}
            <i />0{featured.length}
          </span>
          <div>
            <button
              className="icon-button"
              aria-label="Previous featured properties"
              onClick={() =>
                setIndex((index - 1 + featured.length) % featured.length)
              }
            >
              <ChevronLeft size={19} />
            </button>
            <button
              className="icon-button"
              aria-label="Next featured properties"
              onClick={() => setIndex((index + 1) % featured.length)}
            >
              <ChevronRight size={19} />
            </button>
          </div>
        </div>
      </section>
      <section className="story-section">
        <div className="container story-grid">
          <div className="story-photo">
            <Photo
              name="living-3"
              alt="Elegant contemporary living space with natural materials"
            />
            <span className="photo-note">
              A little more considered.
              <br />A lot more personal.
            </span>
          </div>
          <div className="story-copy">
            <span className="eyebrow">PROPERTY IS PERSONAL. SO ARE WE.</span>
            <h2>
              A London agency.
              <br />
              <em>
                A different kind
                <br />
                of relationship.
              </em>
            </h2>
            <p>
              A home is more than its postcode. It’s the morning light, the
              familiar café and the feeling you get when you turn the key.
            </p>
            <p>
              At Alder & Row, we bring a considered approach to buying, selling
              and letting. Honest conversations, a thoughtful eye for detail and
              a genuine interest in what comes next for you.
            </p>
            <Link className="text-link" href="/about">
              Get to know us <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="HERE FOR EVERY CHAPTER"
          title="Good advice. From start to finish."
          link="Explore our services"
          href="/services"
        />
        <div className="services-home">
          {[
            [
              "Buy & sell",
              "From first home to your next chapter, with thoughtful advice at every step.",
              "/buy",
            ],
            [
              "Let & manage",
              "Care for your investment. A welcoming home for your tenants.",
              "/services#management",
            ],
            [
              "Commercial",
              "The right space for your business and what comes next.",
              "/commercial",
            ],
            [
              "Value your home",
              "An informed perspective on your property’s potential.",
              "/valuation",
            ],
          ].map(([title, text, href], i) => {
            const Icon = icons[i];
            return (
              <Link href={href} key={title}>
                <Icon size={27} strokeWidth={1.2} />
                <h3>{title}</h3>
                <p>{text}</p>
                <ArrowUpRight size={21} />
              </Link>
            );
          })}
        </div>
      </section>
      <section className="areas-section">
        <div className="container section">
          <SectionHeading
            eyebrow="FIND YOUR KIND OF LONDON"
            title="Every neighbourhood tells a story."
            text="Village charm, riverside living or the energy of the city. Where will yours begin?"
            link="Explore all 15 area guides"
            href="/area-guides"
          />
          <div className="area-grid home-areas">
            {["Notting Hill", "Marylebone", "Kensington", "Chelsea"].map(
              (name) => {
                const a = areas.find((a) => a.name === name)!;
                return (
                  <Link
                    className="area-card"
                    href={`/area-guides/${a.slug}`}
                    key={a.slug}
                  >
                    <Photo
                      name={a.image}
                      alt={`Illustrative streetscape for ${a.name} area guide`}
                    />
                    <div>
                      <span>LONDON NEIGHBOURHOODS</span>
                      <h3>
                        {a.name}
                        <ArrowUpRight size={22} />
                      </h3>
                    </div>
                  </Link>
                );
              },
            )}
          </div>
        </div>
      </section>
      <section className="section container approach">
        <SectionHeading
          eyebrow="A MORE CONSIDERED WAY TO MOVE"
          title="Small details. A meaningful difference."
        />
        <div>
          {[
            [
              "People before property",
              "We start by listening. Your plans, priorities and everyday life shape the advice we give.",
            ],
            [
              "A thoughtful eye",
              "Beautiful presentation and considered marketing help the right people see a property’s potential.",
            ],
            [
              "Clarity at every step",
              "Straightforward conversations and a personal point of contact make the journey easier to navigate.",
            ],
          ].map(([a, b]) => (
            <article key={a}>
              <Check size={21} />
              <h3>{a}</h3>
              <p>{b}</p>
            </article>
          ))}
        </div>
      </section>
      <ValuationCTA />
      <section className="testimonial container">
        <span className="eyebrow">THE KIND OF EXPERIENCE WE BELIEVE IN</span>
        <span className="quote-mark">“</span>
        <blockquote>
          Thoughtful advice, a calm approach and a real understanding of what we
          were looking for. It felt personal from the very first conversation.
        </blockquote>
        <p>Alex & Jamie · Illustrative buyer testimonial</p>
        <span className="tiny">
          Fictional feedback created for this presentation prototype.
        </span>
      </section>
      <section className="contact-band">
        <div className="container contact-grid">
          <div>
            <span className="eyebrow">LET’S TALK ABOUT YOUR NEXT CHAPTER</span>
            <h2>
              Good things start
              <br />
              <em>with a conversation.</em>
            </h2>
            <p>
              Buying, selling, letting or simply exploring?
              <br />
              We’re here to help you find your way.
            </p>
            <ContactDetails />
          </div>
          <div className="form-panel">
            <h3>How can we help?</h3>
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
