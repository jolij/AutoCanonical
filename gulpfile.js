/* global require */

var pkg   = require('./package.json');
var gulp  = require('gulp');
var $     = require('gulp-load-plugins')();
var merge = require('event-stream').merge;
var del   = require('del');
var runSequence = require('run-sequence');

gulp.task('default', function() {
    gulp.watch(['background.js', 'content.js'], ['lint']);
});

gulp.task('lint', function() {
    return gulp.src(['background.js', 'content.js'])
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('prepare', function() {
    return merge(
        gulp.src(['manifest.json', 'background.js', 'content.js'])
            .pipe(gulp.dest('tmp/')),
        gulp.src('img/*')
            .pipe(gulp.dest('tmp/img/'))
    );
});

gulp.task('zip', function() {
    return gulp.src('tmp/**')
        .pipe($.zip('AutoCanonical.zip'))
        .pipe(gulp.dest('./'));
});

gulp.task('clean', function(cb) {
    del(['tmp/', 'AutoCanonical/'], cb);
});

gulp.task('build', function(cb) {
    runSequence('prepare', 'zip', 'clean', cb);
});
