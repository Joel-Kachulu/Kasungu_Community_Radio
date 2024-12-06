// Button.jsx
import React from 'react';

const Button = ({ label, icon, onClick }) => {
    return (
        <button onClick={onClick} style={styles.button}>
            <div style={styles.iconContainer}>{icon}</div>
            <span style={styles.label}>{label}</span>
        </button>
    );
};

const styles = {
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '120px',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#f7f9fc',
        border: '1px solid #e0e6ed',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        transition: 'transform 0.2s',
    },
    iconContainer: {
        fontSize: '36px',
        color: '#69707a',
        marginRight: '10px',
    },
    label: {
        fontSize: '20px',
        fontWeight: '600',
        color: '#333',
    },
    buttonHover: {
        transform: 'translateY(-5px)',
    },
};

export default Button;
   