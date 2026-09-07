import type { HazardEvent } from '../types/flood'
import { HazardIcon, hazardLabels } from '../utils/hazardMeta'

interface HazardCardProps {
  hazard: HazardEvent
  variant?: 'compact' | 'detailed'
}

const severityLabel: Record<HazardEvent['severity'], string> = {
  danger: 'Danger',
  watch: 'Watch',
  safe: 'Safe',
}

export function HazardCard({ hazard, variant = 'compact' }: HazardCardProps) {
  return (
    <li className={`hazard-card hazard-card--${variant} hazard-card--${hazard.severity}`}>
      <div className="hazard-card__top">
        <span className="hazard-card__icon">
          <HazardIcon type={hazard.type} size={variant === 'compact' ? 18 : 20} />
        </span>
        <span className="hazard-card__type">{hazardLabels[hazard.type]}</span>
        <span className={`hazard-card__severity hazard-card__severity--${hazard.severity}`}>
          {severityLabel[hazard.severity]}
        </span>
      </div>
      <p className="hazard-card__title">{hazard.title}</p>
      <p className="hazard-card__location">{hazard.location}</p>
      {variant === 'detailed' && <p className="hazard-card__detail">{hazard.detail}</p>}
      <div className="hazard-card__meta">
        <span>{hazard.distanceKm.toFixed(1)} km away</span>
        <span>{hazard.updatedAt}</span>
      </div>
    </li>
  )
}
