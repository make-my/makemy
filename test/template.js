const makemy = require('../makemy');

const templateOptions = {
  template: 'template',
  posts: 'all' // 'all' or array with postnames ['first-post', 'i-like-waffles']
};

makemy.template(__dirname, templateOptions);
