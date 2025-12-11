const express = require('express');
const pool = require('../db');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { name, specialty } = req.body;
    if (!name || !specialty) {
      return res.status(400).json({ error: 'name and specialty are required' });
    }

    const result = await pool.query(
      'INSERT INTO doctors (name, specialty) VALUES ($1, $2) RETURNING *',
      [name, specialty],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT 
        id, 
        name, 
        specialty, 
        location, 
        hospital, 
        experience_years as "experienceYears"
       FROM doctors 
       ORDER BY id DESC`
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

