const express = require('express');
const router = express.Router();
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

// API NIM Routes ----------------------------------------

// Route to display a message under api/hello
router.get('/hello', (req, res) => {
    res.send('Hello, world! This is a message from "api/hello".');
});

// Route to query database using knex under api/Nims
router.get('/nims', async (req, res) => {
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

// Route to create a new NIM
router.post('/create_nim', async (req, res) => {
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

// Route to delete a NIM by NIM_ID
router.delete('/delete_nim/:id', async (req, res) => {
    const nimId = req.params.id;

    console.log('api/delete_nim called at time:', new Date());
    console.log('NIM_ID to delete:', nimId);

    try {
        // Delete the NIM by NIM_ID
        await knex('NIM').where('NIM_ID', nimId).del();
        // Send a confirmation message
        res.send(`NIM with NIM_ID ${nimId} deleted successfully`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error - Failed to delete NIM');
    }
});

// Route to update a NIM by NIM_ID
router.put('/update_nim/:id', async (req, res) => {
    const nimId = req.params.id;
    const updatedNim = req.body;

    console.log('api/update_nim called at time:', new Date());
    console.log('NIM_ID to update:', nimId);
    console.log('Updated NIM:', updatedNim);

    try {
        // Update the NIM by NIM_ID
        await knex('NIM').where('NIM_ID', nimId).update(updatedNim);
        // Send a confirmation message
        res.send(`NIM with NIM_ID ${nimId} updated successfully`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error - Failed to update NIM');
    }
});

// Route to query a NIM by NIM_ID
router.get('/nims/:id', async (req, res) => {
    const nimId = req.params.id;

    try {
        const nim = await knex('NIM').where('NIM_ID', nimId).first();
        if (nim) {
            console.log('api/nims/:id data called at time:', new Date());
            res.json(nim);
        } else {
            res.status(404).send('NIM not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error - Failed to get NIM');
    }
});

module.exports = router;