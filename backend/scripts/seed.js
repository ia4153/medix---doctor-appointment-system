const dotenv = require('dotenv');
const pool = require('../src/db');

dotenv.config();

const indianCities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 
  'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur',
  'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Patna',
  'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad',
  'Meerut', 'Rajkot', 'Varanasi', 'Srinagar', 'Amritsar', 'Chandigarh'
];

const hospitals = [
  'Apollo Hospitals', 'Fortis Healthcare', 'AIIMS', 'Narayana Health',
  'Max Healthcare', 'Manipal Hospitals', 'Medanta', 'Tata Memorial Hospital',
  'Kokilaben Hospital', 'Lilavati Hospital', 'Wockhardt Hospitals',
  'Columbia Asia', 'Global Hospitals', 'Care Hospitals', 'Yashoda Hospitals'
];

const doctorNames = [
  'Dr. Rajesh Kumar', 'Dr. Priya Sharma', 'Dr. Amit Patel', 'Dr. Anjali Singh',
  'Dr. Vikram Reddy', 'Dr. Meera Nair', 'Dr. Arjun Desai', 'Dr. Kavita Joshi',
  'Dr. Rohan Malhotra', 'Dr. Sneha Iyer', 'Dr. Karan Mehta', 'Dr. Divya Rao',
  'Dr. Sameer Khan', 'Dr. Neha Agarwal', 'Dr. Rohit Verma', 'Dr. Shreya Gupta',
  'Dr. Aditya Shah', 'Dr. Pooja Menon', 'Dr. Varun Kapoor', 'Dr. Ananya Das'
];

const specialties = [
  'Cardiology', 'Dermatology', 'Pediatrics', 'Orthopedics', 'Neurology',
  'ENT', 'Family Medicine', 'Gynecology', 'Oncology', 'Psychiatry',
  'Gastroenterology', 'Urology', 'Ophthalmology', 'Endocrinology', 'Pulmonology'
];

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const doctors = [
  { name: 'Dr. Rajesh Kumar', specialty: 'Cardiology', location: 'Mumbai', hospital: 'Apollo Hospitals', experienceYears: 12 },
  { name: 'Dr. Priya Sharma', specialty: 'Dermatology', location: 'Delhi', hospital: 'Fortis Healthcare', experienceYears: 8 },
  { name: 'Dr. Amit Patel', specialty: 'Pediatrics', location: 'Bangalore', hospital: 'Narayana Health', experienceYears: 15 },
  { name: 'Dr. Anjali Singh', specialty: 'Orthopedics', location: 'Hyderabad', hospital: 'AIIMS', experienceYears: 10 },
  { name: 'Dr. Vikram Reddy', specialty: 'Neurology', location: 'Chennai', hospital: 'Max Healthcare', experienceYears: 18 },
  { name: 'Dr. Meera Nair', specialty: 'ENT', location: 'Kolkata', hospital: 'Manipal Hospitals', experienceYears: 9 },
  { name: 'Dr. Arjun Desai', specialty: 'Family Medicine', location: 'Pune', hospital: 'Medanta', experienceYears: 11 },
  { name: 'Dr. Kavita Joshi', specialty: 'Cardiology', location: 'Ahmedabad', hospital: 'Apollo Hospitals', experienceYears: 14 },
  { name: 'Dr. Rohan Malhotra', specialty: 'Dermatology', location: 'Jaipur', hospital: 'Fortis Healthcare', experienceYears: 7 },
  { name: 'Dr. Sneha Iyer', specialty: 'Pediatrics', location: 'Surat', hospital: 'Narayana Health', experienceYears: 13 },
  { name: 'Dr. Karan Mehta', specialty: 'Orthopedics', location: 'Lucknow', hospital: 'AIIMS', experienceYears: 16 },
  { name: 'Dr. Divya Rao', specialty: 'Neurology', location: 'Kanpur', hospital: 'Max Healthcare', experienceYears: 10 },
];

