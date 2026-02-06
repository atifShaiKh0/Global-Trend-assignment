import { create } from 'zustand';
import { TaskAPI } from '../services/taskAPI';

/**
 * Task Store - Global state management for tasks
 */
export const useTaskStore = create((set) => ({
  // State
  tasks: [],
  loading: false,
  error: null,
  pagination: { total: 0, limit: 10, offset: 0, pages: 0 },
  filters: { status: null, limit: 10, offset: 0 },
  stats: null,

  // Actions
  setFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters },
  })),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  fetchTasks: async (filters = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await TaskAPI.getTasks(filters);
      set({
        tasks: response.data.tasks,
        pagination: response.data.pagination,
        loading: false,
      });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  fetchStats: async () => {
    try {
      const response = await TaskAPI.getStats();
      set({ stats: response.data });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  },

  addTask: async (taskData) => {
    set({ loading: true, error: null });
    try {
      const response = await TaskAPI.createTask(taskData);
      set((state) => ({
        tasks: [response.data, ...state.tasks],
        loading: false,
      }));
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  updateTask: async (id, taskData) => {
    set({ loading: true, error: null });
    try {
      const response = await TaskAPI.updateTask(id, taskData);
      set((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? response.data : task)),
        loading: false,
      }));
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  deleteTask: async (id) => {
    set({ loading: true, error: null });
    try {
      await TaskAPI.deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
