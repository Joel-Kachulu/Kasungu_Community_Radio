import React, { useState } from 'react';
import '../static/navbar.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?keyword=${searchTerm}`);
        }
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
            <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit" className="search-icon">🔍</button>
                </form>
            <div className="hamburger" onClick={toggleMenu}>
                &#9776;
            </div>
        </header>
    );
};

export default Navigation;
