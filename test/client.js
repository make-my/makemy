'use strict';

/**
 * Because we want to work asynchronously throughout the code
 * it's easiest (and safer) to just wrap our whole code in a async IIFE
 */

(async () => {
  // Function for fetching the JSON and parsing it.
  async function getPosts(url) {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' }
    });
    return await response.json();
  }

  const url = `${location.origin}/test`;

  const postsJSON = await getPosts(`${url}/posts/allPosts.json`);

  const posts = postsJSON.posts;

  /**
   * Here's one solution to dynamically create previews of the posts into HTML-Element.
   * This function inserts every post in a wrapper, which then contains the title, introduction and created date for the post.
   */

  const postsSection = document.querySelector('main');

  function insertPostsToDOM(posts, parent) {
    for (const post of posts) {
      const previewWrapper = document.createElement('div');

      previewWrapper.classList.add('preview-wrapper');

      previewWrapper.addEventListener(
        'click',
        () => (window.location = `${url}/${post.url}`)
      );

      const createPreviewContent = (element, className, content) => {
        const previewContent = document.createElement(element);
        previewContent.classList.add(className);
        previewContent.textContent = content;
        previewWrapper.appendChild(previewContent);
      };

      createPreviewContent('h3', 'preview-title', post.name);
      createPreviewContent('p', 'preview-introduction', post.introduction);
      createPreviewContent('time', 'preview-date', post.creationDate);

      parent.insertAdjacentElement('beforeend', previewWrapper);
    }
  }

  insertPostsToDOM(posts, postsSection);
})(window);
