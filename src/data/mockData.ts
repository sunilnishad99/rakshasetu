import type { RiverGauge, Shelter, AlertContact, HazardEvent } from '../types/flood'

// Reference point roughly near the Trishuli river basin, Nepal —
// used only to simulate "distance to river" for the demo.
export const RIVER_REFERENCE_POINT = {
  lat: 27.9581,
  lng: 84.9350,
}

export const riverGauges: RiverGauge[] = [
  {
    id: 'trishuli',
    riverName: 'Trishuli River',
    location: 'Bidur, Nuwakot',
    currentLevel: 8.7,
    dangerLevel: 9.0,
    warningLevel: 8.0,
    trend: 'rising',
    lastUpdated: '2 min ago',
  },
  {
    id: 'bagmati',
    riverName: 'Bagmati River',
    location: 'Sundarighat, Kathmandu',
    currentLevel: 5.4,
    dangerLevel: 7.5,
    warningLevel: 6.0,
    trend: 'steady',
    lastUpdated: '4 min ago',
  },
  {
    id: 'melamchi',
    riverName: 'Melamchi River',
    location: 'Melamchi, Sindhupalchok',
    currentLevel: 4.1,
    dangerLevel: 6.5,
    warningLevel: 5.0,
    trend: 'falling',
    lastUpdated: '6 min ago',
  },
]

export const nearestShelters: Shelter[] = [
  {
    id: 'shelter-1',
    name: 'Bidur Municipal Ground Shelter',
    distanceKm: 1.2,
    capacityStatus: 'available',
    address: 'Bidur-4, Nuwakot',
    lat: 27.9481,
    lng: 85.0,
  },
  {
    id: 'shelter-2',
    name: 'Red Cross Community Hall',
    distanceKm: 2.6,
    capacityStatus: 'filling',
    address: 'Trishuli Bazaar',
    lat: 27.94,
    lng: 84.95,
  },
  {
    id: 'shelter-3',
    name: 'Higher Secondary School Shelter',
    distanceKm: 3.8,
    capacityStatus: 'available',
    address: 'Kabilas Rural Municipality',
    lat: 27.93,
    lng: 84.97,
  },
]

// Multi-hazard alerts: not limited to flooding — covers landslide, earthquake,
// fire, and storm advisories too, so the app is a general disaster early-warning
// tool rather than a single-hazard app.
export const hazardEvents: HazardEvent[] = [
  {
    id: 'hz-flood-trishuli',
    type: 'flood',
    title: 'River flood danger',
    location: 'Trishuli River, Bidur, Nuwakot',
    severity: 'danger',
    distanceKm: 1.4,
    detail: 'Water level has crossed the danger mark and continues to rise. Evacuate low-lying areas immediately.',
    updatedAt: '2 min ago',
  },
  {
    id: 'hz-landslide-sindhupalchok',
    type: 'landslide',
    title: 'Landslide risk — saturated slopes',
    location: 'Sindhupalchok hill roads',
    severity: 'watch',
    distanceKm: 6.2,
    detail: 'Continuous rainfall has saturated slopes along the highway. Avoid travel through cutting sections after dark.',
    updatedAt: '12 min ago',
  },
  {
    id: 'hz-earthquake-ktm',
    type: 'earthquake',
    title: 'Aftershock advisory',
    location: 'Kathmandu Valley',
    severity: 'watch',
    distanceKm: 41,
    detail: 'Minor aftershocks (M3–4) possible over the next 48 hours following recent seismic activity. Keep emergency kits accessible.',
    updatedAt: '25 min ago',
  },
  {
    id: 'hz-storm-ktm-valley',
    type: 'storm',
    title: 'Heavy rainfall warning',
    location: 'Kathmandu Valley & surrounding hills',
    severity: 'watch',
    distanceKm: 38,
    detail: 'Meteorological department forecasts continuous heavy rainfall for the next 24 hours, raising flood and landslide risk.',
    updatedAt: '30 min ago',
  },
  {
    id: 'hz-fire-chitwan',
    type: 'fire',
    title: 'Forest fire — contained',
    location: 'Chitwan buffer zone forest',
    severity: 'safe',
    distanceKm: 96,
    detail: 'A small forest fire reported earlier today has been contained by local fire crews. No further action needed.',
    updatedAt: '1 hr ago',
  },
]

export const emergencyContacts: AlertContact[] = [
  { label: 'Nepal Police (Emergency)', phone: '100' },
  { label: 'Nepal Red Cross Society', phone: '102' },
  { label: 'National Emergency Operation Center', phone: '1155' },
]
