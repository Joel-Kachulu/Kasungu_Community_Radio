import React, { useState, useEffect } from 'react';
import '../static/slider.css';

const Slider = () => {
    const [slides, setSlides] = useState([]);      // Store articles with images, titles, and content
    const [currentSlide, setCurrentSlide] = useState(0);  // Current slide index
    const [error, setError] = useState('');        // Store error messages

    // Fetch the latest news with images from the API
    const fetchLatestNewsImages = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/news/latest');
            if (response.ok) {
                const data = await response.json();
                const articles = Object.values(data.articles);

                if (articles.length === 0) {
                    throw new Error('No articles available for the slideshow.');
                }

                setSlides(articles.reverse());
            } else {
                throw new Error('Failed to fetch slideshow articles.');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    // Fetch images from the API when the component mounts
    useEffect(() => {
        fetchLatestNewsImages();
    }, []);

    // Automatically change slides every 5 seconds
    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 7000); // Change slide every 5 seconds

        return () => clearInterval(slideInterval); // Cleanup the interval on component unmount
    }, [slides.length]);

    // Go to the next slide when the arrow button is clicked
    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    return (
        <div className="slider-container">
            {error ? (
                <p className="error-message">{error}</p>  // Show error if no articles available
            ) : slides.length > 0 ? (
                <>
                    <div className="slider">
                        {/* Conditionally render image if available */}
                        {slides[currentSlide].image_url ? (
                            <img
                                src={slides[currentSlide].image_url}
                                alt={`Slide ${currentSlide + 1}`}
                                className="slider-image"
                            />
                        ) : (
                            <div className="no-image-placeholder">
                                {/* Placeholder content for articles without images */}
                                <h2>No Image Available</h2>
                            </div>
                        )}

                        {/* Slide content displayed on top of image or placeholder */}
                        <div className="slider-content">
                            <h2 className="slider-title">{slides[currentSlide].title}</h2>
                            <p className="slider-description">
                                {slides[currentSlide].content.length > 100
                                    ? `${slides[currentSlide].content.substring(0, 100)}...`
                                    : slides[currentSlide].content}
                            </p>
                        </div>
                    </div>
                    <button className="arrow-button" onClick={nextSlide}>
                        &#9654;
                    </button>
                </>
            ) : (
                <p>Loading slideshow articles...</p>  // Show loading message if data is being fetched
            )}
        </div>
    );
};

export default Slider;
