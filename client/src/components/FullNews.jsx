import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import CommentForm from './CommentForm';
import RecentComments from './RecentComments'; // Import the RecentComments component
import '../static/FullNews.css';

const FullNews = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [error, setError] = useState(null);

  const fetchFullNews = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/news/${id}`);
      setNews(response.data);
    } catch (error) {
      setError('Error fetching full news');
    }
  };

  useEffect(() => {
    fetchFullNews();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!news) return <p>Loading...</p>;

  return (
    <div>
      <Navigation />
      <div className="full-news-container">
        <h2 className="full-news-title">{news.title}</h2>
        <img src={news.image_url} alt={news.title} className="full-news-image" />
        <div className="full-news-content">
          <p className="full-news-text">{news.content}</p>
          <p className="full-news-meta">By {news.author} | {new Date(news.published_at).toLocaleDateString()}</p>
        </div>
        <CommentForm articleId={id} onCommentAdded={fetchFullNews} />
        {/* Display the RecentComments component */}
        <RecentComments />
      </div>
      <Footer />
    </div>
  );
};

export default FullNews;
      