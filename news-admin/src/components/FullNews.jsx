// src/components/FullNews.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // To get the article ID from the URL
import '../static/full-news.css';  // Add necessary styles

const FullNews = () => {
    const { id } = useParams();  // Get the article ID from the URL
    const [article, setArticle] = useState(null);

    // Fetch the article by ID when the component mounts
    useEffect(() => {
        const fetchArticle = async () => {
            try {
                // If you are testing locally, ensure you use the full URL
                const response = await fetch(`http://127.0.0.1:5000/api/news/${id}`); // Full URL
                const data = await response.json();
                if (response.ok) {
                    setArticle(data.article);
                } else {
                    console.error('Error fetching article:', data.error);
                }
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        };
    
        fetchArticle();
    }, [id]);
    

    return (
        <div className="full-article-container">
            {article ? (
                <div className="full-article">
                    <h2>{article.title}</h2>
                    <img src={article.image_url} alt={article.title} className="full-article-image" />
                    <div className="full-article-content" dangerouslySetInnerHTML={{ __html: article.content }} />
                </div>
            ) : (
                <p>Loading article...</p>
            )}
        </div>
    );
};

export default FullNews;
