"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="container empty-state">
      <h1>A small pause in your search.</h1>
      <p>Something hasn’t loaded as expected. Please try again.</p>
      <button className="button" onClick={reset}>
        Try again
      </button>
    </section>
  );
}
