import React from 'react';
import { marked } from 'marked';
import './Preview.css'

function Preview({ markdown }) {
  return (
    <div className="preview-pane">
      <div className="pane-header">PREVIEW</div>
      <div
        className="preview"
        dangerouslySetInnerHTML={{ __html: marked(markdown) }}
      />
    </div>
  );
}

export default Preview;