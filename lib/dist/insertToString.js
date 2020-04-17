'use strict';

/**
 * insertToString inserts a string in a specific position within a string,
 * without having to use split and join array methods.
 * @param {String} main_string
 * @param {String} ins_string
 * @param {Number} pos
 */

function insertToString(main_string, ins_string, pos) {
  if (typeof pos == 'undefined') {
    pos = 0;
  }
  if (typeof ins_string == 'undefined') {
    ins_string = '';
  }
  return main_string.slice(0, pos) + ins_string + main_string.slice(pos);
}

module.exports = insertToString;
