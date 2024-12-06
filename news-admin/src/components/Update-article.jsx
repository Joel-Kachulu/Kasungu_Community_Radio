import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../static/Add-article.css';
import Sidebar from './Sidebar';

const UpdateArticle = () => {
  const { id } = useParams(); // Get the article ID from the URL
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    author: '',
    coverImage: null, // Can be a URL or a File
    isPopular: false,
    isEditorPick: false,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch the article details to prepopulate the form
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://192.168.43.144:5000/api/news/${id}`);
        if (response.status === 200) {
          const { title, content, category, author, image_url, isPopular, isEditorPick } = response.data;
          setFormData({
            title,
            content,
            category,
            author,
            coverImage: image_url,
            isPopular,
            isEditorPick,
          });
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({ ...prevState, coverImage: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append('title', formData.title);
    formPayload.append('content', formData.content);
    formPayload.append('category', formData.category);
    formPayload.append('author', formData.author);
    formPayload.append('isPopular', formData.isPopular);
    formPayload.append('isEditorPick', formData.isEditorPick);

    if (formData.coverImage instanceof File) {
      formPayload.append('image', formData.coverImage);
    }

    try {
      const response = await axios.put(
        `http://127.0.0.1:5000/api/news/${id}`,
        formPayload,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (response.status === 200) {
        alert('Article updated successfully');
        navigate('/all-articles');
      }
    } catch (error) {
      console.error('Error updating article:', error);
      alert('Failed to update article');
    }
  };

  if (loading) {
    return <p>Loading article...</p>;
  }

  return (
    <div className="add-articles">
      <div className="side">
        <Sidebar />
      </div>
      <div className="add-articles-form">
        <h1>Update Article</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Title"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="Category"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              placeholder="Author"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="coverImage">Cover Image</label>
            <input type="file" name="coverImage" onChange={handleImageChange} />
            {/* Preview current image */}
            {formData.coverImage && !(formData.coverImage instanceof File) && (
              <img
                src={formData.coverImage}
                alt="Current Cover"
                style={{ width: '100px', marginTop: '10px' }}
              />
            )}
          </div>
          <div className="form-group">
            <ReactQuill
              value={formData.content}
              onChange={(value) => setFormData((prev) => ({ ...prev, content: value }))}
              theme="snow"
              modules={{
                toolbar: [
                  [{ header: '1' }, { header: '2' }, { font: [] }],
                  [{ size: [] }],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                  ['link', 'image', 'video'],
                  ['clean'],
                ],
              }}
              formats={[
                'header',
                'font',
                'size',
                'bold',
                'italic',
                'underline',
                'strike',
                'blockquote',
                'list',
                'bullet',
                'indent',
                'link',
                'image',
                'video',
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
          <button type="submit" className="submit-button">
            Update Article
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateArticle;
