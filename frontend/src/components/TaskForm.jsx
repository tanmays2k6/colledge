import { useState } from 'react';
import styles from './TaskForm.module.css';

const TaskForm = ({ onSubmit, initialData = null, onCancel, isSaving = false }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    priority: initialData?.priority || 'Medium',
    status: initialData?.status || 'Pending',
    dueDate: initialData?.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim().length < 3) return;
    onSubmit(formData);
    if (!initialData) {
      setFormData({ title: '', description: '', priority: 'Medium', status: 'Pending', dueDate: '' });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.formTitle}>
        {initialData ? 'Edit Task' : 'Create New Task'}
      </h3>
      
      <div className={styles.inputGroup}>
        <label htmlFor="title">Task Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="What needs to be done?"
          required
          minLength={3}
          disabled={isSaving}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="description">Description (Optional)</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Add some details..."
          rows="3"
          disabled={isSaving}
        />
      </div>

      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <label htmlFor="priority">Priority</label>
          <select name="priority" id="priority" value={formData.priority} onChange={handleChange} disabled={isSaving}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        
        <div className={styles.inputGroup}>
          <label htmlFor="status">Status</label>
          <select name="status" id="status" value={formData.status} onChange={handleChange} disabled={isSaving}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
      
      <div className={styles.inputGroup}>
        <label htmlFor="dueDate">Due Date (Optional)</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          disabled={isSaving}
        />
      </div>

      <div className={styles.actions}>
        {onCancel && (
          <button type="button" className={styles.cancelBtn} onClick={onCancel} disabled={isSaving}>
            Cancel
          </button>
        )}
        <button type="submit" className={styles.submitBtn} disabled={isSaving}>
          {isSaving ? 'Saving...' : (initialData ? 'Update Task' : 'Add Task')}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
