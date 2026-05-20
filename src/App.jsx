import { useState } from 'react'
import GitHubWidget from './components/GitHubWidget'
import WeatherWidget from './components/WeatherWidget'
import NewsWidget from './components/NewsWidget'
import TodoWidget from './components/TodoWidget'
import ClockWidget from './components/ClockWidget'
import styles from './App.module.css'

// ── CONFIG ─────────────────────────────────────────────────────────────────
// Edit these to personalise your dashboard
export const CONFIG = {
  github: {
  username: 'Kazim1212',   // ← update this
},
profile: {
  name: 'Syed Kazim',       // ← your real name
  initials: 'SKB',          // ← your initials
  role: 'IT Consultant/Product Owner/Developer',
},
}
// ───────────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.profile}>
          <div className={styles.avatar}>{CONFIG.profile.initials}</div>
          <div>
            <h1 className={styles.name}>{CONFIG.profile.name}</h1>
            <p className={styles.role}>{CONFIG.profile.role}</p>
          </div>
        </div>
        <ClockWidget />
      </header>

      <main className={styles.grid}>
        {/* Left column */}
        <div className={styles.col}>
          <WeatherWidget />
          <TodoWidget />
        </div>

        {/* Right column */}
        <div className={styles.colWide}>
          <GitHubWidget username={CONFIG.github.username} />
          <NewsWidget />
        </div>
      </main>
    </div>
  )
}
