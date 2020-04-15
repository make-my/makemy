'use strict';

const path = require('path');
const fs = require('fs');

const terminal = require('../feedback/terminal');
const configureReadStream = require('../utils/readwrite/configureReadStream');
const addConfigsToJson = require('./addConfigsToJson');

const scanItems = require('../utils/readwrite/directory-utils/scanItems');

/**
 * jsonFromConfigs searches through the posts folder and finds all the posts (validation is by checking if a path is a folder).
 * Note: readDirectory is a recursive function for searching through the folder-hierarchy.
 * @param {Path} directory - The pathname for the posts folder.
 * @param {Object/String} option - The options passed for generating the JSON file. Atm is there only 1 option, so the variable is just a string.
 */

async function jsonFromConfigs(directory, option) {
  /**
   * The approach to find create the allPosts.json file from every posts config file is as follows:
   * 1. Search through the 'posts' folder with the readDirectory function.
   * 2. Scan all the items withinn the 'posts' folder.
   * 3. Check which items are folders, and run the readDirectory function again with the found folders.
   * 4. Check if the folder contains a .post.config file. If it does, we increment the "recursive-counter"
   *    and run the pushConfig function. This function reads the content of the config file and creates an object
   *    with the information. This object gets pushed to an array containing the config-information for all the posts.
   *    At the end of the pushconfig the recursion-counter gets decremented.
   *
   *    Note: Because of the async-structure will all the directories (posts) found
   *          have their config file read and added to the allConfigs array.
   *
   *          That is why the 'recursion-counter' is used, so that when the
   *          last config has been pushed will the counter be 0 again,
   *          and the addToJson function can be run with an array of all the configs.
   *
   */

  try {
    const allConfigs = [];
    let recursionCounter = 0;

    async function readDirectory(dir, post) {
      fs.readdir(dir, async function(err, items) {
        if (err) {
          return terminal('Unable to scan directory: ' + err);
        }

        /**
         * Check if the directory contains a .post.config file and there is a post provided.
         * The the recursion counter works because it gets incremented here before the pushConfig function gets run
         * and is decremented at the end of the pushConfig function.
         */

        if (items.includes('.post.config') && post) {
          recursionCounter++;
          const configFile = path.join(directory, post, '.post.config');
          pushConfig(configFile);
        } else {
          /**
           * Here is where the "async-mess" begins. All the items found in the 'posts' folder that
           * are directories gets run again with the readDirectory function. If the user has not done anything
           * with the posts folder, will all of these directories contain a .post.config file, and the pushConfig function
           * will be executed for all of the posts.
           */
          await scanItems(items, dir, readDirectory);
        }
      });
    }

    async function pushConfig(configFile) {
      const rl = configureReadStream(configFile);
      const coreInfo = {};

      for await (const line of rl) {
        const infoPart = line.split('||');

        coreInfo[infoPart[0]] =
          infoPart[0] === 'creationDateMS'
            ? parseFloat(infoPart[1])
            : infoPart[1];
      }

      allConfigs.push(coreInfo);

      recursionCounter--;

      /**
       * If the counter is back to 0 then all of the config files have been added, and
       * the addToJson function can be fired with an array of all the config-objects.
       */

      if (recursionCounter === 0) {
        addConfigsToJson(directory, allConfigs, option);
      }
    }

    readDirectory(directory);
  } catch (error) {
    terminal(error);
  }
}

module.exports = jsonFromConfigs;
