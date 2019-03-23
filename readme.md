# AJAX and Static Site Generation

## Homework

* watch this video on [Fetch](https://youtu.be/Oive66jrwBs)
* create your own New York Times developer account and use it to customize your Ajax page

## Exercise

Today were are building [this](https://amazing-hawking-49c3f6.netlify.com). 

[![Netlify Status](https://api.netlify.com/api/v1/badges/044ddd8e-853d-4282-8248-b2eeab94168d/deploy-status)](https://app.netlify.com/sites/zealous-kilby-113356/deploys)

**Do not download the zip.** Instead, use the same technique outlined last class to clone the repo.

```sh
> cd ~/Desktop // or where ever you want to work from
> git clone https://github.com/front-end-foundations/7-ajax-11ty.git
> cd 7-ajax-11ty
> npm install
```

See what your pushing to: 

```sh
git remote -v
```

[Change](https://help.github.com/en/articles/changing-a-remotes-url) the repo you are pushing to.

```sh
git remote set-url <your repo goes here>
```

Open and run the project:

```sh
> code .
> npm run start
```

And open the localhost address in Chrome.

## Ajax

Ajax allows you to get data from your own or another's web service. Web services expose specific data and services in the form of an API which allows you to get, delete, update or create data via [routes](http://jsonplaceholder.typicode.com/). Today, we are solely focused on getting data.

The original [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) browser API is in widespread use. You should make yourself familiar with it, however we will be using a newer and simpler API called fetch.

Examine `posts/ajax.html` in VS Code:

```html
---
pageClass: ajax
pageTitle: Subpost
tags:
  - nav
navtitle: Ajax
---

<h2>Ajax</h2>

<button>Click</button>

<div class="content"></div>
```

Don't worry about the material at the top. It is not part of ajax and can be ignored for the moment (we'll get to it later).

View the page in chrome.

## Fetch

The `fetch()` [method](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) takes one mandatory argument, the path to the resource you want to fetch. It returns something know as a Promise that, in turn, resolves to the response after the content is received.

## Rest API

We need data we can fetch from the internet. We'll start with [Typicode](http://jsonplaceholder.typicode.com/)

A promise:

```sh
> fetch('https://jsonplaceholder.typicode.com/posts')
```

A resolved promise:

```sh
> fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json())
```

Since the promise is resolved you can see the actual data in the console. It returns an array of 100 fake posts which we can console.log:

```sh
fetch('https://jsonplaceholder.typicode.com/todos/')
  .then(response => response.json())
  .then(json => console.log(json))
```

Let's start out with event delegation. 

In `scripts.js`:

```js
document.addEventListener('click', clickHandlers)

function clickHandlers(){
  if (event.target.matches('button')){
    getData()
  }
}

var addContent = function(data){
  console.log(data)
	document.querySelector('.content').innerText = data[1].body;
}

var getData = function () {
	fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(json => addContent(json))
}
```

Try [other resources](http://jsonplaceholder.typicode.com/) such as comments or photos.

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
	document.querySelector('.content').innerText = data;
}

var getData = function(data){
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      addContent(xhr.responseText);
    } else {
      console.log('The request failed!');
    }
  }
  xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
  xhr.send();
}
```

Add `var data = JSON.parse(xhr.responseText);` and target one piece of the data only:

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
	document.querySelector('.content').innerText = data[0].title;
}

var getData = function(data){
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      var data = JSON.parse(xhr.responseText);
      addContent(data);
    } else {
      console.log('The request failed!');
    }
  }
  xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
  xhr.send();
}
```

## Looping

New York Times [developers](https://developer.nytimes.com/) site.

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

## Eleventy

[Eleventy](https://www.11ty.io/) (aka 11ty) is a simple [static site generator](https://www.smashingmagazine.com/2015/11/static-website-generators-jekyll-middleman-roots-hugo-review/). Static websites are very popular these days due to superior speed and security.

The benefits of 11ty include the fact that it is written in JavaScript and its supreme simplicity. It uses [Liquid](https://shopify.github.io/liquid/) under the hood. Liquid is a safe templating engine made to run untrusted templates for Shopify’s hosted platform. 

A template processor (also known as a template engine or template parser) is software designed to combine templates with a data model to output documents. The language that the templates are written in is known as a template language or templating language.

The most popular static site generator - Jekyll - is used at Github and is written in Ruby. That means you have to worry about Ruby installation and versions if you want to use it. 

```sh
mkdir eleventy
cd eleventy
npm init -y
npm i --save-dev @11ty/eleventy
code .
```

Create a git `.gitignore` file targeting the node_modules folder:

```
_site
node_modules
```

Package:

```js
  "scripts": {
    "start": "eleventy --serve"
  },
```

Create a posts folder and a sample markdown file about.md.

```md
# About Us

We are a group of commited users.
```

```sh
npm run start
```

Note the create of the `_site` folder.

You can view the page at [http://localhost:8082/posts/about/](http://localhost:8082/posts/about/)

Create `index.html` at the top level.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Home Template</title>
</head>
<body>
  <nav>
    <ul>
      <li><a href="/posts/about">About Us</a></li>
      <li><a href="/posts/pictures">Pictures</a></li>
    </ul>
  </nav>
  <div class="content">
    <h1>Content</h1>
  </div>
</body>
</html>
```

Navigate to `http://localhost:8082/`

Create `pictures.md`:

```md
# Pictures

* pic one
* pic two

[Back](/)
```

## Templating

Create a special `_includes` folder at the top level of the project.

Save index.html into it as `layout.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Home Template</title>
</head>
<body>
  <nav>
    <ul>
      <li><a href="/posts/about">About Us</a></li>
      <li><a href="/posts/pictures">Pictures</a></li>
    </ul>
  </nav>
  
  {{ content }}

</body>
</html>
```

11ty uses a templating system called Liquid. `{{ content }}` is a Liquid [object](https://shopify.github.io/liquid/basics/introduction/). If templating is new to you be aware that they are generally quite simple languages and can be master easily over time. There are so many templating languages (and 11ty supports the most common) that we will not be focusing on them here. You will eventually find one that works best for you.

Edit index.html as follows:

```html
---
layout: layout.html
---

<h2>Home</h2>
```

The material at the top between the `---`s is called [frontmatter](https://www.11ty.io/docs/data-frontmatter/) as uses `Yaml` (Yet Another Markup Language) syntax.

Add to layout.html:

`<h1>{{ pageTitle }}</h1>`

Extend the frontmatter in index.html:

```html
---
layout: layout.html
pageTitle: Home
---

<p>Welcome to my site.</p>
```

And in `about.md`:

```html
---
layout: layout.html
pageTitle: About Us
---

We are a group of commited users.

[Home](/)
```

And in `pictures.md`:

```html
---
layout: layout.html
pageTitle: Pictures
---

* pic one
* pic two

[Home](/)
```

## Collections

A collection allows you to group content in interesting ways.

In `about.md`:

```html
---
layout: layout.html
pageTitle: About Us
tags:
  - nav
navtitle: About
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
navtitle: Pictures
---

* pic one
* pic two

[Home](/)
```

We use the collection to create a nav 

And in layout.html:

```html
  <nav>
    <ul>
    {% for nav in collections.nav %}
      <li class="nav-item"><a href="{{ nav.url | url }}">{{ nav.data.navtitle }}</a></li>
    {%- endfor -%}
    </ul>
  </nav>
```

Note: `{% ... %}` is a liquid [tag](https://shopify.github.io/liquid/basics/introduction/). Templating tags create the logic and control flow for templates. 

And in index.html:

```html
---
layout: layout.html
pageTitle: Home
tags:
  - nav
navtitle: Home
---

<p>Welcome to my site.</p>
```

Note: you can use HTML in a markdown file.

Add `contact.md` to the posts folder:

```html
---
layout: layout.html
pageTitle: Contact Us
tags:
  - nav
navtitle: Contact
---

<h2>Here's how:</h2>

<a href="/">Back</a>
```

Or you can use HTML file alongside markdown.

Change `contact.md` to `contact.html`:

```html
---
layout: layout.html
pageTitle: Contact Us
tags:
  - nav
navtitle: Contact
---

<h2>Here's how:</h2>

<ul>
	<li>917 865 5517</li>
</ul>

<a href="/">Back</a>
```

## Collections & Pass Throughs

We will add some images to the pictures page. 

Here's an image reference in markdown:

```html
---
layout: layout.html
pageTitle: Pictures
tags:
  - nav
navtitle: Pictures
images:
  - apples.png
  - apples-red.png
  - apples-group.png
---

![Image of apples](img/apples.png)

[Home](/)
```

Note that the img folder in our project doesn't copy to the rendered site.

Add a `.eleventy.js` file to the top level of the project:

```js
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("img");
};
```

Restart the server and you'll find the img folder in _site.

The image path needs to be altered from a relative path to a root path:

`![Image of apples](/img/apples.png)`

We can use this in 11ty to loop through the images collection:

```html
{% for filename in images %}
<img src="/img/{{ filename }}" alt="A nice picture of apples." srcset="">
{% endfor %}
```

Add passthroughs for JavaScript and CSS in the `.eleventy.js` file and corresponding folders

```js
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("js");
};
```

Add `styles.css`:

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
	padding: 1rem;
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
  <title>Home Template</title>
</head>
<body>

  <nav>
    <ul>
    {% for nav in collections.nav %}
      <li class="nav-item{% if nav.url == page.url %} nav-item-active{% endif %}"><a href="{{ nav.url | url }}">{{ nav.data.navtitle }}</a></li>
    {%- endfor -%}
    </ul>
  </nav>

  <article>
    
    <h1>{{ pageTitle }}</h1>
  
    {{ content }}

  </article>


</body>
</html>
```

Note the addition of the `{% if ... endif %}` tag in the navbar. This creates a static active class that we can leverage in the css.

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

We will create `posts/posts.json`:

```js
{
	"layout": "layout.html",
	"tags": ["posts", "nav"]
}

```

Any document in the posts folder will inheret these properties.

Remove the same tags and layout metadata from all publications in posts. E.g.:

```
---
pageTitle: About Us
navtitle: About
---

We are a group of commited users.

[Back](/)
```

And in index.html:

```html
---
layout: layout.html
pageTitle: Home
tags:
  - nav
navtitle: Home
---

<p>Welcome to my site.</p>

{% for post in collections.posts %}
  <h2><a href="{{ post.url }}">{{ post.data.pageTitle }}</a></h2>
  <em>{{ post.date | date: "%Y-%m-%d" }}</em>
{% endfor %}
```

## Adding Our Ajax

Add `ajax.html` to the posts folder with:

```html
---
pageClass: ajax
pageTitle: New York Today
navtitle: Ajax
---

<h2>Ajax</h2>

<button>Click</button>

<div class="content"></div>
```

Note the new pageClass property.

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
  <li class="nav-item{% if nav.url == page.url %} nav-item-active{% endif %}"><a href="{{ nav.url | url }}">{{ nav.data.navtitle }}</a></li>
{%- endfor -%}
</ul>
</nav>

<h1>{{ pageTitle }}</h1>

{{ content }}

<script src="/js/scripts.js" ></script>

</body>
</html>
```

Add CSS to taste:

```css
.nav-item-active {
  text-decoration: underline;
}

.ajax button {
	border: none;
	padding: 0.5rem 1rem;
	background: #007eb6;
	color: #fff;
	border-radius: 4px;
	font-size: 1rem;
}

.ajax .content {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 2rem;
}

.item {
  border-bottom: 1px dashed #aaa;
}
```

Note the root relative paths for the CSS and JavaScript.

If we upload this to a web server these will [break](http://oit2.scps.nyu.edu/~devereld/session7/_site/) due to the root links.

The error reads:

`Loading failed for the <script> with source “http://oit2.scps.nyu.edu/js/scripts.js”.`

You can use [Netlify](https://www.netlify.com/) to very quickly put this on the web. Register and/or Log in to [app.netlify.com](https://app.netlify.com) and drag and drop the `_site` folder onto the web browser window to upload the contents [live to the web](https://amazing-hawking-49c3f6.netlify.com).

We can also hook into a Github branch to set up coninuous delpoyment.