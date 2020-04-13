const makemy = require('../source/makemy');

const options = {
  template: 'template',

  sourcefolder: 'posts-src',

  postname: 'i-like-waffles',

  // location: ''

  // extension: 'txt',

  update: true
};

makemy.page(__dirname, options);
