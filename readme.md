# AJAX and Static Site Generation

Today were are building [this](https://amazing-hawking-49c3f6.netlify.com).

We will start with the Ajax.

## Ajax

[XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)

```html
---
pageClass: ajax
pageTitle: Subpost
tags:
  - nav
navtitle: Ajax
---

<h2>This is a subpost</h2>

<button>Click</button>

<div class="content"></div>
```

## Ajax

The [original](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)

## Fetch

The fetch() [method](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) takes one mandatory argument, the path to the resource you want to fetch. It returns a Promise that resolves to the Response to that request, whether it is successful or not.

## Rest API

[Typicode](http://jsonplaceholder.typicode.com/)

Promises:

```sh
fetch('https://jsonplaceholder.typicode.com/posts')
```

Promises resolved:

```sh
fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json())
```

```sh
fetch('https://jsonplaceholder.typicode.com/todos/')
  .then(response => response.json())
  .then(json => console.log(json))
```


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
	document.querySelector('.content').innerText = data[1].body;
}

var getData = function () {
	fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(json => addContent(json))
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

## Eleventy

[Eleventy](https://www.11ty.io/) (aka 11ty) is a simple [static site generator](https://www.smashingmagazine.com/2015/11/static-website-generators-jekyll-middleman-roots-hugo-review/). Static websites are very popular these days due to superior speed and security.

The benefits of 11ty include the fact that it is written in JavaScript and its supreme simplicity. It uses [Liquid](https://shopify.github.io/liquid/) under the hood. Liquid is a safe templating engine made to run untrusted templates for Shopify’s hosted platform. 

A template processor (also known as a template engine or template parser) is software designed to combine templates with a data model to produce result documents. The language that the templates are written in is known as a template language or templating language.

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

Create a `posts` folder and a sample markdown file `about.md` in it.

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

Edit index.html as follows:

```html
---
layout: layout.html
---

<h2>Home</h2>
```

The material at the top is called [frontmatter](https://www.11ty.io/docs/data-frontmatter/) as uses `Yaml` (Yet Another Markup Language) syntax.

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

If we upload this to a web server these will [break the site](http://oit2.scps.nyu.edu/~devereld/session7/_site/).

The error reads:

`Loading failed for the <script> with source “http://oit2.scps.nyu.edu/js/scripts.js”.`

You can use Netlify to very quickly put this on the web. Register and/or Log in to app.netlify.com and drag and drop the _site folder onto the web browser window to upload the contents [live to the web](https://amazing-hawking-49c3f6.netlify.com).