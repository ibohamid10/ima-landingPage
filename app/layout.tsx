import type { Metadata } from "next";
import Script from "next/script";
import AnalyticsEvents from "@/components/AnalyticsEvents";
import "./globals.css";

export const metadata: Metadata = {
  title: "AJIONE | Creator Partnerships",
  description:
    "AJIONE connects ambitious brands with high-fit creators through curated, data-informed partnerships.",
};

const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_SRC;
const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
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
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <main className="site">{children}</main>
      </body>
    </html>
  );
}
