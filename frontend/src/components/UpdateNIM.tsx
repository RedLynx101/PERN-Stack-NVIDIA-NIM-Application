import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { NIMRecord } from '../interfaces/NIMRecord';

function UpdateNIM() {
    const [nim, setNim] = useState<NIMRecord>({
        NIM_ID: 0,
        Model: '',
        Temperature: '',
        Top_P: '',
        Max_Tokens: 1024,
        Stream: false,
        Name: '',
    });

    const { id } = useParams(); // This assumes your route parameter is named `id`

    useEffect(() => {
        const fetchNIM = async () => {
            try {
                const response = await axios.get(`/api/nims/${id}`); // Make sure you have a route to fetch a single NIM by ID
                setNim(response.data);
            } catch (error) {
                console.error('Error fetching NIM data:', error);
            }
        };

        fetchNIM();
    }, [id]);

    // Adjust handleChange to correctly handle different input types
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        setNim({
            ...nim,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        // Destructure newNim to exclude NIM_ID and capture the rest of the properties
        const { NIM_ID, ...payload } = nim;
    
        try {
            // Specify the content type as JSON and send the payload
            const response = await axios.put(`/api/update_nim/${nim.NIM_ID}`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('NIM updated:', response.data);
    
            // Redirect to the home page after successful update
            window.location.href = '/';
        } catch (error) {
            // Log the data to the console if there's an error
            console.log('Error updating NIM:', payload);
            console.error('Error updating NIM:', error);
        }
    };
    

    return (
        <div>
        <h2>Update NIM</h2>
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="Name">Name:</label>
                <input
                    type="text"
                    id="Name"
                    name="Name"
                    value={nim.Name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
            <label htmlFor="Model">Model:</label>
                <input
                    type="text"
                    id="Model"
                    name="Model"
                    value={nim.Model}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
            <label htmlFor="Temperature">Temperature:</label>
                <input
                    type="text"
                    id="Temperature"
                    name="Temperature"
                    value={nim.Temperature}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
            <label htmlFor="Top_P">Top_P:</label>
                <input
                    type="text"
                    id="Top_P"
                    name="Top_P"
                    value={nim.Top_P}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
            <label htmlFor="Max_Tokens">Max Tokens:</label>
                <input
                    type="number"
                    id="Max_Tokens"
                    name="Max_Tokens"
                    value={nim.Max_Tokens}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
            <label htmlFor="Stream">Stream:</label>
                <input
                    type="checkbox"
                    id="Stream"
                    name="Stream"
                    checked={nim.Stream}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Update NIM</button>
        </form>
        </div>
    );
}

export default UpdateNIM;