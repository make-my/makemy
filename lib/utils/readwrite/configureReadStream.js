'use strict';

const fs = require('fs');
const readline = require('readline');

/**
 *
 * @param {File|String} file - the file to create a readstream for
 */

function configureReadStream(file) {
  const readStream = fs.createReadStream(file, 'utf8');

  const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity
  });

  return rl;
}

module.exports = configureReadStream;
