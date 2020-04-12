'use strict';

const fs = require('fs');
const path = require('path');

const alertUser = require('../../feedback/alertUser');

/**
 *
 * @param {Directory|String} directory - The place where the option is supposed to be
 * @param {File/Folder|String} sourcefolder - The sourcefolder/folder we are checking if exists
 */

async function validateSourceFolder(directory, sourcefolder) {
  try {
    if (fs.existsSync(path.join(directory, sourcefolder))) {
      return true;
    } else {
      alertUser('existence', 'sourcefolder', { sourcefolder }, true);
      throw Error();
    }
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = validateSourceFolder;
