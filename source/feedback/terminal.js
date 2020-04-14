'use strict';

// Creating a shorthand for console.log
const type = message => console.log(message);

/**
 * @param {String} message - The message that should be displayed in the terminal
 * @param {Boolean} followUp - Set to true if a message should be in the same 'section' as the previous
 * @param {Boolean} first - Set to true if a message is the first one sent
 */

const terminal = (message, followUp = false, first = false) => {
  if (!followUp && !first) {
    type('---------');
  }
  if (message) {
    if (!followUp) {
      type('');
    }
    type(message);
    type('');
  }
};

module.exports = terminal;
