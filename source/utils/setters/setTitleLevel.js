'use strict';

/**
 *
 * @param {String} line - A Line with the # Title trigger, so we check if there's a level set.
 * If none level is set, we return the default value of 2.
 */

function setTitleLevel(line) {
  if (
    line
      .toLowerCase()
      .trim()
      .includes('-')
  ) {
    return line
      .toLowerCase()
      .trim()
      .split('-')[1]
      .trim();
  } else {
    return 2;
  }
}

module.exports = setTitleLevel;
