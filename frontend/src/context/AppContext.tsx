import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { api } from '../api'
import type { Booking, Doctor, Slot } from '../types'

type AppContextValue = {
  doctors: Doctor[]
  slots: Slot[]
  loading: boolean
  booking?: Booking
  error?: string
  refreshDoctors: () => Promise<void>
  refreshSlots: (doctorId?: string, availableOnly?: boolean) => Promise<void>
  createDoctor: (payload: { name: string; specialty: string }) => Promise<void>
  createSlot: (payload: {
    doctorId: number
    startTs: string
    endTs: string
    capacity?: number
  }) => Promise<void>
  bookSlot: (payload: { slotId: number; userName: string }) => Promise<void>
  clearBooking: () => void
  clearError: () => void
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [slots, setSlots] = useState<Slot[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()
  const [booking, setBooking] = useState<Booking>()

  const handleError = useCallback((err: unknown) => {
    const message = err instanceof Error ? err.message : 'Something went wrong'
    setError(message)
  }, [])

  const refreshDoctors = useCallback(async () => {
    setLoading(true)
    setError(undefined)
    try {
      const result = await api.listDoctors()
      setDoctors(result)
    } catch (err) {
      handleError(err)
    } finally {
      setLoading(false)
    }
  }, [handleError])

  const refreshSlots = useCallback(
    async (doctorId?: string, availableOnly?: boolean) => {
      setLoading(true)
      setError(undefined)
      try {
        const result = await api.listSlots({ doctorId, availableOnly })
        setSlots(result)
      } catch (err) {
        handleError(err)
      } finally {
        setLoading(false)
      }
    },
    [handleError],
  )

  const createDoctor = useCallback(
    async (payload: { name: string; specialty: string }) => {
      setLoading(true)
      setError(undefined)
      try {
        await api.createDoctor(payload)
        await refreshDoctors()
      } catch (err) {
        handleError(err)
      } finally {
        setLoading(false)
      }
    },
    [handleError, refreshDoctors],
  )

  const createSlot = useCallback(
    async (payload: {
      doctorId: number
      startTs: string
      endTs: string
      capacity?: number
    }) => {
      setLoading(true)
      setError(undefined)
      try {
        await api.createSlot(payload)
        await refreshSlots(payload.doctorId.toString())
      } catch (err) {
        handleError(err)
      } finally {
        setLoading(false)
      }
    },
    [handleError, refreshSlots],
  )

  const bookSlot = useCallback(
    async (payload: { slotId: number; userName: string }) => {
      setLoading(true)
      setError(undefined)
      try {
        const result = await api.bookSlot(payload)
        setBooking(result)
      } catch (err) {
        handleError(err)
      } finally {
        setLoading(false)
      }
    },
    [handleError],
  )

  const clearBooking = () => setBooking(undefined)
  const clearError = () => setError(undefined)

  useEffect(() => {
    refreshDoctors()
  }, [refreshDoctors])

  const value = useMemo(
    () => ({
      doctors,
      slots,
      loading,
      booking,
      error,
      refreshDoctors,
      refreshSlots,
      createDoctor,
      createSlot,
      bookSlot,
      clearBooking,
      clearError,
    }),
    [
      booking,
      clearError,
      doctors,
      error,
      loading,
      refreshDoctors,
      refreshSlots,
      slots,
      createDoctor,
      createSlot,
      bookSlot,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

