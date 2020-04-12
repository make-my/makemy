'use strict';

/**
 * All the message used for giving feedback to a user
 */

const { error, warning, info, success, underline } = require('./CHALKS');

const MESSAGES = {
  // Messages for options when running function
  initOptions: {
    template: error('Please add the template for the page.'),
    sourcefolder: error(
      'Please add the source folder where your text-file is located.'
    ),
    postname: error('Please add the name of text-file to create a page for.')
  },
  // Messages about the existence of items
  existence: {
    template: variable => {
      return error(
        `ERROR: The template ${variable.template}.html does not exist. Please insert a valid filename.`
      );
    },
    sourcefolder: variable => {
      return error(
        `ERROR: The folder ${variable.sourcefolder} does not exist. Please insert a valid directory.`
      );
    },
    location: variable => {
      return error(
        `ERROR: The location ${variable.location} does not exist. Please insert a valid directory`
      );
    },
    post: variable => {
      return error(
        `ERROR: The file ${variable.postFile} could not be found in ${variable.locationForFile} ⛔`
      );
    },
    postNoExtension: variable => {
      return error(
        `ERROR: The file ${variable.postname} could not be found in ${variable.locationForFile} ⛔`
      );
    },
    page: variable => {
      return [
        error(`ERROR: The page for ${variable.postname} already exists.'⛔`),
        warning(
          'If you wanted to update the post page, then the set the update option to true.'
        )
      ];
    },
    TAG: warning(
      'WARNING! YOU DID NOT PROVIDE ANY <POST> TAG IN YOUR HTML-TEMPLATE. POST PAGE WAS STILL CREATED BUT HAS NO CONTENT FROM YOUR POST.'
    )
  },
  // Messages about core info of a post
  coreInfo: {
    name: error(
      'ERROR: You must provide a name for the post at the beginning. Use --name: to do this.'
    ),
    introduction: error(
      'ERROR: You must provide an introduction for the post at the beginning. Use --introduction: to do this.'
    )
  },
  // Messages about the creation of folders/files
  creation: {
    postsFolder: info("The 'posts'-folder has been created."),
    jsonFile: info('The allPosts.json file has been created.')
  },
  // Messages about the syntax of posts
  postSyntax: {
    notAdded: variable => {
      return `${warning('NOTE:')} '${variable.line}' ${warning(
        `ON ${underline(
          `LINE ${variable.counter}`
        )} WAS NOT ADDED TO THE PAGE BECAUSE NO SYNTAX WAS PROVIDED IN BEFOREHAND.`
      )}`;
    },
    unvalidMode: variable => {
      return error(`${variable.wantedMode} is not a valid mode`);
    },
    estimatedMispell: variable => {
      return `${info('YOU WROTE')} '${variable.line}' ${info(
        `ON ${underline(`LINE ${variable.counter}`)}`
      )}. MAYBE YOU MEANT TO WRITE '# ${variable.line}' ${info('instead?')}`;
    }
  },
  // Messages about the JSON-handling
  json: {
    wrongFormat: variable => {
      return [
        warning('Note: Your allPosts.json file has wrong formatting. 🚫'),
        error(variable.errorMessage)
      ];
    },
    empty: warning(
      'The allPosts.json file was empty, so a new template was created and the post was added.'
    ),
    sibling: variable => {
      return [
        warning(
          `👀 NOTE: A post with the same name${
            variable.sameDate
              ? ', introduction and creation date'
              : ' and introduction'
          } exists in the allPosts.json file. 👀`
        ),
        warning.underline(
          'The post was added nonetheless because their urls were different. '
        )
      ];
    },
    complete: variable => {
      return success(`The post has been ${variable.version}`);
    }
  },
  // Generic messages/no category
  generic: {
    start: info('Starting page-creation 🎉'),
    stop: warning('Process was stopped.'),
    complete: variable => {
      return success(
        `THE PAGE ${variable.postFile} HAS SUCCESFULLY BEEN ${variable.version}`
      );
    }
  }
};

module.exports = MESSAGES;
