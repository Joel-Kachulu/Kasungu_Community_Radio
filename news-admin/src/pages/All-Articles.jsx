import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import '../static/all-articles.css';

const AllArticles = () => {
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchArticlesByCategory = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/news/all');
        const data = await response.json();
        if (response.ok) {
          setCategories(data.categories);
        } else {
          console.error('Error fetching articles:', data.error);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticlesByCategory();
  }, []);

  // Function to delete an article
  const handleDelete = async (articleId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this article? This action cannot be undone.'
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/news/${articleId}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (response.ok) {
        setMessage('Article deleted successfully.');
        setCategories((prevCategories) => {
          const updatedCategories = { ...prevCategories };
          for (const category in updatedCategories) {
            updatedCategories[category] = updatedCategories[category].filter(
              (article) => article.id !== articleId
            );
          }
          return updatedCategories;
        });
      } else {
        setMessage(data.error || 'Failed to delete article.');
      }
    } catch (error) {
      setMessage('An error occurred while deleting the article.');
      console.error('Error deleting article:', error);
    }
  };

  // Function to navigate to the full article page
  const handleUpdate = (articleId) => {
    navigate(`/news/${articleId}`); // Navigate to the FullNews page with the article ID
  };

  return (
    <div className="articles-container">
      <h2>All Articles</h2>
      {message && <p className="message">{message}</p>}
      {loading ? (
        <p>Loading articles...</p>
      ) : Object.keys(categories).length > 0 ? (
        Object.entries(categories).map(([category, articles]) => (
          <div key={category} className="category-section">
            <h3 className="category-title">{category}</h3>
            <div className="articles-grid">
              {articles.map((article) => (
                <div key={article.id} className="article-card">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="article-image"
                  />
                  <div className="article-content">
                    <h4>{article.title}</h4>
                    <p>{`${article.content.substring(0, 150)}...`}</p>
                    <button
                      className="read-more-button"
                      onClick={() => handleReadMore(article.id)} // Navigate to the FullNews page
                    >
                      Read More
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(article.id)} // Delete the article
                    >
                      Delete
                    </button>
                    <button
                      className="update-button"
                      onClick={() => handleUpdate(article.id)} // Navigate to update page
                    >
                      Update
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No articles found.</p>
      )}
    </div>
  );
};

export default AllArticles;
