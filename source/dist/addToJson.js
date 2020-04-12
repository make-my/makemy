'use strict';

const fs = require('fs');
const path = require('path');

const alertUser = require('../feedback/alertUser');
const terminal = require('../feedback/terminal');

const configureWriteStream = require('../utils/readwrite/configureWriteStream');

/**
 * addToJson adds the core-info about a post to a allPosts.json file which servers as a 'storage' of all the post files.
 * This file can be used with a fetch()-call on the client so that the user can use it on their site.
 *
 * @param {Path} directory - The pathname for the posts folder.
 * @param {Oject} info - An object containing the core-info about the post we want to add to our JSON file.
 * @param {Boolean} update - Telling if we are in update mode or not
 */

async function addToJson(directory, info, update) {
  /**
   *
   * The approach in this function is as follows:
   * 1. Check if the allPosts.json file exists, and if it doesn't add it to the posts folder.
   * 2. Try to parse the allPosts.json file. If it goes wrong, it's either because it's empty or because it has wrong formatting.
   *    Tell the user what has been done; either if was stopping the process because of wrong formatting or creating a new template because the JSON was empty.
   * 3. Add the post to the JSON file. If we are in update-mode, then find the post and replace it. Else, add it to the top of the JSON file (last posts come first).
   * 4. Some specific error handling, just in case user has done something funny.
   *
   */

  try {
    const allPostJsonFile = path.join(directory, 'allPosts.json');

    const createJSONTemplate = () => {
      configureWriteStream(allPostJsonFile).write(
        `{
  "posts": []
  }`
      );
    };

    if (!fs.existsSync(allPostJsonFile)) {
      try {
        createJSONTemplate();
        alertUser('creation', 'jsonFile');
      } catch (error) {
        terminal(error);
      }
    }

    let json = await fs.promises.readFile(allPostJsonFile);

    let allPosts;

    try {
      allPosts = JSON.parse(json);
    } catch (error) {
      /**
       * If parsing went wrong then check the error-message.
       * If it includes the word 'position', then theres something wrong with the formatting.
       * If it doesn't, then it's because the JSON file is empty, and we create a new template.
       */
      const errorMessage = err.message;

      if (errorMessage.includes('position')) {
        alertUser('json', 'wrongFormat', {
          errorMessage
        });
        alertUser('generic', 'stop');
        throw Error(errorMessage);
      } else {
        createJSONTemplate();

        json = await fs.promises.readFile(allPostJsonFile);

        allPosts = JSON.parse(json);

        alertUser('json', 'empty');
      }
    }

    const alreadyExists = allPosts.posts.find(post => post.url === info.url);

    if (update && alreadyExists) {
      // If we want to update the post then remove it and add the new version at the same place.
      const indexOfPost = allPosts.posts.indexOf(alreadyExists);

      const updatedPost = allPosts.posts[indexOfPost];

      updatedPost.name = info.name;
      updatedPost.introduction = info.introduction;

      allPosts.posts[indexOfPost] = updatedPost;
    } else {
      allPosts.posts.unshift(info);
    }

    /**
     * Some pretty specific error-feedback here.
     * If a post has the same name and introduction (maybe the user copied it),
     * then tell them that a post with the same name and introduction already exists but with a different url.
     *
     * Note: This error handling is quote specific, so if the setup of the preview-info of the posts gets changed, then this has
     * to be changed aswell.
     */

    const siblingPost = allPosts.posts.find(
      post =>
        post.name === info.name &&
        post.introduction === info.introduction &&
        post.url !== info.url
    );

    const equalPostFeedback = sameDate => {
      alertUser('json', 'sibling', { sameDate });
    };

    // Subtracting 2 because we don't care about the creationDate and creationDateMS
    let counter = Object.keys(info).length - 2;

    if (counter > 0) {
      for (const key in siblingPost) {
        if (key !== 'creationDate' || key !== 'creationDateMS')
          if (siblingPost[key] === info[key]) {
            counter--;
          }
      }

      switch (counter) {
        case 1:
          equalPostFeedback(true);
          break;

        case 2:
          equalPostFeedback(false);
          break;
      }
    }

    /**
     * Sorting posts by creation date
     * Allow some configurations here?
     */
    allPosts.posts.sort((a, b) =>
      a.creationDateMS > b.creationDateMS ? -1 : 1
    );

    const updatedjson = JSON.stringify(allPosts);

    configureWriteStream(allPostJsonFile).write(updatedjson);

    if (update && alreadyExists) {
      alertUser('json', 'complete', {
        version: 'updated in the allPosts.json file 🔁'
      });
    } else {
      alertUser('json', 'complete', {
        version: 'added to the the allPosts.json file ✅'
      });
    }
  } catch (error) {
    throw Error(error);
  }
}

module.exports = addToJson;
