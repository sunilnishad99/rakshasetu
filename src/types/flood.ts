export type RiskLevel = 'safe' | 'watch' | 'danger'

export type HazardType = 'flood' | 'landslide' | 'earthquake' | 'fire' | 'storm'

export interface HazardEvent {
  id: string
  type: HazardType
  title: string
  location: string
  severity: RiskLevel
  distanceKm: number
  detail: string
  updatedAt: string
}

export interface RiverGauge {
  id: string
  riverName: string
  location: string
  /** Current water level in metres */
  currentLevel: number
  /** Level at which the river is considered in danger, in metres */
  dangerLevel: number
  /** Level at which residents should be on watch, in metres */
  warningLevel: number
  trend: 'rising' | 'steady' | 'falling'
  lastUpdated: string
}

export interface Shelter {
  id: string
  name: string
  distanceKm: number
  capacityStatus: 'available' | 'filling' | 'full'
  address: string
  lat: number
  lng: number
}

export interface UserPosition {
  lat: number
  lng: number
  distanceToRiverKm: number
}

export interface AlertContact {
  label: string
  phone: string
}
