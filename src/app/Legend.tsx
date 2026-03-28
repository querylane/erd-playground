'use client'

import { useState } from 'react'
import styles from './Legend.module.css'

export const Legend = () => {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className={styles.bar}>
      <div className={styles.items}>
        <div className={styles.item}>
          <svg width="12" height="12" viewBox="0 0 16 16">
            <path
              d="M8 1C5.2 1 3 3.2 3 6c0 1.9 1 3.5 2.5 4.3V12h5v-1.7C12 9.5 13 7.9 13 6c0-2.8-2.2-5-5-5zm0 2c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zM5.5 13v1c0 .6.4 1 1 1h3c.6 0 1-.4 1-1v-1h-5z"
              fill="#4ec9b0"
            />
          </svg>
          <span>Primary Key</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.item}>
          <svg width="12" height="12" viewBox="0 0 16 16">
            <path
              d="M10 1L6 5l4 4-4 4"
              fill="none"
              stroke="#9cdcfe"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Foreign Key</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.item}>
          <svg width="10" height="10" viewBox="0 0 10 10">
            <rect
              x="5"
              y="0.5"
              width="6.4"
              height="6.4"
              rx="1"
              transform="rotate(45 5 0.5)"
              fill="#b0b0b0"
            />
          </svg>
          <span>Not Null</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.item}>
          <svg width="10" height="10" viewBox="0 0 10 10">
            <rect
              x="5"
              y="0.5"
              width="6.4"
              height="6.4"
              rx="1"
              transform="rotate(45 5 0.5)"
              fill="none"
              stroke="#6c7b7f"
              strokeWidth="1.2"
            />
          </svg>
          <span>Nullable</span>
        </div>
      </div>
      <button
        type="button"
        className={styles.dismiss}
        onClick={() => setDismissed(true)}
        aria-label="Dismiss legend"
      >
        ✕
      </button>
    </div>
  )
}
