import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import NewsList from '../components/NewsList';
import Footer from '../components/Footer';
import axios from 'axios';

const NewsCategoryPage = () => {
    const { category } = useParams(); // Extract category from URL
    const [categoryNews, setCategoryNews] = useState([]);
    const [error, setError] = useState(null);
    const location = useLocation();

    const fetchCategoryNews = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/api/news/category/${category}`);
            setCategoryNews(Object.values(response.data));
        } catch (error) {
            setError(`Error fetching news for ${category}`);
        }
    };

    useEffect(() => {
        fetchCategoryNews();
    }, [category]);

    return (
        <div>
            <Navigation />
            <h2>{category} News</h2>
            {error ? (
                <p>{error}</p>
            ) : (
                <NewsList news={categoryNews} pageTitle={category} />
            )}
            <Footer />
        </div>
    );
};

export default NewsCategoryPage;
