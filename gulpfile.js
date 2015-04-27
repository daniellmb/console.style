/**
 * @file
 *
 * ### Responsibilities
 * - automate common tasks using gulp
 *
 * Scaffolded with generator-microjs v0.1.2
 *
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */
'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    complexity = require('gulp-complexity'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    karma = require('gulp-karma'),
    jsdoc = require('gulp-jsdoc'),
    fs = require('fs'),
    source = 'console.style.js',
    sourceMin = 'console.style.min.js',
    specs = 'test/spec/*.spec.js',
    karmaConf = 'test/karma.conf',
    umdWrapper = fs.readFileSync('./.umd');

gulp.task('lint', function () {
  return gulp.src([source, specs])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('gpa', function () {
  return gulp.src([source, specs])
    .pipe(complexity({
      cyclomatic: [8],
      halstead: [13],
      maintainability: [100]
    }));
});

gulp.task('test', function () {
  return gulp.src([source, specs])
    .pipe(karma({
      configFile: karmaConf + '.js'
    }));
});

gulp.task('min', function () {
  return gulp.src(source)
    .pipe(rename(sourceMin))
    .pipe(uglify({
      outSourceMap: true
    }))
    .pipe(replace(/(.*)/, umdWrapper))
    .pipe(gulp.dest('.'));
});

gulp.task('test-min', ['min'], function () {
  return gulp.src([sourceMin, specs])
    .pipe(karma({
      configFile: karmaConf + '.js',
      reporters: ['dots']
    }));
});

gulp.task('docs', function () {
  return gulp.src(source)
    .pipe(jsdoc('./docs'));
});

gulp.task('default', ['lint', 'gpa', 'test', 'test-min', 'docs']);
