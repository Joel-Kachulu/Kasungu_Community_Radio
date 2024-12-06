// AboutUs.jsx
import React from 'react';

const AboutUs = () => {
    return (
        <div style={pageStyles.container}>
            <h2>About Us</h2>
            <p>Welcome to our platform! We are dedicated to delivering the latest news and updates to our audience. Our team works tirelessly to bring you accurate and timely information.</p>
        </div>
    );
};

const pageStyles = {
    container: {
        padding: '20px',
        backgroundColor: '#ecf0f1',
        color: '#2c3e50',
        borderRadius: '5px',
    },
};

export default AboutUs;
