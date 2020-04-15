'use strict';

const path = require('path');

const configureReadStream = require('../utils/readwrite/configureReadStream');
const configureWriteStream = require('../utils/readwrite/configureWriteStream');

const doesExist = require('../utils/checkers/doesExist');

const alertUser = require('../feedback/alertUser');

/**
 * Here the 'makemy' folder gets added to the .gitignore in the users project
 * so that it doesn't get uploaded to their website (if using github).
 *
 * Todo: Add some more specific configs in case the user doesn't use makemy folder.
 * @param {Path|String} directory - the directory of where the makemy function runs
 * @param {String} location - the path to the 'posts'-folder
 */

async function createGitIgnore(directory, location) {
  try {
    const rootPath = path.join(location, directory);
    const alreadyExists = await doesExist(rootPath, '.gitignore');

    let gitignore = '';

    if (alreadyExists) {
      const rl = configureReadStream(path.join(rootPath, '.gitignore'));

      for await (const line of rl) {
        gitignore += `${line} \n`;

        if (line.includes('makemy') && line.length === 'makemy'.length) {
          return;
        }
      }
    } else if (!alreadyExists) {
      alertUser('gitignore', 'created');
    }

    gitignore += 'makemy';

    alertUser('gitignore', 'added');

    configureWriteStream(path.join(rootPath, '.gitignore')).write(gitignore);
  } catch (error) {
    throw Error(error);
  }
}

module.exports = createGitIgnore;
