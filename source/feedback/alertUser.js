'use strict';

const MESSAGES = require('./MESSAGES');

const terminal = require('./terminal');

/**
 *
 * @param {String} category - The name of the category that the message should be extracted from the messages object above.
 * @param {String} type - The type of message to choose within the category
 * @param {Object} variables - An object containing the different variables used for a message
 * @param {Boolean} stop - A boolean telling wether or not the program was stopped after this message
 */

function alertUser(category, type, variables, stop) {
  // Check if the message in the category is a function, because then it has variables to be inserted into the message.
  if (typeof MESSAGES[category][type] === 'function') {
    // Check if there's more than one message returned, because then we run the terminal function for each message
    if (Array.isArray(MESSAGES[category][type](variables))) {
      MESSAGES[category][type](variables).forEach(message => {
        terminal(message, false, true);
      });
    }
    // If only one message returned from the function, then send it to terminal
    else {
      terminal(MESSAGES[category][type](variables), false, true);
    }
  }
  // Message was only a simple text-line without any variables
  else {
    terminal(MESSAGES[category][type], false, true);
  }

  if (stop) {
    terminal(MESSAGES.generic.stop);
  }
}

module.exports = alertUser;
