'use strict';

/**
 * This program creates the post page from the html template and post document. It automatically creates a 'posts' folder in the root of the
 * project (or if already exists, uses that one) and creates a folder there with the name of the post. Within this folder will a
 * index.html file be created.
 *
 * The idea of the program is that we take in an HTML-file which serves as a template.
 * The program keeps everything that has been written in the template, and places the files needed on the client side
 * at the end of the <head> tag. Only exception is the init styling for the post. This css file will be placed above
 * the <link> tag containing a css file. This is done so that if user wants, they can style the post-components as they wish in
 * their css file in the template, and because of css's order of precedence will their stylings be used instead of the init-stylings.
 *
 * The program also automatically creates a .json file, containing all the posts in the posts-folder. This .json file
 * can be used to for example create preview components of the posts on the users homepage. This .json file will also be stored in the posts folder,
 * along with the styling.css and client.js file.
 *
 * Author: Mathias Picker
 */

const path = require('path');

/*  FUNCTIONS FOR SETTING COLOR ON FEEDBACK IN TERMINAL */
const terminal = require('../../feedback/terminal');

/* Helpers */
const alertUser = require('../../feedback/alertUser');
const configureReadStream = require('../../utils/readwrite/configureReadStream');
const configureWriteStream = require('../../utils/readwrite/configureWriteStream');

/* Step one */
const checkOptions = require('../../utils/checkers/checkOptions');
const validateTemplate = require('../../utils/validators/validateTemplate');
const validateSourceFolder = require('../../utils/validators/validateSourceFolder');
const validateLocationFolder = require('../../utils/validators/validateLocationFolder');
const findPostFile = require('../../utils/getters/findPostFile');
const doesPageExist = require('../../utils/checkers/doesPageExist');
const createGitIgnore = require('../../dist/createGitIgnore');

/* Step two */
const validateCoreInfo = require('../../utils/validators/validateCoreInfo');

/* Step three */
const validatePostsFolder = require('../../utils/validators/validatePostsFolder');
const validateFolderForThisPost = require('../../utils/validators/validateFolderForThisPost');
const configureClientFiles = require('../../utils/setters/configureClientFiles');
const validateJson = require('../../utils/validators/validateJson');
const addToJson = require('../../dist/addToJson');

/* Step four */
const parse5 = require('parse5');
const setHeadContent = require('../../utils/setters/setHeadContent');
const markdownParser = require('../markdownParser/markdownParser');
const sugarParser = require('../sugarParser/sugarParser');

/* Step five */
const createConfigForPost = require('../../utils/configs/createConfigForPost');

/* Time measurement for function execution */
const startTime = process.hrtime();

/**
 * createPage creates the html page for the post page
 * @param {__dirname|String} directory - The dirname of where the template is
 * @param {Object} options - The option parameters for this post
 */

