import type { RiverGauge } from '../types/flood'

interface RiverGaugeCardProps {
  gauge: RiverGauge
}

const trendGlyph: Record<RiverGauge['trend'], string> = {
  rising: '↑',
  falling: '↓',
  steady: '→',
}

export function RiverGaugeCard({ gauge }: RiverGaugeCardProps) {
  const fillPercent = Math.min(
    100,
    Math.round((gauge.currentLevel / (gauge.dangerLevel * 1.15)) * 100),
  )
  const dangerMarkerPercent = Math.round(
    (gauge.dangerLevel / (gauge.dangerLevel * 1.15)) * 100,
  )
  const warningMarkerPercent = Math.round(
    (gauge.warningLevel / (gauge.dangerLevel * 1.15)) * 100,
  )

  const isPastDanger = gauge.currentLevel >= gauge.dangerLevel
  const isPastWarning = gauge.currentLevel >= gauge.warningLevel

  return (
    <li className="gauge-card">
      <div className="gauge-card__meter" aria-hidden="true">
        <div className="gauge-card__meter-track">
          <div
            className={`gauge-card__meter-fill ${
              isPastDanger ? 'is-danger' : isPastWarning ? 'is-warning' : 'is-safe'
            }`}
            style={{ height: `${fillPercent}%` }}
          />
          <div className="gauge-card__marker" style={{ bottom: `${dangerMarkerPercent}%` }} />
          <div
            className="gauge-card__marker gauge-card__marker--warn"
            style={{ bottom: `${warningMarkerPercent}%` }}
          />
        </div>
      </div>

      <div className="gauge-card__info">
        <div className="gauge-card__row">
          <span className="gauge-card__name">{gauge.riverName}</span>
          <span className={`gauge-card__trend gauge-card__trend--${gauge.trend}`}>
            {trendGlyph[gauge.trend]} {gauge.trend}
          </span>
        </div>
        <p className="gauge-card__location">{gauge.location}</p>
        <p className="gauge-card__level">
          <strong>{gauge.currentLevel.toFixed(1)} m</strong>
          <span> / danger at {gauge.dangerLevel.toFixed(1)} m</span>
        </p>
        <p className="gauge-card__updated">Updated {gauge.lastUpdated}</p>
      </div>
    </li>
  )
}
