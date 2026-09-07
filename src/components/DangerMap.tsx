import type { HazardEvent, RiskLevel } from '../types/flood'
import { hazardColorVar, hazardLabels } from '../utils/hazardMeta'

interface DangerMapProps {
  riskLevel: RiskLevel
  hazards: HazardEvent[]
  compact?: boolean
}

// Fixed demo layout positions for each hazard marker on the illustrative map.
const markerPositions: Record<string, { x: number; y: number }> = {
  'hz-flood-trishuli': { x: 160, y: 128 },
  'hz-landslide-sindhupalchok': { x: 235, y: 70 },
  'hz-earthquake-ktm': { x: 90, y: 95 },
  'hz-storm-ktm-valley': { x: 110, y: 165 },
  'hz-fire-chitwan': { x: 260, y: 175 },
}

export function DangerMap({ riskLevel, hazards, compact }: DangerMapProps) {
  const userAtCenter = riskLevel === 'danger'

  return (
    <section className="danger-map" aria-label="Nearby hazard map">
      <svg viewBox="0 0 320 220" role="img" aria-hidden="true">
        <rect width="320" height="220" fill="var(--color-safe-100)" />
        <path
          d="M0,120 C50,150 90,100 140,130 C190,160 230,110 280,140 L320,150 L320,220 L0,220 Z"
          fill="var(--color-river-500)"
          opacity="0.55"
        />
        <path
          d="M0,140 C50,168 90,122 140,150 C190,178 230,132 280,160 L320,168 L320,220 L0,220 Z"
          fill="var(--color-river-700)"
          opacity="0.5"
        />

        {hazards.map((hazard) => {
          const pos = markerPositions[hazard.id] ?? { x: 160, y: 128 }
          const radius = hazard.severity === 'danger' ? 30 : hazard.severity === 'watch' ? 20 : 12
          return (
            <g key={hazard.id}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={radius}
                fill={hazardColorVar[hazard.type]}
                opacity={hazard.severity === 'safe' ? 0.12 : 0.28}
              />
              <circle cx={pos.x} cy={pos.y} r={5} fill={hazardColorVar[hazard.type]} />
              {!compact && (
                <text
                  x={pos.x}
                  y={pos.y - radius - 6}
                  textAnchor="middle"
                  className="danger-map__label"
                >
                  {hazardLabels[hazard.type]}
                </text>
              )}
            </g>
          )
        })}

        <circle
          cx={userAtCenter ? 168 : 200}
          cy={userAtCenter ? 118 : 190}
          r="7"
          fill="var(--color-ink)"
          stroke="white"
          strokeWidth="2"
        />
        <text
          x={userAtCenter ? 168 : 200}
          y={userAtCenter ? 138 : 208}
          textAnchor="middle"
          className="danger-map__you"
        >
          You
        </text>
      </svg>
      <p className="danger-map__caption">
        Live view · colored circles = active hazards · dark dot = your position
      </p>
    </section>
  )
}
