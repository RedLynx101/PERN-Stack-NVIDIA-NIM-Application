const express = require('express');
const app = express();
const chatRoutes = require('./routes/chatRoutes');
const nimRoutes = require('./routes/nimRoutes');
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

// Routes Debugging --------------------------------------
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// API Routes --------------------------------------------

// Use chatRoutes under /api
app.use('/api', chatRoutes);

// Use nimRoutes under /api
app.use('/api', nimRoutes);

// Error handling ----------------------------------------

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