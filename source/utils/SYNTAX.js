'use strict';

// The syntax for creating the posts. Everything has to be typed in lowercase
const SYNTAX = {
  /**
   * Order is:
   * 1: Syntax trigger
   * 2: Syntax value
   * 3: HTML-tag connectet to element
   * 4: Class of element
   * 5: Special triggers within that section
   */
  title: ['#', 'title', 'h2', 'class="title"'],
  text: ['#', 'text', 'section', 'class="text-section"'],
  code: ['#', 'code', 'code', 'class="big-code"'],
  quote: ['#', 'quote', 'span', 'class="big-quote"', { quotee: '---' }]
};

// Autogenerating the modes-object that tells us what mode we are in. One mode for every syntax
const modes = {};
for (const item in SYNTAX) {
  modes[item] = false;
}

module.exports = { SYNTAX, modes };
