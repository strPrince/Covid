import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-title">CovidData</div>
      <div className="navbar-container">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/add" className="navbar-link">Add Data</Link>
        <Link to="/highcase" className="navbar-link">High Cases & Deaths</Link>
      </div>
    </nav>
  );
};

export default Navbar;