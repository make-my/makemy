'use strict';

const alertUser = require('../../feedback/alertUser');

/**
 * @param {*} - The options to check
 */

function checkOptions() {
  const allOptions = arguments;

  const optionsList = ['template', 'sourcefolder', 'postname'];

  for (const option of allOptions) {
    if (option !== undefined) {
      optionsList.splice(optionsList.indexOf(option) + 1, 1);
    }
  }

  if (optionsList.length > 0) {
    for (const leftover of optionsList) {
      alertUser('initOptions', leftover);
    }

    throw Error();
  }

  return true;
}

module.exports = checkOptions;
