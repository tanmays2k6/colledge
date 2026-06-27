
import styles from './TaskSkeleton.module.css';

const TaskSkeleton = () => {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.header}>
        <div className={styles.titleLine}></div>
        <div className={styles.badgeLine}></div>
      </div>
      <div className={styles.descLine}></div>
      <div className={styles.descLineShort}></div>
      <div className={styles.footer}>
        <div className={styles.statusLine}></div>
        <div className={styles.actionsLine}></div>
      </div>
    </div>
  );
};

export default TaskSkeleton;
