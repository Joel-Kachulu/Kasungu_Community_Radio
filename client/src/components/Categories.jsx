import React, { useEffect, useState } from 'react';
import NewsCard from './NewsCard';
import '../static/categories.css';
import { FaArrowRight } from 'react-icons/fa'; // Importing an arrow icon
import axios from 'axios'; // Axios to make API calls

const Categories = () => {
    const [categoriesData, setCategoriesData] = useState([]); // State to store fetched articles
    const [error, setError] = useState(null); // State to handle any errors

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

    return (
        <div className="categories-section">
            <h2 className="cat-heading">Categories</h2>
            {error ? (
                <div className="error">{error}</div> // Display error message if there's an issue
            ) : (
                <div className="categories-grid-wrapper">
                    <div className="categories-grid">
                        {categoriesData.map((category, index) => (
                            <NewsCard
                                key={index} // Use index as the key since title could be duplicated
                                image={category.image_url} // Dynamically set image from backend
                                title={category.category} // Dynamically set category title
                                //description={category.content} // Dynamically set description (content)
                                //author={category.author}
                                //date={new Date(category.published_at).toLocaleDateString()} // Format date
                                size="medium"
                            />
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
