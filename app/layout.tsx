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
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <main className="site">{children}</main>
      </body>
    </html>
  );
}
