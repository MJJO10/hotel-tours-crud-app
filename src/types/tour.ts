
export interface Tour {
  id?: string
  type: 'tour'
  tourId?: string
  name: string
  city?: string
  description?: string
  meetPoint?: { lat: number; lng: number }
  serviceRadiusKm?: number
  category?: string[]
  tags?: string[]
  durationHours?: number
  startTimes?: string[]
  price?: number
  currency?: string
  rating?: number
  capacityPerSlot?: number
  operator?: { name?: string; phone?: string }
  _schemaVersion?: number
  _meta?: { source?: string; generatedAt?: string }
}
