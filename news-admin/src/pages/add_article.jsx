import React, { useState } from 'react';
import axios from 'axios';

function AddArticles() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    author: '',
    is_editor_pick: false,
    is_popular: false,
    image: null
  });

  const [message, setMessage] = useState('');

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      image: e.target.files[0]
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare form data for submission
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    // Send POST request to the Flask API
    axios.post('http://127.0.0.1:5000/api/news', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      setMessage(response.data.message);  // Display success message
      setFormData({
        title: '',
        content: '',
        category: '',
        author: '',
        is_editor_pick: false,
        is_popular: false,
        image: null,
      });  // Reset form fields
    })
    .catch((error) => {
      setMessage('Error submitting article');
      console.error('Error:', error);
    });
  };

  return (
    <div>
      <h2>Submit a News Article</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <textarea
            name="content"
            placeholder="Content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="is_editor_pick"
              checked={formData.is_editor_pick}
              onChange={handleChange}
            />
            Editor's Pick
          </label>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="is_popular"
              checked={formData.is_popular}
              onChange={handleChange}
            />
            Popular
          </label>
        </div>

        <div>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit">Submit Article</button>
      </form>

      {/* Display the response message */}
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddArticles;
