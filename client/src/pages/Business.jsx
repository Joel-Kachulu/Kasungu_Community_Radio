import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import NewsList from '../components/NewsList';
import Footer from '../components/Footer';
import axios from 'axios'; // Import axios for API calls

const Business = () => {
    const [businessNews, setBusinessNews] = useState([]);
    const [error, setError] = useState(null);

    // Fetch business news articles from the backend
    const fetchBusinessNews = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/news/category/Business');
            setBusinessNews(Object.values(response.data)); // Set the fetched data
        } catch (error) {
            setError('Error fetching business news'); // Handle error
        }
    };

    // Use useEffect to fetch data when the component is mounted
    useEffect(() => {
        fetchBusinessNews();
    }, []);

    return (
        <div>
            <Navigation />
            <h3>Business News</h3>
            {error ? (
                <p>{error}</p> // Display error message if there's an error
            ) : (
                <NewsList news={businessNews} /> // Pass the fetched news to NewsList
            )}
            <Footer />
        </div>
    );
};

export default Business;
