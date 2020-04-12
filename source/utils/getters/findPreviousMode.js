'use strict';

const setTag = require('../setters/setTag');
const setClass = require('../setters/setClass');

/**
 *
 * @param {Object} MODES - The proxy containing our modes
 */

function findPreviousMode(MODES) {
  for (const keys in MODES) {
    if (MODES[keys] === true) {
      const tag = setTag(keys);
      const className = setClass(keys);

      return { tag, className };
    }
  }
}

module.exports = findPreviousMode;
