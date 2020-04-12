'use strict';

const fs = require('fs');
const path = require('path');

/**
 *
 * @param {Directory|String} directory - The place where the option is supposed to be
 * @param {File/Folder|String} file - The file/folder we are checking if exists
 */

async function doesExist(directory, file) {
  try {
    if (fs.existsSync(path.join(directory, file))) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = doesExist;
