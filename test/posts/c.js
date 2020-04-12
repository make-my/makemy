'use strict';

document.querySelectorAll('.post-section .big-code').forEach(block => {
  hljs.highlightBlock(block);
});
