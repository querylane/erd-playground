import styles from './LoadingScreen.module.css'

export const LoadingScreen = () => (
  <div className={styles.container}>
    <div className={styles.spinner} />
    <span className={styles.text}>Loading ERD Playground...</span>
  </div>
)
