import styles from './LoadingScreen.module.css'

export const LoadingScreen = () => (
  <div className={styles.container} role="status" aria-live="polite">
    <div className={styles.spinner} aria-hidden="true" />
    <span className={styles.text}>Loading ERD Playground...</span>
  </div>
)
