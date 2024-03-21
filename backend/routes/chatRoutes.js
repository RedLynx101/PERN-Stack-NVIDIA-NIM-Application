const express = require('express');
const router = express.Router();
const axios = require('axios');
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

// API Route to get chat completions
router.post('/chat/:id', async (req, res) => {
    const { id } = req.params;
    const { message } = req.body;

    console.log('The message is:', message);

    try {
        // Fetch model details from your database
        const nim = await knex('NIM').where('NIM_ID', id).first();
        if (!nim) {
            return res.status(404).send('NIM not found');
        }

        console.log(`api/chat/${id} called with model:`, nim.Name);

        const options = {
            method: 'POST',
            url: 'https://integrate.api.nvidia.com/v1/chat/completions',
            headers: {
                accept: 'application/json', 
                'content-type': 'application/json',
                'Authorization': `Bearer ${process.env.NIM_API_KEY}`
            },
            data: {
                model: nim.Model, // Use the model from your database
                messages: [{"role": "user", "content": message}],
                temperature: parseFloat(nim.Temperature),
                top_p: parseFloat(nim.Top_P),
                max_tokens: nim.Max_Tokens,
                stream: nim.Stream,
            }
        };

        const response = await axios.request(options);
        console.log('Chat response:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error in chat completion:', error);
        res.status(500).send('Failed to get chat response');
    }
});


module.exports = router;
