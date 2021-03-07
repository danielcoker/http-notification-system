const ErrorResponse = require('./errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err, message: err.message };

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered.';
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    error: error.message || 'Server Error',
  });
};

module.exports = errorHandler;
