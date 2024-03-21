import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function UseNIM() {
    const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [modelName, setModelName] = useState('');
    const { id } = useParams(); // Get the NIM ID from the URL

    useEffect(() => {
        // Fetch NIM details and set the model name
        const fetchNIMDetails = async () => {
            try {
                const response = await axios.get(`/api/nims/${id}`);
                setModelName(response.data.Name);
            } catch (error) {
                console.error('Error fetching NIM details:', error);
            }
        };

        fetchNIMDetails();
    }, [id]);

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
        <h3>Chat with {modelName}</h3>
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
