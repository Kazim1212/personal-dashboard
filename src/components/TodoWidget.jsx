import { useState } from 'react'
import { CheckSquare, Plus, Trash2 } from 'lucide-react'
import Card from './Card'
import styles from './TodoWidget.module.css'

const STORAGE_KEY = 'dashboard-todos'

const loadTodos = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
      { id: 1, text: 'Set up repo structure', done: true },
      { id: 2, text: 'Write README', done: true },
      { id: 3, text: 'Add CI/CD pipeline', done: false },
      { id: 4, text: 'Deploy to Vercel', done: false },
    ]
  } catch {
    return []
  }
}

export default function TodoWidget() {
  const [todos, setTodos] = useState(loadTodos)
  const [input, setInput] = useState('')

  const save = (next) => {
    setTodos(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  const toggle = (id) => save(todos.map(t => t.id === id ? { ...t, done: !t.done } : t))
  const remove = (id) => save(todos.filter(t => t.id !== id))
  const add = () => {
    const text = input.trim()
    if (!text) return
    save([...todos, { id: Date.now(), text, done: false }])
    setInput('')
  }

  const done = todos.filter(t => t.done).length

  return (
    <Card title="Today" icon={<CheckSquare size={14} />}>
      <div className={styles.progress}>
        <div className={styles.progressLabel}>
          {done} / {todos.length} done
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: todos.length ? `${(done / todos.length) * 100}%` : '0%' }}
          />
        </div>
      </div>

      <ul className={styles.list}>
        {todos.map(t => (
          <li key={t.id} className={styles.item}>
            <button
              className={`${styles.checkbox} ${t.done ? styles.checked : ''}`}
              onClick={() => toggle(t.id)}
              aria-label={t.done ? 'Mark incomplete' : 'Mark complete'}
            >
              {t.done && <span className={styles.checkmark}>✓</span>}
            </button>
            <span className={`${styles.text} ${t.done ? styles.done : ''}`}>
              {t.text}
            </span>
            <button
              className={styles.deleteBtn}
              onClick={() => remove(t.id)}
              aria-label="Delete"
            >
              <Trash2 size={12} />
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.addRow}>
        <input
          className={styles.input}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && add()}
          placeholder="Add a task..."
        />
        <button className={styles.addBtn} onClick={add} aria-label="Add task">
          <Plus size={16} />
        </button>
      </div>
    </Card>
  )
}
