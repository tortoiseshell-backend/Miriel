require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: DB_PORT
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to Postgres database', err);
  } else {
    console.log('Connected to Postgres database at', res.rows[0].now);
  }
});
