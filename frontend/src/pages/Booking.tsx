import { FormEvent, useEffect, useState } from 'react'
import type { FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import type { Slot } from '../types'

export function BookingPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    slots,
    booking,
    refreshSlots,
    bookSlot,
    clearBooking,
    doctors,
  } = useApp()
  const [userName, setUserName] = useState('')
  const [selectedSlot, setSelectedSlot] = useState<number>()

  useEffect(() => {
    if (!id) return
    refreshSlots(id, true)
  }, [id, refreshSlots])

  const handleBook = async (e: FormEvent) => {
    e.preventDefault()
    if (!selectedSlot || !userName) return
    await bookSlot({ slotId: selectedSlot, userName })
  }

  const doctor = doctors.find((d) => d.id === Number(id))
  const doctorNameById = new Map(doctors.map((d) => [d.id, d.name]))
  const slotsToShow = slots

  return (
    <div className="stack">
      <button className="link" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <section className="card">
        <h2>
          {doctor ? `Booking for ${doctor.name}` : 'Select a slot to book'}
        </h2>

        {!slotsToShow.length ? (
          <p>No available slots for this doctor.</p>
        ) : (
          <div className="slots">
            {slotsToShow.map((slot: Slot) => (
              <label key={slot.id} className="slot-card">
                <input
                  type="radio"
                  name="slot"
                  value={slot.id}
                  checked={selectedSlot === slot.id}
                  onChange={() => setSelectedSlot(slot.id)}
                />
                <div>
                  <div className="muted">
                    {doctorNameById.get(slot.doctor_id) ||
                      doctor?.name ||
                      `Doctor #${slot.doctor_id || id}`}
                  </div>
                  <div className="slot-time">
                    {new Date(slot.start_ts).toLocaleString()} -{' '}
                    {new Date(slot.end_ts).toLocaleString()}
                  </div>
                  <div className="muted">
                    Available: {slot.available} / Capacity: {slot.capacity}
                  </div>
                </div>
              </label>
            ))}
          </div>
        )}

        <form className="form" onSubmit={handleBook}>
          <label>
            Your name
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </label>
          <button type="submit" disabled={!selectedSlot || !slotsToShow.length}>
            Book appointment
          </button>
        </form>
      </section>

      {booking && (
        <section className="card success">
          <h3>Booking result</h3>
          <p>
            Status: <strong>{booking.status}</strong>
          </p>
          <p>Booking ID: {booking.id}</p>
          <div className="actions">
            <button onClick={clearBooking}>Close</button>
          </div>
        </section>
      )}
    </div>
  )
}

