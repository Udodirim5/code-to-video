# CodeToVideo Documentation

Welcome to the **CodeToVideo** documentation — your go-to guide for turning code into clean, animated videos.

---

## 🚀 Quick Start Guide

### 1. Install & Setup
```bash
npm install codetovideo
```

```js
import { CodeToVideo } from "codetovideo";
```

### 2. Basic Usage
```js
<CodeToVideo
  code={`const greet = () => console.log("Hello World!")`}
  language="javascript"
/>
```

### 3. Export Your Video
```js
await exportToMP4({ filename: "demo.mp4" });
```

---

## 🧠 How It Works

### 🔠 Syntax Highlighting
- Powered by CodeMirror with theme support

### ✍️ Typing Animation
- Custom speed and delay options
- Character-by-character rendering

### 🎞️ Rendering Engine
- Uses `ffmpeg.js` to render each frame in the browser
- All rendering is done client-side

---

## ⚙️ Customization

### CodeMirror Themes
```js
<CodeToVideo theme="dracula" />
```

### Typing Speed
```js
<CodeToVideo typingSpeed={50} /> // milliseconds per character
```

### Fonts & Layout
```js
<CodeToVideo fontFamily="Fira Code" fontSize={16} />
```

---

## 📦 Export Options

### Supported Formats
- MP4 (default)
- WebM (coming soon)

### Frame Control
- Frame rate: 30fps default
- Auto-trimming on export

---

## 🛠️ Troubleshooting

### Blank Screen on Export
- Ensure `ffmpeg.js` is loaded properly
- Check memory usage (heavy code may cause slowdowns)

### Syntax Error in Code Block
- Ensure your code is valid for the selected language
- Avoid incomplete lines

---

## ❓ FAQ

**Can I use this with React only?**
> Yes, it’s a React component library at the moment.

**Will you support plain HTML or Vue?**
> Possibly in the future.

**Can I add voiceover or sound?**
> Not yet, but we're exploring audio layers.

---

## 📌 What's New

### v0.1.0
- Initial release
- Typing effect + export
- CodeMirror integration

Upcoming:
- WebM export
- Audio overlay
- Code themes picker

---

## 📎 Coming Soon
- Timeline editor
- Sound effects
- Presets for TikTok & YouTube

---

## 📂 Deployment

You can deploy this documentation using:
- [Docusaurus](https://docusaurus.io)
- [Next.js static export](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports)

---

## 💬 Need Help?
Join the Discord (coming soon) or open an issue on [GitHub](https://github.com/yourrepo)

---

> This documentation will evolve as the project grows — contributions welcome!

