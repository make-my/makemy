'use strict';

/* i <3 chalk */
const chalk = require('chalk');

const error = chalk.bold.red;
const warning = chalk.keyword('orange');
const info = chalk.keyword('yellow');
const success = chalk.bold.green;
const underline = chalk.underline;

module.exports = {
  error,
  warning,
  info,
  success,
  underline
};
