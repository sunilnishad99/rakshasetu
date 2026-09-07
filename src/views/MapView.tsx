import { useState } from 'react'
import type { HazardEvent, HazardType, RiskLevel } from '../types/flood'
import { DangerMap } from '../components/DangerMap'
import { ShelterList } from '../components/ShelterList'
import { hazardLabels } from '../utils/hazardMeta'
import { nearestShelters } from '../data/mockData'

interface MapViewProps {
  hazards: HazardEvent[]
  overallRiskLevel: RiskLevel
}

const allTypes: HazardType[] = ['flood', 'landslide', 'earthquake', 'fire', 'storm']

export function MapView({ hazards, overallRiskLevel }: MapViewProps) {
  const [activeFilters, setActiveFilters] = useState<Set<HazardType>>(new Set(allTypes))

  function toggleFilter(type: HazardType) {
    setActiveFilters((prev) => {
      const next = new Set(prev)
      if (next.has(type)) next.delete(type)
      else next.add(type)
      return next
    })
  }

  const filteredHazards = hazards.filter((h) => activeFilters.has(h.type))

  return (
    <div className="map-view">
      <div className="map-view__filters">
        {allTypes.map((type) => (
          <button
            key={type}
            type="button"
            className={`map-view__filter ${activeFilters.has(type) ? 'is-active' : ''}`}
            onClick={() => toggleFilter(type)}
          >
            {hazardLabels[type]}
          </button>
        ))}
      </div>

      <div className="map-view__body">
        <DangerMap riskLevel={overallRiskLevel} hazards={filteredHazards} />
        <ShelterList shelters={nearestShelters} />
      </div>
    </div>
  )
}
