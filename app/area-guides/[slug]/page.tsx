import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { areas } from "@/data/areas";
import { properties } from "@/data/properties";
import {
  Photo,
  Breadcrumbs,
  PropertyCard,
  SectionHeading,
  Map,
} from "@/components/ui";
export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = areas.find((a) => a.slug === slug);
  return { title: a ? `${a.name} area guide` : "Area not found" };
}
export default async function AreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = areas.find((a) => a.slug === slug);
  if (!a) notFound();
  const local = properties.filter((p) => p.area === a.name);
  return (
    <>
      <div className="container">
        <Breadcrumbs
          items={[
            { label: "Area guides", href: "/area-guides" },
            { label: a.name },
          ]}
        />
      </div>
      <section className="area-hero">
        <Photo
          name={a.image}
          priority
          alt={`Illustrative photography for the ${a.name} neighbourhood guide`}
        />
        <div className="hero-shade" />
        <div className="container">
          <span className="eyebrow">
            YOUR LONDON, DISCOVERED · {a.postcode}
          </span>
          <h1>{a.name}</h1>
          <p>{a.tagline}</p>
        </div>
      </section>
      <section className="container editorial-grid section">
        <div>
          <span className="eyebrow">A SENSE OF PLACE</span>
          <h2>
            Welcome to
            <br />
            <em>{a.name}.</em>
          </h2>
        </div>
        <div>
          <p className="lead">{a.intro}</p>
          <p>{a.market}</p>
          <p className="note">
            An illustrative neighbourhood guide. Photography sets the mood and
            may show a wider London setting; it is not a property photograph.
          </p>
        </div>
      </section>
      <section className="container area-details">
        <article>
          <span className="eyebrow">01 / LOCAL LIFE</span>
          <h3>Everyday pleasures</h3>
          <p>{a.lifestyle}</p>
        </article>
        <article>
          <span className="eyebrow">02 / GETTING AROUND</span>
          <h3>Connected to the city</h3>
          <p>{a.transport}</p>
        </article>
        <article>
          <span className="eyebrow">03 / ROOM TO BREATHE</span>
          <h3>A greener perspective</h3>
          <p>{a.green}</p>
        </article>
        <article>
          <span className="eyebrow">04 / FIND YOUR PLACE</span>
          <h3>Homes with character</h3>
          <p>
            {a.types}. Your choice of street, layout and outlook can make each
            home feel quite different.
          </p>
        </article>
      </section>
      <section className="container section">
        <h2>Why choose {a.name}?</h2>
        <p className="lead">
          {a.tagline} {a.lifestyle} For those who value this blend of
          neighbourhood life and London connections, the area offers a
          distinctive place to settle.
        </p>
        <Map lat={a.lat} lng={a.lng} label={a.name} />
      </section>
      <section className="container section">
        <SectionHeading
          eyebrow="YOUR NEXT CHAPTER"
          title={`At home in ${a.name}`}
          link="Search homes for sale"
          href={`/buy?location=${encodeURIComponent(a.name)}`}
        />
        {local.length ? (
          <div className="property-grid">
            {local.slice(0, 3).map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>Be the first to hear about your next home.</h3>
            <p>
              There are no illustrative listings in {a.name} at present. Let’s
              talk about your search.
            </p>
          </div>
        )}
        <div className="area-cta">
          <h2>Could {a.name} be your place?</h2>
          <Link className="button" href={`/contact?area=${a.slug}`}>
            Talk to us about the area <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
