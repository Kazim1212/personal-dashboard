import { useState, useEffect } from 'react'

// Generates a synthetic but realistic-looking contribution graph
// (GitHub's real graph requires authentication / GraphQL API)
function generateWeeks(seed = 42) {
  const rng = (n) => {
    const x = Math.sin(n + seed) * 10000
    return x - Math.floor(x)
  }

  const weeks = []
  for (let w = 0; w < 52; w++) {
    const week = []
    for (let d = 0; d < 7; d++) {
      const r = rng(w * 7 + d)
      // Realistic: lots of 0s, some 1s, fewer higher levels
      const level = r < 0.45 ? 0 : r < 0.65 ? 1 : r < 0.80 ? 2 : r < 0.92 ? 3 : 4
      week.push(level)
    }
    weeks.push(week)
  }
  return weeks
}

export default function useGitHub(username) {
  const [profile, setProfile] = useState(null)
  const [repos, setRepos] = useState([])
  const [weeks, setWeeks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!username || username === 'YOUR_GITHUB_USERNAME') {
      setError('Please set your GitHub username in App.jsx')
      setLoading(false)
      return
    }

    const fetchData = async () => {
      try {
        setLoading(true)
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=10`),
        ])

        if (!profileRes.ok) throw new Error('User not found')

        const profileData = await profileRes.json()
        const reposData = await reposRes.json()

        setProfile(profileData)
        setRepos(Array.isArray(reposData) ? reposData.filter(r => !r.fork) : [])
        setWeeks(generateWeeks(profileData.id))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [username])

  return { profile, repos, weeks, loading, error }
}
