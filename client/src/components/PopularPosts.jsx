import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import NewsCard from "./NewsCard";
import '../static/popularPosts.css';

const PopularPosts = ({ pageTitle }) => {
    const [popularData, setPopularData] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    // Fetch popular posts from the backend API
    const fetchPopularPosts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/news/popular');
            if (response.ok) {
                const data = await response.json();
                const posts = Object.values(data.popular);
                setPopularData(posts);
            } else {
                setError('Failed to fetch popular posts.');
            }
        } catch (err) {
            setError('Error fetching popular posts: ' + err.message);
        }
    };

    // Use useEffect to trigger the data fetch on component mount
    useEffect(() => {
        fetchPopularPosts();
    }, []);

    // Function to handle card click
    const handleCardClick = (id) => {
        navigate(`/news/${id}`); // Navigate to full news page by ID
    };

    return (
        <div className="popular-posts-section">
            <h2>{pageTitle}</h2>
            {error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div className="popular-posts-container">
                    {popularData.length > 0 ? (
                        popularData.map((post) => (
                            <div key={post.id} onClick={() => handleCardClick(post.id)}>
                                <NewsCard
                                    image={post.image_url}
                                    title={post.title}
                                    description={post.content}
                                    author={post.author}
                                    date={new Date(post.published_at).toLocaleDateString()}
                                    size="medium" // Adjust the size if needed
                                />
                            </div>
                        ))
                    ) : (
                        <p>Loading popular posts...</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default PopularPosts;