const slots = [
  // Dr. Rajesh Kumar (Cardiology) - Mumbai
  { doctorName: 'Dr. Rajesh Kumar', start: '2026-01-15T10:00:00Z', end: '2026-01-15T10:30:00Z' },
  { doctorName: 'Dr. Rajesh Kumar', start: '2026-01-15T11:00:00Z', end: '2026-01-15T11:30:00Z' },
  { doctorName: 'Dr. Rajesh Kumar', start: '2026-01-16T09:00:00Z', end: '2026-01-16T09:30:00Z' },
  { doctorName: 'Dr. Rajesh Kumar', start: '2026-01-16T14:00:00Z', end: '2026-01-16T14:30:00Z' },
  { doctorName: 'Dr. Rajesh Kumar', start: '2026-01-17T10:30:00Z', end: '2026-01-17T11:00:00Z' },

  // Dr. Priya Sharma (Dermatology) - Delhi
  { doctorName: 'Dr. Priya Sharma', start: '2026-01-15T15:00:00Z', end: '2026-01-15T15:30:00Z' },
  { doctorName: 'Dr. Priya Sharma', start: '2026-01-15T16:00:00Z', end: '2026-01-15T16:30:00Z' },
  { doctorName: 'Dr. Priya Sharma', start: '2026-01-16T11:00:00Z', end: '2026-01-16T11:30:00Z' },
  { doctorName: 'Dr. Priya Sharma', start: '2026-01-17T15:30:00Z', end: '2026-01-17T16:00:00Z' },

  // Dr. Amit Patel (Pediatrics) - Bangalore
  { doctorName: 'Dr. Amit Patel', start: '2026-01-15T09:00:00Z', end: '2026-01-15T09:30:00Z' },
  { doctorName: 'Dr. Amit Patel', start: '2026-01-15T13:00:00Z', end: '2026-01-15T13:30:00Z' },
  { doctorName: 'Dr. Amit Patel', start: '2026-01-16T10:00:00Z', end: '2026-01-16T10:30:00Z' },
  { doctorName: 'Dr. Amit Patel', start: '2026-01-16T15:00:00Z', end: '2026-01-16T15:30:00Z' },
  { doctorName: 'Dr. Amit Patel', start: '2026-01-17T09:30:00Z', end: '2026-01-17T10:00:00Z' },

  // Dr. Anjali Singh (Orthopedics) - Hyderabad
  { doctorName: 'Dr. Anjali Singh', start: '2026-01-15T14:00:00Z', end: '2026-01-15T14:30:00Z' },
  { doctorName: 'Dr. Anjali Singh', start: '2026-01-16T13:00:00Z', end: '2026-01-16T13:30:00Z' },
  { doctorName: 'Dr. Anjali Singh', start: '2026-01-17T11:00:00Z', end: '2026-01-17T11:30:00Z' },

  // Dr. Vikram Reddy (Neurology) - Chennai
  { doctorName: 'Dr. Vikram Reddy', start: '2026-01-15T11:30:00Z', end: '2026-01-15T12:00:00Z' },
  { doctorName: 'Dr. Vikram Reddy', start: '2026-01-16T16:00:00Z', end: '2026-01-16T16:30:00Z' },
  { doctorName: 'Dr. Vikram Reddy', start: '2026-01-17T14:00:00Z', end: '2026-01-17T14:30:00Z' },

  // Dr. Meera Nair (ENT) - Kolkata
  { doctorName: 'Dr. Meera Nair', start: '2026-01-15T10:00:00Z', end: '2026-01-15T10:30:00Z' },
  { doctorName: 'Dr. Meera Nair', start: '2026-01-16T12:00:00Z', end: '2026-01-16T12:30:00Z' },
  { doctorName: 'Dr. Meera Nair', start: '2026-01-17T13:00:00Z', end: '2026-01-17T13:30:00Z' },

  // Dr. Arjun Desai (Family Medicine) - Pune
  { doctorName: 'Dr. Arjun Desai', start: '2026-01-15T08:00:00Z', end: '2026-01-15T08:30:00Z' },
  { doctorName: 'Dr. Arjun Desai', start: '2026-01-15T12:00:00Z', end: '2026-01-15T12:30:00Z' },
  { doctorName: 'Dr. Arjun Desai', start: '2026-01-16T08:30:00Z', end: '2026-01-16T09:00:00Z' },
  { doctorName: 'Dr. Arjun Desai', start: '2026-01-17T10:00:00Z', end: '2026-01-17T10:30:00Z' },

  // Dr. Kavita Joshi (Cardiology) - Ahmedabad
  { doctorName: 'Dr. Kavita Joshi', start: '2026-01-15T09:30:00Z', end: '2026-01-15T10:00:00Z' },
  { doctorName: 'Dr. Kavita Joshi', start: '2026-01-16T11:30:00Z', end: '2026-01-16T12:00:00Z' },
  { doctorName: 'Dr. Kavita Joshi', start: '2026-01-17T09:00:00Z', end: '2026-01-17T09:30:00Z' },
  { doctorName: 'Dr. Kavita Joshi', start: '2026-01-17T14:30:00Z', end: '2026-01-17T15:00:00Z' },

  // Dr. Rohan Malhotra (Dermatology) - Jaipur
  { doctorName: 'Dr. Rohan Malhotra', start: '2026-01-15T13:00:00Z', end: '2026-01-15T13:30:00Z' },
  { doctorName: 'Dr. Rohan Malhotra', start: '2026-01-16T14:00:00Z', end: '2026-01-16T14:30:00Z' },
  { doctorName: 'Dr. Rohan Malhotra', start: '2026-01-17T10:30:00Z', end: '2026-01-17T11:00:00Z' },

  // Dr. Sneha Iyer (Pediatrics) - Surat
  { doctorName: 'Dr. Sneha Iyer', start: '2026-01-15T14:30:00Z', end: '2026-01-15T15:00:00Z' },
  { doctorName: 'Dr. Sneha Iyer', start: '2026-01-16T09:30:00Z', end: '2026-01-16T10:00:00Z' },
  { doctorName: 'Dr. Sneha Iyer', start: '2026-01-17T13:00:00Z', end: '2026-01-17T13:30:00Z' },
  { doctorName: 'Dr. Sneha Iyer', start: '2026-01-17T15:30:00Z', end: '2026-01-17T16:00:00Z' },

  // Dr. Karan Mehta (Orthopedics) - Lucknow
  { doctorName: 'Dr. Karan Mehta', start: '2026-01-15T11:00:00Z', end: '2026-01-15T11:30:00Z' },
  { doctorName: 'Dr. Karan Mehta', start: '2026-01-16T15:30:00Z', end: '2026-01-16T16:00:00Z' },
  { doctorName: 'Dr. Karan Mehta', start: '2026-01-17T12:00:00Z', end: '2026-01-17T12:30:00Z' },

  // Dr. Divya Rao (Neurology) - Kanpur
  { doctorName: 'Dr. Divya Rao', start: '2026-01-15T16:00:00Z', end: '2026-01-15T16:30:00Z' },
  { doctorName: 'Dr. Divya Rao', start: '2026-01-16T13:30:00Z', end: '2026-01-16T14:00:00Z' },
  { doctorName: 'Dr. Divya Rao', start: '2026-01-17T11:30:00Z', end: '2026-01-17T12:00:00Z' },
  { doctorName: 'Dr. Divya Rao', start: '2026-01-17T16:00:00Z', end: '2026-01-17T16:30:00Z' },
];

