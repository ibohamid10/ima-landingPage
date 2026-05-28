"use client";

import { useEffect, useState } from "react";

const VIENNA_FMT = new Intl.DateTimeFormat("de-AT", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Europe/Vienna",
});

function useViennaTime() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const update = () => setTime(VIENNA_FMT.format(new Date()));
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}

export default function Footer() {
  const time = useViennaTime();
  const year = new Date().getFullYear();

  return (
    <footer className="footer" aria-label="Footer">
      <div className="footer__art" aria-hidden />
      <div className="footer__grain" aria-hidden />

      <div className="footer__inner">
        <div className="footer__manifesto">
          <p className="footer__kicker">Start a conversation</p>
          <p className="footer__lede">
            Tell us about the brand and the audience you want to reach.
            <em> We typically answer within 24 hours.</em>
          </p>
          <a
            className="footer__email"
            href="mailto:partnership@ajione.com?subject=Partnership%20inquiry"
            data-analytics-event="footer_email_click"
            data-analytics-label="Footer email"
          >
            partnership@ajione.com
          </a>

          <a
            className="footer__social"
            href="https://www.linkedin.com/company/ajione/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="AJIONE on LinkedIn (opens in new tab)"
            data-analytics-event="footer_linkedin_click"
            data-analytics-label="Footer LinkedIn"
          >
            <svg
              className="footer__social-icon"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
            </svg>
            LinkedIn
            <span className="footer__social-arrow" aria-hidden>
              ↗
            </span>
          </a>
        </div>

        <a className="footer__wordmark" href="/" aria-label="AJIONE — home">
          <svg viewBox="0 0 800 200" preserveAspectRatio="xMidYMid meet">
            <text
              x="50%"
              y="158"
              textAnchor="middle"
              className="footer__wordmark-letter"
              fontSize="220"
            >
              AJIONE
            </text>
          </svg>
        </a>

        <div className="footer__bottom">
          <div className="footer__legal">
            <span>© {year} AJIONE</span>
            <a href="/impressum">Legal Notice</a>
            <a href="/datenschutz">Privacy</a>
          </div>

          <div className="footer__clock" aria-live="polite">
            <span>Vienna</span>
            <span className="footer__clock-sep">·</span>
            <span suppressHydrationWarning>{time || "—"}</span>
            <span className="footer__clock-sep">·</span>
            <span>CET</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
