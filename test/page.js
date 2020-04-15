const makemy = require('../lib/makemy');

const options = {
  template: 'template',

  sourcefolder: 'posts-src',

  postname: 'pure-markdown',

  // location: ''

  // extension: 'txt',

  // sugar: true,

  update: true
};

makemy.page(__dirname, options);
