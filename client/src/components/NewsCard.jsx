import React from 'react';
import { Link } from 'react-router-dom';
import '../static/newscard.css';

const NewsCard = ({ id, image, title, description, date, author, size = 'medium' }) => {
    return (
        <Link to={`/news/${id}`} className={`news-card ${size}`}>
            <div className={`vertical-news-card ${size}`}>
                <img src={image} alt={title} className="news-card-image" />
                <div className="news-card-content">
                    <h3 className="news-card-title">{title}</h3>
                    <p className="news-card-description">{description}</p>
                    <p className="news-card-author"> {author} || {date}</p>
                </div>
            </div>
        </Link>
    );
};

export default NewsCard;
