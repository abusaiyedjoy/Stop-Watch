# Stopwatch Application

A simple, web-based stopwatch built with **vanilla HTML, CSS, and JavaScript**. This application provides a clean and modern interface for timing activities, featuring lap functionality and keyboard shortcuts. It is a **single-page application** that runs entirely in the browser with no backend requirements.

---

## 🚀 Overview

- **Frontend Only**: Runs completely in the browser using HTML, CSS, and JavaScript.
- **No Backend Required**: Lightweight and easy to deploy.
- **Static File Serving**: For development, the app is served using Python’s built-in HTTP server.

---

## 🧱 System Architecture

- **Frontend-Only Architecture**: Entirely client-side.
- **Static File Hosting**: Served through Python's built-in HTTP server (e.g., `python -m http.server`).

---

## 🔑 Key Components

### 1. `index.html` – HTML Structure
- ✅ **Semantic HTML5** for better accessibility and structure.
- ✅ **ARIA Labels** and live regions for screen reader support.
- ✅ **Responsive Design** with proper meta tags for mobile devices.

### 2. `style.css` – CSS Styling
- 🎨 **Modern Design** using gradient backgrounds and glassmorphism.
- 📱 **Responsive Layout** with flexbox.
- ✍️ **Visual Hierarchy** maintained through clean typography and spacing.
- ⚡ **Smooth Animations** via CSS transitions.

### 3. `script.js` – JavaScript Logic
- 🔧 **Class-Based Architecture** using ES6 syntax for modularity.
- 🎯 **Event-Driven**: Supports click and keyboard events.
- ⏱️ **State Management**: Tracks running state, elapsed time, and lap history.
- 🖥️ **Optimized Performance** with `requestAnimationFrame` for accurate and smooth timing.

---

