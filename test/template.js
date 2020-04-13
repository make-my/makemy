const makemy = require('../source/makemy');

const templateOptions = {
  template: 'template',
  posts: 'all' // 'all' or array with postnames ['first-post', 'i-like-waffles']
};

makemy.templates(__dirname, templateOptions);
