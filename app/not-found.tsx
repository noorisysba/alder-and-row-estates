import Link from "next/link";
export default function NotFound() {
  return (
    <section className="container empty-state">
      <span className="eyebrow">A DIFFERENT DIRECTION</span>
      <h1>This address isn’t on our map.</h1>
      <p>The page may have moved. Let’s help you find your way.</p>
      <Link className="button" href="/">
        Back to home →
      </Link>
    </section>
  );
}
