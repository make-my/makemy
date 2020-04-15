'use strict';

const { SYNTAX } = require('../SYNTAX');

/**
 * setTag returns the correct classname for element used in the createHTML function
 * @param {String} mode - The mode we want to extract the class from
 */

const setTag = mode => {
  return SYNTAX[mode][3];
};

module.exports = setTag;
