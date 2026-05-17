import type { Metadata } from "next";
import Script from "next/script";
import { Instrument_Serif } from "next/font/google";
import AnalyticsEvents from "@/components/AnalyticsEvents";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ajione.com"),
  title: "AJIONE | Creator Partnerships",
  description:
    "AJIONE connects ambitious brands with high-fit creators through curated, data-informed partnerships.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    url: "https://ajione.com",
    siteName: "AJIONE",
    title: "AJIONE | Creator Partnerships",
    description:
      "AJIONE connects ambitious brands with high-fit creators through curated, data-informed partnerships.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AJIONE | Creator Partnerships",
    description:
      "AJIONE connects ambitious brands with high-fit creators through curated, data-informed partnerships.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_SRC;
const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

// Synchronous head script: fires before first paint and adds a class to
// <html> for returning visitors so CSS can hide the preloader instantly.
// No React state -> no SSR/CSR mismatch and no flash of Hero before the
// intro shows up.
const INTRO_CHECK_SCRIPT = `
try {
  if (sessionStorage.getItem('ajione-intro-shown')) {
    document.documentElement.classList.add('ajione-intro-seen');
  } else {
    document.documentElement.classList.add('ajione-intro-locked');
  }
} catch (e) {}
`;

// After-paint script: dismiss the intro as fast as possible while still
// covering hero-asset loading shimmer. Held time was 1300ms + 700ms fade
// — that was a ~2s LCP penalty on cold paid traffic. Cut to 350ms hold +
// 260ms fade (~70% reduction) so the brand flash stays but Core Web
// Vitals do not eat it.
const INTRO_DISMISS_SCRIPT = `
(function () {
  try {
    var html = document.documentElement;
    if (html.classList.contains('ajione-intro-seen')) return;
    var el = document.getElementById('ajione-preloader');
    if (!el) return;
    window.setTimeout(function () {
      try { sessionStorage.setItem('ajione-intro-shown', '1'); } catch (e) {}
      el.classList.add('preloader--exit');
      html.classList.remove('ajione-intro-locked');
      window.setTimeout(function () {
        el.parentNode && el.parentNode.removeChild(el);
      }, 260);
    }, 350);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={instrumentSerif.variable}>
      <head>
        <script
          // Runs before first paint so the .ajione-intro-* class is on
          // <html> when CSS resolves -> no flash.
          dangerouslySetInnerHTML={{ __html: INTRO_CHECK_SCRIPT }}
        />
      </head>
      <body>
        {umamiSrc && umamiWebsiteId ? (
          <Script
            defer
            src={umamiSrc}
            data-website-id={umamiWebsiteId}
            strategy="afterInteractive"
          />
        ) : null}
        <AnalyticsEvents />
        <SmoothScroll />

        <div className="preloader" id="ajione-preloader" aria-hidden="true">
          <div className="preloader__logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ajione-logo.png" alt="" />
          </div>
          <span className="preloader__rule" aria-hidden="true" />
        </div>

        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <main className="site">{children}</main>

        <script dangerouslySetInnerHTML={{ __html: INTRO_DISMISS_SCRIPT }} />
      </body>
    </html>
  );
}
