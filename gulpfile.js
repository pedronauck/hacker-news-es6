'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var gutil = require('gulp-util');
var to5Browserify = require('6to5-browserify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var deploy = require('gulp-gh-pages');

gulp.task('server', function() {
  browserSync({
    port: 3001,
    server: {
      baseDir: './dist'
    }
  });
})

gulp.task('dist', function() {
  gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'));
  gulp.src('./src/css/style.css')
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('copyVendors', function() {
  gulp.src('./src/js/vendor/**')
    .pipe(gulp.dest('./dist/js/vendor'));
});

gulp.task('bundle', ['copyVendors'], function() {
  browserify({ debug: true })
    .transform(to5Browserify)
    .require('./src/js/main.js', { entry: true })
    .bundle()
    .on('error', gutil.log)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('deploy', function () {
  gulp.src('./dist/**/*')
    .pipe(deploy());
});

gulp.task('watch', function() {
  gulp.watch('./src/js/*.js', ['bundle', browserSync.reload]);
  gulp.watch('./src/css/style.css', ['dist', browserSync.reload]);
  gulp.watch('./src/index.html', ['dist', browserSync.reload]);
});

gulp.task('build', ['dist', 'bundle']);
gulp.task('default', ['build', 'watch', 'server']);
