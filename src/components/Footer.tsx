export function Footer() {
  return (
    <footer className="app-footer">
      <p className="app-footer__credit">
        Developed by <strong>Sunil Nishad</strong>
      </p>
      <div className="app-footer__links">
        <a href="tel:+916393509754" className="app-footer__link">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
            <path
              d="M6 3h3l2 5-2.5 1.5a11 11 0 005 5L15 12l5 2v3a2 2 0 01-2 2A16 16 0 016 5a2 2 0 012-2z"
              fill="currentColor"
            />
          </svg>
          +91 6393509754
        </a>
        <a
          href="https://instagram.com/im____thor"
          target="_blank"
          rel="noreferrer"
          className="app-footer__link"
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
          </svg>
          @im____thor
        </a>
      </div>
    </footer>
  )
}
