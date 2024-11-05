import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import HorizontalNewsCard from "./HorizontalNewsCard";
import '../static/editorspick.css';

const EditorsPicks = () => {
    const [editorPicksData, setEditorPicksData] = useState([]); // Initialize with an empty array
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    // Fetch editor's picks from the backend API
    const fetchEditorsPicks = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/news/editor_picks');
            if (response.ok) {
                const data = await response.json();
                const picks = Object.values(data); // Convert the object into an array
                setEditorPicksData(picks); // Update the state with the fetched data
            } else {
                setError('Failed to fetch editor picks.');
            }
        } catch (err) {
            setError('Error fetching editor picks: ' + err.message);
        }
    };

    useEffect(() => {
        fetchEditorsPicks(); // Fetch data when the component mounts
    }, []);

    // Function to handle card click
    const handleCardClick = (id) => {
        navigate(`/news/${id}`); // Navigate to full news page by ID
    }

    return (
        <div className="editors-pick-section">
            <h2 className="editors-pick-heading">Editor's Picks</h2>
            {error ? (
                <p className="error-message">{error}</p>
            ) : editorPicksData.length > 0 ? (
                <div className="editors-picks-container">
                    {editorPicksData.slice().map((article) => (
                        <div key={article.id} onClick={() => handleCardClick(article.id)}>
                            <HorizontalNewsCard
                                image={article.image_url}
                                title={article.title}
                                description={article.content}
                                author={article.author}
                                date={new Date(article.published_at).toLocaleDateString()}
                                size='large' // Adjust the size if needed
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading editor's picks...</p> // Show loading message while fetching data
            )}
        </div>
    );
};

export default EditorsPicks;
