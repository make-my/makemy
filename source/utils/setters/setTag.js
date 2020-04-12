'use strict';

const { SYNTAX } = require('../SYNTAX');

/**
 * setTag returns the correct tag used in the createHTML function
 * @param {String} mode - The mode we want to extract the tag from
 */

const setTag = mode => {
  return SYNTAX[mode][2];
};

module.exports = setTag;
