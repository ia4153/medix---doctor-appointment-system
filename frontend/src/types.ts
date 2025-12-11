export type Doctor = {
  id: number
  name: string
  specialty: string
  location?: string
  hospital?: string
  experienceYears?: number
}

export type Slot = {
  id: number
  doctor_id: number
  start_ts: string
  end_ts: string
  capacity: number
  available: number
}

export type Booking = {
  id: number
  slot_id: number
  user_name: string
  status: 'PENDING' | 'CONFIRMED' | 'FAILED'
  created_at: string
}

