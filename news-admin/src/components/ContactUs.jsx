// ContactUs.jsx
import React from 'react';

const ContactUs = () => {
    return (
        <div style={pageStyles.container}>
            <h2>Contact Us</h2>
            <p>If you have any questions, feel free to reach out to us!</p>
            <p>Email: info@ourplatform.com</p>
            <p>Phone: +123 456 7890</p>
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

export default ContactUs;
