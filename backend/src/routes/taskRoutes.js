import express from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getStats,
} from '../controllers/taskController.js';
import {
  createTaskValidation,
  updateTaskValidation,
  getTaskValidation,
  deleteTaskValidation,
  listTasksValidation,
} from '../middleware/validation.js';
import { handleValidationErrors } from '../utils/handlers.js';

const router = express.Router();

// Get task statistics
router.get('/stats', getStats);

// List tasks with filters
router.get('/', listTasksValidation, handleValidationErrors, getTasks);

// Create a new task
router.post('/', createTaskValidation, handleValidationErrors, createTask);

// Get a single task
router.get('/:id', getTaskValidation, handleValidationErrors, getTaskById);

// Update a task
router.patch('/:id', updateTaskValidation, handleValidationErrors, updateTask);

// Delete a task
router.delete('/:id', deleteTaskValidation, handleValidationErrors, deleteTask);

export default router;
