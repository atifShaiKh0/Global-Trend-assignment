import { TaskService } from '../services/taskService.js';
import { successResponse, sendResponse } from '../utils/response.js';
import { asyncHandler } from '../utils/handlers.js';

/**
 * Task Controller - Request handlers for task operations
 */

export const createTask = asyncHandler(async (req, res) => {
  const task = await TaskService.createTask(req.body);
  const response = successResponse(task, 'Task created successfully', 201);
  sendResponse(res, 201, response);
});

export const getTasks = asyncHandler(async (req, res) => {
  const filters = {
    status: req.query.status,
    limit: req.query.limit ? parseInt(req.query.limit, 10) : 10,
    offset: req.query.offset ? parseInt(req.query.offset, 10) : 0,
  };

  const result = await TaskService.getTasks(filters);
  const response = successResponse(result, 'Tasks retrieved successfully');
  sendResponse(res, 200, response);
});

export const getTaskById = asyncHandler(async (req, res) => {
  const task = await TaskService.getTaskById(req.params.id);
  const response = successResponse(task, 'Task retrieved successfully');
  sendResponse(res, 200, response);
});

export const updateTask = asyncHandler(async (req, res) => {
  const task = await TaskService.updateTask(req.params.id, req.body);
  const response = successResponse(task, 'Task updated successfully');
  sendResponse(res, 200, response);
});

export const deleteTask = asyncHandler(async (req, res) => {
  await TaskService.deleteTask(req.params.id);
  const response = successResponse(null, 'Task deleted successfully');
  sendResponse(res, 200, response);
});

export const getStats = asyncHandler(async (req, res) => {
  const stats = await TaskService.getStats();
  const response = successResponse(stats, 'Statistics retrieved successfully');
  sendResponse(res, 200, response);
});
