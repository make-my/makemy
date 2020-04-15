'use strict';

/**
 *
 * @param {WritableStream} writeStream - the writeStream for the index.html page
 * @param {String} line - line where the first CSS tag was found
 */

async function insertToHeadTag(writeStream, line, cssSet, css) {
  try {
    /**
     * Thank you to the Highligt.js library for making my life 10x easier for highlighting the syntax of the code in the code blocks :)
     */

    const headLines = [
      '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/styles/atom-one-dark.min.css">',
      '<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/highlight.min.js" defer></script>',
      '<script src="../c.js" defer></script>',
      line.trim()
    ];

    if (!cssSet && css) {
      writeStream.write('<link rel="stylesheet" href="../s.css"/>');
    }

    headLines.forEach(line => {
      writeStream.write(line);
    });
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = insertToHeadTag;
