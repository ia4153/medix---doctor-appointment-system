-- Migration: Add location, hospital, and experience_years to doctors table
-- Run this if you already have a database with the old schema

ALTER TABLE doctors 
ADD COLUMN IF NOT EXISTS location TEXT,
ADD COLUMN IF NOT EXISTS hospital TEXT,
ADD COLUMN IF NOT EXISTS experience_years INTEGER;


