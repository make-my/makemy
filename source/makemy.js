/**
 * makemy is an open source tool created by Mathias Picker
 *
 * The tools goal is to simplify the process of writing, creating and publishing posts/documents
 * on static websites without the need of a back-end server.
 *
 * GitHub:
 * NPM:
 */

'use strict';

const makemy = {
  page: require('./tools/createPage/createPage'),
  json: require('./tools/updateJson/updateJson')
};

module.exports = makemy;
