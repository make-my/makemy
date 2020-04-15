'use strict';

const { SYNTAX } = require('../SYNTAX');

/**
 *
 * @param {String} line - The line we want to check
 * @param {String} mode - The mode we want to check if we are in
 */

const checkMode = (line, mode) => {
  if (
    // The first item in SYNTAX is the trigger (#)
    line
      .toLowerCase()
      .trim()
      .includes(SYNTAX[mode][0]) &&
    // The first item in SYNTAX is the syntax-value (Title, Code, Quote etc.)
    line
      .toLowerCase()
      .trim()
      .includes(SYNTAX[mode][1])
  ) {
    return true;
  } else {
    return false;
  }
};

module.exports = checkMode;
