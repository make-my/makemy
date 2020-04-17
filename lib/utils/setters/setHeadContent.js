'use strict';

const parse5 = require('parse5');

const insertToHeadTag = require('../readwrite/HTML-WRITERS/insertToHeadTag');
const insertToString = require('../../dist/insertToString');
const findFirstPosition = require('../../dist/findFirstPosition');

/**
 * setHeadContent inserts items that makemy wants to insert to the head of a post.
 * @param {Object} DOCUMENT - a parsed version of the template.html file
 * @param {Object} postCoreInfo - object containing the core info about the post
 */

function setHeadContent(DOCUMENT, postCoreInfo) {
  /**
   * The approach to correctly inserting and modifying the content in the head-section is as follows:
   * 1. Find the head-section with parse5 so that all the children are also found.
   * 2. Change all the hrefs of the css-tags.
   * 3. Change the title tag content.
   * 4. Insert makemy init items (specific place the stylesheet before any other stylesheet in the template so the css order of precedence is correct).
   */
  /**
   * Finding the <head> in the document
   */

  let HEAD = DOCUMENT.childNodes[1].childNodes.find(
    child => child.nodeName === 'head'
  );

  /**
   * Changing the href of all links to one step above. Todo: Make this configurable
   */

  const links = HEAD.childNodes.filter(child => child.nodeName === 'link');

  links.forEach(link => {
    const href = link.attrs.find(attribute => attribute.name === 'href');
    href.value = `../../${href.value}`;
  });

  /**
   * Replacing the title tag with the name of the post. Todo: maybe allow to keep what was used in title in template?
   */

  let HEAD_STRING = parse5.serialize(HEAD);

  HEAD_STRING = HEAD_STRING.replace(
    /<title>(.*?)<\/title>/gi,
    `<title>${postCoreInfo.name}</title>`
  );

  /**
   * Inserting the init stylesheet above any other stylesheets
   */

  const inlineStylingPosition = HEAD_STRING.toLowerCase().indexOf('<style>');
  const styleSheetPosition = HEAD_STRING.toLowerCase().indexOf(
    '<link rel="stylesheet"'
  );

  const firstStyleSheetPosition = findFirstPosition(
    styleSheetPosition,
    inlineStylingPosition
  );

  const initStyleSheet = '<link rel="stylesheet" href="../s.css"/>';

  HEAD_STRING = insertToString(
    HEAD_STRING,
    initStyleSheet,
    firstStyleSheetPosition
  );

  /**
   * Inserting the javascript files to the header (with defer attribute)
   */

  HEAD_STRING = insertToHeadTag(HEAD_STRING);

  return HEAD_STRING;
}

module.exports = setHeadContent;
