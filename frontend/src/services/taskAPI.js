import axios from 'axios';

const API_BASE_URL = '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    console.error('API Error:', message);
    return Promise.reject({
      message,
      status: error.response?.status,
      errors: error.response?.data?.errors,
    });
  }
);

export const TaskAPI = {
  // Get all tasks with filters
  getTasks: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.limit) params.append('limit', filters.limit);
    if (filters.offset) params.append('offset', filters.offset);
    
    return apiClient.get(`/tasks?${params.toString()}`);
  },

  // Get single task
  getTask: (id) => apiClient.get(`/tasks/${id}`),

  // Create task
  createTask: (data) => apiClient.post('/tasks', data),

  // Update task
  updateTask: (id, data) => apiClient.patch(`/tasks/${id}`, data),

  // Delete task
  deleteTask: (id) => apiClient.delete(`/tasks/${id}`),

  // Get statistics
  getStats: () => apiClient.get('/tasks/stats'),
};
