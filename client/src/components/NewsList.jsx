import React from 'react';
import { useNavigate } from 'react-router-dom';
import NewsCard from './NewsCard';  // Only import NewsCard
import '../static/newslist.css';

const NewsList = ({ news = [], pageTitle }) => {
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle card click
  const handleCardClick = (id) => {
    navigate(`/news/${id}`); // Navigate to full news page by ID
  };

  const latestNews = news.slice(0, 8); // First 8 articles for Latest News section
  const otherNews = news.slice(8); // Remaining articles for More News section

  return (
    <div className="news-list-container">
      {/* Top section: Latest News */}
      <div className="news-list-latest-news">
        <h3>{pageTitle} Latest News</h3>
        <div className="news-list-latest-news-grid">
          {latestNews.map((newsItem) => (
            <div key={newsItem.id} onClick={() => handleCardClick(newsItem.id)}>
              <NewsCard
                id={newsItem.id}
                image={newsItem.image_url}
                title={newsItem.title}
                description={newsItem.content}
                date={newsItem.published_at}
                author={newsItem.author}
                size="small" // Large size for cards
              />
            </div>
          ))}
        </div>
      </div>

      {/* Below section: More News */}
      {otherNews.length > 0 && (
        <div className="news-list-more-news">
          <h3>More News</h3>
          <div className="news-list-more-news-grid">
            {otherNews.map((newsItem) => (
              <div
                key={newsItem.id}
                className="news-list-card"
                onClick={() => handleCardClick(newsItem.id)}
              >
                <NewsCard
                  id={newsItem.id}
                  image={newsItem.image_url}
                  title={newsItem.title}
                  description={newsItem.content}
                  date={newsItem.published_at}
                  author={newsItem.author}
                  size="medium" // Medium size for cards
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsList;
