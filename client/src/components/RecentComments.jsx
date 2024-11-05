import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../static/RecentComments.css';

const RecentComments = () => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');

  const fetchRecentComments = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/news/comments/recent');
      setComments(response.data.comments);
    } catch (err) {
      setError('Failed to fetch recent comments');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRecentComments();
  }, []);

  return (
    <div className="recent-comments-container">
      <h3>Recent Comments</h3>
      {error && <p className="error-message">{error}</p>}
      {comments.length > 0 ? (
        <ul className="comments-list">
          {comments.map((comment) => (
            <li key={comment.id} className="comment-item">
              <p className="comment-author">{comment.author} on Article {comment.article_title}:</p>
              <p className="comment-content">{comment.content}</p>
              <p className="comment-date">{comment.created_at}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recent comments available.</p>
      )}
    </div>
  );
};

export default RecentComments;
