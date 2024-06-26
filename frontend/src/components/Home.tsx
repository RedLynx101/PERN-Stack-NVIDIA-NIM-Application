import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NIMRecord } from '../interfaces/NIMRecord';
import { Link } from 'react-router-dom';

function Home() {
    const [nims, setNims] = useState<NIMRecord[]>([]);

    useEffect(() => {
        fetchNims();
    }, []);

    const fetchNims = async () => {
        try {
            const response = await axios.get('/api/nims');
            setNims(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteNIM = async (nimId: number) => {
        // Confirmation dialog
        const isConfirmed = window.confirm('Do you really want to delete this NIM?');
        if (isConfirmed) {
            try {
                await axios.delete(`/api/delete_nim/${nimId}`);
                // Reload the page to reflect the changes
                window.location.reload();
            } catch (error) {
                console.error('Error deleting NIM:', error);
                alert('There was an error deleting the NIM. Please try again.');
            }
        }
    };
    

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
                                <button onClick={() => deleteNIM(nim.NIM_ID)} className="btn btn-danger ml-2">
                                    Delete
                                </button>
                                {/* Link to edit the NIM, open up a page for it */}
                                <Link to={`/edit/${nim.NIM_ID}`} className="btn btn-warning ml-2">
                                    Edit
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
