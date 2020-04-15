'use strict';

const findVoluntaryOptions = require('../../../utils/getters/findVoluntaryOptions');

const allOptions = ['template', 'posts'];

const requiredOptions = ['template', 'posts'];

const voluntaryOptions = findVoluntaryOptions(allOptions, requiredOptions);

module.exports = { allOptions, requiredOptions, voluntaryOptions };
