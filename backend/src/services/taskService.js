import Task from '../models/Task.js';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundError } from '../utils/errors.js';

/**
 * Task Service - Business logic layer for task operations
 */
export class TaskService {
  /**
   * Create a new task
   */
  static async createTask(data) {
    const task = new Task({
      id: uuidv4(),
      title: data.title,
      description: data.description || null,
      status: data.status || 'TODO',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await task.save();
    return task.toObject();
  }

  /**
   * Get all tasks with pagination and filtering
   */
  static async getTasks(filters = {}) {
    const { status, limit = 10, offset = 0 } = filters;

    const where = {};
    if (status) {
      where.status = status;
    }

    const query = {};
    if (status) query.status = status;
    const [tasks, total] = await Promise.all([
      Task.find(query)
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit),
      Task.countDocuments(query),
    ]);
    return {
      tasks,
      pagination: {
        total,
        limit,
        offset,
        pages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get a single task by ID
   */
  static async getTaskById(taskId) {
    const task = await Task.findOne({ id: taskId });
    if (!task) {
      throw new NotFoundError(`Task with ID ${taskId} not found`);
    }
    return task.toObject();
  }

  /**
   * Update a task
   */
  static async updateTask(taskId, data) {
    // Check if task exists
    await this.getTaskById(taskId);

    const update = {
      ...(data.title && { title: data.title }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.status && { status: data.status }),
      updatedAt: new Date(),
    };
    const task = await Task.findOneAndUpdate({ id: taskId }, update, { new: true });
    return task ? task.toObject() : null;
  }

  /**
   * Delete a task
   */
  static async deleteTask(taskId) {
    // Check if task exists
    await this.getTaskById(taskId);

    await Task.deleteOne({ id: taskId });
    return { success: true };
  }

  /**
   * Get task statistics
   */
  static async getStats() {
    const stats = await Task.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
    const total = await Task.countDocuments();
    return {
      total,
      byStatus: stats.reduce((acc, stat) => {
        acc[stat._id] = stat.count;
        return acc;
      }, {}),
    };
  }
}
