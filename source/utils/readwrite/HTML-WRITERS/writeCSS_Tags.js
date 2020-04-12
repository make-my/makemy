'use strict';

/**
 *
 * @param {WritableStream} writeStream - the writeStream for the index.html page
 * @param {String} line - line where the first CSS tag was found
 */

async function writeCSS_tags(writeStream, line) {
  try {
    const linkLines = [
      // The init stylingsheet
      '<link rel="stylesheet" href="../s.css"/>',

      // Keeping the original css-file but setting the correct path
      line.trim().replace('href="', 'href="../../')
    ];

    linkLines.forEach(line => {
      writeStream.write(line);
    });
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = writeCSS_tags;
