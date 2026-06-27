
import Modal from './Modal';
import styles from './ConfirmDeleteModal.module.css';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, isDeleting }) => {
  return (
    <Modal isOpen={isOpen} onClose={!isDeleting ? onClose : () => {}}>
      <div className={styles.container}>
        <div className={styles.iconWrapper}>
          <span className={styles.warningIcon}>⚠️</span>
        </div>
        <h3 className={styles.title}>Delete Task</h3>
        <p className={styles.message}>
          Are you sure you want to delete this task? This action cannot be undone.
        </p>
        
        <div className={styles.actions}>
          <button 
            className={styles.cancelBtn} 
            onClick={onClose} 
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button 
            className={styles.deleteBtn} 
            onClick={onConfirm} 
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete Task'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
