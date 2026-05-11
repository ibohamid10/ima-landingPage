import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AJIONE | Creator Partnerships",
  description:
    "AJIONE connects ambitious brands with high-fit creators through curated, data-informed partnerships.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=Instrument+Serif:ital@1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <main className="site">{children}</main>
      </body>
    </html>
  );
}
