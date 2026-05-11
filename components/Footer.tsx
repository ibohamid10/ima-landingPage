export default function Footer() {
  return (
    <footer className="footer" aria-label="Footer">
      <a className="footer__brand" href="/" aria-label="AJIONE home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/ajione-logo.png" alt="AJIONE" />
      </a>

      <nav className="footer__links" aria-label="Legal">
        <a href="/impressum">Impressum</a>
        <a href="/datenschutz">Datenschutz</a>
      </nav>
    </footer>
  );
}
