import type { Shelter } from '../types/flood'

interface ShelterListProps {
  shelters: Shelter[]
}

const statusCopy: Record<Shelter['capacityStatus'], string> = {
  available: 'Space available',
  filling: 'Filling up',
  full: 'Full',
}

export function ShelterList({ shelters }: ShelterListProps) {
  return (
    <section className="shelter-list">
      <h3>Nearest shelters</h3>
      <ul>
        {shelters.map((shelter) => (
          <li key={shelter.id} className="shelter-list__item">
            <div>
              <p className="shelter-list__name">{shelter.name}</p>
              <p className="shelter-list__address">{shelter.address}</p>
            </div>
            <div className="shelter-list__meta">
              <span className="shelter-list__distance">{shelter.distanceKm.toFixed(1)} km</span>
              <span className={`shelter-list__status shelter-list__status--${shelter.capacityStatus}`}>
                {statusCopy[shelter.capacityStatus]}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
