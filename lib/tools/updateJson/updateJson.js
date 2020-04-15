'use strict';

/**
 * This function allows for update of the JSON file that contains the core information about every post.
 * There are not many configurations to do on the JSON file - but one of the more useful use-cases for this function
 * is to "revive" the JSON file in case something has happened (deleted, accidentally changed etc.).
 *
 * Thanks to the config files of every post can we easily gain the core-information and create the JSON file
 * without having to parse every single post. The JSON file will be entirely from scratch every time this function
 * gets called.
 *
 * Author: Mathias Picker
 */

const path = require('path');

const alertUser = require('../../feedback/alertUser');
const terminal = require('../../feedback/terminal');

const validateJson = require('../../utils/validators/validateJson');
const createJsonFromConfigs = require('../../dist/createJsonFromConfigs');

const checkOptions = require('../../utils/checkers/checkOptions');

/* Time measurement for function execution */
const startTime = process.hrtime();

/**
 *
 * @param {Path} directory - The pathname for the project
 * @param {Object} options - The option parameters for the JSON file
 */

async function updateJson(directory, options) {
  try {
    let { order } = options;
    /**
     * Currently the function only supports ordering the JSON file in ascending or descending order
     * If an order option was provided, but its value is not valid, then the user gets feedback and the default
     * option of 'ascending' gets set.
     */

    if (!(order === 'ascending' || order === 'descending')) {
      alertUser('json', 'wrongOrder', { order });
      order = 'ascending';
    }

    /**
     * Some validation before the JSON file becomes created from the config-files.
     * Most of the work gets done in the createJsonFromConfigs function.
     */

    try {
      const postsFolder = path.join(directory, 'posts');

      await checkOptions(options, 'updateJson');
      await validateJson(postsFolder, true);
      await createJsonFromConfigs(postsFolder, order);
    } catch (error) {
      return terminal(error);
    }

    if (order === 'ascending') {
      alertUser('json', 'updated', { newOrder: `${order} ⬆️  (newest first)` });
    }
    if (order === 'descending') {
      alertUser('json', 'updated', { newOrder: `${order} ⬇️  (oldest first)` });
    }

    const endTime = process.hrtime(startTime);

    alertUser('generic', 'time', {
      message: 'Updating allPosts.json',
      endTime
    });
  } catch (error) {
    terminal(error);
  }
}

module.exports = updateJson;
