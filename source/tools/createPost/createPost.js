'use strict';

/**
 * This tools task it to create the HTML code from the document that the user has provided.
 * The code parses the text, and follows the rule of the SYNTAX.js file to create
 * the correct elements based on their syntax tags.
 *
 * Author: Mathias Picker
 */

const path = require('path');

const { SYNTAX, modes } = require('../../utils/SYNTAX');

const createHTML = require('../../utils/HTML_FOR_POST/createHTML');
const findPreviousMode = require('../../utils/getters/findPreviousMode');
const checkMode = require('../../utils/checkers/checkMode');

const {
  lineWithLinkTag,
  lineWithCodeTag,
  lineWithBlockquoteTag
} = require('../../utils/HTML_FOR_POST/allTags');

const lookForSyntaxTitles = require('../../utils/checkers/lookForSyntaxTitles');
const configureReadStream = require('../../utils/readwrite/configureReadStream');
const setTitleLevel = require('../../utils/setters/setTitleLevel');
const createdQuotee = require('../../utils/createCustomItems/createdQuotee');
const alertUser = require('../../feedback/alertUser');

/**
 * The core principle of this code is to set the "parser" into different modes
 * based on the syntax found in the text.
 *
 * Thanks to the Proxy-object (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
 * can this elegantly be done by "listening" to the MODE-object.
 *
 * Whenever a new mode gets set to true, we know that the previous mode is finished
 * (except for the first time, but it doesn't really matter because then the sectionContent is empty anyways).
 * Therefore by using this listening-approach we can create the HTML-wrapper for the
 * previous section, and continue to keep looping through the content of the document by always knowing
 * which mode we are in.
 */

// The whole post will be added to this string.
let POST = '';

// The content of a section will be added in this string.
let sectionContent = '';

// Boolean if we are in any mode at all.
let inMode = false;

// Our Proxy object, created from the modes object. Contains all the different modes we have created in the SYNTAX object.
const MODES = new Proxy(modes, {
  set: (target, key, value) => {
    /**
     * The approach in this handler is to first check if there is any content to be added.
     * Then we find the mode that is set to true, and create the HTML-wrapper. Note that this is still
     * the previous mode, because the key get's updated at the end of the caller.
     *
     * That is the quirky and fun thing of a Porxy object:
     * If we update the Proxy-object in our code, its value doesn't actually get updated
     * until we do it here in this caller function.
     */

    if (sectionContent.length !== 0) {
      inMode = false;

      const { tag, className } = findPreviousMode(MODES);

      if (tag !== undefined && className !== undefined) {
        inMode = true;
      }

      POST += createHTML(tag, className, sectionContent);

      // Reset section content
      sectionContent = '';
    }

    // Updating the target (MODES) to the mode we have set
    target[key] = value;

    // Have to return true to avoid the TypeError: 'set' on proxy: trap returned falsish for property 'error' when in strict mode. Solution found on https://github.com/GoogleChrome/proxy-polyfill/issues/20
    return true;
  }
});

/**
 * setMode sets us in the desired mode when we parse the post and want to add it to the correct section.
 * @param {String} wantedMode - The mode we want to go in to. Has to be one of the modes in the MODES object
 */

function setMode(wantedMode) {
  inMode = true;
  // Check if the wanted mode is valid
  if (MODES.hasOwnProperty(wantedMode)) {
    // Reset all MODES and set us in the correct mode
    for (const mode in MODES) {
      mode === wantedMode ? (MODES[wantedMode] = true) : (MODES[mode] = false);
    }
  } else {
    alertUser('postSyntax', 'unvalidMode', { wantedMode }, true);
    return;
  }
}

/**
 * createPost reads the content of the document.
 * It sets us in the correct mode if it finds syntaxes, and also alters supported HTML-tags.
 *
 * @param {Directory|String} directory - Usually __dirname (but can be any other correct path to the root-folder of the project)
 * @param {Directory|String} sourcefolder - The folder where are all the post-files are
 * @param {File|String} postFile - The file we want to create a post for
 */

