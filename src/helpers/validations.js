/**
 * Checks if a string is empty.
 *
 * @param {String} input The string to check.
 *
 * @returns {Boolean} Truthy value to tell if the check is successsful or not.
 */
exports.isEmpty = (input) => (input ? input.trim() === '' : true);
