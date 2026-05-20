import { useState, useEffect } from 'react'

// Tech/dev RSS feeds via rss2json (free tier, no API key for basic usage)
const FEEDS = [
  { url: 'https://hnrss.org/frontpage', source: 'Hacker News' },
  { url: 'https://feeds.feedburner.com/TheDailyWtf', source: 'The Daily WTF' },
  { url: 'https://github.blog/changelog/feed/', source: 'GitHub' },
]

const RSS2JSON = 'https://api.rss2json.com/v1/api.json'

export default function useNews() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // Fetch from all feeds concurrently
        const results = await Promise.allSettled(
          FEEDS.map(async ({ url, source }) => {
            const res = await fetch(
              `${RSS2JSON}?rss_url=${encodeURIComponent(url)}&count=4`
            )
            const data = await res.json()
            if (data.status !== 'ok') return []
            return data.items.map(item => ({
              title: item.title,
              link: item.link,
              pubDate: item.pubDate,
              source,
            }))
          })
        )

        const all = results
          .filter(r => r.status === 'fulfilled')
          .flatMap(r => r.value)

        // Sort by date, newest first
        all.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))

        setArticles(all.slice(0, 8))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [])

  return { articles, loading, error }
}
