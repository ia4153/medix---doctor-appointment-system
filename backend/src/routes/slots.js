const express = require('express');
const pool = require('../db');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { doctorId, startTs, endTs, capacity = 1 } = req.body;
    if (!doctorId || !startTs || !endTs) {
      return res
        .status(400)
        .json({ error: 'doctorId, startTs and endTs are required' });
    }
    if (Number.isNaN(Number(capacity)) || Number(capacity) < 1) {
      return res.status(400).json({ error: 'capacity must be >= 1' });
    }
    if (new Date(startTs) >= new Date(endTs)) {
      return res.status(400).json({ error: 'endTs must be after startTs' });
    }

    const result = await pool.query(
      `
        INSERT INTO slots (doctor_id, start_ts, end_ts, capacity)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `,
      [doctorId, startTs, endTs, capacity],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const { doctorId, availableOnly } = req.query;

    const filters = [];
    const values = [];

    if (doctorId) {
      values.push(doctorId);
      filters.push(`s.doctor_id = $${values.length}`);
    }

    const where = filters.length ? `WHERE ${filters.join(' AND ')}` : '';

    const query = `
      SELECT
        s.*,
        s.capacity - COALESCE(SUM(CASE WHEN b.status IN ('PENDING','CONFIRMED') THEN 1 ELSE 0 END), 0) AS available
      FROM slots s
      LEFT JOIN bookings b ON b.slot_id = s.id
      ${where}
      GROUP BY s.id
      ORDER BY s.start_ts ASC
    `;

    const result = await pool.query(query, values);
    const rows = availableOnly === 'true'
      ? result.rows.filter((row) => Number(row.available) > 0)
      : result.rows;
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

