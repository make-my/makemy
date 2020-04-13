'use strict';

const fs = require('fs');
const path = require('path');

const alertUser = require('../../feedback/alertUser');
const terminal = require('../../feedback/terminal');
const configureWriteStream = require('../readwrite/configureWriteStream');

async function validateJson(directory, reset) {
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
        throw Error(error);
      }
    } else if (reset) {
      try {
        fs.writeFile(allPostJsonFile, '', () => {
          alertUser('json', 'reset');
        });
        createJSONTemplate();
      } catch (error) {
        throw Error(error);
      }
    }

    let json = await fs.promises.readFile(allPostJsonFile);

    try {
      JSON.parse(json);
    } catch (error) {
      /**
       * If parsing went wrong then check the error-message.
       * If it includes the word 'position', then theres something wrong with the formatting.
       * If it doesn't, then it's because the JSON file is empty, and we create a new template.
       */
      const errorMessage = error.message;

      if (errorMessage.includes('position')) {
        alertUser('json', 'wrongFormat', {
          errorMessage
        });
        alertUser('generic', 'stop');
        throw Error(errorMessage);
      } else {
        createJSONTemplate();

        alertUser('json', 'empty');
      }
    }
  } catch (error) {
    throw Error(error);
  }
}

module.exports = validateJson;
