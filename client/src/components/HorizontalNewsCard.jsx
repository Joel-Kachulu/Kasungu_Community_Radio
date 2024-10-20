import React from 'react';
import '../static/horizontalnewscard.css';

const HorizontalNewsCard = ({ image, title, description, date, author, size = 'large' }) => {
    return (
        <div className={`horizontal-news-card ${size}`}>
            <img src={image} alt={title} className="horizontal-news-card-image" />
            <div className="horizontal-news-card-content">
                <h3 className="horizontal-news-card-title">{title}</h3>
                <p className="horizontal-news-card-description">{description}</p>
                <p className="horizontal-news-card-author">By {author} | {date}</p>
            </div>
        </div>
    );
};

export default HorizontalNewsCard;
