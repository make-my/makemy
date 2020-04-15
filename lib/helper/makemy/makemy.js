/**
 * To run, simply type node ./makemy/makemy.js in your terminal!
 */

const makemy = require('makemy');

const options = {
  template: 'template',

  sourcefolder: 'posts',

  postname: 'my-first-post',

  location: '../'
};

makemy.page(__dirname, options);
