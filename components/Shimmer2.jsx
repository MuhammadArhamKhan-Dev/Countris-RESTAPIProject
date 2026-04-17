import styles from "./Shimmer2.module.css"

const Shimmer2 = () => {
    return (
        <div className={styles.shimmerCard}>
            <div className={[styles.left, "shimmer"].join(' ')}>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
            </div>
            <div className={[styles.right, "shimmer"].join(' ')}>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
            </div>
        </div>
    )
}

export default Shimmer2
