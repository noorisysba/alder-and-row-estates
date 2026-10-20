"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
  useSyncExternalStore,
} from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Heart,
  Menu,
  X,
  BedDouble,
  Bath,
  Maximize,
  ChevronLeft,
  ChevronRight,
  Check,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { agency } from "@/data/settings";
import { money, Property } from "@/data/properties";
import { assetPath } from "@/lib/paths";
export function Photo({
  name,
  alt,
  className = "",
  priority = false,
}: {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <img
      src={assetPath(`/assets/${name}.jpg`)}
      srcSet={`${assetPath(`/assets/${name}-640.webp`)} 640w, ${assetPath(`/assets/${name}-1280.webp`)} 1280w${name === "hero" ? `, ${assetPath(`/assets/${name}-1920.webp`)} 1920w` : ""}`}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      sizes={
        priority
          ? "100vw"
          : "(max-width: 430px) 100vw, (max-width: 760px) 50vw, 33vw"
      }
      onError={(e) => {
        if (!e.currentTarget.src.endsWith("/assets/living-1.jpg")) {
          e.currentTarget.srcset = "";
          e.currentTarget.src = assetPath("/assets/living-1.jpg");
        }
      }}
    />
  );
}
const FavouriteContext = createContext<{
  saved: string[];
  toggle: (id: string) => void;
}>({ saved: [], toggle: () => {} });
const subscribeSaved = (callback: () => void) => {
  window.addEventListener("ar-shortlist-changed", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("ar-shortlist-changed", callback);
    window.removeEventListener("storage", callback);
  };
};
const getSaved = () => {
  try {
    return localStorage.getItem("ar-shortlist") || "[]";
  } catch {
    return "[]";
  }
};
export function Providers({ children }: { children: React.ReactNode }) {
  const stored = useSyncExternalStore(subscribeSaved, getSaved, () => "[]");
  let saved: string[] = [];
  try {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed))
      saved = parsed.filter((v: unknown) => typeof v === "string");
  } catch {}
  function toggle(id: string) {
    const next = saved.includes(id)
      ? saved.filter((x) => x !== id)
      : [...saved, id];
    try {
      localStorage.setItem("ar-shortlist", JSON.stringify(next));
      window.dispatchEvent(new Event("ar-shortlist-changed"));
    } catch {}
  }
  return (
    <FavouriteContext.Provider value={{ saved, toggle }}>
      {children}
    </FavouriteContext.Provider>
  );
}
export const useFavourites = () => useContext(FavouriteContext);
export function Favourite({ id }: { id: string }) {
  const { saved, toggle } = useFavourites();
  return (
    <button
      className={`favourite ${saved.includes(id) ? "is-saved" : ""}`}
      onClick={() => toggle(id)}
      aria-label={
        saved.includes(id) ? "Remove from shortlist" : "Save to shortlist"
      }
      aria-pressed={saved.includes(id)}
    >
      <Heart size={19} fill={saved.includes(id) ? "currentColor" : "none"} />
    </button>
  );
}
const navigation = [
  ["Home", "/"],
  ["Buy", "/buy"],
  ["Rent", "/rent"],
  ["Commercial", "/commercial"],
  ["Area Guides", "/area-guides"],
  ["Our Services", "/services"],
  ["About Us", "/about"],
  ["Contact", "/contact"],
];
export function Logo() {
  return (
    <Link className="wordmark" href="/" aria-label={agency.fullName + " home"}>
      {agency.name}
      <span>
        {agency.suffix} <i /> LONDON
      </span>
    </Link>
  );
}
export function Header() {
  const [open, setOpen] = useState(false);
  const { saved } = useFavourites();
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="header">
      <div className="header-inner">
        <Logo />
        <nav
          aria-label="Main navigation"
          className={open ? "main-nav open" : "main-nav"}
        >
          {navigation.map(([name, url]) => (
            <Link href={url} key={url} onClick={() => setOpen(false)}>
              {name}
            </Link>
          ))}
          <Link
            className="mobile-valuation"
            href="/valuation"
            onClick={() => setOpen(false)}
          >
            Book a valuation <ArrowUpRight size={15} />
          </Link>
        </nav>
        <div className="header-actions">
          <Link
            className="shortlist"
            href="/shortlist"
            aria-label={`Shortlist, ${saved.length} properties`}
          >
            <Heart size={19} />
            {saved.length > 0 && <span>{saved.length}</span>}
          </Link>
          <Link className="button small valuation-nav" href="/valuation">
            Book a valuation <ArrowUpRight size={15} />
          </Link>
          <button
            className="menu-button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close navigation" : "Open navigation"}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="container footer-top">
        <div>
          <Logo />
          <p>
            Distinctive homes.
            <br />
            Thoughtful advice.
            <br />
            London, personally.
          </p>
        </div>
        <div>
          <h3>Find your place</h3>
          {[
            ["Property for sale", "/buy"],
            ["Property to rent", "/rent"],
            ["Commercial property", "/commercial"],
            ["London area guides", "/area-guides"],
            ["Your shortlist", "/shortlist"],
          ].map(([a, b]) => (
            <Link href={b} key={b}>
              {a}
            </Link>
          ))}
        </div>
        <div>
          <h3>Here to help</h3>
          {[
            ["Our services", "/services"],
            ["About Alder & Row", "/about"],
            ["Book a valuation", "/valuation"],
            ["Get in touch", "/contact"],
          ].map(([a, b]) => (
            <Link href={b} key={b}>
              {a}
            </Link>
          ))}
        </div>
        <div>
          <h3>Our London office</h3>
          <p>
            {agency.address}
            <br />
            <small>Fictional demonstration address</small>
          </p>
          <a href={`tel:+442079460328`}>{agency.phone}</a>
          <a href={`mailto:${agency.email}`}>{agency.email}</a>
          <Link href="/contact#social">Instagram ↗ &nbsp; LinkedIn ↗</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>
          © {new Date().getFullYear()} {agency.fullName}
        </p>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/cookies">Cookies</Link>
          <Link href="/credits">Photography</Link>
        </div>
      </div>
      <p className="disclaimer container">{agency.disclaimer}</p>
    </footer>
  );
}
export function PropertyCard({
  property: p,
  returnTo,
}: {
  property: Property;
  returnTo?: string;
}) {
  return (
    <article className="property-card">
      <div className="card-image">
        <Link
          href={`/properties/${p.slug}${returnTo ? `?from=${encodeURIComponent(returnTo)}` : ""}`}
          aria-label={`View ${p.address}, ${p.area}`}
        >
          <Photo
            name={p.image}
            alt={`Illustrative ${p.type.toLowerCase()} interior for ${p.area}`}
          />
        </Link>
        <span className="image-tag">
          {p.category === "rent"
            ? "TO LET"
            : p.category === "commercial"
              ? `COMMERCIAL · ${p.transaction.toUpperCase()}`
              : p.status === "Under offer"
                ? "UNDER OFFER"
                : "FOR SALE"}
        </span>
        <Favourite id={p.id} />
      </div>
      <Link
        className="card-content"
        href={`/properties/${p.slug}${returnTo ? `?from=${encodeURIComponent(returnTo)}` : ""}`}
      >
        <div className="card-price">
          {money(p)}
          <ArrowUpRight size={19} />
        </div>
        <h3>
          {p.address}, {p.area}
        </h3>
        <p>
          {p.type} · {p.postcode}
        </p>
        <div className="property-facts">
          {p.category !== "commercial" && (
            <>
              <span>
                <BedDouble size={16} />
                {p.beds === 0
                  ? "Studio"
                  : p.beds + (p.beds === 1 ? " bed" : " beds")}
              </span>
              <span>
                <Bath size={16} />
                {p.baths} {p.baths === 1 ? "bath" : "baths"}
              </span>
            </>
          )}
          <span>
            <Maximize size={15} />
            {p.size.toLocaleString("en-GB")} sq ft
          </span>
        </div>
        <div className="card-foot">
          {p.category === "buy"
            ? p.tenure
            : p.category === "rent"
              ? p.furnishing
              : p.transaction === "Lease"
                ? "Lease opportunity"
                : "Freehold opportunity"}{" "}
          <span>View property ↗</span>
        </div>
      </Link>
    </article>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  text,
  link,
  href,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  link?: string;
  href?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {href && (
        <Link className="text-link" href={href}>
          {link}
          <ArrowUpRight size={18} />
        </Link>
      )}
    </div>
  );
}
export function ValuationCTA() {
  return (
    <section className="valuation-cta container">
      <div>
        <span className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
        <h2>
          What could your
          <br />
          <em>property be worth?</em>
        </h2>
        <p>
          A fresh perspective. A thoughtful conversation.
          <br />
          Let’s discover the possibilities together.
        </p>
        <Link className="button" href="/valuation">
          Book a complimentary valuation <ArrowUpRight size={17} />
        </Link>
      </div>
      <Photo name="living-2" alt="Illustrative light-filled reception room" />
    </section>
  );
}
export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link href="/">Home</Link>
      {items.map((item, i) => (
        <span key={i}>
          <span aria-hidden="true">/</span>
          {item.href ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
export function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    const el = ref.current;
    el?.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="modal"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-label={title}
    >
      <div className="modal-head">
        <h2>{title}</h2>
        <button
          className="icon-button"
          aria-label="Close dialog"
          onClick={onClose}
        >
          <X />
        </button>
      </div>
      {children}
    </dialog>
  );
}
export function Gallery({ property: p }: { property: Property }) {
  const [index, setIndex] = useState<number | null>(null);
  const [mode, setMode] = useState<"brochure" | "video" | null>(null);
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    if (index === null) return;
    function key(e: KeyboardEvent) {
      if (e.key === "ArrowRight")
        setIndex((i) => (i === null ? null : (i + 1) % p.gallery.length));
      if (e.key === "ArrowLeft")
        setIndex((i) =>
          i === null ? null : (i - 1 + p.gallery.length) % p.gallery.length,
        );
    }
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [index, p.gallery.length]);
  useEffect(() => {
    if (mode !== "video") return;
    const timer = setInterval(
      () => setSlide((s) => (s + 1) % p.gallery.length),
      3200,
    );
    return () => clearInterval(timer);
  }, [mode, p.gallery.length]);
  return (
    <>
      <div className="detail-gallery">
        {p.gallery.slice(0, 3).map((img, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Open photograph ${i + 1} of ${p.gallery.length}`}
          >
            <Photo
              name={img}
              priority={i === 0}
              alt={`Illustrative ${p.area} ${p.type.toLowerCase()} photograph ${i + 1}`}
            />
            {i === 2 && (
              <span className="gallery-count">
                <Maximize size={15} /> View all {p.gallery.length} photos
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="media-actions">
        <span>Stock photography · illustrative interiors</span>
        <div>
          <button onClick={() => setMode("brochure")}>
            View sample brochure <ArrowUpRight size={15} />
          </button>
          <button onClick={() => setMode("video")}>
            Illustrative video tour <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
      {index !== null && (
        <Modal
          title={`${p.address} · ${index + 1} / ${p.gallery.length}`}
          onClose={() => setIndex(null)}
        >
          <div className="lightbox">
            <Photo
              name={p.gallery[index]}
              alt={`Illustrative property image ${index + 1}`}
            />
            <button
              className="gallery-prev icon-button"
              aria-label="Previous image"
              onClick={() =>
                setIndex((index - 1 + p.gallery.length) % p.gallery.length)
              }
            >
              <ChevronLeft />
            </button>
            <button
              className="gallery-next icon-button"
              aria-label="Next image"
              onClick={() => setIndex((index + 1) % p.gallery.length)}
            >
              <ChevronRight />
            </button>
          </div>
          <p className="modal-caption">
            Illustrative stock photography. Use the arrow keys to explore.
          </p>
        </Modal>
      )}
      {mode && (
        <Modal
          title={
            mode === "brochure"
              ? "Sample property brochure"
              : "Illustrative property tour"
          }
          onClose={() => setMode(null)}
        >
          {mode === "brochure" ? (
            <div className="brochure">
              <Logo />
              <Photo name={p.image} alt="Sample brochure cover" />
              <span className="eyebrow">SAMPLE BROCHURE · {p.id}</span>
              <h2>
                {p.address}, {p.area}
              </h2>
              <h3>{money(p)}</h3>
              <p>{p.description}</p>
              <ul>
                {p.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <p className="note">
                An on-screen demonstration brochure. No real property document
                is available for download.
              </p>
            </div>
          ) : (
            <div className="tour">
              <Photo
                name={p.gallery[slide]}
                alt={`Illustrative slideshow scene ${slide + 1}`}
              />
              <div className="tour-caption">
                <span>ILLUSTRATIVE PHOTO TOUR</span>
                <h3>{p.title}</h3>
                <p>
                  Scene {slide + 1} of {p.gallery.length} · An automated
                  stock-photo slideshow, not a recording of this address.
                </p>
                <button
                  className="button"
                  onClick={() => setSlide((slide + 1) % p.gallery.length)}
                >
                  Next scene <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </>
  );
}
export function EnquiryForm({
  kind = "contact",
  property,
}: {
  kind?: "contact" | "enquiry" | "valuation";
  property?: Property;
}) {
  const [success, setSuccess] = useState(false);
  const [busy, setBusy] = useState(false);
  const isValuation = kind === "valuation";
  return success ? (
    <div className="form-success" role="status">
      <span className="success-icon">
        <Check size={28} />
      </span>
      <span className="eyebrow">DEMONSTRATION COMPLETE</span>
      <h2>
        {isValuation
          ? "Your next chapter is taking shape."
          : "Thank you for getting in touch."}
      </h2>
      <p>
        {isValuation
          ? "Your valuation request has been simulated. A live agency would now contact you to arrange a suitable appointment."
          : "Your enquiry has been simulated successfully. A live agency would be in touch to discuss your plans."}
      </p>
      <p className="note">No information has been sent or stored.</p>
      <button className="text-link" onClick={() => setSuccess(false)}>
        Make another enquiry <ArrowRight size={16} />
      </button>
    </div>
  ) : (
    <form
      className="enquiry-form"
      onSubmit={(e) => {
        e.preventDefault();
        setBusy(true);
        setTimeout(() => {
          setBusy(false);
          setSuccess(true);
        }, 650);
      }}
    >
      <div className="form-grid">
        {isValuation && (
          <>
            <label className="full">
              Property address and postcode
              <input
                name="address"
                required
                minLength={8}
                autoComplete="street-address"
                placeholder="e.g. 12 Linden Gardens, London W11 2AR"
              />
            </label>
            <label>
              Property type
              <select name="propertyType" required defaultValue="">
                <option value="" disabled>
                  Select a type
                </option>
                {[
                  "Apartment",
                  "Flat",
                  "Terraced house",
                  "Townhouse",
                  "Mews house",
                  "Penthouse",
                  "Studio",
                  "Commercial",
                ].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </label>
            <label>
              Bedrooms
              <select name="bedrooms" required defaultValue="">
                <option value="" disabled>
                  Select bedrooms
                </option>
                {["Studio", "1", "2", "3", "4", "5+", "Not applicable"].map(
                  (v) => (
                    <option key={v}>{v}</option>
                  ),
                )}
              </select>
            </label>
            <label className="full">
              I am considering
              <select name="valuationPurpose">
                <option>Selling my property</option>
                <option>Letting my property</option>
                <option>Exploring my options</option>
              </select>
            </label>
          </>
        )}
        <label className="full">
          Full name
          <input
            name="name"
            autoComplete="name"
            required
            minLength={2}
            placeholder="Your full name"
          />
        </label>
        <label>
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
          />
        </label>
        <label>
          Telephone number
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            pattern={String.raw`[+0-9\s\(\)\-]{10,20}`}
            title="Enter a telephone number with 10–20 digits, spaces or telephone symbols"
            placeholder="07700 900000"
          />
        </label>
        {isValuation ? (
          <label className="full">
            Preferred contact method
            <select name="contactMethod">
              <option>Email</option>
              <option>Telephone</option>
            </select>
          </label>
        ) : (
          <label className="full">
            How can we help?
            <textarea
              name="message"
              rows={4}
              required
              minLength={10}
              defaultValue={
                property
                  ? `I would like to arrange a viewing of ${property.address}, ${property.area}.`
                  : ""
              }
              placeholder="Tell us a little about your plans…"
            />
          </label>
        )}
      </div>
      <label className="consent">
        <input type="checkbox" required name="consent" />
        <span>
          I understand this is a demonstration and consent to simulating this
          enquiry. Please use fictional details.{" "}
          <Link href="/privacy">Privacy information</Link>.
        </span>
      </label>
      <button className="button" type="submit" disabled={busy}>
        {busy
          ? "Simulating your request…"
          : isValuation
            ? "Request a valuation"
            : "Send enquiry"}
        <ArrowUpRight size={17} />
      </button>
      <p className="note">Prototype only. Nothing is sent or stored.</p>
    </form>
  );
}
export function Map({
  lat,
  lng,
  label,
}: {
  lat: number;
  lng: number;
  label: string;
}) {
  return (
    <div className="map">
      <iframe
        title={`Approximate illustrative position: ${label}`}
        loading="lazy"
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.012},${lat - 0.006},${lng + 0.012},${lat + 0.006}&layer=mapnik&marker=${lat},${lng}`}
        referrerPolicy="no-referrer"
      />
      <div className="map-caption">
        <MapPin size={16} />
        <span>{label} · Approximate illustrative position</span>
        <a
          href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=15/${lat}/${lng}`}
          target="_blank"
          rel="noreferrer"
        >
          Open map ↗
        </a>
      </div>
    </div>
  );
}
export function ContactDetails() {
  return (
    <div className="contact-details">
      <a href="tel:+442079460328">
        <Phone size={19} />
        <span>
          {agency.phone}
          <small>UK demonstration number</small>
        </span>
      </a>
      <a href={`mailto:${agency.email}`}>
        <Mail size={19} />
        <span>
          {agency.email}
          <small>Reserved example domain</small>
        </span>
      </a>
      <div>
        <MapPin size={19} />
        <span>
          {agency.address}
          <small>Fictional office · please do not visit</small>
        </span>
      </div>
    </div>
  );
}
