import React, { useState } from "react";
import type { FormEvent } from "react";
import { useApp } from '../context/AppContext'
import type { Doctor } from '../types'

export function AdminPage() {
  const {
    doctors,
    slots,
    refreshSlots,
    createDoctor,
    createSlot,
    refreshDoctors,
  } = useApp()
  const [doctorForm, setDoctorForm] = useState({ name: '', specialty: '' })
  const [slotForm, setSlotForm] = useState({
    doctorId: '',
    startTs: '',
    endTs: '',
    capacity: 1,
  })

  useEffect(() => {
    refreshSlots()
  }, [refreshSlots])

  const handleDoctorSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!doctorForm.name || !doctorForm.specialty) return
    await createDoctor({
      name: doctorForm.name,
      specialty: doctorForm.specialty,
    })
    setDoctorForm({ name: '', specialty: '' })
    await refreshDoctors()
  }

  const handleSlotSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!slotForm.doctorId || !slotForm.startTs || !slotForm.endTs) return
    await createSlot({
      doctorId: Number(slotForm.doctorId),
      startTs: slotForm.startTs,
      endTs: slotForm.endTs,
      capacity: slotForm.capacity,
    })
    setSlotForm({ doctorId: '', startTs: '', endTs: '', capacity: 1 })
  }

  const doctorOptions = doctors.length ? (
    doctors.map((doc: Doctor) => (
      <option key={doc.id} value={doc.id}>
        {doc.name} — {doc.specialty}
      </option>
    ))
  ) : (
    <option value="">No doctors yet</option>
  )

  return (
    <div className="stack">
      <section className="card">
        <h2>Create Doctor</h2>
        <form className="form" onSubmit={handleDoctorSubmit}>
          <label>
            Name
            <input
              value={doctorForm.name}
              onChange={(e) =>
                setDoctorForm((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </label>
          <label>
            Specialty
            <input
              value={doctorForm.specialty}
              onChange={(e) =>
                setDoctorForm((prev) => ({
                  ...prev,
                  specialty: e.target.value,
                }))
              }
              required
            />
          </label>
          <button type="submit">Create</button>
        </form>
      </section>

      <section className="card">
        <h2>Create Slot</h2>
        <form className="form" onSubmit={handleSlotSubmit}>
          <label>
            Doctor
            <select
              value={slotForm.doctorId}
              onChange={(e) =>
                setSlotForm((prev) => ({ ...prev, doctorId: e.target.value }))
              }
              required
            >
              <option value="">Select doctor</option>
              {doctorOptions}
            </select>
          </label>
          <label>
            Start time
            <input
              type="datetime-local"
              value={slotForm.startTs}
              onChange={(e) =>
                setSlotForm((prev) => ({ ...prev, startTs: e.target.value }))
              }
              required
            />
          </label>
          <label>
            End time
            <input
              type="datetime-local"
              value={slotForm.endTs}
              onChange={(e) =>
                setSlotForm((prev) => ({ ...prev, endTs: e.target.value }))
              }
              required
            />
          </label>
          <label>
            Capacity
            <input
              type="number"
              min={1}
              value={slotForm.capacity}
              onChange={(e) =>
                setSlotForm((prev) => ({
                  ...prev,
                  capacity: Number(e.target.value),
                }))
              }
            />
          </label>
          <button type="submit">Create slot</button>
        </form>
      </section>

      <section className="card">
        <h2>Doctors</h2>
        {!doctors.length ? (
          <p>No doctors yet.</p>
        ) : (
          <ul className="list">
            {doctors.map((doc) => (
              <li key={doc.id}>
                <div>{doc.name}</div>
                <div className="muted">{doc.specialty}</div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="card">
        <h2>Slots</h2>
        {!slots.length ? (
          <p>No slots yet.</p>
        ) : (
          <ul className="list">
            {slots.map((slot) => (
              <li key={slot.id}>
                <div>
                  Doctor #{slot.doctor_id} —{' '}
                  {new Date(slot.start_ts).toLocaleString()} to{' '}
                  {new Date(slot.end_ts).toLocaleString()}
                </div>
                <div className="muted">
                  Capacity {slot.capacity} | Available {slot.available}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

