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

// Middleware
app.use(express.json());

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
    console.log('api/nims data called at time:', new Date());
    try {
        knex.select('*').from('NIM').then(data => {
            res.json(data);
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error - Failed to query database using knex');
    }
});

// Route to generate inference from a model from NVIDIA
app.get('/api/nim/generate', async (req, res) => {
    console.log('api/nim/generate called at time:', new Date());
    try {
        // Code to generate inference from a model from NVIDIA
        res.send('Inference generated from a model from NVIDIA');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error - Failed to generate inference from a model from NVIDIA');
    }
});

// Route to create a new NIM
app.post('/api/create_nim', async (req, res) => {
    const newNim = req.body;

    console.log('api/create_nim called at time:', new Date());
    console.log('New NIM:', newNim);

    try {
        // Insert the new NIM without specifying the NIM_ID, assuming it's auto-generated
        await knex('NIM').insert(newNim);
        // Redirect to the homepage after successful creation
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error - Failed to create NIM');
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
app.listen(3001, () => {
    console.log('Server listening on port 3001');
    console.log('Press Ctrl+C to quit.');
    console.log('Test your server by visiting http://localhost:3001');
});