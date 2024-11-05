import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import '../static/update-article.css';

const UpdateArticle = ({ articleId }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    author: '',
    is_editor_pick: false,
    is_popular: false,
    image: null
  });
  const [preview, setPreview] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch existing article data on component load
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/api/news/${articleId}`)
      .then((response) => {
        const data = response.data;
        setFormData({
          title: data.title,
          content: data.content,
          category: data.category,
          author: data.author,
          is_editor_pick: data.is_editor_pick,
          is_popular: data.is_popular,
          image: null // Image not prefetched
        });
      })
      .catch((error) => console.error('Error fetching article:', error));
  }, [articleId]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle Quill editor change
  const handleEditorChange = (content) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      content
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: e.target.files[0]
    }));
  };

  // Helper function to strip HTML tags
  const stripHtml = (html) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Strip HTML from the content
    const plainTextContent = stripHtml(formData.content);

    // Prepare form data for submission
    const data = new FormData();
    for (const key in formData) {
      if (key === 'content') {
        data.append(key, plainTextContent);  // Add plain text content
      } else {
        data.append(key, formData[key]);
      }
    }

    // Send PUT request to update the article
    axios
      .put(`http://127.0.0.1:5000/api/news/${articleId}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setMessage(response.data.message); // Display success message
      })
      .catch((error) => {
        setMessage('Error updating article');
        console.error('Error:', error);
      });
  };

  // Toggle Preview
  const togglePreview = () => {
    setPreview(!preview);
  };

  return (
    <div className="update-article-container">
      <div className="editor-container">
        <h2>Update News Article</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={formData.author}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="is_editor_pick"
                checked={formData.is_editor_pick}
                onChange={handleChange}
              />
              Editor's Pick
            </label>

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

          <div className="form-group">
            <input type="file" name="image" onChange={handleFileChange} />
          </div>

          <div className="form-group">
            <ReactQuill
              value={formData.content}
              onChange={handleEditorChange}
              placeholder="Edit the article content here..."
              className="quill-editor"
              modules={{
                toolbar: [
                  [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                  [{ size: [] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  ['link', 'image'],
                  [{ align: [] }],
                  ['clean']
                ]
              }}
            />
          </div>

          <button type="button" className="preview-btn" onClick={togglePreview}>
            {preview ? 'Hide Preview' : 'Show Preview'}
          </button>
          <button type="submit" className="submit-btn">
            Update Article
          </button>

          {/* Display the response message */}
          {message && <p className="message">{message}</p>}
        </form>

        {preview && (
          <div className="article-preview">
            <h2>Preview</h2>
            <h3>{formData.title}</h3>
            <p>
              <strong>Author:</strong> {formData.author}
            </p>
            <p>
              <strong>Category:</strong> {formData.category}
            </p>
            <div
              className="content-preview"
              dangerouslySetInnerHTML={{ __html: formData.content }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateArticle;
