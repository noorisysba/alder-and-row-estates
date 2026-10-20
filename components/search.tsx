"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, MapPin, Search, SlidersHorizontal, X } from "lucide-react";
import { properties } from "@/data/properties";
import { areas } from "@/data/areas";
import { emptyFilters, Filters, filterProperties } from "@/lib/filter";
import { PropertyCard, useFavourites } from "./ui";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export function BackToSearch({ category }: { category: string }) {
  const params = useSearchParams();
  const from = params.get("from");
  const href =
    from && /^\/(buy|rent|commercial|shortlist)(\?|$)/.test(from)
      ? from
      : `/${category}`;
  return (
    <Link className="back-link" href={href}>
      <ArrowLeft size={16} /> Back to search
    </Link>
  );
}
export function HeroSearch() {
  const [tab, setTab] = useState("buy");
  const router = useRouter();
  return (
    <div className="hero-search">
      <div className="search-tabs" role="tablist" aria-label="Search type">
        {["buy", "rent", "commercial"].map((t) => (
          <button
            role="tab"
            aria-selected={tab === t}
            key={t}
            onClick={() => setTab(t)}
          >
            {t === "buy" ? "Buy" : t === "rent" ? "Rent" : "Commercial"}
          </button>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          const qs = new URLSearchParams();
          for (const [k, v] of data) if (v) qs.set(k, String(v));
          router.push(`/${tab}?${qs}`);
        }}
      >
        <label className="search-location">
          YOUR LOCATION
          <div>
            <MapPin size={17} />
            <input
              name="location"
              aria-label="Location, area or postcode"
              placeholder="Area, postcode or neighbourhood"
              list="search-areas"
            />
          </div>
        </label>
        <label>
          PRICE RANGE
          <select key={tab} name="max" defaultValue="">
            <option value="">Any price</option>
            {(tab === "rent"
              ? [2000, 3000, 4000, 6000]
              : tab === "commercial"
                ? [40000, 60000, 100000, 1500000]
                : [600000, 1000000, 1500000, 2500000, 4000000]
            ).map((n) => (
              <option value={n} key={n}>
                Up to £{n.toLocaleString("en-GB")}
                {tab === "rent" ? " pcm" : ""}
              </option>
            ))}
          </select>
        </label>
        <label>
          PROPERTY TYPE
          <select name="type" defaultValue="" key={`type-${tab}`}>
            <option value="">All property types</option>
            {(tab === "commercial"
              ? ["Office", "Retail", "Studio", "Mixed-use"]
              : [
                  "Apartment",
                  "Flat",
                  "Terraced house",
                  "Townhouse",
                  "Mews house",
                  "Penthouse",
                  "Studio",
                ]
            ).map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <button className="button" type="submit">
          <Search size={17} /> Search properties <ArrowRight size={17} />
        </button>
      </form>
      <datalist id="search-areas">
        {areas.map((a) => (
          <option key={a.slug}>{a.name}</option>
        ))}
      </datalist>
    </div>
  );
}
export function ListingExplorer({
  category,
  shortlist = false,
}: {
  category?: "buy" | "rent" | "commercial";
  shortlist?: boolean;
}) {
  const params = useSearchParams();
  const { saved } = useFavourites();
  const filters: Filters = {
    ...emptyFilters,
    ...Object.fromEntries(params.entries()),
  };
  const [limit, setLimit] = useState(9);
  const [show, setShow] = useState(false);
  const router = useRouter();
  const pool = properties.filter((p) => !category || p.category === category);
  const results = filterProperties(
    pool,
    { ...filters, saved: shortlist ? "1" : "" },
    saved,
  );
  function update(key: keyof Filters, value: string) {
    const f: Filters = {
      ...emptyFilters,
      ...Object.fromEntries(
        new URLSearchParams(window.location.search).entries(),
      ),
      [key]: value,
    };
    setLimit(9);
    const q = new URLSearchParams();
    Object.entries(f).forEach(([k, v]) => {
      if (v && v !== "featured") q.set(k, v);
    });
    window.history.replaceState(
      null,
      "",
      `${shortlist ? "/shortlist" : "/" + category}${q.size ? "?" + q : ""}`,
    );
  }
  const types = Array.from(new Set(pool.map((p) => p.type)));
  return (
    <>
      <button
        className="mobile-filter button outline"
        onClick={() => setShow(!show)}
        aria-expanded={show}
      >
        <SlidersHorizontal size={17} />
        {show ? "Hide" : "Search & filters"}
        <span>{results.length} properties</span>
      </button>
      <div className={`listing-filters ${show ? "expanded" : ""}`}>
        <label className="location-filter">
          Location
          <input
            value={filters.location}
            onChange={(e) => update("location", e.target.value)}
            placeholder="Area, street or postcode"
            list="listing-areas"
          />
        </label>
        <datalist id="listing-areas">
          {areas.map((a) => (
            <option key={a.slug}>{a.name}</option>
          ))}
        </datalist>
        <label>
          Min price
          <input
            type="number"
            min="0"
            placeholder="No minimum"
            value={filters.min}
            onChange={(e) => update("min", e.target.value)}
          />
        </label>
        <label>
          Max price
          <input
            type="number"
            min="0"
            placeholder="No maximum"
            value={filters.max}
            onChange={(e) => update("max", e.target.value)}
          />
        </label>
        {category !== "commercial" && (
          <label>
            Bedrooms
            <select
              value={filters.beds}
              onChange={(e) => update("beds", e.target.value)}
            >
              <option value="">Any bedrooms</option>
              <option value="studio">Studio</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}+
                </option>
              ))}
            </select>
          </label>
        )}
        <label>
          Property type
          <select
            value={filters.type}
            onChange={(e) => update("type", e.target.value)}
          >
            <option value="">All types</option>
            {types.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        {category === "rent" && (
          <>
            <label>
              Furnishing
              <select
                value={filters.furnishing}
                onChange={(e) => update("furnishing", e.target.value)}
              >
                <option value="">Any furnishing</option>
                <option>Furnished</option>
                <option>Unfurnished</option>
              </select>
            </label>
            <label>
              Availability
              <select
                value={filters.availability}
                onChange={(e) => update("availability", e.target.value)}
              >
                <option value="">Any availability</option>
                <option>Available now</option>
                <option>Available by arrangement</option>
              </select>
            </label>
          </>
        )}
        {category === "commercial" && (
          <label>
            Transaction
            <select
              value={filters.transaction}
              onChange={(e) => update("transaction", e.target.value)}
            >
              <option value="">Sale & lease</option>
              <option>Sale</option>
              <option>Lease</option>
            </select>
          </label>
        )}
        <button
          className="reset-filters"
          onClick={() => {
            setLimit(9);
            router.replace(shortlist ? "/shortlist" : "/" + category, {
              scroll: false,
            });
          }}
        >
          <X size={15} /> Clear filters
        </button>
      </div>
      <div className="results-bar">
        <p aria-live="polite">
          <strong>{results.length}</strong>{" "}
          {results.length === 1 ? "property" : "properties"}{" "}
          {shortlist
            ? "in your shortlist"
            : category === "buy"
              ? "for sale"
              : category === "rent"
                ? "to rent"
                : "available"}
          {filters.location ? ` in “${filters.location}”` : ""}
        </p>
        <label>
          Sort by{" "}
          <select
            value={filters.sort}
            onChange={(e) => update("sort", e.target.value)}
          >
            <option value="featured">Recommended</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="size">Largest first</option>
          </select>
        </label>
      </div>
      {results.length ? (
        <>
          <div className="property-grid">
            {results.slice(0, limit).map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
                returnTo={`${shortlist ? "/shortlist" : "/" + category}${params.size ? "?" + params : ""}`}
              />
            ))}
          </div>
          <div className="load-more">
            <p>
              Showing {Math.min(limit, results.length)} of {results.length}{" "}
              properties
            </p>
            {limit < results.length && (
              <button
                className="button outline"
                onClick={() => setLimit(limit + 9)}
              >
                Load more properties <ArrowRight size={17} />
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="empty-state">
          <Search size={30} />
          <h2>
            {shortlist
              ? "Your next favourite is waiting."
              : "A little more room to search."}
          </h2>
          <p>
            {shortlist
              ? "Tap the heart on a property to add it to your shortlist."
              : "We don’t have a match for these filters. Try a wider area, a higher budget or fewer bedrooms."}
          </p>
          <button
            className="button"
            onClick={() => {
              router.push(shortlist ? "/buy" : "/" + category);
            }}
          >
            {shortlist ? "Explore properties" : "Reset search"}{" "}
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </>
  );
}
