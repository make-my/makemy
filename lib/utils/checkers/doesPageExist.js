'use strict';

const path = require('path');

const alertUser = require('../../feedback/alertUser');
const doesExist = require('./doesExist');

/**
 *
 * @param {Directory|String} directory - the directory where the post folder we are checking is located
 * @param {Folder|String} location - the name of the folder where the index.html of the post is stored
 * @param {String} postname - the name of the post
 * @param {Boolean} update - telling if we are in update mode or not
 */

async function doesPageExist(directory, location, postname, update) {
  try {
    const pageExists = await doesExist(
      path.join(directory, 'posts', location),
      postname
    );

    if (pageExists && !update) {
      alertUser('existence', 'page', { postname }, true);

      throw Error();
    }
    return pageExists;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = doesPageExist;
