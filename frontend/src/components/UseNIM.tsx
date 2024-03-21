import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function UseNIM() {
    const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const { id } = useParams(); // This will be a string, you might need to convert it to a number if necessary

    const NIM_ID = parseInt(id!);

    const chatWindowStyle = {
        height: '80%', 
        border: '2px solid #ccc',
        padding: '18px',
        borderRadius: '5px',
        marginBottom: '20px',
    }; 

    const sendMessage = async () => {
        if (!inputMessage.trim()) return;
        const userMessage = { role: 'user', content: `You: ${inputMessage}` };
        setMessages((messages) => [...messages, userMessage]);
    
        try {
            const response = await axios.post(`/api/chat/${NIM_ID}`, { message: inputMessage });
            const nimResponse = { role: 'nim', content: `AI: ${response.data.choices[0].message.content}` };
            setMessages((messages) => [...messages, nimResponse]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    
        setInputMessage('');
    };
    
    

    return (
        <div className="container mt-4">

        <div className="chat-box" style={chatWindowStyle}>
            {messages.map((msg: { role: string, content: string }, index: number) => (
            <div key={index} className={`message ${msg.role}`} style={chatWindowStyle}>
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

export default UseNIM;
