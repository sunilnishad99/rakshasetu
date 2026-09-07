import { useCallback, useEffect, useMemo, useState } from 'react'
import type { RiskLevel, UserPosition, HazardEvent } from '../types/flood'
import { RIVER_REFERENCE_POINT, hazardEvents } from '../data/mockData'

function haversineDistanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export function riskFromDistance(distanceKm: number): RiskLevel {
  if (distanceKm <= 3) return 'danger'
  if (distanceKm <= 8) return 'watch'
  return 'safe'
}

interface UseFloodRiskResult {
  status: 'idle' | 'locating' | 'granted' | 'denied' | 'unsupported'
  position: UserPosition | null
  /** Risk driven purely by live/simulated GPS distance to the flood reference point. */
  riskLevel: RiskLevel
  requestLocation: () => void
  /** Lets the demo simulate a nearby danger reading without real GPS. */
  simulateNearbyDanger: () => void
  resetToActualLocation: () => void
  /** All active hazards (flood, landslide, earthquake, fire, storm) sorted by urgency. */
  hazards: HazardEvent[]
  /** The single most urgent hazard across every type, used for the top-level status banner. */
  topHazard: HazardEvent
  /** Overall risk considering every hazard type, not just flood. */
  overallRiskLevel: RiskLevel
}

const severityWeight: Record<RiskLevel, number> = { danger: 2, watch: 1, safe: 0 }

const FALLBACK_SAFE_POSITION: UserPosition = {
  lat: RIVER_REFERENCE_POINT.lat + 0.5,
  lng: RIVER_REFERENCE_POINT.lng + 0.5,
  distanceToRiverKm: 62,
}

export function useFloodRisk(): UseFloodRiskResult {
  const [status, setStatus] = useState<UseFloodRiskResult['status']>('idle')
  const [position, setPosition] = useState<UserPosition | null>(null)
  const [simulated, setSimulated] = useState(false)

  const requestLocation = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setStatus('unsupported')
      setPosition(FALLBACK_SAFE_POSITION)
      return
    }
    setStatus('locating')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const distanceToRiverKm = haversineDistanceKm(
          pos.coords.latitude,
          pos.coords.longitude,
          RIVER_REFERENCE_POINT.lat,
          RIVER_REFERENCE_POINT.lng,
        )
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          distanceToRiverKm,
        })
        setStatus('granted')
        setSimulated(false)
      },
      () => {
        setStatus('denied')
        setPosition(FALLBACK_SAFE_POSITION)
      },
      { enableHighAccuracy: true, timeout: 8000 },
    )
  }, [])

  const simulateNearbyDanger = useCallback(() => {
    setSimulated(true)
    setStatus('granted')
    setPosition({
      lat: RIVER_REFERENCE_POINT.lat + 0.01,
      lng: RIVER_REFERENCE_POINT.lng + 0.01,
      distanceToRiverKm: 1.4,
    })
  }, [])

  const resetToActualLocation = useCallback(() => {
    setSimulated(false)
    requestLocation()
  }, [requestLocation])

  useEffect(() => {
    requestLocation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const riskLevel: RiskLevel = position
    ? riskFromDistance(position.distanceToRiverKm)
    : 'safe'

  const hazards = useMemo<HazardEvent[]>(() => {
    const liveFlood = hazardEvents.find((h) => h.id === 'hz-flood-trishuli')
    const rest = hazardEvents.filter((h) => h.id !== 'hz-flood-trishuli')
    const merged = liveFlood
      ? [
          {
            ...liveFlood,
            severity: riskLevel,
            distanceKm: position?.distanceToRiverKm ?? liveFlood.distanceKm,
            updatedAt: 'just now',
          },
          ...rest,
        ]
      : rest
    return [...merged].sort((a, b) => {
      const bySeverity = severityWeight[b.severity] - severityWeight[a.severity]
      if (bySeverity !== 0) return bySeverity
      return a.distanceKm - b.distanceKm
    })
  }, [riskLevel, position])

  const topHazard = hazards[0]
  const overallRiskLevel = topHazard?.severity ?? 'safe'

  return {
    status,
    position,
    riskLevel,
    requestLocation,
    simulateNearbyDanger,
    resetToActualLocation: simulated ? resetToActualLocation : requestLocation,
    hazards,
    topHazard,
    overallRiskLevel,
  }
}
