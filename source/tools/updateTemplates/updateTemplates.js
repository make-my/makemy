'use strict';

/**
 * This functions task is to update the templates of already generated index.html-pages.
 * The user can tell which posts should be updated (either an array or just 'all'),
 * and the function will automatically rewrite the HTML of the pages with the new template provided.
 *
 * Author: Mathias Picker
 */

const terminal = require('../../feedback/terminal');
const alertUser = require('../../feedback/alertUser');

const checkOptions = require('../../utils/checkers/checkOptions');
const validateTemplate = require('../../utils/validators/validateTemplate');
const replaceHTML = require('../../dist/replaceHTML');

/**
 *
 * @param {Path} directory - The pathname for the project
 * @param {Object} options - The option parameters for the JSON file
 */

async function updateTemplates(directory, options) {
  let { template, posts } = options;
  alertUser('template', 'start');

  try {
    await checkOptions(options, 'updateTemplates');
    await validateTemplate(directory, template);

    await replaceHTML(directory, template, posts);

    alertUser('template', 'success');
  } catch (error) {
    terminal(error);
  }
}

module.exports = updateTemplates;
