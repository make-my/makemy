'use strict';

const fs = require('fs');
const path = require('path');

const alertUser = require('../../feedback/alertUser');
const doesExist = require('../checkers/doesExist');

/**
 *
 * @param {Directory|String} directory - The place where the option is supposed to be
 * @param {File/Folder|String} sourcefolder - The sourcefolder/folder where the post-file is
 * @param {String} postname - name of post-file
 * @param {String} extension - optional for user to use, but tells the extension of the file. Different approaches to find the post-file depending on extenstion was provided.
 */

async function findPostFile(directory, sourcefolder, postname, extension) {
  if (extension === undefined) {
    const locationForFile = path.join(directory, sourcefolder);

    try {
      const postFilesArray = await fs.promises.readdir(
        locationForFile,
        function(err, files) {
          if (err) {
            terminal(err);
            return;
          }
        }
      );

      const postFile = postFilesArray.find(
        postFile => postFile.split('.')[0] === postname
      );

      if (!postFile) {
        alertUser(
          'existence',
          'postNoExtension',
          {
            postname,
            locationForFile
          },
          true
        );
        throw Error();
      }
      return postFile;
    } catch (error) {
      throw Error(error);
    }
  } else {
    const locationForFile = path.join(directory, sourcefolder);

    extension = extension.includes('.') ? extension : `.${extension}`;

    const postFile = postname + extension;

    const postExists = await doesExist(locationForFile, postFile);

    if (!postExists) {
      alertUser('existence', 'post', { postFile, locationForFile }, true);

      throw Error();
    }

    return postFile;
  }
}

module.exports = findPostFile;
