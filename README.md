# Overview #

This is a front-end boilerplate to aid in standing up a client-side application quickly. It's is intended to be platform agnostic and easy to extend for your needs. The only dependecies it has are node.js and npm. It utilizes [gulp](http://gulpjs.com/) as well as [webpack](https://webpack.github.io/) to compile and minify files and also includes [bower](http://bower.io/) for library package management.

## What it includes ##

* SCSS compiling to CSS (using node sass so there is no ruby depency)
* JS module bundling (using [webpack](https://webpack.github.io/))
* [Nunjucks](https://mozilla.github.io/nunjucks/) static HTML compiling
* Library package management via [bower](http://bower.io/)
* Static webserver using Connect and LiveReload
* Production minification of CSS and JavaScript
* Image optimization

## How do I get set up? ##

* Install [node.js](https://nodejs.org/en/) and npm
* Run `npm install` from the root of the directory
* Run `bower install` to install any library dependencies (initially includes jQuery)
* Run `gulp` or `gulp build` to build the project files one time. The files are compiled from `/src` to `/web`.

### Other gulp tasks available ###
* `gulp watch` will build the site and start watching files (.scss, .html, media files (any file in `/src/media`), .js, or .json) for changes. Incremental builds will occur depending on the type of file that was updated (i.e. changes to .scss files will only rebuild the css). The watch method also utilizes Connect middleware as a static webserver with [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en).
* `gulp --prod` will rebuild the site and minify the CSS and JS (intended for production releases)