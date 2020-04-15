'use strict';

const getBirthTime = require('../getters/getBirthtime');

const alertUser = require('../../feedback/alertUser');

const CORE_INFO = require('../CORE_INFO');

/**
 *
 * @param {Directory|String} postFileLocation - the location for the post file
 * @param {File|String} post - the post itself
 * @param {Object} CORE_INFO_POSTNAME - Core info about the postname
 */

async function validateCoreInfo(postFileLocation, post, CORE_INFO_POSTNAME) {
  try {
    /**
     * First, we find the --name and --introduction core info
     */
    for await (const line of post) {
      if (!line.startsWith('--name') && !line.startsWith('--introduction')) {
        if (CORE_INFO.name.length === 0) {
          alertUser('coreInfo', 'name');
        }
        if (CORE_INFO.introduction.length === 0) {
          alertUser('coreInfo', 'introduction');
        }

        alertUser('generic', 'stop');
        throw Error();
      }

      if (line.startsWith('--name')) {
        CORE_INFO.name = line.replace('--name', '').trim();
      }
      if (line.startsWith('--introduction')) {
        CORE_INFO.introduction = line.replace('--introduction', '').trim();
      }

      // If both core-values have been set then cancel for loop
      if (CORE_INFO.name.length > 0 && CORE_INFO.introduction.length > 0) {
        break;
      }
    }

    /**
     * Afterwards we find the birthtime of the post
     */

    const foundBirthtime = await getBirthTime(postFileLocation);
    CORE_INFO.creationDate = foundBirthtime[0];
    CORE_INFO.creationDateMS = foundBirthtime[1];

    return Object.assign(CORE_INFO_POSTNAME, CORE_INFO);
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = validateCoreInfo;
