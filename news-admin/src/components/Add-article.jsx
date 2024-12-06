import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import '../static/Add-article.css';
import Sidebar from './Sidebar';

// Function to resize an image (for cover image and content images)
const resizeImage = (file, maxWidth, maxHeight, callback) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      let width = img.width;
      let height = img.height;

      // Resize logic to maintain aspect ratio
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          callback(blob); // Pass the resized image blob to the callback
        },
        file.type,
        0.8 // Compression quality (adjust as necessary)
      );
    };
    img.src = event.target.result; // Load the image file as a base64 URL
  };
  reader.readAsDataURL(file); // Read the image file as base64
};

const AddArticles = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    author: "",
    isPopular: false,
    isEditorPick: false,
    coverImage: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Resize the image before setting it into the form data state
      resizeImage(file, 800, 600, (resizedBlob) => {
        // Create a new FormData object to append the resized image
        const resizedFile = new File([resizedBlob], file.name, { type: file.type });
        setFormData((prevState) => ({
          ...prevState,
          coverImage: resizedFile, // Set the resized image in the state
        }));
      });
    }
  };

  const handleContentChange = (value) => {
    setFormData((prevState) => ({ ...prevState, content: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("content", formData.content);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("author", formData.author);
    formDataToSend.append("isPopular", formData.isPopular);
    formDataToSend.append("isEditorPick", formData.isEditorPick);
    if (formData.coverImage) {
      formDataToSend.append("image", formData.coverImage); // Add the resized cover image
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/news",
        formDataToSend
      );
      console.log("Article created successfully:", response.data);
    } catch (error) {
      console.error("Failed to create article:", error);
    }
  };

  return (
    <div className="add-articles">
      <div className="side">
        <Sidebar />
      </div>
      <div className="add-articles-form">
        <h1>Post News</h1>

        <div className="form-group">
          
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          
          <input
            type="text"
            id="category"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
        
          <input
            type="text"
            id="author"
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Cover Image Section */}
        <div className="form-group">
          <label htmlFor="coverImage">Cover Image</label>
          <input type="file" id="coverImage" onChange={handleCoverImageChange} />
        </div>

        {/* React Quill for Content */}
        <div className="form-group">
          <ReactQuill
            value={formData.content}
            onChange={handleContentChange}
            theme="snow"
            modules={{
              toolbar: [
                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                [{ size: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                ['link', 'image', 'video'],
                ['clean']
              ],
            }}
            formats={[
              'header', 'font', 'size',
              'bold', 'italic', 'underline', 'strike', 'blockquote',
              'list', 'bullet', 'indent',
              'link', 'image', 'video'
            ]}
            placeholder="Write your article here..."
            className="quill-editor"
          />
        </div>

        {/* Checkboxes for Popular and Editor's Pick */}
        <div className="form-group-Radio">
          <label>
            <input
              type="checkbox"
              name="isPopular"
              checked={formData.isPopular}
              onChange={(e) =>
                setFormData((prevState) => ({ ...prevState, isPopular: e.target.checked }))
              }
            />
            Popular
          </label>
          <label>
            <input
              type="checkbox"
              name="isEditorPick"
              checked={formData.isEditorPick}
              onChange={(e) =>
                setFormData((prevState) => ({ ...prevState, isEditorPick: e.target.checked }))
              }
            />
            Editor's Pick
          </label>
        </div>

        <button type="submit" className="submit-button" onClick={handleSubmit}>
          Submit
        </button>

        {formData.title && (
          <div className="full-news-content">
            <div
              className="full-news-text"
              dangerouslySetInnerHTML={{ __html: formData.content }}
            ></div>
            <p className="full-news-meta">
              By {formData.author} | {new Date().toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddArticles;
