'use strict';

const fs = require('fs');

const alertUser = require('../../feedback/alertUser');

/**
 *
 * @param {Folder|String} folder - The folder we are checking if exists
 */

async function validatePostsFolder(folder) {
  try {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
      alertUser('creation', 'postsFolder');
    }
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = validatePostsFolder;