async function createPage(directory, options) {
  /**
   * This function does a couple of different things.
   *
   * 1. First of all we assign the values from the option parameter, and begin checking if everything is okay.
   *    For every step, if something has gone wrong, we tell the user and stop the execution.
   *
   *    Most of the code here is pure error-handling and feedback, but i find it important to give
   *    proper feedback if the user has done something wrong.
   *
   */

  let { template, sourcefolder, postname, location = '' } = options;

  /* 
  If i want to change the options name, then i'll just assign the new names to the
  same variables used throughout the code. Can't be bothered (for now) to change all the variable names
  if i decide to change the options 
  */

  /*const*/ template = template;
  /*const*/ sourcefolder = sourcefolder;
  /*const*/ postname = postname;
  /*const*/ location = location;

  let { extension, update = false, sugar = false, css = true } = options;

  let postFile;
  let pageExists = false;
  let postCreated = false;

  // Checking if the input sent from user is fine.
  try {
    await checkOptions(options, 'createPage');
    await validateTemplate(directory, template);
    await validateSourceFolder(directory, sourcefolder);
    await validateLocationFolder(directory, location);
    await createGitIgnore(directory, location);

    postFile = await findPostFile(directory, sourcefolder, postname, extension);

    pageExists = await doesPageExist(directory, location, postname, update);
  } catch (error) {
    return terminal(error);
  }

  /**
   *
   * 2. Good news! All the files existed, and if they didn't, the process has been stopped and the user knows what's up.
   *    So now we begin parsing the template and create a new one.
   *
   *    The approach here is that we first store the core info about the post, which will be added to the .json file and to a secret .config file in every post.
   *    We also extract the birth-time of the post document so that each post has a date of when it was written. This is used for easily sorting by date.
   *
   */

  let CORE_INFO_POSTNAME = { url: 'posts/' + postname };

  let postCoreInfo = {};

  const postFileLocation = path.join(directory, sourcefolder, postFile);

  const rlPost = configureReadStream(postFileLocation);

  try {
    postCoreInfo = await validateCoreInfo(
      postFileLocation,
      rlPost,
      CORE_INFO_POSTNAME
    );
  } catch (error) {
    return terminal(error);
  }

  /**
   *
   * 3. Here we choose (or create) the posts-folder and then afterwards create the folder which will contain the page.
   *
   *    When that's done, we copy over the styling.css file from our program and put it in the posts folder. I've chosen the approach of copying it over everytime,
   *    so that if something get's changed in the styling.css file by accident, it will be fixed when a new post gets created.
   *    Then the same gets done with the client.js file (but at the bottom of the <head> tag). This file contains the init function for Highlight.js.
   *
   */

  const publicPostsFolder = path.join(directory, location, 'posts');
  let thisPost = path.join(publicPostsFolder, postname);

  try {
    await validatePostsFolder(publicPostsFolder);
    await configureClientFiles(publicPostsFolder);
    await validateJson(publicPostsFolder, false);
    await addToJson(publicPostsFolder, postCoreInfo, update);
    await validateFolderForThisPost(thisPost);
  } catch (error) {
    return terminal(error);
  }

  /**
   *
   * 4. The approach here is to add the head content that is needed for the init-configs for the post
   *    and then afterwards replace the <POST> tag with the parsed post.
   *
   */

  try {
    const rl = configureReadStream(path.join(directory, template + '.html'));

    let HTML = '';

    for await (const line of rl) {
      HTML += line;
    }

    const DOCUMENT = parse5.parse(HTML);

    const headContent = setHeadContent(DOCUMENT, postCoreInfo);

    /**
     * Inserting the "parsed" head content
     */
    HTML = HTML.replace(/<head>(.*?)<\/head>/, `<head>${headContent}</head>`);

    /**
     * Finding the <post> tag and replacing it with the post
     */
    const match = HTML.match(/<post>/gi);
    const postPosition = HTML.indexOf(match[0]);

    if (postPosition !== -1) {
      /**
       * Adding creation date
       * Doing this here instead of in the parser, because those should only creates HTML based on document content.
       * The date is automatically added no matter what.
       */
      let postHTML = `<time class="created-at">${postCoreInfo.creationDate}</time>`;

      postHTML = sugar
        ? await sugarParser(directory, sourcefolder, postFile)
        : await markdownParser(directory, sourcefolder, postFile);

      HTML = HTML.replace(
        /<post>/gi,
        `<section class="post-section">${postHTML}</section>`
      );

      postCreated = true;

      alertUser('post', 'parsed', { sugar });
    }

    /**
     * Writing the new index.html file
     */
    configureWriteStream(path.join(thisPost, 'index.html')).write(HTML);
  } catch (error) {
    return terminal(error);
  }
  /**
   * 5. Now everything has been created succesfully, and the last thing to do is to tell
   *    the user that the generation is done. Note that the page still get's generated if the user does not provide
   *    a <POST> tag in their template file (maybe make it mandatory to have this tag?).
   *
   *    The tool also created a config file with the core-info about the post. This config file is used in the
   *    updateJSON() function, so that it's not necessary to parse all the posts just to create/update the JSON file.
   *
   */

  if (!postCreated) {
    alertUser('existence', 'TAG');
  } else {
    // Creating a hidden config-file which stores the core-info about this post.
    createConfigForPost(thisPost, postCoreInfo);
  }

  if (update) {
    alertUser('generic', 'complete', { postFile, version: 'UPDATED 🔁' });
  } else {
    alertUser('generic', 'complete', { postFile, version: 'CREATED ✅' });
  }

  const endTime = process.hrtime(startTime);

  alertUser('generic', 'time', { message: 'Creating this page', endTime });
}

module.exports = createPage;
