import { useEffect, useState } from 'react'
import { Github, Star, GitFork, Users, BookOpen } from 'lucide-react'
import Card from './Card'
import useGitHub from '../hooks/useGitHub'
import styles from './GitHubWidget.module.css'

const LANG_COLORS = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Rust: '#dea584',
  Go: '#00ADD8',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Shell: '#89e051',
}

function ContribGraph({ weeks }) {
  return (
    <div className={styles.contribGrid}>
      {weeks.map((week, wi) =>
        week.map((level, di) => (
          <div
            key={`${wi}-${di}`}
            className={`${styles.cell} ${styles[`l${level}`]}`}
            title={`Level ${level}`}
          />
        ))
      )}
    </div>
  )
}

function RepoCard({ repo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.repo}
    >
      <div className={styles.repoTop}>
        <span className={styles.repoName}>{repo.name}</span>
        {repo.language && (
          <span className={styles.lang}>
            <span
              className={styles.langDot}
              style={{ background: LANG_COLORS[repo.language] || '#8b949e' }}
            />
            {repo.language}
          </span>
        )}
      </div>
      {repo.description && (
        <p className={styles.repoDesc}>{repo.description}</p>
      )}
      <div className={styles.repoMeta}>
        <span><Star size={12} /> {repo.stargazers_count}</span>
        <span><GitFork size={12} /> {repo.forks_count}</span>
      </div>
    </a>
  )
}

export default function GitHubWidget({ username }) {
  const { profile, repos, weeks, loading, error } = useGitHub(username)

  if (loading) {
    return (
      <Card title="GitHub" icon={<Github size={14} />}>
        <div className={styles.skeletonRow}>
          {[1, 2, 3].map(i => (
            <div key={i} className={`skeleton ${styles.skeletonMetric}`} />
          ))}
        </div>
        <div className={`skeleton ${styles.skeletonGraph}`} />
      </Card>
    )
  }

  if (error) {
    return (
      <Card title="GitHub" icon={<Github size={14} />}>
        <p className={styles.error}>
          Could not load GitHub data. Check your username in <code>App.jsx</code>.
        </p>
      </Card>
    )
  }

  return (
    <Card title="GitHub" icon={<Github size={14} />}>
      {/* Stats row */}
      <div className={styles.statsRow}>
        <div className={styles.stat}>
          <span className={styles.statVal}>{profile.public_repos}</span>
          <span className={styles.statKey}><BookOpen size={11} /> repos</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statVal}>{profile.followers}</span>
          <span className={styles.statKey}><Users size={11} /> followers</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statVal}>
            {repos.reduce((s, r) => s + r.stargazers_count, 0)}
          </span>
          <span className={styles.statKey}><Star size={11} /> stars</span>
        </div>
      </div>

      {/* Contribution graph */}
      <p className={styles.sectionLabel}>contribution activity</p>
      <ContribGraph weeks={weeks} />

      {/* Top repos */}
      <p className={styles.sectionLabel} style={{ marginTop: 16 }}>top repositories</p>
      <div className={styles.repoList}>
        {repos.slice(0, 4).map(r => <RepoCard key={r.id} repo={r} />)}
      </div>
    </Card>
  )
}
