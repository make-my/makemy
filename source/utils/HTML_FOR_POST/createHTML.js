'use strict';

/**
 * createHTML creates a HTML-tag with the desired content
 * @param {String} tag - Will be the name of an HTML tag, for example a, div, section etc.
 * @param {String} class - Will be the class-name of the element
 * @param {String} content - The content that should be inserted into the blogPost
 */

function createHTML(tag, className, content) {
  // If tag is code add a <pre>-tag
  let insert =
    tag === 'code' ? `<pre ${className}><${tag}>` : `<${tag} ${className}>`;

  insert += content;
  insert += tag === 'code' ? `</pre></${tag}>` : `</${tag}>`;
  return insert;
}

module.exports = createHTML;
