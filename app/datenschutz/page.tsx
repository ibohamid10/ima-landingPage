import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy | AJIONE",
  description: "Privacy policy for AJIONE.",
};

export default function DatenschutzPage() {
  return (
    <main className="legal-page">
      <a className="legal-page__brand" href="/" aria-label="AJIONE home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/ajione-logo.png" alt="AJIONE" />
      </a>

      <section className="legal-page__content" aria-labelledby="datenschutz-title">
        <p className="section-kicker">Privacy</p>
        <h1 id="datenschutz-title">Privacy Policy</h1>

        <div className="legal-block">
          <h2>Controller</h2>
          <p>
            Ibrahim Hamid
            <br />
            Sole proprietorship
            <br />
            Vienna, Austria
            <br />
            Email:{" "}
            <a href="mailto:partnership@ajione.com">partnership@ajione.com</a>
          </p>
        </div>

        <div className="legal-block">
          <h2>General</h2>
          <p>
            The protection of personal data is important to us. This privacy
            policy explains which personal data is processed when you visit
            this website and when you contact us.
          </p>
        </div>

        <div className="legal-block">
          <h2>Server logs</h2>
          <p>
            When this website is accessed, the hosting provider may automatically
            process technical access data. This may include in particular the IP
            address, date and time of access, pages accessed, volume of data
            transferred, browser and device information, and referrer URL.
          </p>
          <p>
            Processing is carried out for the technical provision, security and
            stability of the website on the basis of legitimate interests
            pursuant to Art. 6 (1) (f) GDPR.
          </p>
        </div>

        <div className="legal-block">
          <h2>Contact</h2>
          <p>
            If you contact us by email, we process the data you provide in
            order to handle your enquiry and any follow-up questions.
            Depending on the content of the enquiry, processing is carried out
            to take pre-contractual steps or on the basis of legitimate
            interests pursuant to Art. 6 (1) (b) or (f) GDPR.
          </p>
        </div>

        <div className="legal-block">
          <h2>Local fonts</h2>
          <p>
            This website uses locally embedded fonts. No connection is
            established to external font providers when the fonts are loaded.
          </p>
        </div>

        <div className="legal-block">
          <h2>Cookies and tracking</h2>
          <p>
            This website uses a self-hosted instance of Umami for cookieless,
            privacy-friendly analytics. No tracking cookies are set, no
            cross-site user profiles are created, and IP addresses are
            anonymised immediately (hashing with a daily rotating salt).
          </p>
          <p>
            In particular, page views, referrers, campaign parameters and
            selected interactions such as clicks on contact or call-to-action
            elements are processed. Processing is carried out to improve the
            website and to evaluate the effectiveness of outreach campaigns on
            the basis of legitimate interests pursuant to Art. 6 (1) (f) GDPR.
          </p>
        </div>

        <div className="legal-block">
          <h2>Retention period</h2>
          <p>
            Personal data is stored only for as long as is necessary for the
            respective purposes or as required by statutory retention
            obligations.
          </p>
        </div>

        <div className="legal-block">
          <h2>Your rights</h2>
          <p>
            Under the GDPR, you have in particular the right of access,
            rectification, erasure, restriction of processing, data portability
            and the right to object to certain processing. If processing is
            based on consent, you may withdraw that consent at any time with
            effect for the future.
          </p>
        </div>

        <div className="legal-block">
          <h2>Right to lodge a complaint</h2>
          <p>
            If you believe that the processing of your personal data violates
            data protection law, you have the right to lodge a complaint with
            the Austrian Data Protection Authority.
          </p>
          <p>
            Austrian Data Protection Authority
            <br />
            Barichgasse 40-42
            <br />
            1030 Vienna
            <br />
            Website:{" "}
            <a href="https://www.dsb.gv.at" rel="noopener noreferrer" target="_blank">
              www.dsb.gv.at
            </a>
          </p>
        </div>

        <div lang="de" className="legal-page__locale">
          <p className="section-kicker">Rechtlicher Originaltext</p>
          <h2 className="legal-page__locale-title">Datenschutz (Deutsch)</h2>
          <p className="legal-page__locale-intro">
            Der folgende deutsche Text ist die rechtlich verbindliche Fassung
            nach österreichischem Recht und der DSGVO.
          </p>

          <div className="legal-block">
            <h2>Verantwortlicher</h2>
            <p>
              Ibrahim Hamid
              <br />
              Einzelunternehmen
              <br />
              Wien, Österreich
              <br />
              E-Mail:{" "}
              <a href="mailto:partnership@ajione.com">partnership@ajione.com</a>
            </p>
          </div>

          <div className="legal-block">
            <h2>Allgemeines</h2>
            <p>
              Der Schutz personenbezogener Daten ist uns wichtig. Diese
              Datenschutzerklärung informiert darüber, welche personenbezogenen Daten
              beim Besuch dieser Website und bei der Kontaktaufnahme verarbeitet werden.
            </p>
          </div>

          <div className="legal-block">
            <h2>Server-Logs</h2>
            <p>
              Beim Aufruf dieser Website können durch den Hosting-Anbieter automatisch
              technische Zugriffsdaten verarbeitet werden. Dazu können insbesondere
              IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seiten, übertragene
              Datenmenge, Browser- und Geräteinformationen sowie Referrer-URL gehören.
            </p>
            <p>
              Die Verarbeitung erfolgt zur technischen Bereitstellung, Sicherheit und
              Stabilität der Website auf Grundlage berechtigter Interessen gemäß Art. 6
              Abs. 1 lit. f DSGVO.
            </p>
          </div>

          <div className="legal-block">
            <h2>Kontaktaufnahme</h2>
            <p>
              Wenn Sie uns per E-Mail kontaktieren, verarbeiten wir die von Ihnen
              übermittelten Daten zur Bearbeitung der Anfrage und für mögliche
              Anschlussfragen. Die Verarbeitung erfolgt je nach Inhalt der Anfrage zur
              Durchführung vorvertraglicher Maßnahmen oder auf Grundlage berechtigter
              Interessen gemäß Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO.
            </p>
          </div>

          <div className="legal-block">
            <h2>Lokale Schriftarten</h2>
            <p>
              Diese Website verwendet lokal eingebundene Schriftarten. Beim Laden der
              Schriftarten wird keine Verbindung zu externen Font-Anbietern hergestellt.
            </p>
          </div>

          <div className="legal-block">
            <h2>Cookies und Tracking</h2>
            <p>
              Diese Website nutzt selbst gehostetes Umami für eine cookielose,
              datenschutzfreundliche Reichweitenmessung. Es werden keine
              Tracking-Cookies gesetzt, keine seitenübergreifenden Nutzerprofile
              erstellt und IP-Adressen werden umgehend anonymisiert (Hashing mit
              täglich rotierendem Salt).
            </p>
            <p>
              Verarbeitet werden insbesondere Seitenaufrufe, Referrer,
              Kampagnenparameter sowie ausgewählte Interaktionen wie Klicks auf
              Kontakt- oder Call-to-Action-Elemente. Die Verarbeitung erfolgt zur
              Verbesserung der Website und zur Auswertung der Wirksamkeit von
              Outreach-Kampagnen auf Grundlage berechtigter Interessen gemäß
              Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </div>

          <div className="legal-block">
            <h2>Speicherdauer</h2>
            <p>
              Personenbezogene Daten werden nur so lange gespeichert, wie es für die
              jeweiligen Zwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten
              bestehen.
            </p>
          </div>

          <div className="legal-block">
            <h2>Ihre Rechte</h2>
            <p>
              Sie haben nach Maßgabe der DSGVO insbesondere das Recht auf Auskunft,
              Berichtigung, Löschung, Einschränkung der Verarbeitung,
              Datenübertragbarkeit sowie Widerspruch gegen bestimmte Verarbeitungen.
              Wenn eine Verarbeitung auf Einwilligung beruht, können Sie diese
              Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen.
            </p>
          </div>

          <div className="legal-block">
            <h2>Beschwerderecht</h2>
            <p>
              Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen
              Daten gegen Datenschutzrecht verstößt, haben Sie das Recht, Beschwerde bei
              der Österreichischen Datenschutzbehörde einzulegen.
            </p>
            <p>
              Österreichische Datenschutzbehörde
              <br />
              Barichgasse 40-42
              <br />
              1030 Wien
              <br />
              Website:{" "}
              <a href="https://www.dsb.gv.at" rel="noopener noreferrer" target="_blank">
                www.dsb.gv.at
              </a>
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}
