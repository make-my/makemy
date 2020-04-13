'use strict';

const allOptions = ['order'];

const requiredOptions = [];

const voluntaryOptions = [];

for (const option of allOptions) {
  if (requiredOptions.indexOf(option) === -1) {
    voluntaryOptions.push(option);
  }
}

module.exports = { allOptions, requiredOptions, voluntaryOptions };
