const express = require('express');
const router = express.Router();
const axios = require('axios');

// Route to handle chat messages
router.post('/chat/:id', async (req, res) => {
    const { id } = req.params; // NIM_ID, for use later in dynamicly getting the model data
    const { message } = req.body; // The message from the user

    console.log('Received message:', message);

    const options = {
        method: 'POST',
        url: 'https://integrate.api.nvidia.com/v1/chat/completions',
        headers: {
            accept: 'application/json', 
            'content-type': 'application/json',
            'Authorization': `Bearer ${process.env.NIM_API_KEY}`
        },
        data: {
            model: 'mistralai/mixtral-8x7b-instruct-v0.1', // Replace with your actual model ID
            messages: [{"role": "user", "content": message}],
            temperature: 0.5,
            top_p: 1,
            max_tokens: 1024,
            stream: false,
        }
    };

    try {
        const response = await axios.request(options);
        console.log('Chat completion object:', response.data);
        console.log('Chat completion:', response.data.choices[0].message.content);
        res.json(response.data); // Adjust this based on how the response data is structured
    } catch (error) {
        console.error('Error in chat completion:', error);
        res.status(500).send('Failed to get chat response');
    }
});

module.exports = router;
