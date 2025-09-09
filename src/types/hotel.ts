
export interface Hotel {
  id?: string
  type: 'hotel'
  hotelId?: number
  name: string
  status?: 'active' | 'inactive'
  city?: string
  district?: string
  pricePerNight?: number
  roomsAvailable?: number
  currency?: string
  rating?: number
  reviews?: number
  amenities?: string[]
  images?: string[]
  checkIn?: string
  checkOut?: string
  cancellationPolicy?: string
  contact?: { phone?: string; email?: string }
  location?: {
    city?: string
    district?: string
    address?: string
    coordinates?: { lat: number; lng: number }
  }
  _schemaVersion?: number
  _meta?: { source?: string; generatedAt?: string }
}
