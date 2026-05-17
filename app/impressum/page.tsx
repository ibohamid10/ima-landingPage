import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum | AJIONE",
  description: "Impressum und Offenlegung von AJIONE.",
};

export default function ImpressumPage() {
  return (
    <main className="legal-page" lang="de">
      <a className="legal-page__brand" href="/" aria-label="AJIONE home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/ajione-logo.png" alt="AJIONE" />
      </a>

      <section className="legal-page__content" aria-labelledby="impressum-title">
        <p className="section-kicker">Legal notice</p>
        <h1 id="impressum-title">Impressum</h1>

        <div className="legal-block">
          <h2>Angaben gemäß E-Commerce-Gesetz und Mediengesetz</h2>
          <p>
            Ibrahim Hamid
            <br />
            Einzelunternehmen
            <br />
            Geschäftsanschrift: noch zu ergänzen
          </p>
        </div>

        <div className="legal-grid">
          <div className="legal-block">
            <h2>Kontakt</h2>
            <p>
              E-Mail:{" "}
              <a href="mailto:partnership@ajione.com">partnership@ajione.com</a>
            </p>
          </div>

          <div className="legal-block">
            <h2>Unternehmensdaten</h2>
            <p>
              Firmenbuchnummer: nicht vorhanden
              <br />
              GISA-Zahl: 39666857
              <br />
              Zuständige Behörde: Magistrat der Stadt Wien
            </p>
          </div>
        </div>

        <div className="legal-block">
          <h2>Gewerbewortlaut</h2>
          <p>
            Vermittlung von Werk- und Dienstleistungsverträgen an Befugte unter
            Ausschluss der Übernahme von Aufträgen im eigenen Namen und auf eigene
            Rechnung sowie ausgenommen der den Immobilientreuhändern, Reisebüros,
            Transportagenten, Spediteuren, Vermögensberatern, Versicherungsvermittlern
            und Wertpapiervermittlern vorbehaltenen Tätigkeiten.
          </p>
        </div>

        <div className="legal-block">
          <h2>Offenlegung gemäß § 25 Mediengesetz</h2>
          <p>
            Medieninhaber: Ibrahim Hamid, Einzelunternehmen
            <br />
            Unternehmensgegenstand: Creator Partnerships, Vermittlung von Werk- und
            Dienstleistungsverträgen sowie Brand-Creator-Matching.
          </p>
          <p>
            Grundlegende Richtung dieser Website: Information über Leistungen,
            Angebote und Inhalte von AJIONE im Bereich Creator Partnerships und
            Brand-Creator-Kooperationen.
          </p>
        </div>

        <p className="legal-page__note">
          Hinweis: Die Geschäftsanschrift wird ergänzt, sobald eine veröffentlichbare
          Geschäftsadresse oder ein entsprechender ECG-Link vorliegt.
        </p>
      </section>
    </main>
  );
}
