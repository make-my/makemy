const makemy = require('../source/makemy');

const options = {
  // The name of the template HTML file used for creating the post
  template: 'template',
  // The folder where you store your post documents
  sourcefolder: 'posts-src',
  // The name on the post you want to create a page for
  postname: 'i-like-pancakes',

  /**
   * The location you want to create the page (where the post-folder will be)
   * This location has to be relative to the __dirname
   * If not provided, it will be same as __dirname
   */
  // location: ''

  /**
   * The file-extension of the document you've written your blog in
   * THIS ONE IS OPTIONAL - IF NOT PROVIDED, THE FIRST POST MATCHING THE POSTNAME WILL BE USED
   */
  // extension: 'txt',

  /**
   * If you want to update a post, this has to be set to true.
   * Is false by default.
   */
  update: true
};
makemy.page(__dirname, options);
