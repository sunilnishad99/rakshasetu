import type { RiskLevel } from '../types/flood'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

interface TopBarProps {
  riskLevel: RiskLevel
  locating: boolean
  statusText: string
  onProfileClick: () => void
}

export function TopBar({ riskLevel, locating, statusText, onProfileClick }: TopBarProps) {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const pulseColor =
    riskLevel === 'danger'
      ? 'var(--color-danger-500)'
      : riskLevel === 'watch'
        ? 'var(--color-warn-400)'
        : 'var(--color-safe-500)'

  const initials = user?.name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <header className="top-bar">
      <div className="top-bar__brand">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
          <path
            d="M3 16c2.5 2.5 4-2.5 6.5 0S13.5 13.5 16 16s4-2.5 5-1.5"
            stroke="var(--color-river-500)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M12 3l4 7H8z" fill="var(--color-danger-500)" />
        </svg>
        <div>
          <h1>RakshaSetu</h1>
          <p className="top-bar__tagline">Multi-Hazard Early Warning</p>
        </div>
      </div>

      <div className="top-bar__status" style={{ ['--pulse-color' as string]: pulseColor }}>
        <span className="top-bar__dot" aria-hidden="true" />
        <span>{locating ? 'Finding your location…' : statusText}</span>
      </div>

      <div className="top-bar__actions">
        <button
          type="button"
          className="top-bar__icon-button"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <button
          type="button"
          className="top-bar__avatar"
          onClick={onProfileClick}
          aria-label="Open profile"
        >
          {user?.avatarDataUrl ? <img src={user.avatarDataUrl} alt="" /> : <span>{initials}</span>}
        </button>
      </div>
    </header>
  )
}
