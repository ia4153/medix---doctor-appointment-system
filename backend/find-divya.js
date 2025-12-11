const pool = require('./src/db');

async function test() {
  try {
    const result = await pool.query('SELECT id, name FROM doctors WHERE name LIKE $1', ['%Divya%']);
    console.log('Divya:', JSON.stringify(result.rows, null, 2));
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

test();
