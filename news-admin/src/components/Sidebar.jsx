import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "../static/Sidebar.css";

const Sidebar = () => {
  const [showNewsDropdown, setShowNewsDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const toggleDropdown = (dropdownSetter) => {
    dropdownSetter((prev) => !prev);
  };

  return (
    <div className="sidebar">
      <h2>KCR</h2>
      <ul className="sidebar-menu">
        

        {/* News Management Dropdown */}
        <li
          onClick={() => toggleDropdown(setShowNewsDropdown)}
          className="dropdown"
        >
          News Management
          <span className={`dropdown-icon ${showNewsDropdown ? "open" : ""}`}>
            ▼
          </span>
        </li>
        {showNewsDropdown && (
          <ul className="dropdown-menu">
            <li> <Link to="/add-article">Add News</Link> </li>
            
            <li> <Link to="/delete-article">Trash News</Link> </li>
          </ul>
        )}

        {/* Category Management Dropdown */}
        <li
          onClick={() => toggleDropdown(setShowCategoryDropdown)}
          className="dropdown"
        >
          Category Management
          <span
            className={`dropdown-icon ${showCategoryDropdown ? "open" : ""}`}
          >
            ▼
          </span>
        </li>
        {showCategoryDropdown && (
          <ul className="dropdown-menu">
            <li>Add Category</li>
            <li>Delete Category</li>
            <li>Update Category</li>
          </ul>
        )}

        {/* User Management Dropdown */}
        <li
          onClick={() => toggleDropdown(setShowUserDropdown)}
          className="dropdown"
        >
          User Management
          <span className={`dropdown-icon ${showUserDropdown ? "open" : ""}`}>
            ▼
          </span>
        </li>
        {showUserDropdown && (
          <ul className="dropdown-menu">
            <li>Add User</li>
            <li>Delete User</li>
            <li>Update User</li>
          </ul>
        )}

        <li>Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
