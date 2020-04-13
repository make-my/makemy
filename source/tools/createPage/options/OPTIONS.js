'use strict';

const allOptions = [
  'template',
  'sourcefolder',
  'postname',
  'location',
  'extension',
  'update'
];

const requiredOptions = ['template', 'sourcefolder', 'postname'];

const voluntaryOptions = [];

for (const option of allOptions) {
  if (requiredOptions.indexOf(option) === -1) {
    voluntaryOptions.push(option);
  }
}

module.exports = { allOptions, requiredOptions, voluntaryOptions };
