/**
 * HTTP Response utilities for consistent API responses
 */

export const successResponse = (data, message = 'Success', statusCode = 200) => ({
  statusCode,
  success: true,
  message,
  data,
});

export const errorResponse = (message = 'Error', statusCode = 400, errors = null) => ({
  statusCode,
  success: false,
  message,
  ...(errors && { errors }),
});

export const sendResponse = (res, statusCode, response) => {
  return res.status(statusCode).json(response);
};
