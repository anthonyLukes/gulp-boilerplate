'use strict';

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

var sassVars = {
  input: './src/styles/**/*.scss',
  output: './web/styles',
  options: {
    errLogToConsole: true,
    outputStyle: 'expanded'
  }
};

gulp.task('sass', function () {
  return gulp
    .src(sassVars.input)
    .pipe(sourcemaps.init())
    .pipe(sass(sassVars.options).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(sassVars.output));
});


gulp.task('default', ['sass'], function() {
  gulp.watch(sassVars.input, ['sass']);
});