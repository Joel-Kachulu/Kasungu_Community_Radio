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

    // Function to clean the HTML content (remove <img> tags and truncate text)
    const cleanContent = (content) => {
        // Remove <img> tags using a regular expression
        const contentWithoutImages = content.replace(/<img[^>]*>/g, '');
        // Truncate text to the first 100 characters (or adjust as needed)
        return contentWithoutImages.length > 100
            ? contentWithoutImages.substring(0, 100) + '...'
            : contentWithoutImages;
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
                                // Clean the content by removing <img> tags and truncating
                                description={<div dangerouslySetInnerHTML={{ __html: cleanContent(article.content) }} />}
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
