'use strict';

/**
 *
 * @param {WritableStream} writeStream - the writeStream for the index.html page
 * @param {String} line - line where the title tag is
 * @param {String} title - the title extracted from postCoreInfo
 */

async function writeTitleTag(writeStream, line, title) {
  try {
    const titleTag = line.replace('</title>', ` - ${title}</title>`);
    writeStream.write(titleTag);
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = writeTitleTag;
