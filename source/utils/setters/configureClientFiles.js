'use strict';

const fs = require('fs');
const path = require('path');

/**
 *
 * @param {Folder|String} folder - The folder where the generated posts are stored
 */

async function configureClientFiles(folder) {
  try {
    fs.copyFile(
      path.join(__dirname, '../client-files', 'styling.css'),
      path.join(folder, 's.css'),
      err => {
        if (err) throw err;
      }
    );

    fs.copyFile(
      path.join(__dirname, '../client-files', 'code.js'),
      path.join(folder, 'c.js'),
      err => {
        if (err) throw err;
      }
    );
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = configureClientFiles;
