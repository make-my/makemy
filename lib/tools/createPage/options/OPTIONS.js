'use strict';

const findVoluntaryOptions = require('../../../utils/getters/findVoluntaryOptions');

const allOptions = [
  'template',
  'sourcefolder',
  'postname',
  'location',
  'extension',
  'update',
  'sugar',
  'css'
];

const requiredOptions = ['template', 'sourcefolder', 'postname'];

const voluntaryOptions = findVoluntaryOptions(allOptions, requiredOptions);

module.exports = { allOptions, requiredOptions, voluntaryOptions };
