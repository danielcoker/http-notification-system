/**
 * Wrapper function to avoid using try/catch in every
 * async controller function.
 *
 * @param {Function} fn The controller function.
 *
 * @returns Resolved promise.
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
