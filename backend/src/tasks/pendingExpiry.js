const pool = require('../db');

const EXPIRY_MINUTES = 2;
const JOB_INTERVAL_MS = 60 * 1000;

async function expirePendingBookings() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await client.query(
      `
        UPDATE bookings
        SET status = 'FAILED'
        WHERE status = 'PENDING'
          AND created_at < NOW() - INTERVAL '${EXPIRY_MINUTES} minutes'
        RETURNING id
      `,
    );
    await client.query('COMMIT');
    if (result.rowCount > 0) {
      console.log(`Expired ${result.rowCount} pending booking(s)`);
    }
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Failed to expire pending bookings', err);
  } finally {
    client.release();
  }
}

function startPendingExpiryJob() {
  // Fire and forget; server shutdown will clear the interval.
  setInterval(expirePendingBookings, JOB_INTERVAL_MS);
}

module.exports = startPendingExpiryJob;


