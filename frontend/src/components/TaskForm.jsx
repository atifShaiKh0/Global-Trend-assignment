import React, { useState } from 'react';

/**
 * TaskForm Component - Form for creating and editing tasks
 */
export const TaskForm = ({ onSubmit, loading, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    status: initialData?.status || 'TODO',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (formData.description.length > 1000) {
      newErrors.description = 'Description must not exceed 1000 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await onSubmit(formData);
      setFormData({ title: '', description: '', status: 'TODO' });
      setErrors({});
    } catch (error) {
      setErrors({ submit: error.message });
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
          maxLength={255}
          disabled={loading}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task description (optional)"
          maxLength={1000}
          rows={4}
          disabled={loading}
        />
        {errors.description && <span className="error-message">{errors.description}</span>}
        <span className="char-count">{formData.description.length}/1000</span>
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          disabled={loading}
        >
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      {errors.submit && <div className="error-alert">{errors.submit}</div>}

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Saving...' : initialData ? 'Update Task' : 'Create Task'}
      </button>
    </form>
  );
};
