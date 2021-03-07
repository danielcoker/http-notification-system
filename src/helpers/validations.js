/**
 * Checks if a string is empty.
 *
 * @param {String} input The string to check.
 *
 * @returns {Boolean} Truthy value to tell if the check is successsful or not.
 */
exports.isEmpty = (input) => (input ? input.trim() === '' : true);

/**
 * Check if a string is a valid URL.
 *
 * @param {String} input The string to check
 *
 * @returns {Boolean} Truthy value to tell if the check is successful or not.
 */
exports.isURL = (input) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator

  return !!pattern.test(input);
};