async function createPost(directory, sourcefolder, postFile) {
  // Creating readStream of post-file
  const rl = configureReadStream(path.join(directory, sourcefolder, postFile));

  /**
   * In this for loop we parse the text in the document and create the correct HTML for the sections/items.
   */
  let counter = 0;
  let firstEmpty = false;
  let addBreak = false;

  for await (let line of rl) {
    // Counting the lines. Used for improved feedback if user does something wrong/silly.
    counter++;

    /**
     * The approach for the error handling is to check if a line has less than 4 words (except if we are in code-mode because here you may only want to write a couple words on one line (for example 'let object;')).
     * If a line has less than four words then it's most likely supposed to be a syntax setter.
     * So if a line does not have the trigger symbol (#) but looks like a syntax, we check if the word actually contains
     * any of the syntax words (to just really make sure that it probably was a syntax-setter).
     * If it does, we tell the user that "Hey, you wrote Title - 2, but you probably meant to write # Title -2"
     */

    if (
      line.trim().split(' ').length < 4 &&
      !line.includes('#') &&
      !MODES.code
    ) {
      if (lookForSyntaxTitles(line) === true) {
        alertUser('postSyntax', 'estimatedMispell', { line, counter });
      }
    }

    /**
     * Here we check if we are in different modes with the checkMode() function, which takes in the line and the mode we want to check.
     * If we get returned true from the checkMode then we set the program into the correct mode.
     * Note:
     * The title mode is a little different, because the user can optionally set a level
     * to the title syntax. So here we check if that has been done and sets the level of the title to the correct one.
     */

    if (checkMode(line, 'title')) {
      setMode('title');

      const level = setTitleLevel(line);

      SYNTAX.title[2] = `h${level}`;

      continue;
    }

    if (checkMode(line, 'text')) {
      setMode('text');
      continue;
    }

    if (checkMode(line, 'code')) {
      setMode('code');
      continue;
    }

    if (checkMode(line, 'quote')) {
      setMode('quote');
      continue;
    }

    /**
     * Whenever we are in a mode there are ome couple of things we want to look after.
     * The idea here is to check the lines for specific things that the program does something with,
     * and alter them so that the output becomes correct.
     * The first check is always if the string is empty, so that we can just skip checking anything else.
     * However, because we want to allow paragraph spacing by just adding 2 empty lines, we save if a line is empty.
     * So if we find another empty line right after that: add a break and reset firstEmpty.
     *
     * The design principle here is that we just add and fix things to the current line, no matter how many findings we have of
     * the different items. So if we find a <a>-tag on the line, we fix all of those, and in the next if statement we might also find a code tag and alter that one.
     * The key here is that our customizations on the line in one check gets passed over to the next one, so that it doesn't matter how many triggers
     * we find in a line.
     *
     */

    if (inMode) {
      if (line.trim() === '' && !MODES.code) {
        if (sectionContent.length !== 0) {
          if (!firstEmpty) {
            firstEmpty = true;
          }
        }
        continue;
      }

      if (!line.startsWith('#') && firstEmpty && sectionContent.length !== 0) {
        addBreak = true;
      }

      firstEmpty = false;

      if (MODES.quote) {
        // If we are in quote mode, look for the --- trigger so we can create the author/quotee styling

        if (line.includes(SYNTAX.quote[4].quotee)) {
          /**
           * Here we automatically skip to the next iteration, because this line should
           * only contain the --- trigger and the author of the tag, so we don't want to look for anything else.
           */
          sectionContent += createdQuotee(line);

          continue;
        }
      }

      // Check if line includes an <a> tag, so that we can automatically add a noreferrer (for safety reasons)
      if (line.includes('<a href=')) {
        line = lineWithLinkTag(line);
      }

      // Check if line includes a <code> tag, so that we can set the correct flow-setting
      if (line.includes('<code')) {
        line = lineWithCodeTag(line);
      }

      // Check if line includes a <blockquote> tag
      if (line.includes('<blockquote')) {
        line = lineWithBlockquoteTag(line);
      }

      /**
       * For every section we want to put every line that the user created in their document
       * in its own paragraph, so that we page will look the same way as the original document.
       * Everything line except the title one should therefore be wrapped in a paragraph.
       */

      if (!MODES.title) {
        line = `<p>${line}</p>`;
      }

      // Add line to sectionContent. Because of the Proxy on our MODES we can easily just change modes and add
      // content to this string. Because when a mode changes, the string gets added to the POST and becomes empty again.
      sectionContent += addBreak ? line.replace(line, `<br>${line}`) : line;
      addBreak = false;
    } else {
      /**
       * If we are NOT inMode, then there is usually something wrong (because you have to use a syntax if you want the content beneath to be added to the post).
       * Because the --name and --introduction are seperate informations about the post (used for the preview in the json file containing all posts),
       * we have to check that the line does not contain those triggers. So if none of those are used, and the line is not empty,
       * we tell the user that the content was not added to the  page.
       * Note: The page will still be generated, as this does not break the creation in any way.
       * Therefore it's important to tell the user that the content was not added.
       */
      if (
        line.trim().length !== 0 &&
        !line.includes('--name') &&
        !line.includes('--introduction')
      ) {
        alertUser('postSyntax', 'notAdded', { line, counter });
      }
    }
  }

  // Setting all modes to false so that the Proxy will be called for the last time and everything left should be added.
  for (const mode in MODES) {
    MODES[mode] = false;
  }

  return POST;
}

module.exports = createPost;
