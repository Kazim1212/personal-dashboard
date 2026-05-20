import styles from './Card.module.css'

export default function Card({ title, icon, children, className = '' }) {
  return (
    <div className={`${styles.card} fade-in ${className}`}>
      {title && (
        <div className={styles.header}>
          {icon && <span className={styles.icon}>{icon}</span>}
          <span className={styles.title}>{title}</span>
        </div>
      )}
      {children}
    </div>
  )
}
