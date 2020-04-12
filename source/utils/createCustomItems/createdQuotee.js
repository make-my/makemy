'use strict';

/**
 *
 * @param {String} line - Line in QUOTE-mode that had the --- trigger
 */

function createdQuotee(line) {
  let newLine = line.split('---')[1].trim();

  line = `<p class="quotee">&ndash; ${newLine}</p>`;

  return line;
}

module.exports = createdQuotee;
