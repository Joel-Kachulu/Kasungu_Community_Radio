import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navigation from './Navigation';

const SearchResults = () => {
    const location = useLocation();
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const keyword = params.get('keyword');

        fetch(`http://localhost:5000/api/news/search?keyword=${keyword}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) setError(data.error);
                else setArticles(data);
            })
            .catch(error => setError('Failed to fetch results'));
    }, [location.search]);

    return (
        
        <div style={styles.container}>
            <Navigation />
            {error && <p style={styles.error}>{error}</p>}
            {articles.length > 0 ? (
                articles.map(article => (
                    <Link to={`/news/${article.id}`} key={article.id} style={styles.articleLink}>
                        <div style={styles.article}>
                            <h2 style={styles.title}>{article.title}</h2>
                            <p style={styles.content}>{article.content.substring(0, 100)}...</p>
                        </div>
                    </Link>
                ))
            ) : (
                <p style={styles.noResults}></p>
            )}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '2rem',
        fontFamily: 'Arial, sans-serif',
        marginTop: '40px'
    },
    error: {
        color: 'red',
        textAlign: 'center',
        fontSize: '1.2rem',
    },
    articleLink: {
        textDecoration: 'none',
        color: 'inherit',
    },
    article: {
        backgroundColor: '#f9f9f9',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '1.5rem',
        transition: 'transform 0.3s ease',
    },
    articleHover: {
        transform: 'scale(1.02)',
    },
    title: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '0.5rem',
    },
    content: {
        fontSize: '1rem',
        color: '#555',
        lineHeight: '1.6',
    },
    noResults: {
        textAlign: 'center',
        fontSize: '1.2rem',
        color: '#777',
    },
};

export default SearchResults;