async function seed() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const doctorIds = new Map();

    for (const doc of doctors) {
      const existing = await client.query(
        'SELECT id FROM doctors WHERE name = $1 LIMIT 1',
        [doc.name],
      );
      if (existing.rowCount > 0) {
        doctorIds.set(doc.name, existing.rows[0].id);
        // Update existing doctor with new fields
        await client.query(
          `UPDATE doctors 
           SET location = $1, hospital = $2, experience_years = $3
           WHERE id = $4`,
          [doc.location, doc.hospital, doc.experienceYears, existing.rows[0].id],
        );
        continue;
      }

      const inserted = await client.query(
        `INSERT INTO doctors (name, specialty, location, hospital, experience_years) 
         VALUES ($1, $2, $3, $4, $5) RETURNING id`,
        [doc.name, doc.specialty, doc.location, doc.hospital, doc.experienceYears],
      );
      doctorIds.set(doc.name, inserted.rows[0].id);
    }

    for (const slot of slots) {
      const docId = doctorIds.get(slot.doctorName);
      if (!docId) continue;
      const exists = await client.query(
        `SELECT id FROM slots
         WHERE doctor_id = $1 AND start_ts = $2 AND end_ts = $3
         LIMIT 1`,
        [docId, slot.start, slot.end],
      );
      if (exists.rowCount === 0) {
        await client.query(
          `INSERT INTO slots (doctor_id, start_ts, end_ts, capacity)
           VALUES ($1, $2, $3, 1)`,
          [docId, slot.start, slot.end],
        );
      }
    }

    await client.query('COMMIT');
    console.log(
      `Seeded ${doctorIds.size} doctors and ${slots.length} slots (skipping any existing)`,
    );
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Seed failed', err);
  } finally {
    client.release();
    process.exit();
  }
}

seed();
