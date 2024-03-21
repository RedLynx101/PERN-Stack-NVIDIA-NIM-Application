const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.NIM_API_KEY,
    baseURL: 'https://integrate.api.nvidia.com/v1',
});

// Route to handle chat messages
router.post('/chat/:id', async (req, res) => {
    const { id } = req.params; // NIM_ID, in case we need it
    const { message } = req.body; // The message from the user

    try {
        const completion = await openai.chat.completions.create({
        model: "mistralai/mixtral-8x7b-instruct-v0.1", // Ensure you have the correct model ID, this is just an example
        messages: [{"role": "user", "content": message}],
        temperature: 0.5,
        top_p: 1,
        max_tokens: 1024,
        stream: false, // Set to true if we want a stream of responses
        });

        // Assuming we're not streaming and just want a single response
        res.json({ response: completion.choices[0]?.delta?.content });
    } catch (error) {
        console.error('Error in chat completion:', error);
        res.status(500).send('Failed to get chat response');
    }
});

module.exports = router;
