const pool = require('./src/db');

async function test() {
  try {
    const result = await pool.query(
      `SELECT s.*, s.capacity - COALESCE(SUM(CASE WHEN b.status IN ('PENDING','CONFIRMED') THEN 1 ELSE 0 END), 0) AS available 
       FROM slots s 
       LEFT JOIN bookings b ON b.slot_id = s.id 
       GROUP BY s.id 
       ORDER BY s.start_ts ASC 
       LIMIT 5`
    );
    console.log('Sample slots:', JSON.stringify(result.rows, null, 2));
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

test();
