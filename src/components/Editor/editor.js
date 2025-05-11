import React from 'react';
import './Editor.css'

function Editor({ value, onChange }) {
  return (
    <div className="editor-pane">
      <div className="pane-header">MARKDOWN</div>
      <textarea
        value={value}
        onChange={onChange}
        className="editor"
        spellCheck="false"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />
    </div>
  );
}

export default Editor;