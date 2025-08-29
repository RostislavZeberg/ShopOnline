import styles from './page.module.scss';

export default function Loading() {
  return (
    <div className={styles.product}>
      <div className={styles.container}>
        <div className={styles.breadcrumbs}>
          <span className={styles.skeletonText} style={{ width: '60px' }}></span>
          <span> / </span>
          <span className={styles.skeletonText} style={{ width: '100px' }}></span>
          <span> / </span>
          <span className={styles.skeletonText} style={{ width: '150px' }}></span>
        </div>

        <div className={styles.grid}>
          <div className={styles.skeletonImage}></div>
          <div className={styles.info}>
            <div className={styles.skeletonTitle}></div>
            <div className={styles.skeletonMeta}></div>
            <div className={styles.skeletonDescription}></div>
            <div className={styles.skeletonDescription} style={{ width: '80%' }}></div>
            <div className={styles.skeletonPrice}></div>
          </div>
        </div>
      </div>
    </div>
  );
}