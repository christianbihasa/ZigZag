# ZigZag Arcade 🎮

A modern 3D web application and arcade tribute to Ketchapp's iconic mobile game **ZigZag**, built using **Three.js** and modular JavaScript.

---

## ✨ Features

- **3D Isometric Arcade Gameplay**: Real-time WebGL rendering powered by Three.js with dynamic lighting and shadow mapping.
- **Customizable Gameplay Settings**:
  - **Ball Speed Modes**: Choose between *Slow*, *Normal*, or *Fast* preset speeds with progressive acceleration as your score increases.
  - **Direction Modes**: Customize vector directions (*Down*, *Up*, *Right*, *Left*).
  - **Ball Color Swatches**: Pick from 10 custom swatches (Classic Dark, Gold, Crimson, Cyan, Neon Lime, Electric Purple, Neon Orange, Hot Pink, Snow White, Emerald).
- **Per-Mode High Score Tracking**: High scores are independently tracked and saved per direction mode using `localStorage`.
- **Dynamic Theme Manager**: Visual environment and platform colors evolve dynamically as your score climbs.
- **Forgiving Collision Engine**: Ball triggers game-over only after fully clearing platform edges.
- **Clean UI & Modal System**:
  - Glassmorphism overlay panels with frosted background blur (`backdrop-filter`).
  - Context-aware HUD that automatically hides instructional cues during active runs to maximize viewability.
- **Cross-Platform Controls**: Responsive canvas auto-scaling with built-in touch support for mobile devices.

---

## 🎮 Controls

| Platform | Action | Result |
| :--- | :--- | :--- |
| **Desktop (PC)** | Press **Spacebar** or **Left-Click** | Change ball direction |
| **Mobile Device** | **Tap** anywhere on screen | Change ball direction |

---

## 🛠️ Tech Stack

- **Graphics Engine**: [Three.js](https://threejs.org/) (WebGL)
- **Development Server / Bundler**: [Vite](https://vitejs.dev/)
- **Core Language**: JavaScript (ES6 Modules)
- **Styling**: HTML5 & CSS3 (Flexbox, CSS Animations, Backdrop Blur)
- **Data Persistence**: Web Storage API (`localStorage`)

---

## 📁 Project Structure

```text
ZigZag/
├── css/
│   └── style.css            # Layout, modal overlays, swatches, and animations
├── js/
│   ├── main.js              # Main Game class and loop controller
│   ├── ball.js              # Ball entity, movement physics, and color state
│   ├── camera.js            # Isometric camera management and smooth tracking
│   ├── config.js            # Global speed presets, colors, and default configs
│   ├── input.js             # Keyboard, mouse, and touch event listeners
│   ├── introModal.js        # Onboarding screen and controls modal handler
│   ├── pathManager.js       # Procedural platform generation & collision detection
│   ├── settingsModal.js     # Settings logic (speed, direction, ball colors)
│   └── themeManager.js      # Adaptive color themes driven by score benchmarks
├── index.html               # Main UI markup and modal DOM containers
├── package.json             # Project dependencies and Vite build scripts
└── vite.config.js           # Vite dev server configuration

```

---

## 🚀 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (v16.0 or higher recommended)
* `npm` or `yarn`

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/christianbihasa/ZigZag.git

```


2. **Install dependencies:**
```bash
npm install

```


3. **Start the development server:**
```bash
npm run dev

```


4. **Launch the app:**
Open the local server URL provided in your terminal (typically `http://localhost:5173/`).

### Production Build

To build the project assets for deployment:

```bash
npm run build

```

---

## 📜 Credits & Acknowledgments

This project is created as an arcade tribute to **ZigZag**, originally developed by **Ketchapp**. All original conceptual gameplay rights belong to their respective creators.