import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NIMRecord } from '../interfaces/NIMRecord';
import { Link } from 'react-router-dom';

function Home() {
    const [nims, setNims] = useState<NIMRecord[]>([]);

    useEffect(() => {
        const fetchNims = async () => {
        try {
            const response = await axios.get('/api/nims');
            setNims(response.data);
        } catch (error) {
            console.error(error);
        }
        };

        fetchNims();
    }, []);

    return (
        <div className="container">
        <h2>NVIDIA AI NIMs</h2>
        <p>Explore the powerful AI models available from NVIDIA.</p>
        <div className="row">
            {nims.map((nim) => (
            <div key={nim.NIM_ID} className="col-md-4 mb-4">
                <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{nim.Name}</h5>
                    <p className="card-text">
                    Model: {nim.Model}<br />
                    Temperature: {nim.Temperature}<br />
                    Top_P: {nim.Top_P}<br />
                    Max Tokens: {nim.Max_Tokens}
                    </p>
                    <Link to={`/use/${nim.NIM_ID}`} className="btn btn-primary">
                    Use this NIM
                    </Link>
                </div>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
}

export default Home;