import { Newspaper, ExternalLink } from 'lucide-react'
import Card from './Card'
import useNews from '../hooks/useNews'
import styles from './NewsWidget.module.css'

const TIME_AGO = (dateStr) => {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000
  if (diff < 3600) return `${Math.round(diff / 60)}m ago`
  if (diff < 86400) return `${Math.round(diff / 3600)}h ago`
  return `${Math.round(diff / 86400)}d ago`
}

export default function NewsWidget() {
  const { articles, loading, error } = useNews()

  if (loading) {
    return (
      <Card title="Dev News" icon={<Newspaper size={14} />}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} className={`skeleton ${styles.skeleton}`} style={{ marginBottom: 10 }} />
        ))}
      </Card>
    )
  }

  if (error || !articles.length) {
    return (
      <Card title="Dev News" icon={<Newspaper size={14} />}>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
          Could not load news. Check your network connection.
        </p>
      </Card>
    )
  }

  return (
    <Card title="Dev News" icon={<Newspaper size={14} />}>
      <div className={styles.list}>
        {articles.map((a, i) => (
          <a
            key={i}
            href={a.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.article}
          >
            <div className={styles.articleTop}>
              <span className={styles.source}>{a.source}</span>
              <span className={styles.time}>{TIME_AGO(a.pubDate)}</span>
            </div>
            <p className={styles.title}>{a.title}</p>
            <ExternalLink size={11} className={styles.externalIcon} />
          </a>
        ))}
      </div>
    </Card>
  )
}
