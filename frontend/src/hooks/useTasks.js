import { useEffect } from 'react';
import { useTaskStore } from '../context/taskStore';

/**
 * Custom hook for task operations
 */
export const useTasks = () => {
  const store = useTaskStore();

  useEffect(() => {
    // Initial fetch
    store.fetchTasks(store.filters);
    store.fetchStats();
  }, []);

  return {
    tasks: store.tasks,
    loading: store.loading,
    error: store.error,
    pagination: store.pagination,
    stats: store.stats,
    fetchTasks: store.fetchTasks,
    fetchStats: store.fetchStats,
    addTask: store.addTask,
    updateTask: store.updateTask,
    deleteTask: store.deleteTask,
    setFilters: store.setFilters,
    clearError: store.clearError,
  };
};
