'use strict';

/**
 *
 * @param {Array} allOptions - array with all the options for the tool
 * @param {Array} requiredOptions  - array with all the required options for the tool
 */

function findVoluntaryOptions(allOptions, requiredOptions) {
  const voluntaryOptions = [];

  for (const option of allOptions) {
    if (requiredOptions.indexOf(option) === -1) {
      voluntaryOptions.push(option);
    }
  }

  return voluntaryOptions;
}

module.exports = findVoluntaryOptions;
