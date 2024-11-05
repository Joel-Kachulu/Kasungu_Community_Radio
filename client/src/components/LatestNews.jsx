import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import NewsCard from './NewsCard';
import '../static/latestNews.css';

const LatestNews = () => {
    const [newsData, setNewsData] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    const fetchLatestNews = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/news/latest');
            if (response.ok) {
                const data = await response.json();
                setNewsData(Object.values(data.articles));
            } else {
                throw new Error('Failed to fetch the latest news.');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchLatestNews();
    }, []);

    // Function to handle card click
    const handleCardClick = (id) => {
        navigate(`/news/${id}`); // Navigate to full news page by ID
    };

    return (
        <div className="latest-news-section">
            <h2 className="latest-news-heading">Latest News</h2>

            {error ? (
                <p className="error-message">{error}</p>
            ) : newsData.length > 0 ? (
                <div className="latest-news-container">
                    {newsData.slice().reverse().map((article) => (
                        <div key={article.id} onClick={() => handleCardClick(article.id)}>
                            <NewsCard
                                id={article.id}
                                image={article.image_url}
                                title={article.title}
                                description={article.content}
                                author={article.author}
                                date={new Date(article.published_at).toLocaleDateString()}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading latest news...</p>
            )}
        </div>
    );
};

export default LatestNews;
