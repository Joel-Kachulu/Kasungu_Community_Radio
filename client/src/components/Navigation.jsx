// Navigation.jsx
import React, { useState } from 'react';
import '../static/navbar.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
    const [menuOpen, setMenuOpen] = useState(false); // State to track menu visibility
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header>
            <div className="logo">
                <img src={logo} alt="Logo" className="logopng" />
            </div>
            <nav className={menuOpen ? 'responsive_nav' : ''}>
                <ul>
                    <li onClick={() => navigate('/')}>Home</li>
                    <li onClick={() => navigate('/National')}>National</li>
                    <li onClick={() => navigate('/Entertainment')}>Entertainment</li>
                    <li onClick={() => navigate('/Sports')}>Sports</li>
                    <li onClick={() => navigate('/Politics')}>Politics</li>
                    <li onClick={() => navigate('/Business')}>Business</li>
                    <li onClick={() => navigate('/Health')}>Health</li>
                    <li onClick={() => navigate('/Other')}>Other</li>
                </ul>
            </nav>
            <div className="hamburger" onClick={toggleMenu}>
                &#9776; {/* This is the hamburger icon */}
            </div>
        </header>
    );
};

export default Navigation;
