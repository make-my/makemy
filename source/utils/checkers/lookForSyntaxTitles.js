'use strict';

const SYNTAX = require('../SYNTAX');

/**
 
 * @param {String} line - A line that is empty, with no trigger and we are not in CODE-mode.
 */

function lookForSyntaxTitles(line) {
  for (const syntax in SYNTAX) {
    if (
      line
        .trim()
        .toLowerCase()
        .startsWith(syntax[1])
    ) {
      return true;
    }
  }
}

module.exports = lookForSyntaxTitles;
