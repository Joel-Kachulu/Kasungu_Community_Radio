import React from 'react';
import { Link } from 'react-router-dom';
import '../static/horizontalnewscard.css';

const HorizontalNewsCard = ({ id, image, title, description, date, author, size = 'large' }) => {
    return (
        <Link to={`/news/${id}`} className={`news-card ${size}`}>
            <div className={`horizontal-news-card ${size}`}>
                <img src={image} alt={title} className="horizontal-news-card-image" />
                <div className="horizontal-news-card-content">
                    <h3 className="horizontal-news-card-title">{title}</h3>
                    <p className="horizontal-news-card-description">{description}</p>
                    <p className="horizontal-news-card-author">By {author} || {date}</p>
                </div>
            </div>
        </Link>
    );
};

export default HorizontalNewsCard;
