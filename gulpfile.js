'use strict';

var gulp = require('gulp');
var gutil = require("gulp-util");
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");


var CONFIG = {
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
  return gulp
    .src(CONFIG.SASS.INPUT)
    .pipe(sourcemaps.init())
    .pipe(sass(CONFIG.SASS.OPTIONS).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(CONFIG.SASS.OUTPUT));
});


gulp.task("webpack", function(callback) {
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
  gulp.watch(CONFIG.SASS.INPUT, ['sass']);
  gulp.watch(CONFIG.JS.INPUT_GLOB, ['webpack']);
});