'use strict';

/**
 * This function allows for update of the JSON file that contains the core information about every post.
 * There are not many configurations to do on the JSON file - but one of the more useful use-cases for this function
 * is to "revive" the JSON file in case something has happened.
 *
 * Thanks to the config files of every post can we easily gain the core-information and create the JSON file
 * without having to parse every single post. The JSON file will be entirely from scratch every time this function
 * gets called.
 *
 * Author: Mathias Picker
 */

const path = require('path');

async function _JSON(directory, options) {
  console.log(directory, options);
}

module.exports = _JSON;
