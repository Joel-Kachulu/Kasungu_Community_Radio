import React, { useState } from 'react';
import axios from 'axios';

function LoginUser() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/users/login', formData, {
                headers: { 'Content-Type': 'application/json' },
            });
            setSuccess(response.data.message);
            // Optionally save the user ID or token to session/local storage here
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2 style={styles.title}>Login</h2>
                {error && <p style={{ ...styles.message, color: 'red' }}>{error}</p>}
                {success && <p style={{ ...styles.message, color: 'green' }}>{success}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>Login</button>
                </form>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f2f3f7',
    },
    formContainer: {
        width: '100%',
        maxWidth: '400px',
        padding: '2rem',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    title: {
        fontSize: '1.8rem',
        color: '#333',
        marginBottom: '1.5rem',
    },
    message: {
        fontSize: '0.9rem',
        marginBottom: '1rem',
    },
    input: {
        width: '100%',
        padding: '0.8rem',
        margin: '0.5rem 0',
        fontSize: '1rem',
        borderRadius: '5px',
        border: '1px solid #ddd',
        boxSizing: 'border-box',
        outline: 'none',
    },
    button: {
        width: '100%',
        padding: '0.8rem',
        marginTop: '1rem',
        fontSize: '1rem',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
};

export default LoginUser;
