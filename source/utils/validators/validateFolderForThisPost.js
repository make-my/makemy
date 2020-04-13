'use strict';

const fs = require('fs');

const alertUser = require('../../feedback/alertUser');

/**
 *
 * @param {Folder|String} post - The folder where the index.html file for the pos is stored
 */

async function validateFolderForThisPost(post) {
  try {
    if (!fs.existsSync(post)) {
      fs.mkdirSync(post);
    }
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = validateFolderForThisPost;
