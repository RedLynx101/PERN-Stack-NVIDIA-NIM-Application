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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        setNim({
            ...nim,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const { NIM_ID, ...payload } = nim;
    
        try {
            const response = await axios.put(`/api/update_nim/${nim.NIM_ID}`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('NIM updated:', response.data);
    
            window.location.href = '/';
        } catch (error) {
            console.log('Error updating NIM:', payload);
            console.error('Error updating NIM:', error);
        }
    };
    
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Update NIM</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="Name" className="form-label">Name:</label>
                                    <input type="text" className="form-control" id="Name" name="Name" value={nim.Name} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Model" className="form-label">Model:</label>
                                    <input type="text" className="form-control" id="Model" name="Model" value={nim.Model} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Temperature" className="form-label">Temperature:</label>
                                    <input type="text" className="form-control" id="Temperature" name="Temperature" value={nim.Temperature} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Top_P" className="form-label">Top_P:</label>
                                    <input type="text" className="form-control" id="Top_P" name="Top_P" value={nim.Top_P} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Max_Tokens" className="form-label">Max Tokens:</label>
                                    <input type="number" className="form-control" id="Max_Tokens" name="Max_Tokens" value={nim.Max_Tokens} onChange={handleChange} />
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="Stream" name="Stream" checked={nim.Stream} onChange={handleChange} />
                                    <label htmlFor="Stream" className="form-check-label">Stream:</label>
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">Update NIM</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateNIM;