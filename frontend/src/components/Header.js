import React from 'react';
import './Header.css';
const Header = () => {
  return (
    <header className="header">
      <h1 className="header-title">FieldLens</h1>
      <nav className="header-nav">
        <a href="/" className="header-link">Home</a>
        <a href="/about" className="header-link">About</a>
        <a href="/contact" className="header-link">Contact</a>
      </nav>
      <a href="/create-pdf-report">
        <button className='header-create-pdf-report-button'>Create PDF Report</button>
      </a>
    </header>
  );
};

export default Header;
