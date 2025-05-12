# Markdown Editor

A modern, responsive Markdown editor with live preview, file management, and export features.

## Features

- **Live Markdown Editing & Preview**  
  - Write markdown and instantly see the rendered preview side-by-side.

- **File Management**  
  - Create new markdown files (with custom file names)
  - Open existing `.md` files from your device
  - Save your work as a markdown file
  - Autosave: Your work is automatically saved in your browser

- **Export**
  - Export your markdown as a PDF (prints the rendered preview)

- **Drag-and-Drop Support**  
  - Drag a markdown file onto the editor to open it.

- **Responsive Design**  
  - Works on desktop and mobile, with a toggle for editor/preview on small screens.

- **Dark Mode**  
  - Toggle between light and dark themes.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

```bash
git clone https://github.com/yourusername/markdownEditor.git
cd markdownEditor/markdown-editor
npm install
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Usage

- **New File:** Click "🆕 New File" in the sidebar to start a new document.
- **Open:** Click "📂 Open" to load a markdown file from your device.
- **Save:** Click "💾 Save" to download your markdown file.
- **Export PDF:** Click "🖨️ Export PDF" to print or save your rendered markdown as a PDF.
- **Drag-and-Drop:** Drag a `.md` file onto the editor pane to open it.
- **Dark Mode:** Use the theme toggle in the header.

## Technologies Used

- React
- [marked](https://github.com/markedjs/marked) (Markdown parser)
- CSS (custom, with dark mode support)

---

**Enjoy writing in Markdown!**