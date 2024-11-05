import React, { useState } from 'react';
import axios from 'axios';
import '../static/CommentForm.css'

const CommentForm = ({ articleId, onCommentAdded }) => {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content || !author) {
      setError('Both content and author are required');
      return;
    }

    try {
      const response = await axios.post(`http://127.0.0.1:5000/api/news/${articleId}/comments`, {
        content,
        author
      });

      setSuccessMessage(response.data.message);
      setContent('');
      setAuthor('');
      setError('');

      // Optional callback if you want to refresh the comment list in the parent component
      if (onCommentAdded) onCommentAdded();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add comment');
    }
  };

  return (
    <div className="comment-form-container">
      <h3>Add a Comment</h3>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="author">Name</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Comment</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-btn">Submit Comment</button>
      </form>
    </div>
  );
};

export default CommentForm;
