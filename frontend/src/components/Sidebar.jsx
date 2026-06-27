
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <aside className={`${styles.sidebar} glass`}>
      <div className={styles.brand}>
        <div className={styles.logo}></div>
        <span>TaskTracker</span>
      </div>
      
      <nav className={styles.nav} aria-label="Main Navigation">
        <NavLink 
          to="/" 
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
        >
          <span className={styles.icon}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
          </span>
          Dashboard
        </NavLink>
        <NavLink 
          to="/tasks" 
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
        >
          <span className={styles.icon}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
          </span>
          All Tasks
        </NavLink>
      </nav>

      <div className={styles.profile}>
        <div className={styles.avatar}>T</div>
        <div className={styles.userInfo}>
          <div className={styles.name}>Workspace</div>
          <div className={styles.role}>Premium Plan</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
