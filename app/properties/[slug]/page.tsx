import Link from "next/link";
import { Suspense } from "react";
import { BackToSearch } from "@/components/search";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BedDouble,
  Bath,
  Maximize,
  Check,
  ArrowUpRight,
} from "lucide-react";
import { properties, money } from "@/data/properties";
import { areas } from "@/data/areas";
import {
  Breadcrumbs,
  Gallery,
  Favourite,
  EnquiryForm,
  Map,
  PropertyCard,
  SectionHeading,
} from "@/components/ui";
export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = properties.find((p) => p.slug === slug);
  return {
    title: p ? `${p.address}, ${p.area} · ${money(p)}` : "Property not found",
  };
}
export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = properties.find((p) => p.slug === slug);
  if (!p) notFound();
  const area = areas.find((a) => a.name === p.area)!;
  const similar = properties
    .filter((o) => o.category === p.category && o.id !== p.id)
    .sort((a, b) => Math.abs(a.price - p.price) - Math.abs(b.price - p.price))
    .slice(0, 3);
  return (
    <>
      <div className="container">
        <Breadcrumbs
          items={[
            {
              label:
                p.category === "buy"
                  ? "Buy"
                  : p.category === "rent"
                    ? "Rent"
                    : "Commercial",
              href: `/${p.category}`,
            },
            {
              label: p.area,
              href: `/${p.category}?location=${encodeURIComponent(p.area)}`,
            },
            { label: p.address },
          ]}
        />
        <Suspense
          fallback={
            <Link className="back-link" href={`/${p.category}`}>
              <ArrowLeft size={16} /> Back to search
            </Link>
          }
        >
          <BackToSearch category={p.category} />
        </Suspense>
        <Gallery property={p} />
        <div className="detail-title">
          <div>
            <span className="eyebrow">
              {p.type.toUpperCase()} · {p.status.toUpperCase()}
            </span>
            <h1>
              {p.address}, {p.area}
            </h1>
            <p>London, {p.postcode}</p>
          </div>
          <div className="detail-price">
            <h2>{money(p)}</h2>
            <p>
              {p.category === "buy"
                ? "Guide price"
                : p.category === "rent"
                  ? "Per calendar month"
                  : p.transaction === "Lease"
                    ? "Annual rent · illustrative terms"
                    : "Guide purchase price"}
            </p>
            <Favourite id={p.id} />
          </div>
        </div>
        <div className="detail-layout">
          <div>
            <div className="detail-facts">
              {p.category !== "commercial" && (
                <>
                  <span>
                    <BedDouble />
                    {p.beds === 0 ? "Studio" : `${p.beds} bedrooms`}
                  </span>
                  <span>
                    <Bath />
                    {p.baths} bathrooms
                  </span>
                </>
              )}
              <span>
                <Maximize />
                {p.size.toLocaleString("en-GB")} sq ft
              </span>
            </div>
            <section className="detail-section">
              <span className="eyebrow">AT A GLANCE</span>
              <h2>The details that make a difference.</h2>
              <ul className="highlights">
                {p.highlights.map((h) => (
                  <li key={h}>
                    <Check size={17} />
                    {h}
                  </li>
                ))}
              </ul>
            </section>
            <section className="detail-section">
              <span className="eyebrow">A CLOSER LOOK</span>
              <h2>{p.title}</h2>
              {p.fullDescription.split("\n\n").map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </section>
            <section className="detail-section">
              <h2>Good to know</h2>
              <dl className="facts-table">
                <div>
                  <dt>Property type</dt>
                  <dd>{p.type}</dd>
                </div>
                <div>
                  <dt>
                    {p.category === "commercial"
                      ? "Transaction"
                      : "Tenure / furnishing"}
                  </dt>
                  <dd>
                    {p.category === "commercial"
                      ? p.transaction
                      : p.category === "rent"
                        ? p.furnishing
                        : p.tenure}
                  </dd>
                </div>
                <div>
                  <dt>Floor area</dt>
                  <dd>{p.size.toLocaleString("en-GB")} sq ft · approx.</dd>
                </div>
                <div>
                  <dt>EPC rating</dt>
                  <dd>{p.epc} · illustrative</dd>
                </div>
                {p.category !== "commercial" && (
                  <div>
                    <dt>Council tax</dt>
                    <dd>Band {p.councilTax} · illustrative</dd>
                  </div>
                )}
                <div>
                  <dt>Availability</dt>
                  <dd>{p.status}</dd>
                </div>
                <div>
                  <dt>Reference</dt>
                  <dd>{p.id}</dd>
                </div>
              </dl>
              {p.category === "rent" && (
                <p className="note">
                  Illustrative deposit: £
                  {Math.round(((p.price * 12) / 52) * 5).toLocaleString(
                    "en-GB",
                  )}{" "}
                  (five weeks). Proposed term: 12 months, subject to agreement.
                  Bills excluded. All figures are demonstration data.
                </p>
              )}
              <p className="note">
                All details are fictional and for presentation only. Stock
                photography does not depict this address.
              </p>
            </section>
            <section className="detail-section">
              <span className="eyebrow">BEYOND YOUR FRONT DOOR</span>
              <h2>Life in {p.area}</h2>
              <p>{area.intro}</p>
              <p>{area.lifestyle}</p>
              <p>{area.transport}</p>
              <Map lat={p.lat} lng={p.lng} label={p.area} />
              <Link className="text-link" href={`/area-guides/${area.slug}`}>
                Explore the {p.area} guide <ArrowUpRight size={18} />
              </Link>
            </section>
          </div>
          <aside className="detail-enquiry">
            <div className="form-panel">
              <span className="eyebrow">TAKE A CLOSER LOOK</span>
              <h2>Picture yourself here?</h2>
              <p>Arrange a viewing or ask us a question.</p>
              <EnquiryForm kind="enquiry" property={p} />
            </div>
          </aside>
        </div>
      </div>
      <section className="container section">
        <SectionHeading
          eyebrow="A FEW MORE POSSIBILITIES"
          title="You might also feel at home here."
        />
        <div className="property-grid">
          {similar.map((o) => (
            <PropertyCard key={o.id} property={o} />
          ))}
        </div>
      </section>
    </>
  );
}
