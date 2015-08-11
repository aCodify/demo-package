var gulp = require('gulp');
var runSequence = require('run-sequence');
var connect = require('gulp-connect-php');
var jade = require('gulp-jade');
var browserSync = require('browser-sync');



gulp.task('templates', function() {
  var YOUR_LOCALS = {};
 
  gulp.src('src/templates/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('app/'))
});

gulp.task('connect-sync', function() {
  browserSync({
    open: false,
    baseDir: 'app/',
    proxy: 'localhost:4321',
    port: 1234
  });

});

gulp.task('php', function() {
  return connect.server({
    port: 4321,
    base: 'app/',
    hostname: '0.0.0.0'
  });
});

gulp.task('watch', function() {
  gulp.watch("src/templates/*.jade", ['templates', browserSync.reload]);
});

gulp.task('runserver', ['php', 'connect-sync'], function() {});


gulp.task('default', function() {
    return runSequence(['templates'] , ['runserver','watch']);  
});