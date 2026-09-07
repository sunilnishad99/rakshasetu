import type { HazardType } from '../types/flood'

export const hazardLabels: Record<HazardType, string> = {
  flood: 'Flood',
  landslide: 'Landslide',
  earthquake: 'Earthquake',
  fire: 'Fire',
  storm: 'Storm',
}

export const hazardColorVar: Record<HazardType, string> = {
  flood: 'var(--color-river-500)',
  landslide: 'var(--color-warn-600)',
  earthquake: 'var(--color-danger-500)',
  fire: '#D9532B',
  storm: '#6E5AA8',
}

interface HazardIconProps {
  type: HazardType
  size?: number
}

export function HazardIcon({ type, size = 18 }: HazardIconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    'aria-hidden': true as const,
  }
  const stroke = hazardColorVar[type]

  switch (type) {
    case 'flood':
      return (
        <svg {...common}>
          <path
            d="M3 15c2 2 3-2 5 0s3-2 5 0 3-2 5 0 3-2 5 0"
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M3 19c2 2 3-2 5 0s3-2 5 0 3-2 5 0 3-2 5 0"
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
      )
    case 'landslide':
      return (
        <svg {...common}>
          <path d="M3 19l6-11 4 6 3-4 5 9z" fill={stroke} opacity="0.85" />
          <path d="M3 19h18" stroke={stroke} strokeWidth="1.5" />
        </svg>
      )
    case 'earthquake':
      return (
        <svg {...common}>
          <path
            d="M2 14h4l2-5 3 9 3-11 2 7h6"
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'fire':
      return (
        <svg {...common}>
          <path
            d="M12 2c1 3-2 4-2 7a3 3 0 006 0c1 2 2 3 2 5a6 6 0 11-12 0c0-3 2-4 3-7 0 2 1 3 2 3 0-3 0-6 1-8z"
            fill={stroke}
            opacity="0.85"
          />
        </svg>
      )
    case 'storm':
      return (
        <svg {...common}>
          <path
            d="M6 8a5 5 0 019.6-1.9A4.5 4.5 0 0119 15H7a4 4 0 01-1-7.9z"
            fill={stroke}
            opacity="0.8"
          />
          <path d="M9 18l-1 3M13 18l-1 3M17 18l-1 3" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    default:
      return null
  }
}
