# ❄️ Demo HVAC — Warehouse Monitoring Dashboard

A lightweight, single-page HVAC & logistics monitoring dashboard — built with plain **HTML, CSS, and JavaScript** (no framework, no build step). Simulates a real-time facility overview for a refrigerated warehouse: temperature zones, alarms, cold-chain trucks, and a live site map.

<p>
  <img alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white">
  <img alt="CSS3" src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white">
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black">
  <img alt="Leaflet" src="https://img.shields.io/badge/Leaflet.js-199900?style=flat&logo=leaflet&logoColor=white">
  <img alt="No build step" src="https://img.shields.io/badge/Build%20step-none-brightgreen">
</p>

---

## 📖 Table of Contents

- [Preview](#-preview)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Pages](#-pages)
- [Getting Started](#-getting-started)
- [Customizing the Data](#-customizing-the-data)
- [Design System](#-design-system)
- [Browser Support](#-browser-support)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 🖼 Preview

| Home | Warehouse |
|---|---|
| ![Home](https://raw.githubusercontent.com/shirinmohajeri/Hvac-Demo/refs/heads/main/first%20page.jpg) 
| ![Warehouse](docs/screenshots/w) |

| Map Panel | Truck Panel |
|---|---|
| ![Map Panel](docs/screenshots/map-panel.jpg) | ![Truck Panel](docs/screenshots/truck-panel.jpg) |

---

## ✨ Features

- 🧭 **Single-page navigation** — every module (Dashboard, Alarms, Warehouse, Truck, Map) lives in one `index.html`, swapped instantly via a small JS router. No page reloads.
- 🌡️ **Live-style zone monitoring** — temperature zones auto-color themselves (Normal / Warning / Alarm) based on live thresholds you control in the data.
- 🗺️ **Interactive map** — Leaflet-powered site map with color-coded markers and popups linking to details.
- 🚚 **Fleet & cold-chain tracking** — animated truck/road widgets showing route status and refrigerated-truck alarm states.
- 🔔 **Alarm center** — sortable table of active alarms with severity badges and acknowledge actions.
- 🧊 **Glassmorphism UI** — frosted glass cards over a soft gradient background, with color-coded hover glows per module.
- 🧩 **Zero dependencies** — pure HTML/CSS/JS. The only external resource is the Leaflet map library (CDN) and Google Fonts.
- 🔧 **Fully data-driven** — every number, alarm, and zone lives in a plain JS array/object near the top of each module, ready to be wired up to a real API.

---

## 📁 Project Structure

```
hvac-project/
│
├── index.html            # Single-page app shell — all 6 modules live here
│
├── css/
│   └── styles.css        # Full design system (glass cards, gradients, layout, animations)
│
├── js/
│   └── app.js            # Router + all module logic (data + rendering), scoped per page
│
├── assets/
│   └── Picture1.jpg       # Logo / brand image
│
└── docs/
    └── screenshots/       # Images used in this README
```

---

## 🧭 Pages

| Module | Description | Key widgets |
|---|---|---|
| 🏠 **Home** | Module launcher | Colored glass cards, one per module |
| ❄️ **Dashboard** | Facility KPIs at a glance | Stat cards, zone overview, quick links |
| 🔔 **Alarms** | Active alarm log | Severity-coded table, acknowledge action |
| 🏬 **Warehouse** | Full facility overview | Overview bar, plant/gateway status, energy stats, mini HVAC analytics |
| 🚚 **Truck** | Fleet & cold-chain logistics | Animated road widgets, refrigerated-truck alarm cards |
| 📍 **Map** | Site-level geo overview | Leaflet map, status markers, zone + device cards |

---

## 🚀 Getting Started

No installation, no build tools, no dependencies to install.

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/hvac-project.git
cd hvac-project

# 2. Open it
# Just double-click index.html, or serve it locally:
npx serve .
# or
python3 -m http.server 8080
```

> 💡 Opening `index.html` directly (`file://…`) works for everything except very strict browser security settings around the Leaflet map — if the map tiles don't load, serve the folder with a tiny local server instead (`npx serve .` is the fastest option).

---

## 🛠 Customizing the Data

Every module's data lives in a plain array or object at the top of its section inside `js/app.js` — no templating engine, no build step. For example, to change the zones shown on the Dashboard and Map:

```js
const zones = [
  { name: "Chiller",           temp: 6.5  },
  { name: "Air Handling Unit", temp: 15.2 },
  { name: "Cold Room",         temp: 22.8 },
  { name: "Loading Bay",       temp: 8.9  },
  { name: "Office Area",       temp: 19.4 },
];
```

Status colors (Normal / Warning / Alarm) are derived automatically from `temp` — no need to set color classes by hand. The same pattern is used for `devices`, `markers`, `alarms`, `trucks`, and `plants` throughout `app.js`.

---

## 🎨 Design System

- **Style:** Glassmorphism — frosted, semi-transparent cards (`backdrop-filter: blur()`) over a soft two-tone gradient background with blurred color blobs.
- **Typography:** [Poppins](https://fonts.google.com/specimen/Poppins) (Google Fonts).
- **Color coding:**
  - 🟢 Green — Normal
  - 🟡 Yellow / Amber — Warning
  - 🔴 Red — Alarm
- **Interaction:** Hover states scale and glow icons in that card's accent color; sections transition instantly via the JS router (no page reload).

---

## 🌐 Browser Support

Built with modern CSS, including `backdrop-filter` and the `:has()` selector for the icon hover glow. Fully supported in current versions of:

| Chrome / Edge | Brave | Safari | Firefox |
|---|---|---|---|
| ✅ | ✅ | ✅ (16.4+) | ✅ (121+) |

Older browser versions will still render the layout correctly, just without the blur/glass effect (graceful degradation to solid cards).

---

## 🗺 Roadmap

- [ ] Wire up a real backend / MQTT feed instead of static demo data
- [ ] Reports module (currently "Coming Soon")
- [ ] Dark mode toggle
- [ ] Mobile-optimized navigation
- [ ] Persist acknowledged alarms
---
<p align="left"><strong>Author</strong></p>
<p align="left">
  <strong>Shirin Mohajeri</strong><br>
  📧 <a href="mailto:shirin.mohajeri6b8@yahoo.com">shirin.mohajeri6b8@yahoo.com</a><br>
  🐙 <a href="https://github.com/shirinmohajeri/">github.com/shirinmohajeri</a><br>
  💼 <a href="https://www.linkedin.com/in/shirin-mohajeri">linkedin.com/in/shirin-mohajeri</a>
</p>
