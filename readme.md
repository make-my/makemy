![makemy](/media/makemy.png)

makemy simplifies the process of writing, creating and publishing posts/documents on static websites without the need of a back-end server.

By passing in a html template and a text document with a syntax that makemy understands, will it automatically create an index.html file. The way the template works, is that you can create a normal html site and just insert a `<POST>` tag where you want the post to be inserted. The file will be put into a parent folder with the name of the post, which will again be inserted into a generic "posts"-folder. This structure design is created to fit GitHub pages.

### Extra reading material: [SYNTAX-DOCUMENT.md](https://github.com/MathiasWP/Easy-Posting/blob/master/SYNTAX-DOCUMENT.md)

## Features

- Simple and logic API
- Efficient/fast tool
- Automatically generated JSON for fetching all posts on client-side
- Ability to update content of already generated pages
- Ability to update templates for already generated pages
- Ability to update/alter JSON file
- Pre-styled and responsive with CSS, but easily allows for own styling
- Works perfectly with GitHub pages
- Straightforward to write posts (combination of Markup, HTML and normal text-writing) - requires no re-learning of syntax!

&nbsp;

# How to use:

## Install

`npm install easy-posting`

&nbsp;

## Import the tool and run makemy

```js
const makemy = require('makemy');

// Set up options
const options = {
  template: 'mytemplate',
  sourcefolder: 'posts-source',
  postname: 'post_about_waffles'
};

// Create page
makemy.page(__dirname, options);
```

&nbsp;

## Done! ✅

Now your root folder will have a folder named "posts" where the posts will be inserted.

```

--root
   |
   |
   |---- posts
           |
           |
           |---- post_about_waffles
           |             |
           |             |
           |             |--- .post.config
           |             |
           |             |
           |             |--- index.html // this is the autogenerated page
           |
           |
           |
           |---- allPosts.json // json file containing preview-info of all posts
           |
           |
           |---- c.js // Client JS (contains init function for Highlight.js)
           |
           |
           |---- s.css // Stylesheet for the components in the post

```

&nbsp;

&nbsp;

# API

### makemy.page(path-to-directory, [options])

`options`:

#### REQUIRED OPTIONS:

- template: name of the HTML file used as the template for the page.
- sourcefolder: name of folder where the written post is.
- postname: name of post.

#### VOLUNTARY OPTIONS:

- location: path (relative to `__dirname`) to where the "posts"-folder should be created.
- extension: type of extension used on the written document.
- update: choosing if a post should be updated (generated again), is false by default

#### Example:

```js
const options = {
  template: 'template',
  sourcefolder: 'posts-src',
  postname: 'i-like-pancakes',
  extension: 'txt',
  update: true
};

makemy.page(__dirname, options);
```

&nbsp;

### makemy.json(path-to-directory, [options])

`options`:

#### VOLUNTARY OPTIONS:

- order: what order the posts in the json file should be. Options are ascending (default) and descending.

#### Example:

```js
const options = {
  order: 'descending'
};

makemy.page(__dirname, options);
```

&nbsp;

### makemy.templates(path-to-directory, [options])

`options`:

#### REQUIRED OPTIONS:

- template: name of the new HTML file to use as a template
- posts: the posts that should have their tempalte updated. Can either be an array with names or just the string 'all'

#### Example:

```js
const options = {
  template: 'summer-template',
  posts: 'all'
};

makemy.page(__dirname, options);
```

&nbsp;

&nbsp;

#### If you have any questions or just want to chat, then send me an 📧 at mathiaswpicker@gmail.com

Have a nice day!

-- Mathias
