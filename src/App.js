import React, { useState, useEffect } from 'react';
import Editor from './components/Editor/editor';
import Preview from './components/Preview/preview';
import Header from './components/Header/header';
import './App.css';

function App() {
  const [markdown, setMarkdown] = useState('# Hello, Markdown');
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || false
  );

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };
  
  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
  };

  const [mobileView, setMobileView] = useState('editor'); // 'editor' or 'preview'
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  const toggleMobileView = () => {
    setMobileView(mobileView === 'editor' ? 'preview' : 'editor');
  };

  // Apply dark mode class to body when component mounts or darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <Header toggleTheme={toggleTheme} isDarkMode={darkMode} />
      
      {isMobile && (
        <div className="mobile-toggle">
          <button 
            onClick={toggleMobileView}
            className="toggle-btn"
          >
            {mobileView === 'editor' ? 'Show Preview' : 'Show Editor'}
          </button>
        </div>
      )}
      
      <div className="split-container">
        <Editor 
          value={markdown} 
          onChange={handleChange}
          className={isMobile && mobileView !== 'editor' ? 'hidden' : ''}
        />
        <Preview 
          markdown={markdown}
          className={isMobile && mobileView !== 'preview' ? 'hidden' : ''}
        />
      </div>
    </div>
  );
}

export default App;
