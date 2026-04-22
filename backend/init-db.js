const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:SDtccnxsDkleDsgZPZvMDJLvDDuPsDbe@postgres.railway.internal:5432/railway',
});

async function setup() {
  try {
    console.log('Connecting to database...');

    // Drop and recreate schema
    await pool.query('DROP SCHEMA IF EXISTS public CASCADE;');
    console.log('✓ Dropped old schema');

    await pool.query('CREATE SCHEMA public;');
    console.log('✓ Created public schema');

    // Read and execute schema.sql
    const fs = require('fs');
    const schema = fs.readFileSync(__dirname + '/schema.sql', 'utf8');

    await pool.query(schema);
    console.log('✓ Loaded schema (users, words, user_progress, exercise_results)');
    console.log('✓ Inserted 21 French words');

    await pool.end();
    console.log('✓ Database initialized successfully!');
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

setup();
