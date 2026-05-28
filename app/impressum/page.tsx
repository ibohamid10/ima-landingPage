import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Notice | AJIONE",
  description: "Legal notice and disclosure for AJIONE.",
};

export default function ImpressumPage() {
  return (
    <main className="legal-page">
      <a className="legal-page__brand" href="/" aria-label="AJIONE home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/ajione-logo.png" alt="AJIONE" />
      </a>

      <section className="legal-page__content" aria-labelledby="impressum-title">
        <p className="section-kicker">Legal notice</p>
        <h1 id="impressum-title">Legal Notice</h1>

        <div className="legal-block">
          <h2>Information pursuant to the Austrian E-Commerce Act and Media Act</h2>
          <p>
            Ibrahim Hamid
            <br />
            Sole proprietorship
            <br />
            Vienna, Austria
          </p>
        </div>

        <div className="legal-grid">
          <div className="legal-block">
            <h2>Contact</h2>
            <p>
              Email:{" "}
              <a href="mailto:partnership@ajione.com">partnership@ajione.com</a>
            </p>
          </div>

          <div className="legal-block">
            <h2>Company details</h2>
            <p>
              Commercial register number: not applicable
              <br />
              GISA number: 39666857
              <br />
              Competent authority: Municipal Authority of the City of Vienna
            </p>
          </div>
        </div>

        <div className="legal-block">
          <h2>Trade licence scope</h2>
          <p>
            Brokerage of service and contract agreements to authorised parties,
            excluding the acceptance of assignments in our own name and on our
            own account, and excluding activities reserved for real estate
            trustees, travel agencies, transport agents, freight forwarders,
            financial advisors, insurance intermediaries and securities
            intermediaries.
          </p>
        </div>

        <div className="legal-block">
          <h2>Disclosure pursuant to § 25 Austrian Media Act</h2>
          <p>
            Media owner: Ibrahim Hamid, sole proprietorship
            <br />
            Company purpose: Creator partnerships, brokerage of service and
            contract agreements, and brand-creator matching.
          </p>
          <p>
            Editorial direction of this website: information about AJIONE&apos;s
            services, offers and content in the field of creator partnerships
            and brand-creator collaborations.
          </p>
        </div>

        <div lang="de" className="legal-page__locale">
          <p className="section-kicker">Rechtlicher Originaltext</p>
          <h2 className="legal-page__locale-title">Impressum (Deutsch)</h2>
          <p className="legal-page__locale-intro">
            Der folgende deutsche Text ist die rechtlich verbindliche Fassung
            nach österreichischem Recht.
          </p>

          <div className="legal-block">
            <h2>Angaben gemäß E-Commerce-Gesetz und Mediengesetz</h2>
            <p>
              Ibrahim Hamid
              <br />
              Einzelunternehmen
              <br />
              Wien, Österreich
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

        </div>
      </section>
    </main>
  );
}
