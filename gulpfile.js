'use strict';

var gulp = require('gulp');
var gutil = require("gulp-util");
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var argv = require('yargs').argv;
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var del = require('del')


var CONFIG = {
  PROD_FLAG: 'prod',
  SASS: {
    INPUT: './src/styles/**/*.scss',
    OUTPUT: './web/styles',
    OPTIONS: {
      ERR_LOG_TO_CONSOLE: true,
      OUTPUT_STYLE: 'expanded'
    }
  },
  JS: {
    INPUT: './src/js/main.js',
    INPUT_GLOB: './src/js/**/*.js',
    OUTPUT_DIR: './web/js/',
    OUTPUT_FILE: 'bundle.js'
  }
}

gulp.task('sass', function () {
  del(['web/styles/*']);
  return gulp
    .src(CONFIG.SASS.INPUT)
    .pipe(sourcemaps.init())
    .pipe(sass(CONFIG.SASS.OPTIONS).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(CONFIG.SASS.OUTPUT));
});


gulp.task("webpack", function(callback) {
  del(['web/js/*']);
  // run webpack
  webpack({
    entry: CONFIG.JS.INPUT,
    output: {
      path: CONFIG.JS.OUTPUT_DIR,
      filename: CONFIG.JS.OUTPUT_FILE
    },
    devtool: 'source-map'
  }, function(err, stats) {
      if(err) throw new gutil.PluginError("webpack", err);
      gutil.log("[webpack]", stats.toString({
          // output options
      }));
      callback();
  });
});


gulp.task('default', ['sass','webpack'], function() {
  if (!argv[CONFIG.PROD_FLAG]) {
    // setup up watches
    gulp.watch(CONFIG.SASS.INPUT, ['sass']);
    gulp.watch(CONFIG.JS.INPUT_GLOB, ['webpack']);
  } else {
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