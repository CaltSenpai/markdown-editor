import React, { useRef } from 'react';
import { marked } from 'marked';
import './Sidebar.css';

function Sidebar({ isOpen, onClose, onOpenFile, onSaveFile, onNewFile, markdown, fileName }) {
  const fileInputRef = useRef();

  const handleOpenClick = () => {
    fileInputRef.current.click();
    onClose();
  };

  const handleExportPDF = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`<html><body>${marked.parse(markdown)}</body></html>`);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    isOpen && (
      <div className="sidebar-menu">
        <button
          className="sidebar-close-btn"
          onClick={onClose}
          title="Close Menu"
          aria-label="Close Menu"
        >
          &#x2716;
        </button>
        <button className="sidebar-item" onClick={onNewFile}>
          🆕 New File
        </button>
        <button className="sidebar-item" onClick={handleOpenClick}>
          📂 Open
        </button>
        <input
          type="file"
          accept=".md,.markdown,text/markdown"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={onOpenFile}
        />
        <button className="sidebar-item" onClick={onSaveFile}>
          💾 Save
        </button>
        <button className="sidebar-item" onClick={handleExportPDF}>
          🖨️ Export PDF
        </button>
      </div>
    )
  );
}

export default Sidebar;