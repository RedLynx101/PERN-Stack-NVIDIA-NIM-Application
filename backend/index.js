const express = require('express');
const app = express();

// Load .env file
require('dotenv').config();

// Connect to Postgres database
const { Pool } = require('pg');
const pool = new Pool({
    user: 'your_username',
    password: 'your_password',
    host: 'localhost',
    port: 5432,
    database: 'your_database_name'
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

app.listen(3000, () => {
    console.log('Server listening on port 3000');
    console.log(`My Name is ${process.env.MY_NAME}`)
    console.log('Press Ctrl+C to quit.');
    console.log('Test your server by visiting http://localhost:3000');
});