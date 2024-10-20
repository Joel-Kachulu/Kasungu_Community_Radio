import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import NewsList from '../components/NewsList';
import Footer from '../components/Footer';
import axios from 'axios'; // Import axios for API calls

const Politics = () => {
    const [politicsNews, setPoliticsNews] = useState([]);
    const [error, setError] = useState(null);

    // Fetch business news articles from the backend
    const fetchPoliticsNews = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/news/category/Politics');
            setPoliticsNews(Object.values(response.data)); // Set the fetched data
        } catch (error) {
            setError('Error fetching business news'); // Handle error
        }
    };

    // Use useEffect to fetch data when the component is mounted
    useEffect(() => {
        fetchPoliticsNews();
    }, []);

    return (
        <div>
            <Navigation />
            <h3>Politics News</h3>
            {error ? (
                <p>{error}</p> // Display error message if there's an error
            ) : (
                <NewsList news={politicsNews} /> // Pass the fetched news to NewsList
            )}
            <Footer />
        </div>
    );
};

export default Politics;
