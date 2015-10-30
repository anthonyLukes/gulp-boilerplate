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
* Heroku configuration files and instructions for deploying static files to staging server with basic auth

## How do I get set up? ##

* Install [node.js](https://nodejs.org/en/) and npm
* Run `npm install` from the root of the directory
* Run `bower install` to install any library dependencies (initially includes jQuery)
* Run `gulp` or `gulp build` to build the project files one time. The files are compiled from `/src` to `/web`.

### Other gulp tasks and options available ###
* `gulp watch` will build the site and start watching files (.scss, .html, media files (any file in `/src/media`), .js, or .json) for changes. Incremental builds will occur depending on the type of file that was updated (i.e. changes to .scss files will only rebuild the css).
* `gulp --prod` will rebuild the site and minify the CSS and JS (intended for production releases). The HTML templates will include the minified versions of the bundled CSS and JS files automatically.
* `gulp --serve` or `gulp watch --serve` will start up a static local webserver using Connect middleware and [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en).

### Deployment to Heroku
* Make sure that you have ruby installed and that it's in your path
* Install the bundler gem
* Sign up with a [Heroku](http://heroku.com) account
* Install the [Heroku Toolbelt](https://toolbelt.heroku.com/)
* Update the username and password fields on line #3 to your liking
* If you don't have a git repo already run `git init` to initialize a git repo
* Run `heroku create` to add a new Heroku app
* Make sure that you're using the ruby buildpack by running the following command
```
heroku buildpacks:set https://github.com/heroku/heroku-buildpack-ruby
```
* Add a second buildpack to allow node to build
```
heroku buildpacks:add --index 1 https://github.com/heroku/heroku-buildpack-nodejs
```
* Run `git add .` and `git commit -m "you git message here"`
* Run `git push heroku master`
* When that's done deploying run `heroku open` to view your site in the browser.
