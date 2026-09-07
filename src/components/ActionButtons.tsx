import type { AlertContact, Shelter } from '../types/flood'

interface ActionButtonsProps {
  primaryContact: AlertContact
  nearestShelter: Shelter
}

export function ActionButtons({ primaryContact, nearestShelter }: ActionButtonsProps) {
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${nearestShelter.lat},${nearestShelter.lng}`

  return (
    <div className="action-buttons">
      <a className="action-button action-button--danger" href={`tel:${primaryContact.phone}`}>
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none">
          <path
            d="M6 3h3l2 5-2.5 1.5a11 11 0 005 5L15 12l5 2v3a2 2 0 01-2 2A16 16 0 016 5a2 2 0 012-2z"
            fill="currentColor"
          />
        </svg>
        Call for help
      </a>
      <a
        className="action-button action-button--outline"
        href={mapsUrl}
        target="_blank"
        rel="noreferrer"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none">
          <path
            d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z"
            fill="currentColor"
          />
        </svg>
        Safe route
      </a>
    </div>
  )
}
