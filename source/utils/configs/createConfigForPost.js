'use strict';

const path = require('path');

const configureWriteStream = require('../readwrite/configureWriteStream');

/**
 *
 * @param {File|String} post - The post to create the config file for
 * @param {Object} postCoreInfo - Object with the core info of the psot
 */

async function createConfigForPost(post, postCoreInfo) {
  try {
    const coreInfo = configureWriteStream(path.join(post, '.post.config'));

    for (const info in postCoreInfo) {
      coreInfo.write(`${info}||${postCoreInfo[info]}\n`);
    }
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = createConfigForPost;
