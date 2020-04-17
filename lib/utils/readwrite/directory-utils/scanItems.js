'use strict';

const path = require('path');
const fs = require('fs');

/**
 *
 * @param {Array} items - a list of all the items in a directory
 * @param {Directory} dir - the directory one step above where the items were found
 * @param {Function} callback - callback function for when a folder has been found, usually "readDirectory"
 */

async function scanItems(items, dir, callback) {
  items.forEach(item => {
    const itemDir = path.join(dir, item);
    fs.stat(itemDir, async function(err, stat) {
      if (err) {
        return self.onStatError(err);
      }

      if (stat.isDirectory()) {
        await callback(itemDir, item);
      }
    });
  });
}

module.exports = scanItems;
