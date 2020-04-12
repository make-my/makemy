'use strict';

const fs = require('fs');
const path = require('path');

const alertUser = require('../../feedback/alertUser');

/**
 *
 * @param {Directory|String} directory - The place where the option is supposed to be
 * @param {File/Folder|String} template - The file/folder we are checking if exists
 */

async function validateTemplate(directory, template) {
  try {
    if (fs.existsSync(path.join(directory, template + '.html'))) {
      return true;
    } else {
      console.log(template);
      alertUser('existence', 'template', { template }, true);
      throw Error();
    }
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = validateTemplate;
