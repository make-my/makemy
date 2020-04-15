'use strict';

const path = require('path');
const fs = require('fs');

const terminal = require('../feedback/terminal');
const rewritePage = require('./rewritePage');

const configureReadStream = require('../utils/readwrite/configureReadStream');

const scanItems = require('../utils/readwrite/directory-utils/scanItems');

/**
 *
 * @param {Directory|String} directory - the path to the project folder
 * @param {String} template - the name of the new template
 * @param {String/Array} posts - what posts should be updated. String = all, Array = [name of posts]
 */

async function replaceHTML(directory, template, posts) {
  try {
    const rl = configureReadStream(path.join(directory, template + '.html'));

    let templateHTML = '';

    let pastHead = false;

    for await (let line of rl) {
      if (pastHead) {
        templateHTML += line;
        continue;
      }
      if (line.trim().startsWith('<body')) {
        pastHead = true;
      }
    }

    /**
     * Here we loop through the 'posts'-folder and find all the posts where we
     * want to replace the template.
     * @param {Directory|String} dir - the path to the directory we want to read
     * @param {String} post - name of the post we want to find
     */

    async function readDirectory(dir, post) {
      fs.readdir(dir, async function(err, items) {
        if (err) {
          return terminal('Unable to scan directory: ' + err);
        }

        if (items.includes('index.html') && post) {
          if (posts === 'all' || posts.includes(post)) {
            const indexHTML = path.join(directory, 'posts', post, 'index.html');

            await rewritePage(indexHTML, templateHTML);
          }
        } else {
          await scanItems(items, dir, readDirectory);
        }
      });
    }

    readDirectory(directory);
  } catch (error) {
    terminal(error);
  }
}

module.exports = replaceHTML;
