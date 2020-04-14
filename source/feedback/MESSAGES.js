'use strict';

/**
 * Here are all the message used for giving feedback to a user stored.
 * The MESSAGES object works basically like a storage for the different messages.
 * Combined with the 'alertUser'-functions becomes the process of easily alerting the
 * users with custom messages pretty simple.
 *
 * If the message is dynamic (telling that a specific post is already created), then the
 * message must be wrapped in a function with a parameter (i use variable). Then when a
 * dynamic message should be sent, i just have to add an object at the end of alertUser()
 * with the different variables.
 *
 * The functions can also return arrays of messages, in case i want multiple messages to be
 * delivered as feedback.
 *
 */

const { error, warning, info, success, underline } = require('./CHALKS');

const MESSAGES = {
  // Messages for options when running function
  initOptions: {
    template: error('Please add the template for the page.'),
    sourcefolder: error(
      'Please add the source folder where your document is located.'
    ),
    postname: error('Please add the name of the post.'),
    wrongOption: variable => {
      return error(
        `ERROR: The option ${variable.option} is not supported. Please insert a valid option.`
      );
    }
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
        error(`ERROR: The page for ${variable.postname} already exists! ⛔`),
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
      'ERROR: You must provide a name for the post. Do this at the first line of the document. Use --name to do this.'
    ),
    introduction: error(
      'ERROR: You must provide a introduction for the post. Do this at the second line of the document. Use --introduction to do this.'
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
    },
    updated: variable => {
      return [
        success(
          "The allPosts.json has succesfully been updated and now contains all the posts from the 'posts'-folder. 🎉"
        ),
        success(`The order is ${variable.newOrder}`)
      ];
    },
    reset: info('The allPosts.json file has been reset.'),
    wrongOrder: variable => {
      return [
        warning(
          `Warning: Order must be either ascending or descending. You wrote "${variable.order}"`
        ),
        info(
          'The allPosts.json file will still be generated with default option (ascending).'
        )
      ];
    }
  },
  // Messages for template
  template: {
    start: info('Starting the template-updates'),
    success: success(
      'The posts have succesfully gotten a template makeover! 🎉'
    )
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
