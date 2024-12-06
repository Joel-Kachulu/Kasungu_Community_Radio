import React from "react";

const Footer = () => {
  return (
    <footer style={footerStyles}>
      <p style={textStyles}>&copy; 2024 Kasungu Community Radio</p>
      <div style={iconContainerStyles}>
        <a
          href="https://www.youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          style={iconLinkStyles}
        >
          <i className="fab fa-youtube" style={iconStyles}></i>
        </a>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          style={iconLinkStyles}
        >
          <i className="fab fa-facebook" style={iconStyles}></i>
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          style={iconLinkStyles}
        >
          <i className="fab fa-twitter" style={iconStyles}></i>
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          style={iconLinkStyles}
        >
          <i className="fab fa-instagram" style={iconStyles}></i>
        </a>
      </div>
    </footer>
  );
};

// Inline styles for the footer and icons
const footerStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  backgroundColor: "#333",
  color: "#fff",
  fontSize: "14px",
};

const textStyles = {
  marginBottom: "10px",
};

const iconContainerStyles = {
  display: "flex",
  gap: "15px",
};

const iconLinkStyles = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "20px",
};

const iconStyles = {
  transition: "color 0.3s",
};

// Optional hover effect
iconLinkStyles[':hover'] = {
  color: "#ff6347", // Light red highlight
};

export default Footer;
