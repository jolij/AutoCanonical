/* global require */

var pkg  = require('./package.json');
var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

gulp.task('default', function() {
    gulp.watch('index.js', ['jshint']);
});

gulp.task('jshint', function() {
    return gulp.src(['background.js', 'content.js'])
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('build', function() {
    return gulp.src(['manifest.json', 'background.js', 'content.js', '*.png'])
        .pipe($.zip(pkg.name + '.zip'))
        .pipe(gulp.dest('./'));
});
