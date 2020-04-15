'use strict';

const fs = require('fs');

/**
 *
 * @param {File|String} file - The name of the file to create a writestream for
 */

function configureWriteStream(file) {
  const writeStream = fs.createWriteStream(file, 'utf8');

  return writeStream;
}

module.exports = configureWriteStream;
