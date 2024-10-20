import React from "react";
import HorizontalNewsCard from "./HorizontalNewsCard";
import NewsCard from "./NewsCard";

function NewsList({ news }) {
  return (
    <>
    
      <div className="news-list">
        {news.length > 0 ? (
          news.map((article) => (
            <HorizontalNewsCard
              key={article.id}
              image={article.image_url}
              title={article.title}
              description={article.content}
              date={new Date(article.published_at).toLocaleDateString()}
              size="large" // Adjust the size if needed
            />

          ))
        ) : (
          <p>No articles available in this category.</p>
        )}
      </div>
    </>
  );
}

export default NewsList;
