import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import '../static/latestNews.css';

const LatestNews = () => {
    const [newsData, setNewsData] = useState([]);
    const [error, setError] = useState('');

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

    return (
        <div className="latest-news-section">
            <h2 className="latest-news-heading">Latest News</h2>

            {error ? (
                <p className="error-message">{error}</p>
            ) : newsData.length > 0 ? (
                <div className="latest-news-container">
                    {newsData.slice().reverse().map((article) => (
                        <NewsCard
                            key={article.id}
                            image={article.image_url}
                            title={article.title}
                            description={article.content}
                            author={article.author}
                            date={new Date(article.published_at).toLocaleDateString()}
                            size="medium" // Size for LatestNews
                        />
                    ))}
                </div>
            ) : (
                <p>Loading latest news...</p>
            )}
        </div>
    );
};

export default LatestNews;
