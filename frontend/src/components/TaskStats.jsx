import React from 'react';

/**
 * TaskStats Component - Display task statistics
 */
export const TaskStats = ({ stats }) => {
  if (!stats) return null;

  const getStatColor = (status) => {
    const colors = {
      TODO: 'stat-todo',
      IN_PROGRESS: 'stat-in-progress',
      COMPLETED: 'stat-completed',
    };
    return colors[status] || '';
  };

  const getStatLabel = (status) => {
    const labels = {
      TODO: 'To Do',
      IN_PROGRESS: 'In Progress',
      COMPLETED: 'Completed',
    };
    return labels[status] || status;
  };

  return (
    <div className="task-stats">
      <div className="stat-card stat-total">
        <div className="stat-number">{stats.total}</div>
        <div className="stat-label">Total Tasks</div>
      </div>

      {Object.entries(stats.byStatus || {}).map(([status, count]) => (
        <div key={status} className={`stat-card ${getStatColor(status)}`}>
          <div className="stat-number">{count}</div>
          <div className="stat-label">{getStatLabel(status)}</div>
        </div>
      ))}
    </div>
  );
};
