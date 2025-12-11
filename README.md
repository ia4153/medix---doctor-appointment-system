# Doctor Appointment Booking System

Full-stack doctor appointment system with PostgreSQL + Express backend and React + TypeScript frontend.

## Quickstart

Prereqs: Node 18+, npm, PostgreSQL running locally.

### Backend

1. `cd backend`
2. Copy env: `cp env.sample .env` and update `DATABASE_URL`
3. Create DB & tables: `psql "$DATABASE_URL" -f sql/schema.sql`
   - If you have an existing DB, also run: `psql "$DATABASE_URL" -f sql/migrate_add_doctor_fields.sql`
4. Install deps: `npm install`
5. Seed sample doctors: `npm run seed` (optional but recommended - includes 12 doctors with Indian cities, hospitals, and experience years)
6. Start dev server: `npm run dev` (default port `4000`)

### Frontend

1. `cd frontend`
2. Copy env: `cp env.sample .env` and set `VITE_API_BASE` to backend URL
3. Install deps: `npm install`
4. Run dev server: `npm run dev` (default Vite port `5173`)

## API Overview

- `POST /api/doctors` — create doctor `{ name, specialty }`
- `GET /api/doctors` — list doctors
- `POST /api/slots` — create slot `{ doctorId, startTs, endTs, capacity }`
- `GET /api/slots?doctorId=&availableOnly=true` — list slots (optionally filter)
- `POST /api/bookings` — book slot `{ slotId, userName }` with row-level lock to prevent double-booking
- `GET /api/bookings/:id` — check booking status

Postman collection: `backend/docs/postman_collection.json`.

## Concurrency Notes

- Booking uses a PostgreSQL transaction with `SELECT ... FOR UPDATE` on the slot row.
- Counts existing `PENDING`/`CONFIRMED` bookings inside the same transaction.
- If capacity is exceeded, booking is stored as `FAILED` and returns HTTP 409.
- Background job expires `PENDING` bookings older than 2 minutes.

## Frontend Routes

- `/` — User home, doctor list
- `/booking/:id` — Available slots for a doctor + booking form
- `/admin` — Admin dashboard (create doctor, create slot, list doctors/slots)

## Deployment

- Backend: ready for Render/Railway (set `DATABASE_URL`, `PORT` envs; run `npm start`)
- Frontend: deploy to Vercel/Netlify (set `VITE_API_BASE` env to deployed backend URL)

## Testing ideas

- Concurrent booking attempts on the same slot should yield one `CONFIRMED` and subsequent `FAILED`.
- Booking on a slot at capacity returns HTTP 409.
- PENDING bookings older than 2 minutes transition to FAILED automatically.

