import React from 'react';
import './header.css';

function Header({ toggleTheme, isDarkMode, onMenuToggle, menuOpen }) {
  return (
    <header className="app-header">
      <div className="header-left">
        <div className="hamburger-menu-container">
          {!menuOpen && (
            <button
              className="hamburger-btn"
              onClick={onMenuToggle}
              title="Menu"
              aria-label="Menu"
            >
              ☰
            </button>
          )}
        </div>
        <div className="logo">
          <h1>Markdown Editor</h1>
        </div>
      </div>
      <div className="theme-toggle-container">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}

export default Header;