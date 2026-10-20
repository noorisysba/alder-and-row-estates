import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { areas } from "@/data/areas";
import { Breadcrumbs, Photo, ValuationCTA } from "@/components/ui";
export const metadata = { title: "London area guides" };
export default function AreaGuides() {
  return (
    <>
      <div className="container">
        <Breadcrumbs items={[{ label: "Area guides" }]} />
      </div>
      <section className="container page-heading">
        <span className="eyebrow">FIND YOUR KIND OF LONDON</span>
        <h1>
          Fifteen neighbourhoods.
          <br />
          <em>Endless possibilities.</em>
        </h1>
        <p>
          Get to know the places behind the postcodes. Discover local character,
          everyday pleasures and somewhere you could belong.
        </p>
      </section>
      <section className="container area-grid all-areas">
        {areas.map((a) => (
          <Link
            className="area-card"
            href={`/area-guides/${a.slug}`}
            key={a.slug}
          >
            <Photo
              name={a.image}
              alt={`${a.name} area guide, illustrative neighbourhood photography`}
            />
            <div>
              <span>{a.tagline}</span>
              <h3>
                {a.name}
                <ArrowUpRight size={23} />
              </h3>
            </div>
          </Link>
        ))}
      </section>
      <ValuationCTA />
    </>
  );
}
