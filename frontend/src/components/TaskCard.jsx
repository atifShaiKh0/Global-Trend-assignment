import React, { useState } from 'react';

/**
 * TaskCard Component - Individual task display and actions
 */
export const TaskCard = ({ task, onUpdate, onDelete, loading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description || '',
  });

  const getStatusColor = (status) => {
    const colors = {
      TODO: 'status-todo',
      IN_PROGRESS: 'status-in-progress',
      COMPLETED: 'status-completed',
    };
    return colors[status] || 'status-todo';
  };

  const getStatusLabel = (status) => {
    const labels = {
      TODO: 'To Do',
      IN_PROGRESS: 'In Progress',
      COMPLETED: 'Completed',
    };
    return labels[status] || status;
  };

  const handleStatusChange = async (newStatus) => {
    if (newStatus !== task.status) {
      try {
        await onUpdate(task.id, { status: newStatus });
      } catch (error) {
        console.error('Failed to update status:', error);
      }
    }
  };

  const handleSaveEdit = async () => {
    try {
      await onUpdate(task.id, editData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await onDelete(task.id);
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isEditing) {
    return (
      <div className="task-card task-card-editing">
        <div className="edit-form">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            className="edit-input edit-title"
            maxLength={255}
          />
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            className="edit-input edit-description"
            maxLength={1000}
            rows={3}
          />
          <div className="edit-actions">
            <button
              className="btn btn-primary btn-small"
              onClick={handleSaveEdit}
              disabled={loading}
            >
              Save
            </button>
            <button
              className="btn btn-secondary btn-small"
              onClick={() => setIsEditing(false)}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`task-card ${getStatusColor(task.status)}`}>
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <span className={`task-status ${getStatusColor(task.status)}`}>
          {getStatusLabel(task.status)}
        </span>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-meta">
        <span className="task-date">{formatDate(task.createdAt)}</span>
      </div>

      <div className="task-actions">
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="status-select"
          disabled={loading}
        >
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>

        <button
          className="btn btn-secondary btn-small"
          onClick={() => setIsEditing(true)}
          disabled={loading}
        >
          Edit
        </button>

        <button
          className="btn btn-danger btn-small"
          onClick={handleDelete}
          disabled={loading}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
