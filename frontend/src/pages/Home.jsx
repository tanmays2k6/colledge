import { useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import DashboardCards from '../components/DashboardCards';
import EmptyState from '../components/EmptyState';
import TaskSkeleton from '../components/TaskSkeleton';
import Modal from '../components/Modal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import { useTasks } from '../hooks/useTasks';
import styles from './Home.module.css';

const Home = () => {
  const { tasks, loading, error, addTask, editTask, removeTask } = useTasks();
  const [showForm, setShowForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  
  const [editingTask, setEditingTask] = useState(null);
  const [isEditingSaving, setIsEditingSaving] = useState(false);

  const [deletingTaskId, setDeletingTaskId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleStatusChange = (id, status) => {
    editTask(id, { status });
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

  return (
    <div className={styles.homeLayout}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Dashboard</h1>
        <button className={styles.createBtn} onClick={() => setShowForm(true)} aria-label="Create New Task">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          New Task
        </button>
      </div>

      <div className={styles.content}>
        {!loading && !error && <DashboardCards tasks={tasks} />}

        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent Tasks</h2>
        </div>
        
        {successMsg && <div className={styles.successMessage}>{successMsg}</div>}
        {error && <div className={styles.errorMessage}>{error}</div>}
        
        {loading ? (
          <div className={styles.grid}>
            {[1, 2, 3].map(n => <TaskSkeleton key={n} />)}
          </div>
        ) : tasks.length === 0 && !error ? (
          <EmptyState 
            message="No tasks yet. Create one from the form!" 
            actionText="Create Task"
            onAction={() => setShowForm(true)}
          />
        ) : (
          <div className={styles.grid}>
            {tasks.map(task => (
              <TaskCard 
                key={task._id} 
                task={task} 
                onDelete={(id) => setDeletingTaskId(id)}
                onStatusChange={handleStatusChange}
                onEdit={() => setEditingTask(task)}
              />
            ))}
          </div>
        )}
      </div>

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

export default Home;
