import React from 'react';
import { useNavigate } from 'react-router-dom';
import HorizontalNewsCard from './HorizontalNewsCard';
import NewsCard from './NewsCard';
import '../static/newslist.css';

const NewsList = ({ news = [], pageTitle }) => {
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle card click
  const handleCardClick = (id) => {
    navigate(`/news/${id}`); // Navigate to full news page by ID
  };

  const latestNews = news.slice(0, 8); // First 8 articles for Latest News section
  const otherNews = news.slice(8); // Remaining articles for More News section

  // Placeholders for empty slots in "Latest News"
  const emptySlots = 8 - latestNews.length;
  const emptyNewsCards = Array(emptySlots).fill(null);

  return (
    <div className="news-list">
      {/* Top section: Latest News */}
      <div className="latest-news-section">
        <h3>{pageTitle} Latest News</h3>
        <div className="latest-news-grid">
          {latestNews.map((newsItem, index) => (
            <div key={newsItem.id || index} onClick={() => handleCardClick(newsItem.id)}>
              <HorizontalNewsCard
                id={newsItem.id}
                image={newsItem.image_url}
                title={newsItem.title}
                description={newsItem.content}
                date={newsItem.published_at}
                author={newsItem.author}
                size="large"
              />
            </div>
          ))}
          {/* Placeholder cards for empty slots */}
          {emptyNewsCards.map((_, index) => (
            <HorizontalNewsCard
              key={`placeholder-${index}`}
              image="https://via.placeholder.com/350x180"
              title="Loading news..."
              description="This is a placeholder for news content."
              date="----"
              author="----"
              size="large"
            />
          ))}
        </div>
      </div>

      {/* Below section: More News */}
      <div className="other-news-section">
        <h3>More News</h3>
        <div className="more-news-grid">
          {/* First row: 6 vertical news cards */}
          {otherNews.slice(0, 6).map((newsItem, index) => (
            <div key={newsItem.id || index} className="news-list-card" onClick={() => handleCardClick(newsItem.id)}>
              <NewsCard
                id={newsItem.id}
                image={newsItem.image_url}
                title={newsItem.title}
                description={newsItem.content}
                date={newsItem.published_at}
                author={newsItem.author}
                size="medium" // Adjust size for vertical cards
              />
            </div>
          ))}

          {/* Second row: 4 horizontal news cards */}
          {otherNews.slice(6, 10).map((newsItem, index) => (
            <div key={newsItem.id || index} className="news-list-card large" onClick={() => handleCardClick(newsItem.id)}>
              <HorizontalNewsCard
                id={newsItem.id}
                image={newsItem.image_url}
                title={newsItem.title}
                description={newsItem.content}
                date={newsItem.published_at}
                author={newsItem.author}
                size="large" // Adjust size for horizontal cards
              />
            </div>
          ))}

          {/* Third row: 6 vertical news cards */}
          {otherNews.slice(10, 16).map((newsItem, index) => (
            <div key={newsItem.id || index} className="news-list-card" onClick={() => handleCardClick(newsItem.id)}>
              <NewsCard
                id={newsItem.id}
                image={newsItem.image_url}
                title={newsItem.title}
                description={newsItem.content}
                date={newsItem.published_at}
                author={newsItem.author}
                size="medium"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsList;
