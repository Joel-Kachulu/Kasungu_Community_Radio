import React, { useEffect, useState } from "react";
import HorizontalNewsCard from "./HorizontalNewsCard";
import NewsCard from "./NewsCard";
import '../static/popularPosts.css';

const PopularPosts = () => {
    const [popularData, setPopularData] = useState([]);
    const [error, setError] = useState('');

    // Fetch popular posts from the backend API
    const fetchPopularPosts = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/news/popular');
            if (response.ok) {
                const data = await response.json();
                const posts = Object.values(data);
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

    return (
        <div className="popular-posts-section">
            <h2>Popular Posts</h2>
            {error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div className="popular-posts-container">
                    {popularData.length > 0 ? (
                        popularData.map((post) => (
                            <NewsCard
                                key={post.id}
                                image={post.image_url}
                                title={post.title}
                                description={post.content}
                                author={post.author}
                                date={new Date(post.published_at).toLocaleDateString()}
                                size="large" // Adjust the size if needed
                            />
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
