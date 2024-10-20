import React from 'react';
import '../static/newscard.css';

const NewsCard = ({ image, title, description, date, author, size = 'medium', orientation='vertical' }) => {
    return (
        <div className={`news-card ${size}`}>
            <img src={image} alt={title} className="news-card-image" />
            <div className="news-card-content">
                <h3 className="news-card-title">{title}</h3>
                <p className="news-card-description">{description}</p>
                <p className="news-card-author">By {author} | | {date}</p>
            </div>
        </div>
    );
};

export default NewsCard;
