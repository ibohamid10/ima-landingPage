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
            <em> We answer within 24 hours.</em>
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
            className="footer__creators"
            href="mailto:creators@ajione.com?subject=Creator%20pitch"
            data-analytics-event="footer_creators_click"
            data-analytics-label="Footer creators"
          >
            <span>Creators — pitch yourself</span>
            <span className="footer__creators-mail">creators@ajione.com</span>
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
            <a href="/impressum">Impressum</a>
            <a href="/datenschutz">Datenschutz</a>
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
