import { memo } from 'react';
import styles from './TaskCard.module.css';

const PriorityIcon = ({ priority }) => {
  switch (priority) {
    case 'High':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
      );
    case 'Medium':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
      );
    case 'Low':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
      );
    default: return null;
  }
};

const StatusIcon = ({ status }) => {
  switch (status) {
    case 'Completed':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      );
    case 'In Progress':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
      );
    case 'Pending':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
      );
    default: return null;
  }
};

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  return (
    <div className={`${styles.card} glass`}>
      <div className={styles.cardHeader}>
        <div className={styles.titleGroup}>
          <div className={styles.priorityIndicator}>
            <PriorityIcon priority={task.priority} />
            <span className={styles.priorityText}>{task.priority}</span>
          </div>
          <h3 className={styles.title}>{task.title}</h3>
        </div>
        
        <div className={styles.actions}>
          <button className={styles.iconBtn} onClick={() => onEdit(task)} title="Edit Task" aria-label={`Edit ${task.title}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          </button>
          <button className={`${styles.iconBtn} ${styles.deleteBtn}`} onClick={() => onDelete(task._id)} title="Delete Task" aria-label={`Delete ${task.title}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
          </button>
        </div>
      </div>
      
      {task.description && (
        <p className={styles.description}>{task.description}</p>
      )}

      <div className={styles.cardFooter}>
        <div className={styles.statusWrapper}>
          <StatusIcon status={task.status} />
          <select 
            value={task.status} 
            onChange={(e) => onStatusChange(task._id, e.target.value)}
            className={styles.statusSelect}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        
        {task.dueDate && (
          <div className={styles.dueDate}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            {new Date(task.dueDate).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(TaskCard);
