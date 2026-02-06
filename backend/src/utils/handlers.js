import { validationResult } from 'express-validator';
import { ValidationError } from './errors.js';

/**
 * Middleware to handle validation errors
 */
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().reduce((acc, error) => {
      acc[error.param] = error.msg;
      return acc;
    }, {});
    throw new ValidationError('Validation failed', formattedErrors);
  }
  next();
};

/**
 * Async error wrapper to handle errors in async route handlers
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
