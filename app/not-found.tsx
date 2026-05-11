import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="not-found__grain" aria-hidden />

      <Link className="not-found__brand" href="/" aria-label="AJIONE home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/ajione-logo.png" alt="AJIONE" />
      </Link>

      <section className="not-found__content" aria-labelledby="not-found-title">
        <p className="section-kicker">404</p>
        <h1 id="not-found-title">
          This partnership path <span>does not exist.</span>
        </h1>
        <p>
          The page you are looking for may have moved, expired, or never made it past
          the first brief.
        </p>
        <Link
          className="button button--primary"
          href="/"
          data-analytics-event="not_found_home_click"
          data-analytics-label="404 back home"
        >
          <span>Back to Home</span>
          <span className="button__arrow" aria-hidden>
            -&gt;
          </span>
        </Link>
      </section>
    </main>
  );
}
