import { memo } from 'react';
import styles from './DashboardCards.module.css';

const DashboardCards = ({ tasks }) => {
  const total = tasks.length;
  const pending = tasks.filter(t => t.status === 'Pending').length;
  const inProgress = tasks.filter(t => t.status === 'In Progress').length;
  const completed = tasks.filter(t => t.status === 'Completed').length;
  const highPriority = tasks.filter(t => t.priority === 'High').length;

  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className={styles.container}>
      <div className={`${styles.progressSection} glass`}>
        <div className={styles.progressHeader}>
          <h3>Overall Progress</h3>
          <span className={styles.progressText}>{progress}%</span>
        </div>
        <div className={styles.progressBarBg}>
          <div 
            className={styles.progressBarFill} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={`${styles.card} ${styles.total} glass`}>
          <div className={styles.details}>
            <div className={styles.label}>Total Tasks</div>
            <div className={styles.value}>{total}</div>
          </div>
          <div className={styles.icon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
        </div>
        
        <div className={`${styles.card} ${styles.pending} glass`}>
          <div className={styles.details}>
            <div className={styles.label}>Pending</div>
            <div className={styles.value}>{pending}</div>
          </div>
          <div className={styles.icon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
        </div>
        
        <div className={`${styles.card} ${styles.inProgress} glass`}>
          <div className={styles.details}>
            <div className={styles.label}>In Progress</div>
            <div className={styles.value}>{inProgress}</div>
          </div>
          <div className={styles.icon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2v4"></path><path d="M12 18v4"></path><path d="M4.93 4.93l2.83 2.83"></path><path d="M16.24 16.24l2.83 2.83"></path><path d="M2 12h4"></path><path d="M18 12h4"></path><path d="M4.93 19.07l2.83-2.83"></path><path d="M16.24 7.76l2.83-2.83"></path></svg>
          </div>
        </div>
        
        <div className={`${styles.card} ${styles.completed} glass`}>
          <div className={styles.details}>
            <div className={styles.label}>Completed</div>
            <div className={styles.value}>{completed}</div>
          </div>
          <div className={styles.icon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
        </div>
        
        <div className={`${styles.card} ${styles.highPriority} glass`}>
          <div className={styles.details}>
            <div className={styles.label}>High Priority</div>
            <div className={styles.value}>{highPriority}</div>
          </div>
          <div className={styles.icon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(DashboardCards);
