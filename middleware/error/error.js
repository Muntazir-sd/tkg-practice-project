// Error handling wrapper function
const handleAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

// Global error handler middleware
const errorHandler = (error, req, res, next) => {
  res.status(error.status || 500).json({
    error: error.message || 'Internal Server Error',
  });
};

module.exports = {
  handleAsync,
  errorHandler,
};
