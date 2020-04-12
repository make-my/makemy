'use strict';

/**
 *
 * @param {String} line - The line that contains one or more <code>-tags
 */

function lineWithBlockquoteTag(line) {
  let newLine = '';

  const lineArr = line.split(' ');

  for (let i = 0; i < lineArr.length; i++) {
    if (lineArr[i].includes('<blockquote')) {
      if (lineArr[i + 1] !== undefined && lineArr[i + 1].includes('flow')) {
        lineArr[i + 1] = lineArr[i + 1].replace('flow', '');
        // Since we split by ' ' earlier, we can just add the class to the string without having to
        // replace anything and make sure it gets set in the correct place
        lineArr[i] += ' class="blockquote-tag-flow"';
      } else {
        lineArr[i] = lineArr[i].replace(
          '<blockquote',
          '<blockquote class="blockquote-tag"'
        );
      }
    }

    newLine += ` ${lineArr[i]}`;
  }

  return newLine;
}

module.exports = lineWithBlockquoteTag;
