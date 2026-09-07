export type ViewId = 'home' | 'map' | 'alerts' | 'profile'

interface NavItem {
  id: ViewId
  label: string
  icon: string
}

const items: NavItem[] = [
  { id: 'home', label: 'Home', icon: 'M4 11l8-7 8 7v9a1 1 0 01-1 1h-4v-6H9v6H5a1 1 0 01-1-1z' },
  { id: 'map', label: 'Map', icon: 'M9 3L4 5v16l5-2 6 2 5-2V3l-5 2-6-2z' },
  { id: 'alerts', label: 'Alerts', icon: 'M12 2a6 6 0 00-6 6c0 5-2 6-2 7h16s-2-1-2-7a6 6 0 00-6-6zM10 19a2 2 0 004 0' },
  { id: 'profile', label: 'Profile', icon: 'M12 12a5 5 0 100-10 5 5 0 000 10zM4 21a8 8 0 0116 0' },
]

interface AppNavProps {
  active: ViewId
  onSelect: (id: ViewId) => void
  alertCount?: number
}

export function AppNav({ active, onSelect, alertCount }: AppNavProps) {
  return (
    <nav className="app-nav" aria-label="Primary">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`app-nav__item ${active === item.id ? 'is-active' : ''}`}
          onClick={() => onSelect(item.id)}
          aria-current={active === item.id ? 'page' : undefined}
        >
          <span className="app-nav__icon-wrap">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
              <path d={item.icon} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
            {item.id === 'alerts' && !!alertCount && (
              <span className="app-nav__badge">{alertCount}</span>
            )}
          </span>
          <span className="app-nav__label">{item.label}</span>
        </button>
      ))}
    </nav>
  )
}
