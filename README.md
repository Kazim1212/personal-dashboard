# 🗂️ Personal Dashboard

A sleek developer dashboard built with **React + Vite**, pulling live data from GitHub, weather, and dev news APIs — all in one place.

[![CI](https://github.com/YOUR_USERNAME/personal-dashboard/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/personal-dashboard/actions)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/personal-dashboard)

---

## ✨ Features

| Widget | Data source | Auth required? |
|--------|-------------|---------------|
| **GitHub stats** | GitHub REST API | No (public repos only) |
| **Contribution graph** | Seeded procedural (GitHub GraphQL requires auth) | — |
| **Weather** | [Open-Meteo](https://open-meteo.com/) | No |
| **5-day forecast** | Open-Meteo | No |
| **Dev news feed** | Hacker News + GitHub Blog RSS | No |
| **Todo list** | `localStorage` | — |
| **Live clock** | Browser `Date` | — |

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/personal-dashboard.git
cd personal-dashboard
npm install
```

### Configuration

Open `src/App.jsx` and update the `CONFIG` object:

```js
export const CONFIG = {
  github: {
    username: 'YOUR_GITHUB_USERNAME',   // ← your GitHub handle
  },
  weather: {
    latitude:  48.8566,   // ← your city's coordinates
    longitude: 2.3522,
    city: 'Paris',
  },
  profile: {
    name: 'Your Name',
    role: 'Full-Stack Developer',
    initials: 'YN',
  },
}
```

> **Tip**: Find your coordinates at [latlong.net](https://www.latlong.net/).

### Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Deployment

### Deploy to Vercel (recommended)

Click the button at the top of this README, or run:

```bash
npm install -g vercel
vercel
```

### Deploy to GitHub Pages

```bash
npm run build
# Then push the dist/ folder to the gh-pages branch
```

---

## 🗂️ Project Structure

```
personal-dashboard/
├── src/
│   ├── components/
│   │   ├── Card.jsx              # Reusable card wrapper
│   │   ├── GitHubWidget.jsx      # GitHub stats + repos
│   │   ├── WeatherWidget.jsx     # Weather + forecast
│   │   ├── NewsWidget.jsx        # RSS news feed
│   │   ├── TodoWidget.jsx        # Persistent todo list
│   │   └── ClockWidget.jsx       # Live clock
│   ├── hooks/
│   │   ├── useGitHub.js          # GitHub API fetching
│   │   ├── useWeather.js         # Open-Meteo fetching
│   │   └── useNews.js            # RSS feed fetching
│   ├── App.jsx                   # Root layout + CONFIG
│   └── index.css                 # Global styles
├── .github/
│   └── workflows/
│       └── ci.yml                # Lint + build on every push
└── vite.config.js
```

---

## 🛠️ Tech Stack

- **React 18** — UI components & hooks
- **Vite** — Fast dev server & bundler
- **CSS Modules** — Scoped component styling
- **Open-Meteo API** — Free weather (no key needed)
- **GitHub REST API** — Public profile & repo data
- **rss2json** — RSS → JSON proxy for news feeds
- **GitHub Actions** — CI pipeline (lint + build)

---

## 📄 License

MIT © YOUR_NAME
