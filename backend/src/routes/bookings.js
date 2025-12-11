const express = require('express');
const pool = require('../db');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const client = await pool.connect();
  try {
    const { slotId, userName } = req.body;
    if (!slotId || !userName) {
      return res
        .status(400)
        .json({ error: 'slotId and userName are required' });
    }

    await client.query('BEGIN');

    const slotResult = await client.query(
      'SELECT * FROM slots WHERE id = $1 FOR UPDATE',
      [slotId],
    );

    if (slotResult.rowCount === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Slot not found' });
    }

    const slot = slotResult.rows[0];

    const countResult = await client.query(
      `
        SELECT COUNT(*) AS booking_count
        FROM bookings
        WHERE slot_id = $1 AND status IN ('PENDING','CONFIRMED')
      `,
      [slotId],
    );

    const currentCount = Number(countResult.rows[0].booking_count);
    const status = currentCount >= slot.capacity ? 'FAILED' : 'CONFIRMED';

    const bookingResult = await client.query(
      `
        INSERT INTO bookings (slot_id, user_name, status)
        VALUES ($1, $2, $3)
        RETURNING *
      `,
      [slotId, userName, status],
    );

    await client.query('COMMIT');

    const booking = bookingResult.rows[0];
    if (status === 'FAILED') {
      return res
        .status(409)
        .json({ error: 'Slot is already full', booking });
    }

    return res.status(201).json(booking);
  } catch (err) {
    await client.query('ROLLBACK');
    next(err);
  } finally {
    client.release();
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM bookings WHERE id = $1', [
      req.params.id,
    ]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

