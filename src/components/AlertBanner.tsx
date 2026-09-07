import type { HazardEvent } from '../types/flood'
import { HazardIcon, hazardLabels } from '../utils/hazardMeta'

interface AlertBannerProps {
  hazard: HazardEvent
}

const titleCopy: Record<HazardEvent['severity'], string> = {
  danger: 'Active danger nearby',
  watch: 'Stay alert',
  safe: 'All clear',
}

export function AlertBanner({ hazard }: AlertBannerProps) {
  return (
    <section
      className={`alert-banner alert-banner--${hazard.severity}`}
      role={hazard.severity === 'danger' ? 'alert' : 'status'}
      aria-live="polite"
    >
      <div className="alert-banner__icon" aria-hidden="true">
        {hazard.severity === 'safe' ? '✓' : <HazardIcon type={hazard.type} size={16} />}
      </div>
      <div>
        <div className="alert-banner__title-row">
          <h2 className="alert-banner__title">{titleCopy[hazard.severity]}</h2>
          <span className="alert-banner__tag">{hazardLabels[hazard.type]}</span>
        </div>
        <p className="alert-banner__body">
          {hazard.title} — {hazard.location}, {hazard.distanceKm.toFixed(1)} km away.{' '}
          {hazard.detail}
        </p>
      </div>
    </section>
  )
}
