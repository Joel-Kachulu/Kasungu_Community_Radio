// Business.jsx
import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import NewsList from '../components/NewsList';
import Footer from '../components/Footer';
import RecentComments from '../components/RecentComments';
import axios from 'axios';

const Business = () => {
    const [businessNews, setBusinessNews] = useState([]);
    const [error, setError] = useState(null);

    const fetchBusinessNews = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/news/category/Business');
            setBusinessNews(Object.values(response.data));
        } catch (error) {
            setError('Error fetching business news');
        }
    };

    useEffect(() => {
        fetchBusinessNews();
    }, []);

    return (
        <div>
            <Navigation />
            <h2>Business News</h2>
            {error ? (
                <p>{error}</p>
            ) : (
                <NewsList news={businessNews} pageTitle="Business" />
            )}
            {/* Include RecentComments for the Business category */}
            {/*<RecentComments category="Business" />*/}
            <Footer />
        </div>
    );
};

export default Business;
