import type { Metadata } from "next";
import Script from "next/script";
import AnalyticsEvents from "@/components/AnalyticsEvents";
import "./globals.css";

export const metadata: Metadata = {
  title: "AJIONE | Creator Partnerships",
  description:
    "AJIONE connects ambitious brands with high-fit creators through curated, data-informed partnerships.",
};

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "ajione.com";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <Script
          id="plausible-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html:
              "window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}",
          }}
        />
        <Script
          defer
          src="https://plausible.io/js/script.js"
          data-domain={plausibleDomain}
          strategy="afterInteractive"
        />
        <AnalyticsEvents />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <main className="site">{children}</main>
      </body>
    </html>
  );
}
