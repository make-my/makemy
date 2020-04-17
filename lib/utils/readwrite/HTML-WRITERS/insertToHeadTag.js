'use strict';

/**
 * insertToHeadTag simply inserts content at the end of the head
 * @param {String} HEAD_STRING
 */

function insertToHeadTag(HEAD_STRING) {
  try {
    /**
     * Thank you to the Highligt.js library for making my life 10x easier for highlighting the syntax of the code in the code blocks :)
     */

    const headLines = [
      '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/styles/atom-one-dark.min.css">',
      '<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/highlight.min.js" defer></script>',
      '<script src="../c.js" defer></script>'
    ];

    headLines.forEach(line => {
      HEAD_STRING += line;
    });

    return HEAD_STRING;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = insertToHeadTag;
