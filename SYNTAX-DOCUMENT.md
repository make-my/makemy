# Document explaining the syntax used for writing posts 📝


### Browse document

1. [Main idea 💡](#the-main-idea)

2. [Core syntax ⚙️](#core-syntax)

3. [Document syntax 📝](#document-syntax)

4. [Customized HTML tags 🏷️](#customized-html-tags)

5. [Syntax that doesn't require symbols ✍🏻](#syntax-that-doesnt-require-symbols)

6. [Full example of a post 📑](#full-example-of-a-post)

&nbsp;

# The main idea

The idea behind makemys syntax is to combine the best parts of HTML, Markdown and normal document writage. To create components/section, you simply use the trigger '#' and the name of the component. Everything written beneath the trigger will be added to the section until a new trigger is used.


### Currently available triggers:

- Title
- Text
- Code
- Quote

### Syntax that doesn't require symbols:

- Extra space between lines in text (breakpoint).

### HTML tags that are customized by the tool:

- `<a>`
- `<code>`
- `<blockquote>`

&nbsp;

### The way the tool reads the syntax can be explained with this little 'dramatization/act'. The tool tells how it thinks when it reads every line of the post document provided by the user 👨‍💻

**User**:
"Okay, i want to create a title, write some text and add a quote at the end of my post."

_what the user writes:_

```
# Title - 3
Summer is my favourite season.

# Text
The reason i like summer so much is because of the warm weather.
I also enjoy swimming in salt water.


If you want to read more about summer, then check out <a href="https://no.wikipedia.org/wiki/Summer">Summer Wikipedia page</a>



# Quote


“What good is the warmth of summer, without the cold of winter to give it sweetness.”
--― John Steinbeck
```

**Tool**:

"Okay, lets parse this document.

On the first line i saw the # trigger, so now he probably wants to create a section.
I saw the word Title after the trigger, so yeah, he 100% wants to create a title. He also said that the title should have a size of 3, so i'll create a `<h3>` tag. I now go into TITLE-MODE, and everything i read next will be inserted into the title. I see that he has written some text, so i'll add this and keep reading until i find something exciting.

Ey, another # trigger! And now he wants to create a section again: this time it's a text component. I'm now done being in TITLE-MODE, so the `<h3>` tag can be closed and get added to the HTML-code for this post. Now because he wants to create a text component i'll go into TEXT-MODE and create a section where everything will be added. The first line is some text, so i'll add that into a `<p>` tag. The next line is a seperate line, so i'll add that line into a seperate `<p>` tag so that the post will look the same on the HTML page as it does here. I now see an empty line with no content, so that means that the user probably wants some space here, so i'll add a `<br>` tag here. I also see that the next line is also an empty line, but i've already added a `<br>` tag already so i won't add another one. On the line beneath i see some text and an `<a>` tag. I have no problem working with HTML code. Actually i like it so much that i'll add some attributes to it to make it even more practical and safe.

Okay, after this i see another empty line. Maybe i should create a `<br>` tag again? But wait, hold up, the next line is empty aswell, and the next one as well. And after that line i see a # trigger and a valid syntax? Oh, that means that these empty lines were at the end of a section. To be honest, i don't really care about these empty lines, so i won't add a `<br>` tag here. The pre-defined margins between sections in my CSS-file are enough space already.

Now that i've managed to dodge the useless empty lines, i'll keep parsing the text. Now the user wants a quote block, so i'll go out of TEXT-MODE, add the content to the HTML-code and go into QUOTE-MODE. But hey, now i see an empty line again. But as with the empty lines at the end of a section, i also think that empty lines at the start of a section is silly. So i won't add a `<br>` here either. I read the next line and add the text to the quote-block. Oh hey, i see a friend of mine when it comes to quote-blocks! The '---' trigger. This means that the name after this trigger is the quotee/author. I'll add this text into a different styled element within the code-block so that it looks fancier.

After this i see that there's no more text in the document. I'll go out of my last mode, QUOTE-MODE, and add the content from this section to the HTML-code aswell. Now i'll send the fully created HTML code of this post to where the user added the `<POST>` tag in the template file. My here job is done. 🥳"


&nbsp;

&nbsp;

# Core-syntax (required)

### This has to be inserted at the the start/top of the post

--name: Here you enter the name of your post. This value will be used in the title of the post-page and in the preview-storage.

--introduction: Here you can give a small introduction to the post. Will only be used in the preview-storage.

&nbsp;

&nbsp;

# Document-syntax

Note: None of the syntaxes are space sensitive. So it doesn't really matter if you write # Title - 3, #Title-3, # Title- 3, # Code, #Code etc.

## Title - (int:level)

Creates a h tag the level provided. For example will a '# Title - 3' create a `<h3>` tag for the content underneath. If no level is provided will the default value be 2.

#### Example:

```
# Title - 1
Here's a big title
```

## Text

Creates a normal text-section where everything will be created as written in the document.

#### Example:

```
# Text

Here is my first line in this section.
And here's a link to a cool page <a link="https://github.com">.

Because there were an empty space between this line and the one above, will an automatic breakpoint be set between these two paragraphs.
And finally here's a list:
    <ol>
        <li>Egg</li>
        <li>Milk</li>
        <li>Rice</li>
    </ol>
```

## Code

Creates a big code-block section. Is somewhat similar to the customized `<code>` tag , but will have syntax-highlightning and be set as a own section.

#### Example:

```
# Code

function sayMessage(message) {
    return message
}

sayMessage('Hello 🤓!)

```

## Quote

Creates a big quote section and styles it. If you add three lines (---) to the end will the name afterward be set as the author/quotee of the quote.

#### Example

```
# Quote

“Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.”

--- Albert Einstein
```

&nbsp;

&nbsp;

# Customized html-tags

### All HTML tags are supported in the syntax for the posts. You can use attributes like id, class, style etc for the tags you use. Some tags (and custom versions) are already customized by the tool:

- `<code>`: If you use the `<code>` tag in your document will it automatically create a styled code-block in your text. You can decide wether or not you want the code block to be an inline (following the text flow) or a block (be in a row for its own). To configure this, add a 'flow' attribute to the code. If you don't will the code automatically be displayed as a block.

Note that this tag does not have syntax highlightning, as it normally will just contain a very short snippet of code (maybe a couple of words). If you want to write more text then use the # Code section-tag.

#### Example:

`<code flow>addTwoNumbers(3, 14)</code>`

&nbsp;

- `<blockquote>`: If you use the `<blockquote>` tag in your document will a styled blockquote be inserted. Here you can also add a flow-attribute if you want the blockquote to flow with the text. Init styling is block.

&nbsp;

- `<a>`: If you use the `<a>` (link) tag in your document will they automatically get the href="\_blank" attribute and a noreferrer for safety reasons.

&nbsp;

&nbsp;

# Syntax that doesn't require symbols

If you want to have a space between to lines of text, simply add an empty space between these and the program will automatically insert a `<br>` here.

Note: The extra breaks will only work between text in a section, so if you add any extra empty lines on the start or the end of a section, no breaks will be counted. To escape this, use &nbsp; if you want extra space on these places aswell.

#### Example

```
# Text

(This extra space will not be counted because it's between the trigger and the first line of content)

This is my first line.

And because there's an empty line between this line and the one above, the page will have extra spacing between these lines

And same here

(But these extra lines at the end of a section will not be counted because they're between the last line of content and the next trigger)

# Text

Some more text here

```

&nbsp;

&nbsp;

# Full example of a post

```
--name This is the first blog post i have created
--introduction You know how this post was created automatically? It's quite cool

# Title - 1

This is the title of post

# Text

Here i could write some text about something I care about.
<a href="/test/posts/i-like-waffles/">Click here!!</a>
Above me is a link that you can click on, and this link works also <a href="/test/posts/i-like-waffles/">Click for a list</a>.


You can also write seperate paragraphs within a section. To do this, simply add 2 empty lines where you want the gap to be created (done right above this line)

#Title-3

Here is some code

# Code

function sayHello() {
    return 'Hello';
}


# Title

New title again, should be h2


# Quote

“Two things are infinite: the universe and human stupidity;
and I'm not sure about the universe.”

--- Albert Einstein


# Title - 6

This is another title of my blog-post

# Text

Here i could write some text about something I care about.
<a href="/test/posts/i-like-waffles/">Click here!!</a>
Above me is a link that you can click on, and this link works also <a href="#list">Click for a list</a>.

You can also write seperate paragraphs within a section. The program will automatically create a gap for you in the html and css (at the same place you have done in your blog document).


# Quote

“Two things are infinite: the universe and human stupidity;
and I'm not sure about the universe.”

--- Albert Einstein

```
