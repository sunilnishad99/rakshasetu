import type { HazardEvent } from '../types/flood'
import { HazardCard } from '../components/HazardCard'
import { ActionButtons } from '../components/ActionButtons'
import { emergencyContacts, nearestShelters } from '../data/mockData'

interface AlertsViewProps {
  hazards: HazardEvent[]
}

export function AlertsView({ hazards }: AlertsViewProps) {
  const active = hazards.filter((h) => h.severity !== 'safe')
  const resolved = hazards.filter((h) => h.severity === 'safe')

  return (
    <div className="alerts-view">
      <ActionButtons primaryContact={emergencyContacts[0]} nearestShelter={nearestShelters[0]} />

      <section>
        <h3 className="section-heading">Active alerts ({active.length})</h3>
        {active.length === 0 ? (
          <p className="alerts-view__empty">No active alerts right now. Stay prepared anyway.</p>
        ) : (
          <ul className="hazard-grid hazard-grid--detailed">
            {active.map((hazard) => (
              <HazardCard key={hazard.id} hazard={hazard} variant="detailed" />
            ))}
          </ul>
        )}
      </section>

      {resolved.length > 0 && (
        <section>
          <h3 className="section-heading">Resolved / low risk</h3>
          <ul className="hazard-grid hazard-grid--detailed">
            {resolved.map((hazard) => (
              <HazardCard key={hazard.id} hazard={hazard} variant="detailed" />
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
