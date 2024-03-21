import React, { useState } from 'react';
import axios from 'axios';


function ChatInterface({ nimId }) {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    const sendMessage = async () => {
        if (!inputMessage.trim()) return;
        const userMessage = { role: 'user', content: inputMessage };
        setMessages([...messages, userMessage]);
        
        try {
        const response = await axios.post(`/api/chat/${nimId}`, { message: inputMessage });
        const nimResponse = { role: 'nim', content: response.data.response };
        setMessages(messages => [...messages, nimResponse]);
        } catch (error) {
        console.error('Error sending message:', error);
        }

        setInputMessage('');
    };

    return (
        <div className="container mt-4">
        <div className="chat-box">
            {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
                {msg.content}
            </div>
            ))}
        </div>
        <div className="input-group mt-3">
            <input
            type="text"
            className="form-control"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button className="btn btn-primary" onClick={sendMessage}>Send</button>
        </div>
        </div>
    );
}

export default ChatInterface;
