const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('error', (err) => {
  // Log and exit so we do not keep serving with a broken pool
  console.error('Unexpected PG pool error', err);
  process.exit(-1);
});

module.exports = pool;


