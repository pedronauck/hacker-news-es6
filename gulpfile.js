'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var gutil = require('gulp-util');
var to5 = require('gulp-6to5');
var to5Browserify = require('6to5-browserify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

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
})

gulp.task('compile', function() {
  gulp.src('./src/js/**/*.js')
    .pipe(to5({ modules: 'common' }))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('bundle', ['compile'], function() {
  browserify({ debug: true })
    .require('./dist/js/main.js', { entry: true })
    .bundle()
    .on('error', gutil.log)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('watch', function() {
  gulp.watch('./src/js/*.js', ['compile', 'bundle', browserSync.reload]);
  gulp.watch('./src/css/style.css', ['dist', browserSync.reload]);
  gulp.watch('./src/index.html', ['dist', browserSync.reload]);
});

gulp.task('default', [
  'dist', 'compile', 'bundle', 'watch', 'server'
]);
