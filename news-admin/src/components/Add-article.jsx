import React, { useState, useRef } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import '../static/add-article.css';

const AddArticles = () => {
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
  const reactQuillRef = useRef(null);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("/api/upload-image", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data.image_url;  // Returns the URL to be embedded
    } catch (error) {
      console.error("Image upload failed:", error);
      setMessage("Image upload failed. Please try again.");
      return null;
    }
  };

  // Configure ReactQuill to use the upload function
  const handleImageInsert = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const imageUrl = await handleImageUpload(file);
        if (imageUrl) {
          const quill = reactQuillRef.current.getEditor();
          const range = quill.getSelection();
          quill.insertEmbed(range.index, 'image', imageUrl);
        }
      }
    };
  };

  // ReactQuill modules configuration to include custom image handler
  const modules = {
    toolbar: {
      container: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        [{ align: [] }],
        ['clean']
      ],
      handlers: {
        image: handleImageInsert
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEditorChange = (content) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      content
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content); // HTML content with embedded images
    data.append('category', formData.category);
    data.append('author', formData.author);
    data.append('is_editor_pick', formData.is_editor_pick);
    data.append('is_popular', formData.is_popular);

    if (formData.image) {
      data.append('image', formData.image); // Cover image
    }

    axios
      .post('http://127.0.0.1:5000/api/news', data)
      .then((response) => {
        setMessage(response.data.message);
        setFormData({
          title: '',
          content: '',
          category: '',
          author: '',
          is_editor_pick: false,
          is_popular: false,
          image: null,
        });
      })
      .catch((error) => {
        setMessage('Error submitting article');
        console.error('Error:', error);
      });
  };

  const togglePreview = () => {
    setPreview(!preview);
  };

  return (
    <div className="add-article-container">
      <div className="editor-container">
        <h2>Post News Article</h2>

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
              ref={reactQuillRef}
              value={formData.content}
              onChange={handleEditorChange}
              placeholder="Write the article content here..."
              className="quill-editor"
              modules={modules}
            />
          </div>

          <button type="button" className="preview-btn" onClick={togglePreview}>
            {preview ? 'Hide Preview' : 'Show Preview'}
          </button>
          <button type="submit" className="submit-btn">
            Submit Article
          </button>

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
}

export default AddArticles;
