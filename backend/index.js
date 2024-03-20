const express = require('express');
const app = express();

// Load dotenv
require('dotenv').config();

// Connect to Postgres database using knex
const knex = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.DB,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    }
});

// Test database connection
knex.raw('SELECT 1+1 AS result').then(() => {
    console.log('Database connected at time:', new Date());
}).catch((err) => {
    console.error('Database connection failed:', err);
});

// Routes and middleware here
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// API Routes --------------------------------------------
// Route to display a message under api/hello
app.get('/api/hello', (req, res) => {
    res.send('Hello, world! This is a message from "api/hello".');
});

// Route to query database using knex under api/Nims
app.get('/api/nims', async (req, res) => {
    try {
        knex.select('*').from('NIM').then(data => {
            console.log('api/nims data called at time:', new Date());
            res.json(data);
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error - Failed to query database using knex');
    }
});

// 404 handler
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
    console.log('Press Ctrl+C to quit.');
    console.log('Test your server by visiting http://localhost:3000');
});