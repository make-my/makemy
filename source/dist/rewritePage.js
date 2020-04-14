'use strict';

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const terminal = require('../feedback/terminal');

const configureReadStream = require('../utils/readwrite/configureReadStream');
const configureWriteStream = require('../utils/readwrite/configureWriteStream');

/**
 *
 * @param {String} pathToIndex - the path to the index.html file that should be rewritten
 * @param {String} template - the new template that should be used
 */

async function rewritePage(pathToIndex, template) {
  /**
   * Note: The template provided only contains the content from beneath the header tag.
   *
   * The approach here is to take everything beneath the header (maybe make this configurable)
   * in the index.html file and replace all content (except for the post) with the new template content.
   *
   * 1. Turn current index.html into a single string.
   * 2. Find the endOffset of the <head> tag and store all content above in the constant HEAD.
   * 3. Find the start and end offset of the post-section, remove it from the HTML-string
   *    and store it into the constant POST.
   * 4. Replace the <POST> tag in the template with the post-section extracted from the old index.html file.
   * 5. Add together the head of the old index.html file and the body of the new template.
   * 6. Overwrite the index.html file with the new content.
   * 7. Done!
   */

  try {
    const rl = configureReadStream(pathToIndex);

    let HTML = '';

    for await (const line of rl) {
      HTML += line;
    }

    const DOM = new JSDOM(HTML, { includeNodeLocations: true });

    const HeadSection = DOM.window.document.querySelector('head');
    const HeadEnd = DOM.nodeLocation(HeadSection).endOffset;

    const HEAD = HTML.slice(0, HeadEnd);

    const PostSection = DOM.window.document.querySelector('.post-section');
    const SectionStart = DOM.nodeLocation(PostSection).startOffset;
    const SectionEnd = DOM.nodeLocation(PostSection).endOffset;

    const POST = HTML.slice(SectionStart, SectionEnd);

    const newBody = template.replace('<POST>', POST);

    const newPage = HEAD + newBody;

    configureWriteStream(pathToIndex).write(newPage);
  } catch (error) {
    terminal(error);
  }
}

module.exports = rewritePage;
