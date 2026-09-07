import type { HazardEvent, RiskLevel } from '../types/flood'
import { AlertBanner } from '../components/AlertBanner'
import { DangerMap } from '../components/DangerMap'
import { ActionButtons } from '../components/ActionButtons'
import { RiverGaugeCard } from '../components/RiverGaugeCard'
import { HazardCard } from '../components/HazardCard'
import { riverGauges, nearestShelters, emergencyContacts } from '../data/mockData'
import type { ViewId } from '../components/AppNav'

interface HomeViewProps {
  topHazard: HazardEvent
  hazards: HazardEvent[]
  overallRiskLevel: RiskLevel
  status: 'idle' | 'locating' | 'granted' | 'denied' | 'unsupported'
  simulateNearbyDanger: () => void
  resetToActualLocation: () => void
  onNavigate: (view: ViewId) => void
}

export function HomeView({
  topHazard,
  hazards,
  overallRiskLevel,
  status,
  simulateNearbyDanger,
  resetToActualLocation,
  onNavigate,
}: HomeViewProps) {
  return (
    <div className="home-view">
      <div className="home-view__col home-view__col--main">
        <AlertBanner hazard={topHazard} />

        <button
          type="button"
          className="home-view__map-preview"
          onClick={() => onNavigate('map')}
          aria-label="Open full hazard map"
        >
          <DangerMap riskLevel={overallRiskLevel} hazards={hazards} compact />
          <span className="home-view__map-preview-cta">View full map →</span>
        </button>

        <ActionButtons primaryContact={emergencyContacts[0]} nearestShelter={nearestShelters[0]} />

        <div className="demo-controls">
          <p>Demo controls</p>
          <div className="demo-controls__buttons">
            <button type="button" onClick={simulateNearbyDanger}>
              Simulate nearby flood
            </button>
            <button type="button" onClick={resetToActualLocation}>
              Use my real location
            </button>
          </div>
          {status === 'denied' && (
            <p className="demo-controls__note">
              Location permission was denied, showing a safe default position instead.
            </p>
          )}
        </div>
      </div>

      <div className="home-view__col home-view__col--side">
        <section>
          <div className="home-view__section-head">
            <h3 className="section-heading">Active hazards</h3>
            <button type="button" className="home-view__see-all" onClick={() => onNavigate('alerts')}>
              See all →
            </button>
          </div>
          <ul className="hazard-grid">
            {hazards.slice(0, 4).map((hazard) => (
              <HazardCard key={hazard.id} hazard={hazard} />
            ))}
          </ul>
        </section>

        <section>
          <h3 className="section-heading">River levels</h3>
          <ul className="gauge-list">
            {riverGauges.map((gauge) => (
              <RiverGaugeCard key={gauge.id} gauge={gauge} />
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
