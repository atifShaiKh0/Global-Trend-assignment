import React, { useState, useEffect } from 'react';
import { TaskForm } from '../components/TaskForm';
import { TaskCard } from '../components/TaskCard';
import { TaskStats } from '../components/TaskStats';
import { useTasks } from '../hooks/useTasks';

/**
 * TasksPage Component - Main page for task management
 */
export const TasksPage = () => {
  const {
    tasks,
    loading,
    error,
    stats,
    fetchTasks,
    fetchStats,
    addTask,
    updateTask,
    deleteTask,
    filters,
    setFilters,
    clearError,
  } = useTasks();

  const [statusFilter, setStatusFilter] = useState(null);

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
    setFilters({ status: status || null, offset: 0 });
  };

  const handleAddTask = async (taskData) => {
    try {
      await addTask(taskData);
      await fetchStats();
    } catch (error) {
      console.error('Failed to add task:', error);
      throw error;
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      await updateTask(id, taskData);
      await fetchStats();
    } catch (error) {
      console.error('Failed to update task:', error);
      throw error;
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      await fetchStats();
    } catch (error) {
      console.error('Failed to delete task:', error);
      throw error;
    }
  };

  return (
    <div className="tasks-page">
      <header className="page-header">
        <div className="header-content">
          <h1>Task Management</h1>
          <p>Stay organized and productive</p>
        </div>
      </header>

      <main className="page-content">
        {error && (
          <div className="error-banner">
            <span>{error}</span>
            <button onClick={clearError} className="close-btn">×</button>
          </div>
        )}

        <TaskStats stats={stats} />

        <div className="page-section">
          <h2>Create New Task</h2>
          <TaskForm onSubmit={handleAddTask} loading={loading} />
        </div>

        <div className="page-section">
          <div className="section-header">
            <h2>Tasks</h2>
            <div className="filter-group">
              <button
                className={`filter-btn ${statusFilter === null ? 'active' : ''}`}
                onClick={() => handleStatusFilterChange(null)}
              >
                All
              </button>
              <button
                className={`filter-btn ${statusFilter === 'TODO' ? 'active' : ''}`}
                onClick={() => handleStatusFilterChange('TODO')}
              >
                To Do
              </button>
              <button
                className={`filter-btn ${statusFilter === 'IN_PROGRESS' ? 'active' : ''}`}
                onClick={() => handleStatusFilterChange('IN_PROGRESS')}
              >
                In Progress
              </button>
              <button
                className={`filter-btn ${statusFilter === 'COMPLETED' ? 'active' : ''}`}
                onClick={() => handleStatusFilterChange('COMPLETED')}
              >
                Completed
              </button>
            </div>
          </div>

          {loading && tasks.length === 0 ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3>No tasks yet</h3>
              <p>Create your first task to get started</p>
            </div>
          ) : (
            <div className="task-list">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onUpdate={handleUpdateTask}
                  onDelete={handleDeleteTask}
                  loading={loading}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
