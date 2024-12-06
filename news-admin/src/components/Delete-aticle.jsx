import React, { useState } from 'react';
import axios from 'axios';
import '../static/delete-article.css';

const DeleteArticle = ({ articleId }) => {
  const [message, setMessage] = useState('');

  const handleDelete = () => {
    axios
      .delete(`http://127.0.0.1:5000/api/news/${articleId}`)
      .then((response) => {
        setMessage(response.data.message); // Display success message
      })
      .catch((error) => {
        setMessage('Error deleting article');
        console.error('Error:', error);
      });
  };

  return (
    <div className="delete-article-container">
      <p>Are you sure you want to delete this article?</p>
      <button onClick={handleDelete} className="delete-btn">
        Delete Article
      </button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default DeleteArticle;
