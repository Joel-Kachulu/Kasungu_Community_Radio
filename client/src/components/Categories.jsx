import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewsCard from './NewsCard';
import '../static/categories.css';
import { FaArrowRight } from 'react-icons/fa';
import axios from 'axios';

const Categories = () => {
    const [categoriesData, setCategoriesData] = useState([]); // State to store fetched articles
    const [error, setError] = useState(null); // State to handle any errors
    const navigate = useNavigate(); // Initialize navigate

    // Function to fetch articles from the backend
    const fetchRandomArticles = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/news/random_by_category'); // Make API request
            setCategoriesData(Object.values(response.data)); // Extract articles and set state
        } catch (error) {
            setError('Error fetching articles'); // Set error if API call fails
        }
    };

    // useEffect to fetch data when the component loads
    useEffect(() => {
        fetchRandomArticles();
    }, []);

    // Function to handle card click
    const handleCardClick = (id) => {
        navigate(`/news/${id}`); // Navigate to full news page by ID
    }

    return (
        <div className="categories-section">
            <h2 className="cat-heading">Explore Categories</h2>
            {error ? (
                <div className="error">{error}</div> // Display error message if there's an issue
            ) : (
                <div className="categories-grid-wrapper">
                    <div className="categories-grid">
                        {categoriesData.map((category, index) => (
                            <div key={index} onClick={() => handleCardClick(category.id)}>
                                <NewsCard
                                    image={category.image_url} // Dynamically set image from backend
                                    title={category.category} // Dynamically set category title
                                    size="medium"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="scroll-arrow">
                        <FaArrowRight /> {/* Right pointing arrow to guide users */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Categories;
