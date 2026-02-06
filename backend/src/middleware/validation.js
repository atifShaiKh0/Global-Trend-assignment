import { body, param, query } from 'express-validator';

export const createTaskValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 255 })
    .withMessage('Title must be between 3 and 255 characters'),
  body('description')
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters')
    .optional(),
  body('status')
    .optional()
    .isIn(['TODO', 'IN_PROGRESS', 'COMPLETED'])
    .withMessage('Invalid status'),
];

export const updateTaskValidation = [
  param('id').isUUID().withMessage('Invalid task ID'),
  body('title')
    .trim()
    .optional()
    .isLength({ min: 3, max: 255 })
    .withMessage('Title must be between 3 and 255 characters'),
  body('description')
    .trim()
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters'),
  body('status')
    .optional()
    .isIn(['TODO', 'IN_PROGRESS', 'COMPLETED'])
    .withMessage('Invalid status'),
];

export const getTaskValidation = [
  param('id').isUUID().withMessage('Invalid task ID'),
];

export const deleteTaskValidation = [
  param('id').isUUID().withMessage('Invalid task ID'),
];

export const listTasksValidation = [
  query('status')
    .optional()
    .isIn(['TODO', 'IN_PROGRESS', 'COMPLETED'])
    .withMessage('Invalid status filter'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Offset must be non-negative'),
];
