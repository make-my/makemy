<p align="center">
<img src="/media/makemy.png" alt="MAKEMY">
</p>

## makemy is a tool that generates HTML-pages out of text posts 📄

## Features / Why choose makemy ⭐

- **Works perfectly for static blog-pages!**
- **Simple and logic API** 🌻
- **Efficient** 🚄
- **Supports Markdown** 📝
- **Use your own template super easily** 📋
- **Automatic folder-structuring** 🗂
- **Helpful feedback in terminal** 📢
- **Automatically generated JSON for fetching previews of your posts on the client** [(test example)](/test/client.js)
- **Ability to update content of already generated pages**
- **Ability to update templates for already generated pages**
- **Ability to update/alter JSON file**
- **Pre-styled and responsive with CSS, but easily allows for own styling**
- **Works perfectly with GitHub pages**

### Extra feature created by makemy :heart:

- **Sugar-language for people that don't want to use markdown (Combination of easy syntax, HTML and normal text-writing)**

#### Extra reading material: [SYNTAX DOCUMENT (SUGAR-PARSER)](/SYNTAX-DOCUMENT.md)

&nbsp;

# How to use:

## 1️. Install

### `npm install makemy`

![](media/npm-install.gif)


&nbsp;

## 2️. Run makemy-init to get a pre-made example folder in your project

### `makemy-init`

![](media/makemy-init.gif)

&nbsp;


## 3. Create your post and template in the project [TEMPLATE EXAMPLE](/test/template.html)

![](media/createpage.gif)

&nbsp;


## Done! ✅

### Now you can create as many posts as you wish! Just run the makemy function to create their HTML-pages. 

#### Example of two generated pages, one with markdown and one with the makemy sugar-syntax:

![](media/page-example.gif)

&nbsp;

#### The url to a post would be structured like this: `https://mycoolsite.github.io/posts/post_about_waffles`

&nbsp;

&nbsp;

# API

## makemy.page(path-to-directory, [options])

### `options`:

#### REQUIRED OPTIONS:

| Name | Type | Description |
| --- | --- | --- |
| **template** | *String*  | name of the HTML file used as the template for the page. Do not write the .html suffix |
| **sourcefoulder** | *String* | name of folder where the written post is. |
| **postname** | *String* | name of post. |



#### VOLUNTARY OPTIONS:

| Name | Type | Description |
| --- | --- | --- |
| **location** | *String*  | path (relative to `__dirname`) to where the "posts"-folder should be created.|
| **extension** | *String* | type of extension used on the document. |
| **update** | *Boolean* | choose if a post should be updated (if you want to re-generate the same post), is false by default |
| **sugar** | *Boolean* | set to true if you want to use the sugar-parser created by makemy [SYNTAX DOCUMENT (SUGAR-PARSER)](/SYNTAX-DOCUMENT.md) |

#### Example of using makemy.page to update an already existing page:

![](media/update-example.gif)

#### Code example:

```js
const makemy = require('makemy');

const options = {
  template: 'template',

  sourcefolder: 'posts',

  postname: 'my-first-post',

  location: '../',

  update: true
};

makemy.page(__dirname, options);
```

&nbsp;

## makemy.json(path-to-directory, [options])

#### NOTE: ONLY USE IF YOU WANT TO UPDATE/REGENERATE THE JSON FILE. NO NEED TO RUN THIS FUNCTION WHEN YOU CREATE A PAGE AS THE makemy.page FUNCTION DOES THIS BY ITSELF.

### `options`:

#### VOLUNTARY OPTIONS:

| Name | Type | Description |
| --- | --- | --- |
| **order** | *String*  | what order the posts in the json file should be. Options are ascending (default) and descending.|


#### Example:

```js
const options = {
  order: 'descending'
};

makemy.json(__dirname, options);
```

&nbsp;

## makemy.templates(path-to-directory, [options])

### NOTE: THIS IS USED FOR UPDATING TEMPLATES ON ALREADY GENERATED PAGES

### `options`:

#### REQUIRED OPTIONS:

| Name | Type | Description |
| --- | --- | --- |
| **template** | *String*  | name of the new HTML template |
| **posts** | *String|Array* | the posts that should have their tempalte updated. Can either be an array with names or just the string 'all'. |

#### Example:

```js
const options = {
  template: 'summer-template',
  posts: 'all'
};

makemy.template(__dirname, options);
```

&nbsp;

&nbsp;

#### If you have any questions or just want to chat, then send me an 📧 at mathiaswpicker@gmail.com

Have a nice day!

-- Mathias
