'use strict';

const fs = require('fs');
const path = require('path');

const configureWriteStream = require('../utils/readwrite/configureWriteStream');

/**
 * addConfigsToJson creates the allPosts.json file with an array of all the config files found.
 *
 * Note: This function is somewhat similar to the addToJson.js function, but i decided to split them
 * up to keep things cleaner.
 * There is no reason to do the parse-validation and check if everything looks good, as the JSON file
 * was reset in the validation check before this part.
 *
 * @param {Path} directory - The pathname for the posts folder.
 * @param {Oject} info - An object containing the core-info about the post we want to add to our JSON file.
 * @param {String} option - Options for the JSON file
 *
 */

async function addConfigsToJson(directory, info, option) {
  try {
    const allPostJsonFile = path.join(directory, 'allPosts.json');

    const json = await fs.promises.readFile(allPostJsonFile);

    let allPosts = JSON.parse(json);

    info.forEach(i => allPosts.posts.push(i));

    if (option.toLowerCase() === 'ascending') {
      allPosts.posts.sort((a, b) =>
        a.creationDateMS > b.creationDateMS ? -1 : 1
      );
    }
    if (option.toLowerCase() === 'descending') {
      allPosts.posts.sort((a, b) =>
        a.creationDateMS > b.creationDateMS ? 1 : -1
      );
    }

    const updatedjson = JSON.stringify(allPosts);

    configureWriteStream(allPostJsonFile).write(updatedjson);
  } catch (error) {
    throw Error(error);
  }
}

module.exports = addConfigsToJson;
