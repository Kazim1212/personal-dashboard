import { useState, useEffect } from 'react'
import styles from './ClockWidget.module.css'

export default function ClockWidget() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const date = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div className={styles.clock}>
      <div className={styles.time}>{time}</div>
      <div className={styles.date}>{date}</div>
    </div>
  )
}
