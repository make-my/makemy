'use strict';

const alertUser = require('../../feedback/alertUser');

/**
 *
 * @param {Object} optionsPassed - The options we are checking
 * @param {String} tool - The tool we are checking the options for
 */

async function checkOptions(optionsPassed, tool) {
  // Dynamically importing the options for the tool
  const {
    allOptions,
    requiredOptions
  } = await require(`../../tools/${tool}/options/OPTIONS`);

  // If there are no required optiobns, and no options were passed, then we don't need to check them.
  if (
    requiredOptions.length === 0 &&
    !optionsPassed &&
    Object.keys(optionsPassed).length === 0
  ) {
    return;
  }

  const checkTheseOptions = Object.keys(optionsPassed);

  const leftoverOptions = [];

  /**
   * Here we check the options that have been passed in.
   * First we see if any of the options provided are not in the list of the tools options.
   *
   * Secondly we check if all of the required options are provided.
   *
   */

  for (const option of checkTheseOptions) {
    if (!allOptions.includes(option)) {
      leftoverOptions.push(option);
    } else if (requiredOptions.includes(option)) {
      requiredOptions.splice(requiredOptions.indexOf(option), 1);
    }
  }

  if (leftoverOptions.length > 0) {
    leftoverOptions.forEach(option => {
      alertUser('initOptions', 'wrongOption', { option }, true);
    });

    throw Error();
  }

  if (requiredOptions.length > 0) {
    requiredOptions.forEach(option => {
      alertUser('initOptions', option, undefined, true);
    });

    throw Error();
  }

  return true;
}

module.exports = checkOptions;
