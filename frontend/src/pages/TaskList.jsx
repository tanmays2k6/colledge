import { useState } from 'react';
import TaskCard from '../components/TaskCard';
import EmptyState from '../components/EmptyState';
import TaskSkeleton from '../components/TaskSkeleton';
import Modal from '../components/Modal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import TaskForm from '../components/TaskForm';
import { useTasks } from '../hooks/useTasks';
import styles from './TaskList.module.css';

const TaskList = () => {
  const { tasks, loading, error, addTask, editTask, removeTask } = useTasks();
  
  const [showForm, setShowForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  
  const [editingTask, setEditingTask] = useState(null);
  const [isEditingSaving, setIsEditingSaving] = useState(false);

  const [deletingTaskId, setDeletingTaskId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'All',
    priority: 'All',
    date: 'All'
  });
  const [sortBy, setSortBy] = useState('Newest First');

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setFilters({ status: 'All', priority: 'All', date: 'All' });
    setSortBy('Newest First');
  };

  const handleCreateTask = async (taskData) => {
    setIsSaving(true);
    const success = await addTask(taskData);
    setIsSaving(false);
    
    if (success) {
      setSuccessMsg('Task created successfully!');
      setShowForm(false);
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  const handleEditTask = async (taskData) => {
    setIsEditingSaving(true);
    const success = await editTask(editingTask._id, taskData);
    setIsEditingSaving(false);
    
    if (success) {
      setSuccessMsg('Task updated successfully!');
      setEditingTask(null);
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    const success = await removeTask(deletingTaskId);
    setIsDeleting(false);
    
    if (success) {
      setSuccessMsg('Task deleted successfully!');
      setDeletingTaskId(null);
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  const processedTasks = [...tasks].filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filters.status === 'All' || t.status === filters.status;
    const matchesPriority = filters.priority === 'All' || t.priority === filters.priority;
    
    let matchesDate = true;
    if (filters.date !== 'All') {
      if (!t.dueDate) {
        matchesDate = false;
      } else {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const taskDate = new Date(t.dueDate);
        taskDate.setHours(0, 0, 0, 0);
        
        if (filters.date === 'Overdue') {
          matchesDate = taskDate < today && t.status !== 'Completed';
        } else if (filters.date === 'Today') {
          matchesDate = taskDate.getTime() === today.getTime();
        } else if (filters.date === 'Upcoming') {
          matchesDate = taskDate > today;
        }
      }
    }
    
    return matchesSearch && matchesStatus && matchesPriority && matchesDate;
  }).sort((a, b) => {
    const priorityWeight = { 'High': 3, 'Medium': 2, 'Low': 1 };
    
    switch (sortBy) {
      case 'Newest First':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'Oldest First':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'Due Date':
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      case 'Priority':
        return priorityWeight[b.priority] - priorityWeight[a.priority];
      case 'Title A-Z':
        return a.title.localeCompare(b.title);
      case 'Title Z-A':
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>All Tasks</h1>
          <p className={styles.subtitle}>Manage and track all your projects.</p>
        </div>
        <button className={styles.createBtn} onClick={() => setShowForm(true)} aria-label="Create New Task">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          New Task
        </button>
      </div>
      
      <div className={styles.controls}>
        <div className={styles.topControls}>
          <div className={styles.searchWrapper}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.searchIcon}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input 
              type="text" 
              placeholder="Search tasks..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <button className={styles.resetBtn} onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
        
        <div className={`${styles.toolbar} glass`}>
          <div className={styles.filterGroup}>
            <label>Status</label>
            <select name="status" value={filters.status} onChange={handleFilterChange}>
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          
          <div className={styles.filterGroup}>
            <label>Priority</label>
            <select name="priority" value={filters.priority} onChange={handleFilterChange}>
              <option value="All">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          
          <div className={styles.filterGroup}>
            <label>Due Date</label>
            <select name="date" value={filters.date} onChange={handleFilterChange}>
              <option value="All">Any Date</option>
              <option value="Today">Today</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Sort By</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="Newest First">Newest First</option>
              <option value="Oldest First">Oldest First</option>
              <option value="Due Date">Due Date</option>
              <option value="Priority">Priority</option>
              <option value="Title A-Z">Title A-Z</option>
              <option value="Title Z-A">Title Z-A</option>
            </select>
          </div>
        </div>
      </div>
      
      {successMsg && <div className={styles.successMessage}>{successMsg}</div>}
      {error && <div className={styles.errorMessage}>{error}</div>}

      {loading ? (
        <div className={styles.grid}>
          {[1, 2, 3, 4, 5, 6].map(n => <TaskSkeleton key={n} />)}
        </div>
      ) : processedTasks.length === 0 && !error ? (
        <EmptyState 
          message="No matching tasks found."
          actionText="Clear All Filters"
          onAction={resetFilters}
        />
      ) : (
        <div className={styles.grid}>
          {processedTasks.map(task => (
            <TaskCard 
              key={task._id} 
              task={task}
              onDelete={(id) => setDeletingTaskId(id)}
              onStatusChange={(id, status) => editTask(id, { status })}
              onEdit={() => setEditingTask(task)}
            />
          ))}
        </div>
      )}

      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <TaskForm 
          onSubmit={handleCreateTask} 
          isSaving={isSaving} 
          onCancel={() => setShowForm(false)} 
        />
      </Modal>

      <Modal isOpen={!!editingTask} onClose={() => setEditingTask(null)}>
        {editingTask && (
          <TaskForm
            key={editingTask._id}
            initialData={editingTask}
            onSubmit={handleEditTask}
            onCancel={() => setEditingTask(null)}
            isSaving={isEditingSaving}
          />
        )}
      </Modal>

      <ConfirmDeleteModal 
        isOpen={!!deletingTaskId}
        onClose={() => setDeletingTaskId(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default TaskList;
