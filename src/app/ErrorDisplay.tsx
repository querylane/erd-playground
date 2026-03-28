'use client'

import styles from './ErrorDisplay.module.css'

type ErrorDisplayProps = {
  errors: { name: string; message: string }[]
  isStale: boolean
}

export const ErrorDisplay = ({ errors, isStale }: ErrorDisplayProps) => {
  if (errors.length === 0) return null

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.icon}>!</span>
        <span className={styles.title}>
          {isStale
            ? 'Parse error — showing last valid diagram'
            : `${errors.length} warning${errors.length > 1 ? 's' : ''}`}
        </span>
      </div>
      <div className={styles.errorList}>
        {errors.map((error, i) => (
          <div key={`${error.name}-${i}`} className={styles.error}>
            {error.message}
          </div>
        ))}
      </div>
    </div>
  )
}
