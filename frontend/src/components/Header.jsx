import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          FurniFit
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/visualize" className="nav-link">Start Designing</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
