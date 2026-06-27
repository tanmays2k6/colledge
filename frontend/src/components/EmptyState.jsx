
import styles from './EmptyState.module.css';
import emptyIllustration from '../assets/empty.png';

const EmptyState = ({ message = 'No tasks found.', actionText, onAction }) => {
  return (
    <div className={styles.container}>
      <img src={emptyIllustration} alt="Empty" className={styles.illustration} />
      <h3 className={styles.title}>All Caught Up!</h3>
      <p className={styles.message}>{message}</p>
      {actionText && onAction && (
        <button className={styles.actionBtn} onClick={onAction}>
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
