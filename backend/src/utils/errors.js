/**
 * Custom API error class for consistent error handling
 */
export class APIError extends Error {
  constructor(message, statusCode = 400, errors = null) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = 'APIError';
  }
}

export class ValidationError extends APIError {
  constructor(message, errors = null) {
    super(message, 422, errors);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends APIError {
  constructor(message = 'Resource not found') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends APIError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
    this.name = 'UnauthorizedError';
  }
}
