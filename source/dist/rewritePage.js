'use strict';

const parse5 = require('parse5');

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

    // Turning the HTML of the current page into a single string

    for await (const line of rl) {
      HTML += line;
    }

    /**
     * Can easily find the end-position of the head tag with vanilla JS, but getting the end
     * position of the .post-section requires a library.
     */

    const HeadSection = HTML.indexOf('</head>');
    const HeadEnd = HeadSection + '</head>'.length;

    /**
     * Thanks to the parse5 package has the process of transfering the post-section
     * from the old page in to the new template become very efficient.
     *
     * The approach is to find the post-section with the parse5 API and then serialize
     * it so that the tool get's the full html-string of the post in the current page.
     * Then it's pretty straight-forward to just replace the <POST> in the template with
     * a new <section class="post-section"> and insert the serialized HTML in this section.
     */

    const HEAD = HTML.slice(0, HeadEnd);

    const document = parse5.parse(HTML);

    const body = document.childNodes[1].childNodes.find(
      child => child.nodeName === 'body'
    );

    let postSection;

    for (const child of body.childNodes) {
      if (Array.isArray(child.attrs)) {
        child.attrs.forEach(attribute => {
          if (
            attribute.name === 'class' &&
            attribute.value === 'post-section'
          ) {
            postSection = child;
          }
        });
      }
      if (postSection !== undefined) {
        break;
      }
    }

    const POSTSECTION = parse5.serialize(postSection);

    const newBody = template.replace(
      '<POST>',
      `<section class="post-section">${POSTSECTION}</section>`
    );

    const newPage = HEAD + newBody;

    configureWriteStream(pathToIndex).write(newPage);
  } catch (error) {
    terminal(error);
  }
}

module.exports = rewritePage;
