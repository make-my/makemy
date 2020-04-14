const makemy = require('../source/makemy');

const options = {
  template: 'template',

  sourcefolder: 'posts-src',

  postname: 'first-post',

  // location: ''

  // extension: 'txt',

  // sugar: true,

  update: true
};

makemy.page(__dirname, options);
