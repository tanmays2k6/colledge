import { useState, useEffect, useCallback } from 'react';
import * as taskService from '../services/taskService';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err) {
      console.error("API Error during fetchTasks:", err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (taskData) => {
    try {
      setError(null);
      const newTask = await taskService.createTask(taskData);
      setTasks(prev => [newTask, ...prev]);
      return true;
    } catch (err) {
      console.error("API Error during addTask:", err);
      setError(err.response?.data?.message || err.message || 'Failed to create task');
      return false;
    }
  };

  const editTask = async (id, taskData) => {
    try {
      setError(null);
      const updatedTask = await taskService.updateTask(id, taskData);
      setTasks(prev => prev.map(t => t._id === id ? updatedTask : t));
      return true;
    } catch (err) {
      console.error("API Error during editTask:", err);
      setError(err.response?.data?.message || err.message || 'Failed to update task');
      return false;
    }
  };

  const removeTask = async (id) => {
    try {
      setError(null);
      await taskService.deleteTask(id);
      setTasks(prev => prev.filter(t => t._id !== id));
      return true;
    } catch (err) {
      console.error("API Error during removeTask:", err);
      setError(err.response?.data?.message || err.message || 'Failed to delete task');
      return false;
    }
  };

  return { tasks, loading, error, fetchTasks, addTask, editTask, removeTask };
};
