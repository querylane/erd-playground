'use client'

import { useState } from 'react'
import styles from './Legend.module.css'

const items = [
  { icon: '🔑', label: 'Primary Key' },
  { icon: '🔗', label: 'Foreign Key' },
  { icon: '◆', label: 'Not Null' },
  { icon: '◇', label: 'Nullable' },
]

export const Legend = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.container}>
      {open && (
        <div className={styles.panel}>
          {items.map((item) => (
            <div key={item.label} className={styles.item}>
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
            </div>
          ))}
        </div>
      )}
      <button
        type="button"
        className={styles.toggle}
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle legend"
      >
        {open ? '✕' : '?'}
      </button>
    </div>
  )
}
