import { errorResponse, sendResponse } from '../utils/response.js';
import { APIError } from '../utils/errors.js';

/**
 * Global error handling middleware
 */
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  if (err instanceof APIError) {
    const response = errorResponse(err.message, err.statusCode, err.errors);
    return sendResponse(res, err.statusCode, response);
  }

  // MongoDB/Mongoose errors can be handled here if needed

  // Default error
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message;
  const response = errorResponse(message, statusCode);
  sendResponse(res, statusCode, response);
};

/**
 * 404 Not found middleware
 */
export const notFoundHandler = (req, res) => {
  const response = errorResponse(`Route ${req.path} not found`, 404);
  sendResponse(res, 404, response);
};
