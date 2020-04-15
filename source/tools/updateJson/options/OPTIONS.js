'use strict';

const findVoluntaryOptions = require('../../../utils/getters/findVoluntaryOptions');

const allOptions = ['order'];

const requiredOptions = [];

const voluntaryOptions = findVoluntaryOptions(allOptions, requiredOptions);

module.exports = { allOptions, requiredOptions, voluntaryOptions };
