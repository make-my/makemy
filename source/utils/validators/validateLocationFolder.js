'use strict';

const fs = require('fs');
const path = require('path');

const alertUser = require('../../feedback/alertUser');

/**
 *
 * @param {Directory|String} directory - The place where the option is supposed to be
 * @param {File/Folder|String} location - The location-folder we are checking if exists
 */

async function validateLocationFolder(directory, location) {
  try {
    if (fs.existsSync(path.join(directory, location))) {
      return true;
    } else {
      alertUser('existence', 'location', { location }, true);
      throw Error();
    }
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = validateLocationFolder;
