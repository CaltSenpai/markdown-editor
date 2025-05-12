import React, { useState, useEffect } from 'react';
import Editor from './components/Editor/editor';
import Preview from './components/Preview/preview';
import Header from './components/Header/header';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';

function App() {
  const [markdown, setMarkdown] = useState('');
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || false
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fileName, setFileName] = useState('Untitled.md'); // Add this line

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };
  
  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
  };

  const handleSave = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName || 'markdown.md'; // Use current file name
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleOpen = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setFileName(file.name); // Set file name when opening
    const reader = new FileReader();
    reader.onload = (e) => {
      setMarkdown(e.target.result);
    };
    reader.readAsText(file);
    // Reset input so the same file can be opened again if needed
    event.target.value = '';
  };

  const handleNewFile = () => {
    if (markdown.trim()) {
      const proceed = window.confirm(
        "Creating a new file will erase the current content. Do you want to continue?"
      );
      if (!proceed) return;
    }
    const name = window.prompt('Enter a name for your new file:', 'Untitled.md');
    if (name && name.trim()) {
      setFileName(name.trim());
    } else {
      setFileName('Untitled.md');
    }
    setMarkdown('');
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

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('markdown-autosave');
    if (saved) setMarkdown(saved);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('markdown-autosave', markdown);
  }, [markdown]);

  return (
    <>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpenFile={handleOpen}
        onSaveFile={handleSave}
        onNewFile={handleNewFile}
      />
      <div className={`App${sidebarOpen ? ' sidebar-open' : ''} ${darkMode ? 'dark-mode' : ''}`}>
        <Header
          toggleTheme={toggleTheme}
          isDarkMode={darkMode}
          onMenuToggle={() => setSidebarOpen((open) => !open)}
          menuOpen={sidebarOpen}
        />
        {isMobile && (
          <div className="mobile-toggle">
            <span className="file-name">{fileName}</span>
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
    </>
  );
}

export default App;
