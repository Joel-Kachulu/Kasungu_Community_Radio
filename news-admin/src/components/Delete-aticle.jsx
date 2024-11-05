import React, { useState } from 'react';
import axios from 'axios';
import '../static/delete-article.css';

const DeleteArticle = ({ articleId }) => {
  const [message, setMessage] = useState('');

  const handleDelete = () => {
    // Confirm deletion with the user
    if (!window.confirm('Are you sure you want to delete this article?')) {
      return;
    }

    // Send DELETE request to API
    axios
      .delete(`http://127.0.0.1:5000/api/news/${articleId}`)
      .then((response) => {
        setMessage(response.data.message); // Show success message
      })
      .catch((error) => {
        setMessage('Error deleting article');
        console.error('Error:', error);
      });
  };

  return (
    <div className="delete-article-container">
      <button onClick={handleDelete} className="delete-button">
        Delete Article
      </button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default DeleteArticle;
