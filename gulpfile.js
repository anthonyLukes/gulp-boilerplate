'use strict';

var gulp = require('gulp');
var gutil = require("gulp-util");
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var webpack = require('webpack');
var argv = require('yargs').argv;
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var del = require('del');
var sequence  = require('run-sequence');
var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');
var env = require('gulp-env');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');


var CONFIG = require('./build-config.js');

var SHOULD_WATCH = false;
var IS_PROD = argv[CONFIG.PROD_FLAG];

gulp.task('sass', function () {
  del(['web/styles/*']);
  return gulp
    .src(CONFIG.SASS.INPUT)
    .pipe(sourcemaps.init())
    .pipe(sass(CONFIG.SASS.OPTIONS).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(CONFIG.SASS.OUTPUT));
});


gulp.task('webpack', function(callback) {
  del(['web/js/*']);
  var webpackconfig = require('./webpack-config.js');
  // run webpack
  webpack(webpackconfig, function(err, stats) {
      if(err) throw new gutil.PluginError('webpack', err);
      gutil.log('[webpack]', stats.toString({
          // output options
      }));
      callback();
  });
});

gulp.task('templates', function () {
  nunjucksRender.nunjucks.configure(['src/'], {watch: false});
  del(['web/*.html']);
  var env = 'DEV';
  if (IS_PROD) {
    env = 'PROD';
  }
  delete require.cache[require.resolve(CONFIG.DATA.INPUT)]; // clear the json from cache before loading
  return gulp.src('src/pages/*.html')
    .pipe(data(function() {
        return require(CONFIG.DATA.INPUT);
    }))
    .pipe(data(function() {
        return {
          "CSS_BUNDLE": CONFIG.TEMPLATE_PATHS.CSS[env],
          "JS_BUNDLE": CONFIG.TEMPLATE_PATHS.JS[env]
        };
    }))
    .pipe(nunjucksRender())
    .pipe(gulp.dest('web'));
});

gulp.task('setWatchToTrue', function() {
  SHOULD_WATCH = true;
});

gulp.task('copyMedia', function() {
  del([CONFIG.MEDIA.OUTPUT]).then(function() {
    gulp.src(CONFIG.MEDIA.INPUT)
      .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
      .pipe(gulp.dest(CONFIG.MEDIA.OUTPUT));
  });
});

gulp.task('watch', ['setWatchToTrue','build'], function() {
  // setup up watches
  gulp.watch(CONFIG.SASS.INPUT, ['sass']);
  gulp.watch(CONFIG.JS.INPUT_GLOB, ['webpack']);
  gulp.watch(CONFIG.HTML.INPUT_ALL, ['templates']);
  gulp.watch(CONFIG.DATA.INPUT, ['templates']);
  gulp.watch(CONFIG.MEDIA.INPUT, ['copyMedia']);
});

gulp.task('build', ['sass','webpack','templates','copyMedia'], function() {
  if (IS_PROD) {
    // uglify js
    gulp
      .src(CONFIG.JS.OUTPUT_DIR + CONFIG.JS.OUTPUT_FILE)
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest(CONFIG.JS.OUTPUT_DIR));
    // minify css
    gulp.src(CONFIG.SASS.OUTPUT + '/*.css')
      .pipe(cssmin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(CONFIG.SASS.OUTPUT));
    }
});

gulp.task('default', ['build']);