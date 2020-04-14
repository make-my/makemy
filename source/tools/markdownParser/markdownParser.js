'use strict';

const path = require('path');

const configureReadStream = require('../../utils/readwrite/configureReadStream');

const marked = require('marked');

/**
 * Let me just say, this was a breeze compared to creating the sugarParser.
 * Funny thing is that this will 99% be used more than the sugarParser, but
 * it was a lot of fun creating my own parser. I'll keep working on that one aswell.
 *
 * 100% kudos to the marked library!
 *
 * @param {Directory|String} directory - Usually __dirname (but can be any other correct path to the root-folder of the project)
 * @param {Directory|String} sourcefolder - The folder where are all the post-files are
 * @param {File|String} postFile - The file we want to create a post for
 */

async function markdownParser(directory, sourcefolder, postFile) {
  try {
    const rl = configureReadStream(
      path.join(directory, sourcefolder, postFile)
    );

    let HTML = '';

    for await (const line of rl) {
      // Don't add the --name core-info or the --introduction core-info
      if (line.startsWith('--name') || line.startsWith('--introduction')) {
        continue;
      }

      HTML += `${line}\n`;
    }

    return marked(HTML);
  } catch (error) {
    throw Error(error);
  }
}

module.exports = markdownParser;
