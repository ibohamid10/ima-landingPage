import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz | AJIONE",
  description: "Datenschutzerklärung von AJIONE.",
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
        <h1 id="datenschutz-title">Datenschutz</h1>

        <div className="legal-block">
          <h2>Verantwortlicher</h2>
          <p>
            Ibrahim Hamid
            <br />
            Einzelunternehmen
            <br />
            Geschäftsanschrift: noch zu ergänzen
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
            Diese Website verwendet nach aktuellem Stand keine Analyse-, Marketing-
            oder Tracking-Cookies. Sollte sich dies ändern, wird diese
            Datenschutzerklärung entsprechend angepasst und, soweit erforderlich, eine
            Einwilligung eingeholt.
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
            <a href="https://www.dsb.gv.at" rel="noreferrer" target="_blank">
              www.dsb.gv.at
            </a>
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
