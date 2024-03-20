const express = require('express');
const app = express();

// Load .env file
require('dotenv').config();

// Connect to Postgres database
const { Pool } = require('pg');
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME
});

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Connected to database:', res.rows[0].now);
    }
});

// Routes and middleware here
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
    console.log('Press Ctrl+C to quit.');
    console.log('Test your server by visiting http://localhost:3000');
});