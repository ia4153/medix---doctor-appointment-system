const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:4000/api'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const message = await res.json().catch(() => ({}))
    throw new Error(message.error ?? 'Request failed')
  }
  return res.json() as Promise<T>
}

export const api = {
  listDoctors: () => request('/doctors'),
  createDoctor: (data: { name: string; specialty: string }) =>
    request('/doctors', { method: 'POST', body: JSON.stringify(data) }),
  listSlots: (params?: { doctorId?: string; availableOnly?: boolean }) => {
    const search = new URLSearchParams()
    if (params?.doctorId) search.set('doctorId', params.doctorId)
    if (params?.availableOnly) search.set('availableOnly', 'true')
    return request(`/slots?${search.toString()}`)
  },
  createSlot: (data: {
    doctorId: number
    startTs: string
    endTs: string
    capacity?: number
  }) => request('/slots', { method: 'POST', body: JSON.stringify(data) }),
  bookSlot: (data: { slotId: number; userName: string }) =>
    request('/bookings', { method: 'POST', body: JSON.stringify(data) }),
  getBooking: (id: number) => request(`/bookings/${id}`),
}


