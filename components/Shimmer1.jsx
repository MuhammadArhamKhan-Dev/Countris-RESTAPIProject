import styles from "./Shimmer1.module.css"
import "../style.css"
const Shimmer1 = () => {
  return (
    <div className={[styles.shimmerCard, "shimmer"].join(' ')}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
    </div>
  )
}

export default Shimmer1