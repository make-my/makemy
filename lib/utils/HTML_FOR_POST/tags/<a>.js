'use strict';

/**
 *
 * @param {String} line - The line that contains one or more link tags
 */

function lineWithLinkTag(line) {
  let newLine = '';

  const lineArr = line.split(' ');

  for (let word of lineArr) {
    if (word.includes('<a')) {
      word = word.replace('<a', '<a noreferrer="_blank" target="_blank"');
    }
    newLine += ` ${word}`;
  }

  return newLine;
}

module.exports = lineWithLinkTag;
