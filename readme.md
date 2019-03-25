# AJAX and Static Site Generation

## Homework

* watch this video on [Fetch](https://youtu.be/Oive66jrwBs)
* create your own New York Times developer account and use it to customize your Ajax page

## Exercise

Today were are building [a multipage static website](https://zealous-kilby-113356.netlify.com) with an [ajax connection](https://zealous-kilby-113356.netlify.com/posts/ajax/) that pulls articles from the New York Times. 

[![Netlify Status](https://api.netlify.com/api/v1/badges/044ddd8e-853d-4282-8248-b2eeab94168d/deploy-status)](https://app.netlify.com/sites/zealous-kilby-113356/deploys)

**Do not download the zip.** Instead, use the same technique outlined last class to clone the repo:

```sh
> cd ~/Desktop // or where ever you want to work from
> git clone https://github.com/front-end-foundations/7-ajax-11ty.git
> cd 7-ajax-11ty
> npm install
```

See which Github repo you're pushing to: 

```sh
git remote -v
```

Log into Github and create a new repo.

[Change](https://help.github.com/en/articles/changing-a-remotes-url) the repo you are pushing to:

```sh
git remote set-url <your gitub repo address>
```

Open and run the project:

```sh
> code .
> npm run start
```

And open the localhost address in Chrome.

## Ajax

Ajax allows you to get data from your own or another's web service. Web services expose specific data and services in the form of an API which allows you to get, delete, update or create data via [routes](http://jsonplaceholder.typicode.com/). Today, we are solely focused on getting data.

The original [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) browser API is in widespread use. You should make yourself familiar with it, however we will be using a newer (and simpler) API called fetch.

Examine `posts/ajax.html` in VS Code:

```html
---
pageClass: ajax
pageTitle: New York Today
navTitle: Ajax
---

<h2>Ajax</h2>

<button>Click</button>

<div></div>

```

Don't worry about the `---` material at the top. It is not part of the HTML and can be ignored (we'll get to it later).

View the page in chrome.

## Fetch

The `fetch()` [API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) takes one mandatory argument, the path to the resource you want to fetch. It returns something known as a Promise that, in turn, resolves to the response after the content is received.

_API_ stands for [Application Programming Interface](https://medium.freecodecamp.org/what-is-an-api-in-english-please-b880a3214a82).

## Rest API

We need data we can fetch from the internet. We'll start with [Typicode](http://jsonplaceholder.typicode.com/), a site set up just to play with. Note that you can do more than just get data, you can also post, create, delete and update data. Together these functions are often refered to a `CRUD`.

Open a console in the browser.

A promise:

```sh
> fetch('https://jsonplaceholder.typicode.com/posts')
```

A resolved promise using `.then`:

```sh
> fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json())
```

Since the promise is resolved you can see the actual data in the console. It returns an array of 100 fake posts which we can console.log:

```sh
fetch('https://jsonplaceholder.typicode.com/posts/')
  .then(response => response.json())
  .then(json => console.log(json))
```

You can see the same data if you travel to `https://jsonplaceholder.typicode.com/posts/` in a new tab. Try [other resources](http://jsonplaceholder.typicode.com/) such as comments or photos.

Note the basic structure - an array of objects:

```js
[
  { ... },
  { ... }
]
```

The format is json - [JavaScript Object Notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)

Let's start out our script with event delegation. 

In `scripts.js`:

```js
document.addEventListener('click', clickHandlers)

function clickHandlers(){
  console.log(event.target)
}
```

Use [matches](https://developer.mozilla.org/en-US/docs/Web/API/Element/matches) in the context of in `if` statement to run a function:

```js
document.addEventListener('click', clickHandlers)

function clickHandlers(){
  if (event.target.matches('button')){
    getData()
  }
}

var getData = function () {
	fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(json => console.log(json))
}
```

Instead of logging the data we will call yet another function:

```js
document.addEventListener('click', clickHandlers)

function clickHandlers(){
  if (event.target.matches('button')){
    getData()
  }
}

var addContent = function(data){
  console.log(data)
	document.querySelector('.content div').innerText = data[1].body;
}

var getData = function () {
	fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(json => addContent(json))
}
```

Note:

* `document.querySelector('.content div')` - targets an empty div
* `data[1]` - we use `[1]` to get the second entry
* `data[1].body` - we use `.` notation to access just one of the properties of the entry

For comparison, here's the XMLHttpRequest version:

```js
document.addEventListener('click', clickHandlers)

function clickHandlers(){
  console.log(event.target)
  if (event.target.matches('button')){
    getData()
  }
}

var addContent = function(data){
  console.log(data)
	document.querySelector('.content div').innerText = data[4].title;
}

var getData = function(data){
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      addContent(JSON.parse(xhr.responseText));
    } else {
      console.log('The request failed!');
    }
  }
  xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
  xhr.send();
}
```

Note: 

* `JSON.parse(xhr.responseText)` is similar to `response => response.json()` in the `fetch` version

## Looping

Let's use the New York Times [developers](https://developer.nytimes.com/) site for our data.

```js
document.addEventListener('click', clickHandlers)

// store the link plus the API key in a variable
var nyt = 'https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=OuQiMDj0xtgzO80mtbAa4phGCAJW7GKa'

function clickHandlers(){
  if (event.target.matches('button')){
    getData()
  }
}

var getData = function () {
	fetch(nyt)
  .then(response => response.json())
  .then(json => console.log(json))
}
```

Examine the nature of the returned data in the console. The `results` property contains the data we are interested in.

```js
document.addEventListener('click', clickHandlers)

var nyt = 'https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=OuQiMDj0xtgzO80mtbAa4phGCAJW7GKa'

function clickHandlers(){
  if (event.target.matches('button')){
    getData()
  }
}

var addContent = function(data){
  // initialize an empty variable
  var looped = ''

  // use += in a for loop that uses the length of the results
  for(i=0; i<data.results.length; i++){
    looped += `
      <div class="item">
        <h3>${data.results[i].title}</h3>
        <p>${data.results[i].abstract}</p>
      </div>
      `
  }
  document.querySelector('.content').innerHTML = looped
}

var getData = function () {
	fetch(nyt)
  .then(response => response.json())
  .then(json => addContent(json))
}
```

Note: I've declared the variable looped _before_ I started working with it.

Something like the below wouldn't work as it resets the value everytime the for loop runs.

```js
  for(i=0; i<data.results.length; i++){
    var looped = ''
    looped += `
      <div class="item">
        <h3>${data.results[i].title}</h3>
        <p>${data.results[i].abstract}</p>
      </div>
      `
  }
```

An alternative method (which is more advanced) might use the `map()` method on the array:

```js
document.addEventListener('click', clickHandlers)

var nyt = 'https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=OuQiMDj0xtgzO80mtbAa4phGCAJW7GKa'

function clickHandlers(){
  if (event.target.matches('button')){
    getData()
  }
}

var addContent = function(data){
  var looped = data.results.map( (result) => (
    `
      <div class="item">
        <h3>${result.title}</h3>
        <p>${result.abstract}</p>
      </div>
    `
  )).join('')
  document.querySelector('.content').innerHTML = looped

}

var getData = function () {
	fetch(nyt)
  .then(response => response.json())
  .then(json => addContent(json))
}
```

Add CSS to format the data:

```css
.ajax .content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
}

.ajax .item {
  border-bottom: 1px dashed #aaa;
}
```

Note: I've added a class `ajax` to the body tag of this page _only_.

Commit your changes and push to your github repo. A finished version of this file is available to you in the `spring2019-done` branch of this repo.

## Eleventy

[Eleventy](https://www.11ty.io/) (aka 11ty) is a simple [static site generator](https://www.smashingmagazine.com/2015/11/modern-static-website-generators-next-big-thing/) (Smashing Magazine itself is [statically generated](https://www.smashingmagazine.com/2017/03/a-little-surprise-is-waiting-for-you-here/)). Static websites are very popular these days due to their simplicity, superior speed and security. Here is a [list](https://www.staticgen.com/) sorted by popularity.

Every generator uses a template processor - software designed to combine templates with data to output documents. The language that the templates are written in is known as a template language or templating language.

The benefits of 11ty over other completing generators include the fact that it is written in JavaScript and its comparative simplicity. It uses [Liquid](https://shopify.github.io/liquid/) under the hood to make pages. Liquid is the in-house templating engine created and maintained by Shopify. You can use additional template engines with 11ty if you wish. 

The most popular static site generator - Jekyll - is used at Github and is written in Ruby. 

You will be working from a new empty folder for this exercise.

```sh
cd ~/Desktop
mkdir eleventy
cd eleventy
npm init -y
npm install --save-dev @11ty/eleventy
code .
```

Create a git `.gitignore` file at the top level targeting the node_modules folder:

```sh
node_modules
```

Add a script to `package.json`:

```js
  "scripts": {
    "start": "eleventy --serve"
  },
```

Create a `posts` folder and within it, a sample markdown file `about.md`:

```md
# About Us

We are a group of commited users.

[Back](/)
```

Start 11ty by running the npm script we created:

```sh
npm run start
```

Note the creation of the `_site` folder and its contents.

You can view the page at `http://localhost:XXXX/posts/about/` where `XXXX` is the port 11ty is running on.

Note:

* the generated `_site` folder
* the new `index.html` in `posts/about`
* the conversion from markdown to html
* be careful not to edit the files in `_site` as they are generated

Create `pictures.md` in posts (not in the _site folder):

```md
# Pictures

A collection of images.

* pic one
* pic two
* ![image](http://pngimg.com/uploads/apple/apple_PNG12405.png)

[Back](/)
```

Note the new HTML file created at `http://localhost:XXXX/posts/pictures/`. Examine the file in the _site folder and note the conversion to HTML.

### Markdown

Markdown allows you to write using an easy-to-read, easy-to-write plain text format, then convert it to structurally valid HTML. invented by [John Gruber](https://daringfireball.net/projects/markdown/) - it (or one of its flavors) is ubiquitous in web publishing. This readme file is written in [Github flavored](https://help.github.com/en/articles/basic-writing-and-formatting-syntax) markdown.

A lot of the conventions for Markdown arose from how people used email when it was confined to simple text documents, e.g. a bulleted list:

```txt
* item one
* item two
* item three
```

## Templates

These new files need a template. Recall, one main goal of a static site generator is to combine articles with templates(s) to produce HTML pages.

Create `index.html` at the top level.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>My Blog</title>
</head>
<body>
  <nav>
    <ul>
      <li><a href="/posts/about">About Us</a></li>
      <li><a href="/posts/pictures">Pictures</a></li>
    </ul>
  </nav>
  <div class="content">
    <h1>Welcome to my Blog</h1>
  </div>
</body>
</html>
```

Navigate to `http://localhost:XXXX/` and test the navigation. This is not a template yet

Create an `_includes` folder at the top level of the project.

Save the below into it as `layout.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>My Blog</title>
</head>
<body>
  <nav>
    <ul>
      <li><a href="/posts/about">About Us</a></li>
      <li><a href="/posts/pictures">Pictures</a></li>
    </ul>
  </nav>
  
  <div class="content">

      {{ content }}

  </div>

</body>
</html>
```

Recall, 11ty uses a templating software called Liquid by default. `{{ content }}` is a Liquid [object](https://shopify.github.io/liquid/basics/introduction/). If templating is new to you don't worry, it is generally quite simple and can be mastered easily. There are many templating languages besides Liquid (and 11ty supports most). You will eventually find one that works best for you.

Edit index.html as follows:

```html
---
layout: layout.html
---

<h2>Home</h2>
```

The material at the top between the `---`s is called [frontmatter](https://www.11ty.io/docs/data-frontmatter/) as uses `Yaml` (Yet Another Markup Language) syntax. It can also be written in JSON.

The front matter here specifies that this document (index.html) should use layout.html as its template.

We can use front matter to pass information to the template.

Add this to layout.html:

`<h1>{{ pageTitle }}</h1>`

And extend the frontmatter in `index.html`:

```html
---
layout: layout.html
pageTitle: Home
---

<p>Welcome to my site.</p>
```

Let use front matter in our other documents.

In `about.md`:

```html
---
layout: layout.html
pageTitle: About Us
---

We are a group of commited users.

[Home](/)
```

`about.md` now renders via the template.

And in `pictures.md`:

```html
---
layout: layout.html
pageTitle: Pictures
---

* pic one
* pic two
* ![image](http://pngimg.com/uploads/apple/apple_PNG12405.png)

[Back](/)
```

## Collections

[Collections](https://www.11ty.io/docs/collections/) can be used to group, sort and filter content.

In `about.md`:

```html
---
layout: layout.html
pageTitle: About Us
tags:
  - nav
navTitle: About
---

We are a group of commited users.

[Home](/)
```

And in `pictures.md`:

```html
---
layout: layout.html
pageTitle: Pictures
tags:
  - nav
navTitle: Pictures
---

* pic one
* pic two
* ![image](http://pngimg.com/uploads/apple/apple_PNG12405.png)

[Back](/)
```

We will use use the nav collection to create a nav.

In layout.html:

```html
<nav>
  <ul>
  {% for nav in collections.nav %}
    <li class="nav-item"><a href="{{ nav.url | url }}">{{ nav.data.navTitle }}</a></li>
  {%- endfor -%}
  </ul>
</nav>
```

Note: `{% ... %}` is a liquid [tag](https://shopify.github.io/liquid/basics/introduction/). Templating tags create the logic and control flow for templates. 

This looks identical to our hard coded nav. Let's add a home link.

In index.html:

```html
---
layout: layout.html
pageTitle: Home
tags:
  - nav
navTitle: Home
---

<p>Welcome to my site.</p>
```

Note: you can usually use HTML in a markdown file.

Add `contact.md` to the posts folder:

```html
---
layout: layout.html
pageTitle: Contact Us
tags:
  - nav
navTitle: Contact
---

<h2>Here's how:</h2>

<a href="/">Back</a>
```

Note: front matter tags can also be written `tags: nav` or `tags: [nav]` if you need multiples use the latter: `tags: [nav, other]`. Here's the tagging [documentation](https://www.11ty.io/docs/collections/#tag-syntax).

You can use HTML files alongside markdown.

Change the name of `contact.md` to `contact.html`:

```html
---
layout: layout.html
pageTitle: Contact Us
tags:
  - nav
navTitle: Contact
---

<h2>Here's how:</h2>

<ul>
	<li>917 865 5517</li>
</ul>

<a href="/">Back</a>
```

## Pass Throughs

We will add some images to the pictures page. Copy the `img` folder from today's project into the new eleventy folder.

We'll create another collection:

```html
---
layout: layout.html
pageTitle: Pictures
tags:
  - nav
navTitle: Pictures
images:
  - apples.png
  - apples-red.png
  - apples-group.png
---

![Image of apples](img/apples.png)

[Home](/)
```

Note that the img folder in our project doesn't copy to the rendered site - we only see the alt text.

## Site Preferences

Add a `.eleventy.js` file to the top level of the project:

```js
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("img");
};
```

Restart the server and you'll find the img folder in `_site`.

Note: the image path needs to be altered from a relative path to a root directory path:

`![Image of apples](/img/apples.png)`

We can use our collection to loop through the images collection with:

```html
{% for filename in images %}
<img src="/img/{{ filename }}" alt="A nice picture of apples." srcset="">
{% endfor %}
```

In `pictures.md`

```html
---
layout: layout.html
pageTitle: Apples
tags:
  - nav
navTitle: Pictures
images:
  - apples.png
  - apples-red.png
  - apples-group.png
---

{% for filename in images %}
<img src="/img/{{ filename }}" alt="A nice picture of apples." srcset="">
{% endfor %}

[Home](/)
```

Add passthroughs for JavaScript and CSS in the `.eleventy.js` file and corresponding folders

```js
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("js");
};
```

Add an empty js folder.

Add a css folder and, inside it, `styles.css` with:

```css
body {
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
		'Helvetica Neue', sans-serif;
	color: #333;
	font-size: 100%;
	max-width: 980px;
	margin: 0 auto;
}

img {
	width: 100%;
}

a {
  text-decoration: none;
  color: #007eb6;
}

nav ul {
	padding: 0;
	list-style: none;
	display: flex;
}

nav ul a {
	padding: 0.5rem;
}

article {
	padding: 1rem;
	display: grid;
	grid-template-columns: repeat(1, 1fr);
}
```

And a link to it in the layout.html template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="/css/styles.css">
  <title>My Blog</title>
</head>
<body>

  <nav>
    <ul>
    {% for nav in collections.nav %}
      <li class="nav-item{% if nav.url == page.url %} nav-item-active{% endif %}"><a href="{{ nav.url | url }}">{{ nav.data.navTitle }}</a></li>
    {%- endfor -%}
    </ul>
  </nav>

  <div class="content">

      <h1>{{ pageTitle }}</h1>

      {{ content }}
      
  </div>

</body>
</html>
```

Note the addition of the `{% if ... endif %}` tag in the navbar. This creates a static active class that we can leverage in the css.

## The Posts Collection

We can also add additional tags that can be used to reorganize content in interesting ways. 

Instead of this however:

```html
---
layout: layout.html
pageTitle: Pictures
tags:
  - nav
  - posts
---
```

We can create `posts/posts.json`:

```js
{
	"layout": "layout.html",
	"tags": ["posts", "nav"]
}

```

Any document in the posts folder will inherit these properties so can can now remove the duplicate tags and layout metadata from all publications in the posts directory. E.g.:

* posts:

```md
---
pageTitle: About Us
navTitle: About
---

We are a group of commited users.

[Home](/)
```

* contact:

```html
---
pageTitle: Contact Us
navTitle: Contact
---

<h2>Here's how:</h2>

<ul>
	<li>917 865 5517</li>
</ul>

<a href="/">Home</a>
```

* and pictures:

```md
---
pageTitle: Apples
navTitle: Pictures
images:
  - apples.png
  - apples-red.png
  - apples-group.png
---

{% for filename in images %}
<img src="/img/{{ filename }}" alt="A nice picture of apples." srcset="">
{% endfor %}

[Home](/)
```

Now that we have assigned the `posts` tag to every file in the `posts` folder, let's use that collection in `index.html` to display all the posts:

```html
---
layout: layout.html
pageTitle: Home
tags:
  - nav
navTitle: Home
---

<p>Welcome to my site.</p>

{% for post in collections.posts %}
  <h2><a href="{{ post.url }}">{{ post.data.pageTitle }}</a></h2>
  <em>{{ post.date | date: "%Y-%m-%d" }}</em>
{% endfor %}
```

Note: the `|` character in `post.date | date: "%Y-%m-%d"` is a filter. There are a number of [filters available](https://help.shopify.com/en/themes/liquid/filters) including `upcase`:

```html
{% for post in collections.posts %}
  <h2><a href="{{ post.url }}">{{ post.data.pageTitle | upcase }}</a></h2>
  <em>{{ post.date | date: "%Y-%m-%d" }}</em>
{% endfor %}
```

To make sure it shows up first in the nav add `date: 2010-01-01` to the front matter.

## Adding Our Ajax

Add `ajax.html` to the posts folder with:

```html
---
pageClass: ajax
pageTitle: New York Today
navTitle: Ajax
---

<h2>Ajax</h2>

<button>Click</button>

```

Note the new `pageClass` property. We will use this in our `layout.html` template.

Add the following to `scripts.js`:

```js
document.addEventListener('click', clickHandlers)

var nyt = 'https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=OuQiMDj0xtgzO80mtbAa4phGCAJW7GKa'

function clickHandlers(){
  if (event.target.matches('button')){
    getData()
  }
}

var addContent = function(data){

  var looped = ''

  for(i=0; i<data.results.length; i++){
    looped += `
      <div class="item">
        <h3>${data.results[i].title}</h3>
        <p>${data.results[i].abstract}</p>
      </div>
      `
  }

  document.querySelector('.content').innerHTML = looped

}

var getData = function () {
	fetch(nyt)
  .then(response => response.json())
  .then(json => addContent(json))
}
```

And edit layout.html to use the pageClass:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <link rel="stylesheet" href="/css/styles.css">
  <title>My Blog</title>
</head>
<body class="{{ pageClass }}">

<nav>
<ul>
{% for nav in collections.nav %}
  <li class="nav-item{% if nav.url == page.url %} nav-item-active{% endif %}"><a href="{{ nav.url | url }}">{{ nav.data.navTitle }}</a></li>
{%- endfor -%}
</ul>
</nav>

<div class="content">

    <h1>{{ pageTitle }}</h1>

    {{ content }}
    
</div>

<script src="/js/scripts.js" ></script>

</body>
</html>
```

Add CSS to taste:

```css
nav ul a {
	padding: 0.5rem;
}

.nav-item-active a {
  color: #fff;
  background-color: #007eb6;
  border-radius: 4px;
}

.ajax button {
	border: none;
	padding: 0.5rem 1rem;
	background: #007eb6;
	color: #fff;
	border-radius: 4px;
	font-size: 1rem;
}

.ajax .content > div {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 2rem;
}

.ajax .item {
  border-bottom: 1px dashed #aaa;
}
```

Note:
* we are using the className property to scope this page and enanble the css
* the use of the `>` selector
* the use of the `.nav-item-active a` selector
* the root relative paths for the CSS and JavaScript.

If we upload this to a web server these will [break](http://oit2.scps.nyu.edu/~devereld/session7/_site/) due to the root links.

The error reads:

`Loading failed for the <script> with source “http://oit2.scps.nyu.edu/js/scripts.js”.`

There are a number of ways to deal with this including putting a `base` tag in the head of the document:

`<base href="https://www.oit2.scps.nyu.edu.com/session7/_site">`

But today we'll use [Netlify](https://www.netlify.com/) to put this on the web. Register and/or log in to [app.netlify.com](https://app.netlify.com) and drag and drop the `_site` folder onto the web browser window to upload the contents [live to the web](https://amazing-hawking-49c3f6.netlify.com).

We can also hook into a Github branch to set up [continuous delpoyment](https://app.netlify.com/start).

For more experience with 11ty, download the official 11ty blog template or, if you feel like a challenge and something fancier, try Villalobos' new [template](https://github.com/planetoftheweb/seven) or [Skeleventy](https://skeleventy.netlify.com/), or any of the starter files on the [11ty](https://www.11ty.io/docs/starter/) starter page.

## Notes

JAM stack